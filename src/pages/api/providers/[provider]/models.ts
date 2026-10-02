import type { APIRoute } from 'astro';
import { providerModels } from '../../../../lib/ai';
import { assertAdmin, assertSameOrigin, redactError } from '../../../../lib/security';
export const GET: APIRoute = async ({ request, params }) => { try { assertSameOrigin(request); assertAdmin(request); return Response.json({ models: await providerModels(params.provider as any) }); } catch (error) { return Response.json({ error: redactError(error) }, { status: 400 }); } };
