'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { core, fixture, STRANGER } = require('./helpers');

const map = (raw, opts, viewer) => core.mapCharacterToCardData(core.guardCharacter(raw, viewer || STRANGER), Object.assign({ now: Date.UTC(2026, 9, 13) }, opts));

test('public character: SPEC §4 field mapping', () => {
  const raw = fixture('character-public.json');
  const d = map(raw);
  assert.equal(d.name, 'Aiko 🌸 Tanaka');
  assert.equal(d.description, raw.personality, 'JanitorAI personality → V2 description');
  assert.equal(d.personality, '', 'SillyTavern target leaves personality empty');
  assert.equal(d.scenario, raw.scenario);
  assert.equal(d.mes_example, raw.example_dialogs);
  assert.equal(d.first_mes, raw.first_message);
  assert.equal(d.creator, 'maple_writer');
  assert.deepEqual(d.tags, ['Female', 'Romance', 'slice of life', '幼馴染']);
  assert.equal(d.creator_notes, 'Your childhood friend who just moved back to town.\n春が来た！ Tea & rain.\nArt by me.');
  assert.equal(d.character_version, '2026-09-30');
  assert.equal(d.extensions.janitorai.url, 'https://janitorai.com/characters/3f1c2a9e-7b4d-4e2a-9c1b-5d6e7f8a9b0c');
  assert.equal(d.extensions.janitorai.creator_url, 'https://janitorai.com/profiles/6b8e1f2a-1111-4c3d-8e9f-0a1b2c3d4e5f');
  assert.equal(d.extensions.janitorai.definition_hidden, false);
  assert.equal(d.character_book, undefined);
});

test('alternate greetings: first_messages[0] duplicates first_message and is not repeated', () => {
  const d = map(fixture('character-public.json'));
  assert.equal(d.alternate_greetings.length, 2);
  assert.match(d.alternate_greetings[0], /station café/);
  assert.match(d.alternate_greetings[1], /また会えるね/);
});

test('greetings: first_messages only, without first_message', () => {
  const raw = fixture('character-public.json');
  raw.first_message = null;
  const d = map(raw);
  assert.match(d.first_mes, /umbrella dripping/);
  assert.equal(d.alternate_greetings.length, 2);
});

test('NSFW character: mixed tag shapes are flattened and de-duplicated, empty fields stay empty strings', () => {
  const d = map(fixture('character-nsfw.json'));
  assert.deepEqual(d.tags, ['NSFW', 'Fantasy', 'Monster Girl', 'bartender']);
  assert.equal(d.extensions.janitorai.is_nsfw, true);
  assert.equal(d.mes_example, '');
  assert.deepEqual(d.alternate_greetings, []);
  assert.equal(d.creator_notes, 'NSFW — a succubus bartender. 18+ only.');
});

test('macros: original text is kept by default', () => {
  const d = map(fixture('character-public.json'));
  assert.match(d.description, /^\{\{char\}\} is Aiko Tanaka/);
});

test('macros: normalize replaces the character name and variants, leaves the name field alone', () => {
  const raw = fixture('character-nsfw.json');
  raw.scenario = 'Late night. <user> walks in; Vex looks up. <BOT> smiles. Vexation is a word.';
  const d = map(raw, { macroMode: 'normalize' });
  assert.equal(d.name, 'Vex');
  assert.equal(d.scenario, 'Late night. {{user}} walks in; {{char}} looks up. {{char}} smiles. Vexation is a word.');
  assert.match(d.description, /^\{\{char\}\} is a flirtatious succubus/);
});

test('target "compat" (SpicyChat/Saucepan) also fills personality with the main text', () => {
  const raw = fixture('character-public.json');
  const d = map(raw, { target: 'compat' });
  assert.equal(d.personality, raw.personality);
  assert.equal(d.description, raw.personality);
});

test('checklist: unticked parts are left out', () => {
  const d = map(fixture('character-public.json'), { parts: { scenario: false, alternate_greetings: false, tags: false, creator_notes: false, mes_example: false } });
  assert.equal(d.scenario, '');
  assert.deepEqual(d.alternate_greetings, []);
  assert.deepEqual(d.tags, []);
  assert.equal(d.creator_notes, '');
  assert.equal(d.mes_example, '');
  assert.notEqual(d.first_mes, '');
});

test('lorebook: static entries map to character_book and SillyTavern World Info', () => {
  const book = core.parseJanitorLorebook(fixture('lorebook-static.json'));
  assert.equal(book.kind, 'static');
  assert.equal(book.entries.length, 3, 'empty entry dropped');
  assert.deepEqual(book.entries[0].keys, ['castle', 'Emberhold']);
  assert.deepEqual(book.entries[1].keys, ['general', 'Corvin'], 'comma-separated keys split');
  assert.equal(book.entries[2].constant, true);
  assert.equal(book.scanDepth, 4);

  const d = map(fixture('character-lorebook.json'), { lorebooks: [book] });
  const cb = d.character_book;
  assert.equal(cb.name, 'Ash Kingdom');
  assert.equal(cb.entries.length, 3);
  assert.equal(cb.scan_depth, 4);
  assert.deepEqual(cb.entries.map((e) => e.insertion_order), [100, 90, 200]);
  assert.equal(cb.entries[0].comment, 'Emberhold');
  assert.ok(cb.entries.every((e) => e.enabled === true && e.position === 'before_char'));

  const wi = core.toWorldInfo(book);
  assert.deepEqual(Object.keys(wi.entries), ['0', '1', '2']);
  assert.deepEqual(wi.entries[0].key, ['castle', 'Emberhold']);
  assert.equal(wi.entries[0].content, 'Emberhold is the black-stone castle of the Ash Kingdom.');
  assert.equal(wi.entries[2].constant, true);
  assert.equal(wi.entries[0].disable, false);
  assert.equal(wi.entries[0].uid, 0);
});

