'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { core, fixture } = require('./helpers');

test('ZIP: store-only archive with UTF-8 names round-trips and unzip accepts it', () => {
  const files = [
    { name: 'manifest.json', data: '{"a":1}' },
    { name: 'chats/Aiko 🌸/chat 1.jsonl', data: 'line1\nline2' },
    { name: 'chats/Aiko 🌸/chat 1.jsonl', data: 'dup' },
    { name: 'characters/x.png', data: core.makePlaceholderPng('x') },
  ];
  const zip = core.createZip(files, { date: new Date(2026, 9, 13, 12, 30, 10) });
  const back = core.readZip(zip);
  assert.deepEqual(Array.from(back.keys()), ['manifest.json', 'chats/Aiko 🌸/chat 1.jsonl', 'chats/Aiko 🌸/chat 1 (2).jsonl', 'characters/x.png']);
  assert.equal(Buffer.from(back.get('chats/Aiko 🌸/chat 1.jsonl')).toString(), 'line1\nline2');
  assert.ok(core.isPng(back.get('characters/x.png')));

  const { execFileSync } = require('node:child_process');
  const fs = require('node:fs');
  const os = require('node:os');
  const path = require('node:path');
  let hasUnzip = true;
  try { execFileSync('unzip', ['-v'], { stdio: 'ignore' }); } catch { hasUnzip = false; }
  if (hasUnzip) {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'jbe-zip-'));
    const file = path.join(dir, 'a.zip');
    fs.writeFileSync(file, zip);
    const out = execFileSync('unzip', ['-t', file]).toString();
    assert.match(out, /No errors detected/);
  }
});

test('manifest has counts, versions and date', () => {
  const m = core.buildManifest({ counts: { chats: 3, skipped: 1 }, now: Date.UTC(2026, 9, 13), chatFormats: ['jsonl'] });
  assert.equal(m.exporter_version, core.VERSION);
  assert.equal(m.created_at, '2026-10-13T00:00:00.000Z');
  assert.equal(m.counts.chats, 3);
  assert.equal(m.counts.characters, 0);
  assert.deepEqual(m.chat_formats, ['jsonl']);
});

function jwt(payload) {
  const b = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
  return `${b({ alg: 'HS256' })}.${b(payload)}.sig`;
}

test('token discovery: Supabase cookie, chunked and base64url', () => {
  const token = jwt({ sub: 'user-1', exp: 9999999999 });
  const session = `base64-${Buffer.from(JSON.stringify({ access_token: token, refresh_token: 'r' })).toString('base64url')}`;
  assert.equal(core.tokenFromCookies(`foo=1; sb-auth-auth-token=${encodeURIComponent(session)}`), token);
  const a = session.slice(0, 40);
  const b = session.slice(40);
  assert.equal(core.tokenFromCookies(`sb-auth-auth-token.1=${b}; x=y; sb-auth-auth-token.0=${a}`), token);
  assert.equal(core.tokenFromCookies(`sb-abcd-auth-token.0=${a}; sb-abcd-auth-token.1=${b}`), token);
  assert.equal(core.tokenFromCookies('nothing=here'), null);
  assert.equal(core.tokenFromCookies('sb-auth-auth-token=garbage'), null);
  assert.equal(core.viewerFromToken(token).userId, 'user-1');
});

test('token discovery: localStorage entries', () => {
  const token = jwt({ sub: 'user-2' });
  assert.equal(core.tokenFromStorageEntries([['other', 'x'], ['sb-auth-auth-token', JSON.stringify({ access_token: token })]]), token);
  assert.equal(core.tokenFromStorageEntries([['sb-xyz-auth-token', JSON.stringify({ currentSession: { access_token: token } })]]), token);
  assert.equal(core.tokenFromStorageEntries([['sb-auth-auth-token', 'not json']]), null);
});

test('Authorization sniffing reads only the bearer value from headers', () => {
  assert.equal(core.extractBearer({ Authorization: 'Bearer abc.def' }), 'abc.def');
  assert.equal(core.extractBearer({ authorization: 'bearer xyz' }), 'xyz');
  assert.equal(core.extractBearer([['Authorization', 'Bearer t1'], ['x', 'y']]), 't1');
  assert.equal(core.extractBearer(new Headers({ Authorization: 'Bearer t2' })), 't2');
  assert.equal(core.extractBearer({ Authorization: 'Basic abc' }), null);
  assert.equal(core.extractBearer(undefined), null);
});

test('limiter: never more than 2 in flight, spaced by the delay', async () => {
  let clock = 0;
  const sleeps = [];
  const limiter = core.createLimiter({ concurrency: 5, delayMs: 100, now: () => clock, sleep: async (ms) => { sleeps.push(ms); clock += ms; } });
  let active = 0;
  let max = 0;
  const task = async () => {
    active++;
    max = Math.max(max, active);
    await new Promise((r) => setImmediate(r));
    active--;
  };
  await Promise.all(Array.from({ length: 8 }, () => limiter.run(task)));
  assert.equal(max, 2, 'concurrency is capped at 2 even when 5 is requested');
  assert.equal(limiter.stats.maxActive, 2);
  assert.ok(sleeps.length >= 6 && sleeps.every((ms) => ms > 0 && ms <= 200), `delays: ${sleeps}`);
});

