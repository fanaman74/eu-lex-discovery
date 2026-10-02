import { query } from './db';
import { redactError } from './security';
import { fetchCommissionDocuments, fetchCommissionPress, fetchOmbudsmanUpdates, type InstitutionUpdate } from './source/institutions';

const fetchers: Record<string, (fetchImpl?: typeof fetch) => Promise<InstitutionUpdate[]>> = {
  'ombudsman-documents': fetchOmbudsmanUpdates,
  'commission-cellar': fetchCommissionDocuments,
  'commission-press': fetchCommissionPress
};

/** Checks each institution source in turn. One source failing is recorded on its own run and does not stop the others. */
export async function runUpdatesMonitoring(fetchImpl?: typeof fetch) {
  const results: { source: string; status: string; discovered: number; imported: number; error?: string }[] = [];
  for (const [key, fetcher] of Object.entries(fetchers)) {
    const source = (await query<{ id: number }>('SELECT id FROM sources WHERE key = $1 AND enabled = true', [key])).rows[0];
    if (!source) continue;
    const runId = (await query<{ id: number }>('INSERT INTO monitoring_runs(source_id) VALUES($1) RETURNING id', [source.id])).rows[0].id;
    try {
      const updates = await fetcher(fetchImpl);
      let imported = 0;
      for (const update of updates) {
        const saved = await query<{ created: boolean }>(`INSERT INTO institution_updates(source_id, institution, external_id, title, kind, reference, document_date, official_url, matched_terms)
          VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
          ON CONFLICT(source_id, external_id) DO UPDATE SET title=EXCLUDED.title, kind=EXCLUDED.kind, reference=EXCLUDED.reference, document_date=EXCLUDED.document_date, official_url=EXCLUDED.official_url, matched_terms=EXCLUDED.matched_terms
          RETURNING (xmax = 0) AS created`, [source.id, update.institution, update.externalId, update.title, update.kind, update.reference, update.documentDate, update.officialUrl, update.matchedTerms]);
        if (saved.rows[0].created) imported++;
      }
      await query("UPDATE monitoring_runs SET finished_at = NOW(), status = 'success', discovered_count = $1, imported_count = $2 WHERE id = $3", [updates.length, imported, runId]);
      await query('UPDATE sources SET last_checked_at = NOW(), last_success_at = NOW() WHERE id = $1', [source.id]);
      results.push({ source: key, status: 'success', discovered: updates.length, imported });
    } catch (error) {
      const message = redactError(error);
      await query("UPDATE monitoring_runs SET finished_at = NOW(), status = 'failed', failure_count = 1, error_message = $1 WHERE id = $2", [message, runId]);
      await query('UPDATE sources SET last_checked_at = NOW() WHERE id = $1', [source.id]);
      results.push({ source: key, status: 'failed', discovered: 0, imported: 0, error: message });
    }
  }
  return results;
}
