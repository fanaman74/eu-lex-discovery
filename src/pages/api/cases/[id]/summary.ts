import type { APIRoute } from 'astro';
import { generateSummary } from '../../../../lib/ai';
import { query } from '../../../../lib/db';
import { assertAdmin, assertSameOrigin, redactError } from '../../../../lib/security';
export const POST: APIRoute = async ({ request, params, redirect }) => {
  const caseId = Number(params.id);
  if (!Number.isSafeInteger(caseId) || caseId < 1) return Response.json({ error: 'Invalid case identifier' }, { status: 400 });
  try { assertSameOrigin(request); assertAdmin(request); const result = await generateSummary(caseId); await query('INSERT INTO reports(case_id,provider,model,status,report_json,source_document_ids) VALUES($1,$2,$3,\'complete\',$4,$5)', [caseId, result.provider, result.model, JSON.stringify(result.report), result.sourceDocumentIds]); await query('UPDATE cases SET summary=$1, relevance_label=\'AI assessed from retrieved source\', updated_at=NOW() WHERE id=$2', [result.report.summary ?? null, caseId]); return redirect(`/cases/${caseId}`, 303); } catch (error) { return Response.json({ error: redactError(error) }, { status: 400 }); }
};
