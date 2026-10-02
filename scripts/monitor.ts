import 'dotenv/config';
import { runMonitoring } from '../src/lib/monitor';
import { runUpdatesMonitoring } from '../src/lib/updates';
console.log(await runMonitoring());
console.log(await runUpdatesMonitoring());
