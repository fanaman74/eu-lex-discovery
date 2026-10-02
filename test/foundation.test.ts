import test from 'node:test';
import assert from 'node:assert/strict';
import { encryptSecret, decryptSecret, redactError } from '../src/lib/security.ts';
import { fetchEurLexCases, fetchEurLexDocument } from '../src/lib/source/eurlex.ts';
import { shouldRunSchedule } from '../src/lib/schedule.ts';
import { parseReport, buildChatRequest } from '../src/lib/ai.ts';

test('encrypted credentials round-trip and errors redact full secrets', () => {
  process.env.CREDENTIAL_ENCRYPTION_KEY = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=';
  const encrypted = encryptSecret('sk-live-secret-value');
  assert.equal(decryptSecret(encrypted), 'sk-live-secret-value');
  assert.ok(!encrypted.includes('sk-live-secret-value'));
  assert.ok(!redactError(new Error('authorization: Bearer sk-live-secret-value')).includes('sk-live-secret-value'));
});

test('source parser rejects malformed JSON and maps official records', async () => {
  const badFetch = async () => new Response('{not-json', { status: 200 });
  await assert.rejects(() => fetchEurLexCases(badFetch as typeof fetch));
  const goodFetch = async () => new Response(JSON.stringify({ results: { bindings: [{ celex: { value: '62023CJ0343' }, title: { value: 'Colombani v EEAS' }, work: { value: 'urn:work' }, date: { value: '2026-04-16' } }] } }), { status: 200 });
  const [record] = await fetchEurLexCases(goodFetch as typeof fetch);
  assert.equal(record.celex, '62023CJ0343');
  assert.equal(record.judgmentDate, '2026-04-16');
  assert.equal(record.language, 'English source version');
});

test('official Cellar redirects are upgraded to HTTPS and bounded', async () => {
  const requested: string[] = [];
  const redirectFetch = async (url: string) => { requested.push(url); return requested.length === 1 ? new Response('', { status: 302, headers: { location: 'http://publications.europa.eu/resource/cellar/document' } }) : new Response('<html><body><p class="coj-count" id="point1">1</p>Text</body></html>', { status: 200, headers: { 'content-type': 'application/xhtml+xml' } }); };
  const result = await fetchEurLexDocument({ celex: '62023CJ0343' }, redirectFetch as typeof fetch);
  assert.match(requested[1], /^https:\/\/publications\.europa\.eu/);
  assert.match(result.text, /\[paragraph 1\]/);
});

test('schedule catches up once per local day after configured time', () => {
  assert.equal(shouldRunSchedule({ day: '2026-10-02', hour: 7, minute: 0 }, { hour: 6, minute: 30 }, null), true);
  assert.equal(shouldRunSchedule({ day: '2026-10-02', hour: 7, minute: 0 }, { hour: 6, minute: 30 }, '2026-10-02'), false);
  assert.equal(shouldRunSchedule({ day: '2026-10-02', hour: 6, minute: 0 }, { hour: 6, minute: 30 }, null), false);
});

test('AI report parser rejects invalid shape, marks invented citations incomplete, and provider payloads use safe roles/tokens', () => {
  const valid = JSON.stringify({ summary: 'supported', establishedFacts: ['fact'], legalQuestions: ['question'], outcome: 'outcome', relevance: 'relevance', citations: ['[paragraph 1]'], incomplete: false });
  assert.deepEqual(parseReport(valid, 'Source [paragraph 1]'), { summary: 'supported', establishedFacts: ['fact'], legalQuestions: ['question'], outcome: 'outcome', relevance: 'relevance', citations: ['[paragraph 1]'], incomplete: false });
  const invented = parseReport(valid, 'Source without that marker');
  assert.equal(invented.incomplete, true);
  assert.deepEqual(invented.citations, []);
  assert.throws(() => parseReport(JSON.stringify({ summary: 'bad' }), 'Source'));
  const openai = buildChatRequest('openai', 'https://api.openai.com/v1', 'secret', 'o4-mini', 'prompt');
  assert.match(openai.init.body as string, /max_completion_tokens/);
  assert.match(openai.init.body as string, /"role":"system"/);
  const deepseek = buildChatRequest('deepseek', 'https://api.deepseek.com/v1', 'secret', 'deepseek-chat', 'prompt');
  assert.match(deepseek.init.body as string, /max_tokens/);
  const anthropic = buildChatRequest('anthropic', 'https://api.anthropic.com/v1', 'secret', 'claude', 'prompt');
  assert.match(anthropic.init.body as string, /"system"/);
  assert.equal((anthropic.init.headers as Record<string, string>)['anthropic-version'], '2023-06-01');
});
