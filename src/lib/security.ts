import crypto from 'node:crypto';

function encryptionKey() {
  const raw = process.env.CREDENTIAL_ENCRYPTION_KEY;
  if (!raw) throw new Error('CREDENTIAL_ENCRYPTION_KEY is required');
  const key = /^[0-9a-f]{64}$/i.test(raw) ? Buffer.from(raw, 'hex') : Buffer.from(raw, 'base64');
  if (key.length !== 32) throw new Error('CREDENTIAL_ENCRYPTION_KEY must decode to 32 bytes');
  return key;
}

export function encryptSecret(value: string) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', encryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
  return [iv.toString('base64url'), cipher.getAuthTag().toString('base64url'), encrypted.toString('base64url')].join('.');
}

export function decryptSecret(value: string) {
  const [iv, tag, encrypted] = value.split('.');
  if (!iv || !tag || !encrypted) throw new Error('Invalid encrypted credential');
  const decipher = crypto.createDecipheriv('aes-256-gcm', encryptionKey(), Buffer.from(iv, 'base64url'));
  decipher.setAuthTag(Buffer.from(tag, 'base64url'));
  return Buffer.concat([decipher.update(Buffer.from(encrypted, 'base64url')), decipher.final()]).toString('utf8');
}

export function redactError(error: unknown) {
  return String(error instanceof Error ? error.message : error).replace(/sk-[\w-]+/gi, '[redacted]').replace(/((?:api[_ -]?key|authorization|bearer)\s*[:=]?\s*)\S+/gi, '$1[redacted]').slice(0, 1_000);
}

export function assertSameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) return;
  const expected = new URL(request.url).origin;
  if (origin !== expected) throw new Error('Cross-origin request rejected');
}

export function assertAdmin(request: Request) {
  if ((process.env.NODE_ENV ?? 'development') !== 'production') return;
  const configured = process.env.ADMIN_TOKEN;
  const provided = request.headers.get('x-admin-token');
  if (!configured || !provided) throw new Error('Admin authentication required');
  const expected = Buffer.from(configured); const actual = Buffer.from(provided);
  if (expected.length !== actual.length || !crypto.timingSafeEqual(expected, actual)) throw new Error('Admin authentication required');
}
