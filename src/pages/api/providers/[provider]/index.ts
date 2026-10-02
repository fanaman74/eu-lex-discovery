import type { APIRoute } from 'astro';
import { removeProvider } from '../../../../lib/ai';
import { assertAdmin, assertSameOrigin, redactError } from '../../../../lib/security';
export const DELETE: APIRoute = async ({ request, params }) => { try { assertSameOrigin(request); assertAdmin(request); await removeProvider(params.provider as any); return Response.json({ ok: true }); } catch (error) { return Response.json({ error: redactError(error) }, { status: 400 }); } };