test('retry: backs off on 429/5xx, honours Retry-After, gives up on 404', async () => {
  const sleeps = [];
  const sleep = async (ms) => { sleeps.push(ms); };
  let calls = 0;
  const res = await core.withRetry(async () => {
    calls++;
    if (calls === 1) throw new core.HttpError('busy', { status: 429, retryAfter: 3 });
    if (calls === 2) throw new core.HttpError('oops', { status: 503 });
    return 'ok';
  }, { sleep, baseMs: 1000, random: () => 0 });
  assert.equal(res, 'ok');
  assert.deepEqual(sleeps, [3000, 2000]);

  calls = 0;
  await assert.rejects(core.withRetry(async () => { calls++; throw new core.HttpError('nf', { status: 404 }); }, { sleep }), /nf/);
  assert.equal(calls, 1, '404 is not retried');

  calls = 0;
  await assert.rejects(core.withRetry(async () => { calls++; throw new core.HttpError('down', { status: 502 }); }, { sleep, retries: 3, baseMs: 1 }), /down/);
  assert.equal(calls, 4);
  assert.equal(core.computeBackoff(10, undefined, 1000, 30000, () => 0), 30000, 'capped');
});

test('bulk: failures go to skipped with reasons, fatal errors pause and resume', async () => {
  const items = [1, 2, 3, 4, 5].map((id) => ({ id, name: `chat ${id}`, kind: 'chat' }));
  let authLost = true;
  const worker = async (item) => {
    if (item.id === 2) throw new core.HttpError('gone', { status: 404, source: 'chat_api' });
    if (item.id === 4 && authLost) throw new core.HttpError('expired', { status: 401, source: 'chat_api' });
    return item.id;
  };
  const progress = [];
  const first = await core.runBulk(items, worker, { onProgress: (p) => progress.push(p.done) });
  assert.equal(first.status, 'paused');
  assert.equal(first.nextIndex, 3);
  assert.deepEqual(first.results, [1, 3]);
  assert.deepEqual(first.skipped, [{ id: 2, name: 'chat 2', what: 'chat', why: 'HTTP 404 from chat_api' }]);
  authLost = false;
  const second = await core.runBulk(items, worker, { state: first });
  assert.equal(second.status, 'done');
  assert.deepEqual(second.results, [1, 3, 4, 5]);
  assert.equal(second.skipped.length, 1);
  assert.deepEqual(progress.slice(0, 4), [0, 1, 2, 3]);

  let n = 0;
  const cancelled = await core.runBulk(items, async () => n++, { isCancelled: () => n >= 2 });
  assert.equal(cancelled.status, 'cancelled');
});

test('personas: SillyTavern backup format', () => {
  const personas = core.dedupePersonas(fixture('chat.json').personas.concat(fixture('chat-hidden.json').personas, fixture('chat.json').personas));
  assert.equal(personas.length, 2);
  const { backup, files } = core.buildSillyTavernPersonaBackup(personas, 1760000000000);
  assert.deepEqual(Object.values(backup.personas), ['Ren', 'Mika']);
  const [renFile] = Object.keys(backup.personas);
  assert.equal(renFile, '1760000000000-Ren.png');
  assert.equal(backup.default_persona, renFile);
  assert.deepEqual(backup.persona_descriptions[renFile], { description: 'Ren is 23, a quiet bookshop clerk.\nPronouns: he/him', position: 0, depth: 2, role: 0, lorebook: '', title: '' });
  assert.equal(files.length, 2);
});

test('throttle stays conservative: every preset waits at least 1 s between request starts', () => {
  assert.equal(core.MIN_REQUEST_DELAY_MS, 1000);
  assert.equal(core.MAX_CONCURRENCY, 2);
  for (const name of Object.keys(core.THROTTLE_PRESETS)) assert.ok(core.throttleDelayMs(name) >= 1000, name);
  assert.equal(core.throttleDelayMs('normal'), 1500);
  assert.equal(core.throttleDelayMs('nonsense'), 1500, 'unknown values fall back to normal');
  assert.equal(core.throttleDelayMs('__proto__'), 1500);
  assert.ok(core.DEFAULT_SETTINGS.retryBaseMs >= 1000);
});

test('bulk pauses (not skips) on 403 firewall answers and on 429 after retries', async () => {
  for (const status of [403, 429]) {
    const items = [1, 2, 3].map((id) => ({ id, name: `c${id}` }));
    let calls = 0;
    const state = await core.runBulk(items, async (item) => {
      calls++;
      if (item.id === 2) throw new core.HttpError('blocked', { status, source: 'chat_api' });
      return item.id;
    });
    assert.equal(state.status, 'paused', String(status));
    assert.equal(state.nextIndex, 1);
    assert.equal(calls, 2, 'nothing after the blocked request was tried');
    assert.equal(state.skipped.length, 0);
  }
  // 404 and 500 still skip and move on.
  assert.equal(new core.HttpError('x', { status: 404 }).fatal, false);
  assert.equal(new core.HttpError('x', { status: 500 }).fatal, false);
});
