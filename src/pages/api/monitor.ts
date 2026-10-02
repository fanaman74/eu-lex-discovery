import type { APIRoute } from 'astro';
import { runMonitoring } from '../../lib/monitor';
import { assertAdmin, assertSameOrigin, redactError } from '../../lib/security';
export const POST: APIRoute = async ({ request }) => { try { assertSameOrigin(request); assertAdmin(request); return Response.json(await runMonitoring()); } catch (error) { return Response.json({ error: redactError(error) }, { status: 500 }); } };
