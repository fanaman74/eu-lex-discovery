import type { APIRoute } from 'astro';
import { testProvider } from '../../../../lib/ai';
import { assertAdmin, assertSameOrigin, redactError } from '../../../../lib/security';
export const POST: APIRoute = async ({ request, params }) => { try { assertSameOrigin(request); assertAdmin(request); return Response.json(await testProvider(params.provider as any)); } catch (error) { return Response.json({ error: redactError(error) }, { status: 400 }); } };
