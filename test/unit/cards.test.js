'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { core, fixture, STRANGER } = require('./helpers');

const NOW = Date.UTC(2026, 9, 13, 12);

function build(name, opts) {
  const guarded = core.guardCharacter(fixture(name), STRANGER);
  const data = core.mapCharacterToCardData(guarded, Object.assign({ now: NOW }, opts));
  return { guarded, data, v2: core.buildCardV2(data), v3: core.buildCardV3(data, { sourceUrl: `https://janitorai.com/characters/${guarded.char.id}`, createdAt: guarded.char.created_at, updatedAt: guarded.char.updated_at, now: NOW }) };
}

for (const name of ['character-public.json', 'character-hidden.json', 'character-nsfw.json', 'character-lorebook.json']) {
  test(`V2 and V3 cards pass the schema checks: ${name}`, () => {
    const lorebooks = name === 'character-lorebook.json' ? [core.parseJanitorLorebook(fixture('lorebook-static.json'))] : [];
    const { v2, v3 } = build(name, { lorebooks });
    assert.deepEqual(core.validateCard(v2, 2), []);
    assert.deepEqual(core.validateCard(v3, 3), []);
  });
}

test('V2 shape: spec, spec_version and every required data field', () => {
  const { v2 } = build('character-public.json');
  assert.equal(v2.spec, 'chara_card_v2');
  assert.equal(v2.spec_version, '2.0');
  for (const k of ['name', 'description', 'personality', 'scenario', 'first_mes', 'mes_example', 'creator_notes', 'system_prompt', 'post_history_instructions', 'alternate_greetings', 'tags', 'creator', 'character_version', 'extensions']) {
    assert.ok(Object.hasOwn(v2.data, k), `missing ${k}`);
  }
});

test('V3 shape: V2 fields plus V3 additions with integer timestamps', () => {
  const { v2, v3 } = build('character-public.json');
  assert.equal(v3.spec, 'chara_card_v3');
  assert.equal(v3.spec_version, '3.0');
  for (const k of Object.keys(v2.data)) assert.deepEqual(v3.data[k], v2.data[k], k);
  assert.deepEqual(v3.data.group_only_greetings, []);
  assert.deepEqual(v3.data.source, ['https://janitorai.com/characters/3f1c2a9e-7b4d-4e2a-9c1b-5d6e7f8a9b0c']);
  assert.equal(v3.data.creation_date, Date.UTC(2025, 10, 2, 10, 15) / 1000);
  assert.equal(v3.data.modification_date, Date.UTC(2026, 8, 30, 8) / 1000);
  assert.deepEqual(v3.data.assets, [{ type: 'icon', uri: 'ccdefault:', name: 'main', ext: 'png' }]);
});

test('validator catches broken cards', () => {
  const { v2, v3 } = build('character-public.json');
  const bad = JSON.parse(JSON.stringify(v2));
  bad.spec = 'chara_card';
  bad.data.tags = 'a, b';
  bad.data.first_mes = null;
  delete bad.data.extensions;
  const errors = core.validateCard(bad, 2);
  assert.ok(errors.some((e) => /spec must be/.test(e)));
  assert.ok(errors.some((e) => /tags/.test(e)));
  assert.ok(errors.some((e) => /first_mes/.test(e)));
  assert.ok(errors.some((e) => /extensions/.test(e)));
  const bad3 = JSON.parse(JSON.stringify(v3));
  bad3.data.creation_date = '2026';
  bad3.data.group_only_greetings = undefined;
  const e3 = core.validateCard(bad3, 3);
  assert.ok(e3.some((e) => /creation_date/.test(e)));
  assert.ok(e3.some((e) => /group_only_greetings/.test(e)));
  const badBook = JSON.parse(JSON.stringify(v2));
  badBook.data.character_book = { entries: [{ keys: 'x', content: 1 }] };
  assert.ok(core.validateCard(badBook, 2).some((e) => /keys must be/.test(e)));
});
