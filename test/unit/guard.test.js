'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { core, fixture, scriptSource, STRANGER } = require('./helpers');

const DEFINITION_SENTINEL = 'SECRET-DEFINITION-TEXT';

// A hidden character where the server (or page state) wrongly includes the
// definition anyway: the guard must still drop it.
function leakyHidden() {
  const raw = fixture('character-hidden.json');
  raw.personality = `${DEFINITION_SENTINEL} personality`;
  raw.scenario = `${DEFINITION_SENTINEL} scenario`;
  raw.example_dialogs = `${DEFINITION_SENTINEL} examples`;
  raw.first_message = `${DEFINITION_SENTINEL} greeting`;
  raw.first_messages = [`${DEFINITION_SENTINEL} alt`];
  raw.system_prompt = `${DEFINITION_SENTINEL} system`;
  raw.post_history_instructions = `${DEFINITION_SENTINEL} jailbreak`;
  raw.some_future_field = `${DEFINITION_SENTINEL} unknown field`;
  return raw;
}

test('hidden definition: guard keeps only whitelisted public fields', () => {
  const g = core.guardCharacter(leakyHidden(), STRANGER);
  assert.equal(g.definitionHidden, true);
  assert.equal(g.reason, 'hidden');
  for (const k of core.DEFINITION_FIELDS) assert.equal(Object.hasOwn(g.char, k), false, `${k} must not survive`);
  for (const k of Object.keys(g.char)) assert.ok(core.PUBLIC_FIELDS.includes(k), `${k} is not a public field`);
  assert.equal(JSON.stringify(g.char).includes(DEFINITION_SENTINEL), false);
});

test('hidden definition: no definition text in any export format', () => {
  const g = core.guardCharacter(leakyHidden(), STRANGER);
  const lorebook = core.parseJanitorLorebook(fixture('lorebook-static.json'));
  const out = core.buildCharacterFiles({ guarded: g, lorebooks: [lorebook], formats: ['png', 'json_v2', 'json_v3', 'lorebook', 'txt', 'raw'], baseName: 'x', now: 0 });
  assert.deepEqual(out.errors, []);
  for (const f of out.files) {
    const text = f.name.endsWith('.png') ? JSON.stringify(core.readCardPng(f.data)) : f.data;
    assert.equal(text.includes(DEFINITION_SENTINEL), false, `${f.name} leaked the definition`);
    assert.equal(text.includes('Emberhold'), false, `${f.name} leaked a lorebook`);
  }
  assert.equal(out.files.some((f) => f.name.endsWith('.lorebook.json')), false, 'no lorebook file for a hidden character');
  const d = out.data;
  for (const k of ['description', 'personality', 'scenario', 'first_mes', 'mes_example', 'system_prompt', 'post_history_instructions']) assert.equal(d[k], '', k);
  assert.deepEqual(d.alternate_greetings, []);
  assert.equal(d.character_book, undefined);
});

