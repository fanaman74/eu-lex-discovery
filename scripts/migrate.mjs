import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';
import 'dotenv/config';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL });
const sql = await readFile(resolve(root, 'db/migrations/001_foundation.sql'), 'utf8');
await pool.query(sql);
await pool.end();
console.log('Database migration complete.');
