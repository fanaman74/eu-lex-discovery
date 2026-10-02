import type { APIRoute } from 'astro';
import { runMonitoring } from '../../lib/monitor';
import { runUpdatesMonitoring } from '../../lib/updates';
import { assertAdmin, assertSameOrigin, redactError } from '../../lib/security';
export const POST: APIRoute = async ({ request }) => { try { assertSameOrigin(request); assertAdmin(request); const cases = await runMonitoring(); return Response.json({ ...cases, institutions: await runUpdatesMonitoring() }); } catch (error) { return Response.json({ error: redactError(error) }, { status: 500 }); } };
