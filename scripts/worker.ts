import 'dotenv/config';
import { setTimeout as delay } from 'node:timers/promises';
import { runMonitoring } from '../src/lib/monitor';
import { query } from '../src/lib/db';
import { shouldRunSchedule } from '../src/lib/schedule';
console.log('EU Lex monitor worker started; schedule is read from schedule_preferences.');
while (true) {
  try {
    const pref = (await query<{ timezone: string; hour: number; minute: number; enabled: boolean }>('SELECT timezone,hour,minute,enabled FROM schedule_preferences WHERE id=1')).rows[0];
    if (pref?.enabled) {
      const parts = new Intl.DateTimeFormat('en-CA', { timeZone: pref.timezone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
      const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));
      const localDay = `${map.year}-${map.month}-${map.day}`;
      const latest = (await query<{ started_at: string | null; status: string | null }>(`SELECT started_at,status FROM monitoring_runs WHERE source_id=(SELECT id FROM sources WHERE key='eurlex-sparql') AND (started_at AT TIME ZONE $1)::date=$2 ORDER BY started_at DESC LIMIT 1`, [pref.timezone, localDay])).rows[0];
      const retryFailed = latest?.status === 'failed' && latest.started_at && Date.now() - new Date(latest.started_at).getTime() > 15 * 60_000;
      if (shouldRunSchedule({ day: localDay, hour: Number(map.hour), minute: Number(map.minute) }, pref, latest && !retryFailed ? localDay : null)) console.log(await runMonitoring());
    }
  } catch (error) { console.error('Monitoring worker error:', error instanceof Error ? error.message : error); }
  await delay(30_000);
}
