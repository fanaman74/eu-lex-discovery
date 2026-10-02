import { getPool, query, withTransaction } from './db';
import { fetchEurLexCases, fetchEurLexDocument, type EurLexRecord } from './source/eurlex';

export type MonitorOptions = { fetchImpl?: typeof fetch; sourceKey?: string };

export async function runMonitoring(options: MonitorOptions = {}) {
  const lockClient = await getPool().connect();
  const lock = await lockClient.query<{ locked: boolean }>('SELECT pg_try_advisory_lock(684321987) AS locked');
  if (!lock.rows[0].locked) { lockClient.release(); throw new Error('Another monitoring run is already in progress'); }
  try {
  const sourceKey = options.sourceKey ?? 'eurlex-sparql';
  const sourceResult = await query<{ id: number; name: string }>('SELECT id, name FROM sources WHERE key = $1 AND enabled = true', [sourceKey]);
  if (!sourceResult.rows[0]) throw new Error(`Enabled source not found: ${sourceKey}`);
  const source = sourceResult.rows[0];
  const run = await query<{ id: number }>('INSERT INTO monitoring_runs(source_id) VALUES($1) RETURNING id', [source.id]);
  const runId = run.rows[0].id;
  try {
    const termsResult = await query<{ terms_en: string[] }>('SELECT terms_en FROM topics WHERE enabled = true');
    const terms = termsResult.rows.flatMap((row) => row.terms_en).map((term) => term.toLocaleLowerCase('en')).filter(Boolean);
    const records = (await fetchEurLexCases(options.fetchImpl)).filter((record) => terms.some((term) => record.title.toLocaleLowerCase('en').includes(term)));
    let imported = 0;
    let failed = 0;
    let retrievalFailures = 0;
    const failures: { celex?: string; kind: string; error: string }[] = [];
    for (const record of records) {
      try { const result = await upsertRecord(source.id, record, options.fetchImpl); if (result.created) imported++; if (result.retrievalFailed) { retrievalFailures++; failures.push({ celex: record.celex, kind: 'document', error: result.retrievalError ?? 'document unavailable' }); } }
      catch (error) { failed++; failures.push({ celex: record.celex, kind: 'record', error: safeError(error) }); }
    }
    const totalFailures = failed + retrievalFailures;
    const status = totalFailures ? (imported || records.length ? 'partial' : 'failed') : 'success';
    await query('UPDATE monitoring_runs SET finished_at = NOW(), status = $1, discovered_count = $2, imported_count = $3, failure_count = $4, details=$5 WHERE id = $6', [status, records.length, imported, totalFailures, JSON.stringify({ recordFailures: failed, documentFailures: retrievalFailures, failures }), runId]);
    await query('UPDATE sources SET last_checked_at = NOW(), last_success_at = CASE WHEN $1 = \'success\' THEN NOW() ELSE last_success_at END WHERE id = $2', [status, source.id]);
    return { runId, status, discovered: records.length, imported, failed: totalFailures, failures };
  } catch (error) {
    const message = safeError(error);
    await query('UPDATE monitoring_runs SET finished_at = NOW(), status = \'failed\', error_message = $1 WHERE id = $2', [message, runId]);
    await query('UPDATE sources SET last_checked_at = NOW() WHERE id = $1', [source.id]);
    throw error;
  }
  } finally {
    await lockClient.query('SELECT pg_advisory_unlock(684321987)').catch(() => undefined);
    lockClient.release();
  }
}

async function upsertRecord(sourceId: number, record: EurLexRecord, fetchImpl?: typeof fetch) {
  let document: { text: string; truncated: boolean } | null = null;
  let retrievalError: string | null = null;
  try { document = await fetchEurLexDocument(record, fetchImpl ?? fetch); } catch (error) { retrievalError = safeError(error); }
  return withTransaction(async (client) => {
    const courtName = record.celex.includes('FJ') || record.celex.includes('FO') ? 'Civil Service Tribunal of the European Union' : record.celex.includes('TJ') || record.celex.includes('TO') ? 'General Court of the European Union' : 'Court of Justice of the European Union';
    const court = await client.query<{ id: number }>('INSERT INTO courts(name, jurisdiction) VALUES($1,$2) ON CONFLICT(name,jurisdiction) DO UPDATE SET name=EXCLUDED.name RETURNING id', [courtName, 'European Union']);
    const existing = await client.query<{ id: number }>('SELECT id FROM cases WHERE celex = $1', [record.celex]);
    const result = await client.query<{ id: number }>(`INSERT INTO cases(celex, case_number, title, court_id, judgment_date, publication_date, language, updated_at)
      VALUES($1,$2,$3,$4,$5,NULL,$6,NOW()) ON CONFLICT(celex) DO UPDATE SET title=EXCLUDED.title, judgment_date=COALESCE(EXCLUDED.judgment_date,cases.judgment_date), updated_at=NOW() RETURNING id`, [record.celex, caseNumber(record.celex, record.title), record.title, court.rows[0].id, record.judgmentDate, record.language]);
    const caseId = result.rows[0].id;
    await client.query(`INSERT INTO documents(case_id, source_id, source_reference, official_url, text_content, retrieved_at, publication_date, metadata)
      VALUES($1,$2,$3,$4,$5::text,CASE WHEN $5::text IS NULL THEN NULL ELSE NOW() END,NULL,$6::jsonb)
      ON CONFLICT(source_id, source_reference) DO UPDATE SET official_url=EXCLUDED.official_url, text_content=COALESCE(EXCLUDED.text_content,documents.text_content), retrieved_at=COALESCE(EXCLUDED.retrieved_at,documents.retrieved_at), metadata=documents.metadata || EXCLUDED.metadata`, [caseId, sourceId, record.celex, record.officialUrl, document?.text ?? null, JSON.stringify({ work: record.work, retrievalError, truncated: document?.truncated ?? false })]);
    const terms = await client.query<{ id: number; terms_en: string[] }>('SELECT id, terms_en FROM topics WHERE enabled = true');
    const lowerTitle = record.title.toLocaleLowerCase('en');
    for (const topic of terms.rows) if (topic.terms_en.some((term: string) => lowerTitle.includes(term.toLocaleLowerCase('en')))) await client.query('INSERT INTO case_topics(case_id, topic_id, match_type) VALUES($1,$2,\'keyword match\') ON CONFLICT DO NOTHING', [caseId, topic.id]);
    return { created: !existing.rows[0], retrievalFailed: Boolean(retrievalError), retrievalError };
  });
}

function caseNumber(celex: string, title = '') { const match = celex.match(/^6(\d{4})(C|T|F)(J|O)(\d{4})$/); if (!match) return celex; const appeal = /\b[CPF]-?\d+\/\d+\s+P\b|\(.*\bP\b\)/i.test(title) ? ' P' : ''; return `${match[2]}-${Number(match[4])}/${match[1].slice(2)}${appeal}`; }
function safeError(error: unknown) { return String(error instanceof Error ? error.message : error).replace(/(api[_ -]?key|authorization|bearer)\s*[:=]?\s*\S+/gi, '$1 [redacted]').slice(0, 1_000); }
