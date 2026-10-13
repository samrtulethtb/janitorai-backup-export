'use strict';
// Real-import check against a local SillyTavern server.
//
//   ST_DIR=/path/to/SillyTavern npm run test:sillytavern
//
// It starts SillyTavern with a throwaway data folder, imports our PNG card,
// JSON cards, JSONL chat and World Info file through SillyTavern's own HTTP
// import endpoints, reads them back through its own API, and also runs
// SillyTavern's own PNG card parser module on our file. Skipped when ST_DIR
// is not set.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const net = require('node:net');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');
const { core, fixture } = require('../unit/helpers');

const ST_DIR = process.env.ST_DIR;
const skip = !ST_DIR || !fs.existsSync(path.join(ST_DIR || '', 'server.js')) ? 'set ST_DIR to a SillyTavern checkout with dependencies installed' : false;
const STRANGER = { userId: '11111111-2222-4333-8444-555555555555' };

function freePort() {
  return new Promise((resolve) => {
    const s = net.createServer().listen(0, '127.0.0.1', () => {
      const { port } = s.address();
      s.close(() => resolve(port));
    });
  });
}

let server;
let base;
let dataRoot;

async function startSillyTavern() {
  const port = await freePort();
  dataRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'jbe-st-'));
  server = spawn(process.execPath, ['server.js', '--port', String(port), '--dataRoot', dataRoot, '--disableCsrf', '--listen', 'false', '--whitelist', 'false', '--browserLaunchEnabled', 'false'], { cwd: ST_DIR, stdio: ['ignore', 'pipe', 'pipe'] });
  let log = '';
  server.stdout.on('data', (d) => { log += d; });
  server.stderr.on('data', (d) => { log += d; });
  base = `http://127.0.0.1:${port}`;
  for (let i = 0; i < 240; i++) {
    try {
      const r = await fetch(`${base}/api/ping`, { method: 'POST' });
      if (r.status < 500) return;
    } catch { /* not up yet */ }
    if (server.exitCode !== null) throw new Error(`SillyTavern exited:\n${log}`);
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`SillyTavern did not start:\n${log.slice(-2000)}`);
}

