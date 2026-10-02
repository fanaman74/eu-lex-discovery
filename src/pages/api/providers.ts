import type { APIRoute } from 'astro';
import { listProviders, saveProvider } from '../../lib/ai';
import { assertAdmin, assertSameOrigin, redactError } from '../../lib/security';
import { z } from 'zod';

const providerInput = z.object({ provider: z.enum(['openai', 'deepseek', 'openrouter', 'anthropic']), baseUrl: z.string().max(300).optional(), model: z.string().max(200).optional(), apiKey: z.string().max(500).optional(), enabled: z.boolean().optional() });

export const GET: APIRoute = async () => {
  try { return Response.json({ providers: await listProviders() }); } catch (error) { return Response.json({ error: redactError(error) }, { status: 500 }); }
};
export const POST: APIRoute = async ({ request }) => {
  try { assertSameOrigin(request); assertAdmin(request); const body = providerInput.parse(await request.json()); await saveProvider({ ...body, enabled: body.enabled !== false }); return Response.json({ ok: true }); }
  catch (error) { return Response.json({ error: redactError(error) }, { status: 400 }); }
};
