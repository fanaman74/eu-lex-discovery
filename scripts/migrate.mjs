import { readdir, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';
import 'dotenv/config';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dir = resolve(root, 'db/migrations');
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL });
// Migrations are idempotent, so every file is applied in name order on each run.
for (const file of (await readdir(dir)).filter((name) => name.endsWith('.sql')).sort()) {
  await pool.query(await readFile(resolve(dir, file), 'utf8'));
  console.log(`Applied ${file}`);
}
await pool.end();
console.log('Database migration complete.');