async function post(endpoint, body) {
  const r = await fetch(`${base}${endpoint}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
  assert.equal(r.status, 200, `${endpoint} → HTTP ${r.status}`);
  return r.json();
}

async function upload(endpoint, file, fields) {
  const form = new FormData();
  for (const [k, v] of Object.entries(fields || {})) form.append(k, v);
  form.append('avatar', new Blob([file.data]), file.name);
  const r = await fetch(`${base}${endpoint}`, { method: 'POST', body: form });
  assert.equal(r.status, 200, `${endpoint} → HTTP ${r.status}`);
  return r.json();
}

function characterFiles(name, lorebooks, formats) {
  const guarded = core.guardCharacter(fixture(name), STRANGER);
  return core.buildCharacterFiles({ guarded, lorebooks: lorebooks || [], formats, baseName: 'card', now: Date.UTC(2026, 9, 13) });
}

test('SillyTavern import', { skip, timeout: 240000 }, async (t) => {
  await startSillyTavern();
  t.after(() => {
    if (server) server.kill();
    if (dataRoot) fs.rmSync(dataRoot, { recursive: true, force: true });
  });
  const version = await fetch(`${base}/version`).then((r) => r.json()).catch(() => ({}));
  t.diagnostic(`SillyTavern ${version.pkgVersion || '?'} (${version.gitRevision || 'no git'})`);

  const lorebook = core.parseJanitorLorebook(fixture('lorebook-static.json'));
  let aikoAvatar;

  await t.test('our PNG card is read by SillyTavern\'s own card parser (ccv3 preferred)', async () => {
    const parser = await import(pathToFileURL(path.join(ST_DIR, 'src', 'character-card-parser.js')).href);
    const out = characterFiles('character-public.json', [], ['png']);
    const json = JSON.parse(parser.read(Buffer.from(out.files[0].data)));
    assert.equal(json.spec, 'chara_card_v3');
    assert.equal(json.data.name, 'Aiko 🌸 Tanaka');
  });

  await t.test('PNG card imports with every field, lorebook included', async () => {
    const out = characterFiles('character-lorebook.json', [lorebook], ['png']);
    const res = await upload('/api/characters/import', { name: 'Queen Maren.png', data: out.files[0].data }, { file_type: 'png' });
    assert.ok(res.file_name, JSON.stringify(res));
    const ch = await post('/api/characters/get', { avatar_url: `${res.file_name}.png` });
    assert.equal(ch.name, 'Queen Maren');
    assert.equal(ch.description, 'Queen Maren is stern, just, and tired of war.');
    assert.match(ch.first_mes, /Speak, envoy/);
    assert.equal(ch.scenario, '{{user}} is an envoy summoned to the throne room.');
    assert.equal(ch.data.creator, 'maple_writer');
    assert.deepEqual(ch.data.tags, ['Fantasy']);
    assert.equal(ch.data.character_book.entries.length, 3);
    assert.deepEqual(ch.data.character_book.entries[0].keys, ['castle', 'Emberhold']);
    assert.equal(ch.data.extensions.janitorai.id, '0b1c2d3e-4f50-4617-8a9b-c0d1e2f3a4b5');
  });

  await t.test('PNG card with emoji/CJK and alternate greetings imports intact', async () => {
    const out = characterFiles('character-public.json', [], ['png']);
    const res = await upload('/api/characters/import', { name: 'aiko.png', data: out.files[0].data }, { file_type: 'png' });
    aikoAvatar = `${res.file_name}.png`;
    const ch = await post('/api/characters/get', { avatar_url: aikoAvatar });
    assert.equal(ch.name, 'Aiko 🌸 Tanaka');
    assert.match(ch.description, /抹茶 and rainy days 🌧️/);
    assert.equal(ch.data.alternate_greetings.length, 2);
    assert.match(ch.data.alternate_greetings[1], /「また会えるね」/);
    assert.deepEqual(ch.tags, ['Female', 'Romance', 'slice of life', '幼馴染']);
    assert.match(ch.data.creator_notes, /春が来た！/);
  });

  await t.test('JSON V2 and V3 cards import', async () => {
    const out = characterFiles('character-nsfw.json', [], ['json_v2', 'json_v3']);
    for (const f of out.files) {
      const res = await upload('/api/characters/import', { name: 'vex.json', data: f.data }, { file_type: 'json' });
      assert.ok(res.file_name, `${f.name}: ${JSON.stringify(res)}`);
      const ch = await post('/api/characters/get', { avatar_url: `${res.file_name}.png` });
      assert.equal(ch.name, 'Vex');
      assert.match(ch.description, /flirtatious succubus/);
      assert.match(ch.first_mes, /sweetheart/);
    }
  });

  await t.test('hidden-definition card imports with the public data and the note', async () => {
    const out = characterFiles('character-hidden.json', [], ['png']);
    const res = await upload('/api/characters/import', { name: 'log.png', data: out.files[0].data }, { file_type: 'png' });
    const ch = await post('/api/characters/get', { avatar_url: `${res.file_name}.png` });
    assert.equal(ch.name, "Bot's Log (Saucepan)");
    assert.equal(ch.description, '');
    assert.match(ch.data.creator_notes, /creator hid this character's definition/);
  });

  await t.test('JSONL chat imports into the character and every message loads', async () => {
    const chat = core.normalizeChat(fixture('chat.json'), { characterName: 'Aiko 🌸 Tanaka' });
    const jsonl = core.buildSillyTavernJsonl(chat);
    // Opening the character in the UI creates its chat folder; the chat import
    // button only exists there. Without this step SillyTavern answers
    // {error:true}, which is why the panel says "import the card first".
    await post('/api/chats/get', { ch_name: 'Aiko 🌸 Tanaka', file_name: '', avatar_url: aikoAvatar });
    const res = await upload('/api/chats/import', { name: 'chat.jsonl', data: Buffer.from(jsonl) }, {
      file_type: 'jsonl', avatar_url: aikoAvatar, character_name: 'Aiko 🌸 Tanaka', user_name: 'Ren',
    });
    assert.equal(res.res, true, JSON.stringify(res));
    assert.equal(res.fileNames.length, 1);
    const fileName = res.fileNames[0].replace(/\.jsonl$/, '');
    const rows = await post('/api/chats/get', { ch_name: 'Aiko 🌸 Tanaka', file_name: fileName, avatar_url: aikoAvatar });
    assert.equal(rows.length, 6);
    const [header, ...messages] = rows;
    assert.equal(header.user_name, 'Ren');
    assert.deepEqual(messages.map((m) => m.is_user), [false, true, false, true, false]);
    assert.equal(messages[1].mes, "Aiko?! Come in, you're soaked.");
    assert.equal(messages[2].swipes.length, 3);
    assert.equal(messages[2].mes, messages[2].swipes[messages[2].swipe_id]);
    assert.match(messages[4].mes, /約束だよ！/);
    const list = await post('/api/characters/chats', { avatar_url: aikoAvatar });
    assert.ok(Object.values(list).some((c) => c.file_name === res.fileNames[0] && Number(c.chat_items) === 5), JSON.stringify(list));
  });

  await t.test('World Info lorebook file imports', async () => {
    const wi = core.toWorldInfo(lorebook);
    const res = await upload('/api/worldinfo/import', { name: 'Ash Kingdom.json', data: Buffer.from(JSON.stringify(wi)) });
    assert.equal(res.name, 'Ash Kingdom');
    const back = await post('/api/worldinfo/get', { name: 'Ash Kingdom' });
    assert.equal(Object.keys(back.entries).length, 3);
    assert.deepEqual(back.entries[1].key, ['general', 'Corvin']);
  });
});
