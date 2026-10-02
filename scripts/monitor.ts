import 'dotenv/config';
import { runMonitoring } from '../src/lib/monitor';
console.log(await runMonitoring());