test('lorebook: script-based ("advanced") books are recognised, not mangled', () => {
  const book = core.parseJanitorLorebook(fixture('lorebook-advanced.json'));
  assert.equal(book.kind, 'advanced');
  assert.equal(book.entries.length, 0);
});

test('lorebook unticked → no character_book', () => {
  const book = core.parseJanitorLorebook(fixture('lorebook-static.json'));
  const d = map(fixture('character-lorebook.json'), { lorebooks: [book], parts: { character_book: false } });
  assert.equal(d.character_book, undefined);
});

test('buildCharacterFiles: names and contents for every format', () => {
  const guarded = core.guardCharacter(fixture('character-lorebook.json'), STRANGER);
  const book = core.parseJanitorLorebook(fixture('lorebook-static.json'));
  const out = core.buildCharacterFiles({ guarded, lorebooks: [book], formats: ['png', 'json_v2', 'json_v3', 'lorebook', 'txt', 'raw'], baseName: 'Queen Maren - maple_writer - 2026-10-13', now: Date.UTC(2026, 9, 13) });
  assert.deepEqual(out.errors, []);
  assert.deepEqual(out.files.map((f) => f.name), [
    'Queen Maren - maple_writer - 2026-10-13.png',
    'Queen Maren - maple_writer - 2026-10-13.card.json',
    'Queen Maren - maple_writer - 2026-10-13.card-v3.json',
    'Queen Maren - maple_writer - 2026-10-13 - Ash Kingdom.lorebook.json',
    'Queen Maren - maple_writer - 2026-10-13.txt',
    'Queen Maren - maple_writer - 2026-10-13.janitorai.json',
  ]);
  const txt = out.files[4].data;
  assert.match(txt, /=== Scenario ===\n\{\{user\}\} is an envoy/);
  assert.match(txt, /=== First message ===\n\*The queen/);
  assert.match(txt, /=== Lorebook ===/);
  const png = core.readCardPng(out.files[0].data);
  assert.equal(png.chara.data.character_book.entries.length, 3);
});

test('page state: _storeState_ script literal parses and the character is found', () => {
  const { fixtureText } = require('./helpers');
  const state = core.extractStoreStateFromScript(fixtureText('store-state-script.txt'));
  assert.ok(state);
  const ch = core.findCharacterInState(state, '3F1C2A9E-7B4D-4E2A-9C1B-5D6E7F8A9B0C');
  assert.equal(ch.name, 'Aiko 🌸 Tanaka');
  assert.match(ch.description, /<p>Your <b>childhood friend/);
  const personas = core.findPersonasInState(state);
  assert.deepEqual(personas.map((p) => p.name), ['Ren', 'Kai 🌙']);
  assert.equal(core.extractStoreStateFromScript('var x = 1;'), null);
  assert.equal(core.extractStoreStateFromScript('window._storeState_ = JSON.parse("{broken");'), null);
});

test('DOM fallback: public data only, treated as hidden', () => {
  const raw = core.characterFromDomSnapshot({ h1: 'Aiko 🌸 Tanaka', ogImage: 'https://ella.janitorai.com/bot-avatars/a.webp', metaDescription: 'Childhood friend <3' }, 'abc');
  assert.equal(raw.showdefinition, false);
  const g = core.guardCharacter(raw, STRANGER);
  assert.equal(g.definitionHidden, true);
  const d = core.mapCharacterToCardData(g, {});
  assert.equal(d.creator_notes.startsWith('Childhood friend <3'), true);
  assert.equal(d.description, '');
});

test('routes', () => {
  assert.deepEqual(core.parseRoute('/characters/3f1c2a9e-7b4d-4e2a-9c1b-5d6e7f8a9b0c_character-aiko-tanaka'), { type: 'character', id: '3f1c2a9e-7b4d-4e2a-9c1b-5d6e7f8a9b0c' });
  assert.deepEqual(core.parseRoute('/chats/48151623'), { type: 'chat', id: '48151623' });
  assert.deepEqual(core.parseRoute('/my_characters'), { type: 'list', kind: 'my_characters' });
  assert.deepEqual(core.parseRoute('/favorites'), { type: 'list', kind: 'favorites' });
  assert.deepEqual(core.parseRoute('/profiles/6b8e1f2a-1111-4c3d-8e9f-0a1b2c3d4e5f_profile-of-maple'), { type: 'list', kind: 'profile' });
  assert.deepEqual(core.parseRoute('/'), { type: 'other' });
});

test('filenames: template, unsafe characters, Unicode kept', () => {
  assert.equal(core.applyFilenameTemplate('{name} - {creator} - {date}', { name: 'Aiko 🌸: "the" <best>/', creator: 'maple', date: '2026-10-13' }), 'Aiko 🌸 the best - maple - 2026-10-13');
  assert.equal(core.applyFilenameTemplate('{name} - {creator} - {date}', { name: 'Vex', creator: '', date: '2026-10-13' }), 'Vex - 2026-10-13');
  assert.equal(core.sanitizeFilename('CON'), '_CON');
  assert.equal(core.sanitizeFilename('...'), 'untitled');
  const used = new Set();
  assert.equal(core.uniqueName(used, 'a/b.png'), 'a/b.png');
  assert.equal(core.uniqueName(used, 'a/b.png'), 'a/b (2).png');
});

test('htmlToText handles entities, lists and scripts', () => {
  assert.equal(core.htmlToText('<ul><li>One</li><li>Two &#x1F338;</li></ul><script>alert(1)</script><p>A&nbsp;&amp;&nbsp;B</p>'), '- One\n- Two 🌸\nA & B');
  assert.equal(core.htmlToText(null), '');
});