test('hidden definition: the export says plainly why', () => {
  const g = core.guardCharacter(fixture('character-hidden.json'), STRANGER);
  const out = core.buildCharacterFiles({ guarded: g, formats: ['json_v2', 'txt', 'raw'], baseName: 'x', now: 0 });
  const v2 = JSON.parse(out.files[0].data);
  assert.match(v2.data.creator_notes, /The creator hid this character's definition, so only the public parts can be saved\./);
  assert.equal(v2.data.extensions.janitorai.definition_hidden, true);
  assert.match(out.files[1].data, /^NOTE: The creator hid/m);
  assert.equal(JSON.parse(out.files[2].data)._export.definition_hidden, true);
  // Public data is still there.
  assert.equal(v2.data.name, "Bot's Log (Saucepan)");
  assert.deepEqual(v2.data.tags, ['Utility', 'saucepan']);
  assert.equal(v2.data.creator, 'hidden_author');
});

test('hidden definition: unticking creator notes still keeps the notice', () => {
  const g = core.guardCharacter(fixture('character-hidden.json'), STRANGER);
  const d = core.mapCharacterToCardData(g, { parts: { creator_notes: false } });
  assert.match(d.creator_notes, /creator hid/);
});

test('showdefinition must be exactly true; anything else counts as hidden', () => {
  for (const v of [false, undefined, null, 'true', 1]) {
    const raw = fixture('character-public.json');
    raw.showdefinition = v;
    assert.equal(core.guardCharacter(raw, STRANGER).definitionHidden, true, String(v));
  }
});

test('logged-out viewer never counts as the creator', () => {
  const raw = leakyHidden();
  assert.equal(core.guardCharacter(raw, { userId: null }).definitionHidden, true);
  assert.equal(core.guardCharacter(raw, undefined).definitionHidden, true);
});

test('creator of a hidden character gets their own definition', () => {
  const raw = leakyHidden();
  const owner = { userId: raw.creator_id };
  const g = core.guardCharacter(raw, owner);
  assert.equal(g.definitionHidden, false);
  assert.equal(g.isOwner, true);
  const d = core.mapCharacterToCardData(g, {});
  assert.match(d.description, /SECRET-DEFINITION-TEXT personality/);
});

test('creator whose definition the server did not return gets an honest note', () => {
  const raw = fixture('character-hidden.json');
  const g = core.guardCharacter(raw, { userId: raw.creator_id });
  assert.equal(g.definitionHidden, false);
  assert.equal(g.reason, 'owner_missing');
});

test('the code has no proxy, generation-payload capture or probing', () => {
  const src = scriptSource();
  const forbidden = [
    /generateAlpha/i, /open_ai_reverse_proxy/i, /reverseProxyKey/i, /open_ai_mode/i, /\.invalid\b/i,
    /extract-char/i, /assembled_?prompt/i, /\/generate/i, /chat\/completions/i, /jailbreak_prompt/i,
    /method:\s*['"]POST['"]/i, /XMLHttpRequest\.prototype/, /WebSocket/,
  ];
  for (const re of forbidden) assert.equal(re.test(src), false, `source matches ${re}`);
});

test('the fetch hook reads only the Authorization header', () => {
  const src = scriptSource();
  const start = src.indexOf('// <fetch-hook>');
  const end = src.indexOf('// </fetch-hook>');
  assert.ok(start > 0 && end > start, 'fetch hook region is marked');
  const hook = src.slice(start, end).split('\n').filter((l) => !l.trim().startsWith('//')).join('\n');
  for (const re of [/\.body\b/, /\.json\(/, /\.text\(/, /\.clone\(/, /\.then\(/, /arrayBuffer/, /init\.method/, /new Request/]) {
    assert.equal(re.test(hook), false, `fetch hook matches ${re}`);
  }
  assert.match(hook, /extractBearer\(init && init\.headers\)/);
  assert.match(hook, /return original\.apply\(this, arguments\)/, 'request is passed through unchanged');
});

test('only janitorai.com hosts are reachable from code; every URL literal is accounted for', () => {
  const src = scriptSource();
  const urls = Array.from(src.matchAll(/https?:\/\/[^\s'"`)<>]+/g), (m) => m[0]);
  const allowed = [
    /^https:\/\/janitorai\.com\b/,
    /^https:\/\/ella\.janitorai\.com\/bot-avatars\/$/,
    /^https:\/\/github\.com\/samrtulethtb\/janitorai-backup-export\b/,
    /^https:\/\/t\.vlmai-5\.com\/425026\/10338\/0$/, // sponsor link: user click only, disabled by default
  ];
  for (const u of urls) assert.ok(allowed.some((re) => re.test(u)), `unexpected URL in source: ${u}`);
  assert.deepEqual(core.ALLOWED_HOSTS, ['janitorai.com', 'www.janitorai.com', 'ella.janitorai.com']);
  assert.equal(core.isAllowedUrl('https://ella.janitorai.com/bot-avatars/a.webp'), true);
  assert.equal(core.isAllowedUrl('https://janitorai.com.evil.example/x'), false);
  assert.equal(core.isAllowedUrl('https://evil.example/?janitorai.com'), false);
  assert.equal(core.isAllowedUrl('javascript:alert(1)'), false);
});

test('header @connect lists only janitorai domains and there is no @require', () => {
  const { userscriptHeader } = require('./helpers');
  const h = userscriptHeader();
  const connects = Array.from(h.matchAll(/@connect\s+(\S+)/g), (m) => m[1]);
  assert.deepEqual(connects, ['janitorai.com', 'ella.janitorai.com']);
  assert.equal(/@require/.test(h), false);
  assert.match(h, /@noframes/);
  assert.match(h, /@run-at\s+document-idle/);
  assert.match(h, /@match\s+\*:\/\/janitorai\.com\/\*/);
});

test('the UI never uses innerHTML/outerHTML/insertAdjacentHTML/document.write', () => {
  const src = scriptSource();
  for (const re of [/\.innerHTML\b/, /\.outerHTML\b/, /insertAdjacentHTML/, /document\.write/]) assert.equal(re.test(src), false, String(re));
  assert.match(src, /attachShadow\(\{ mode: 'open' \}\)/);
});

test('unavailable (deleted) characters get their own note, not the "creator hid" one', () => {
  const g = core.guardCharacter({ id: 'x', name: 'Gone', avatar: 'a.webp' }, STRANGER);
  g.reason = 'unavailable';
  const d = core.mapCharacterToCardData(g, {});
  assert.match(d.creator_notes, /no longer serves this character/);
  assert.equal(/creator hid/.test(d.creator_notes), false);
  assert.match(core.buildCharacterText(d, g), /NOTE: JanitorAI no longer serves/);
});
