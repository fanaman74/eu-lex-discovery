import type { APIRoute } from 'astro';
import { z } from 'zod';
import { query } from '../../lib/db';
import { assertAdmin, assertSameOrigin, redactError } from '../../lib/security';
const schema = z.object({ timezone: z.string().refine((value) => { try { new Intl.DateTimeFormat('en-CA', { timeZone: value }).format(); return true; } catch { return false; } }), hour: z.coerce.number().int().min(0).max(23), minute: z.coerce.number().int().min(0).max(59), enabled: z.boolean() });
export const GET: APIRoute = async () => { try { return Response.json((await query('SELECT timezone,hour,minute,enabled FROM schedule_preferences WHERE id=1')).rows[0] ?? null); } catch (error) { return Response.json({ error: redactError(error) }, { status: 500 }); } };
export const POST: APIRoute = async ({ request }) => { try { assertSameOrigin(request); assertAdmin(request); const pref = schema.parse(await request.json()); await query('INSERT INTO schedule_preferences(id,timezone,hour,minute,enabled,updated_at) VALUES(1,$1,$2,$3,$4,NOW()) ON CONFLICT(id) DO UPDATE SET timezone=EXCLUDED.timezone,hour=EXCLUDED.hour,minute=EXCLUDED.minute,enabled=EXCLUDED.enabled,updated_at=NOW()', [pref.timezone, pref.hour, pref.minute, pref.enabled]); return Response.json({ ok: true }); } catch (error) { return Response.json({ error: redactError(error) }, { status: 400 }); } };
