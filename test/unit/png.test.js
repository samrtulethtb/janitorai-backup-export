'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const zlib = require('node:zlib');
const { core, fixture, STRANGER } = require('./helpers');

function sampleCards() {
  const guarded = core.guardCharacter(fixture('character-public.json'), STRANGER);
  const data = core.mapCharacterToCardData(guarded, { now: Date.UTC(2026, 9, 13) });
  return { v2: core.buildCardV2(data), v3: core.buildCardV3(data, { sourceUrl: 'https://janitorai.com/characters/x', now: Date.UTC(2026, 9, 13) }) };
}

test('base64 matches Node for UTF-8 with emoji and CJK', () => {
  const s = 'Aiko 🌸 春が来た！ «ç» \u0000 end';
  assert.equal(core.base64EncodeUtf8(s), Buffer.from(s, 'utf8').toString('base64'));
  assert.equal(core.base64DecodeUtf8(Buffer.from(s, 'utf8').toString('base64')), s);
  assert.equal(core.base64DecodeUtf8(Buffer.from(s, 'utf8').toString('base64url')), s);
  for (let n = 0; n < 7; n++) {
    const bytes = new Uint8Array(n).map((_, i) => (i * 97 + 13) & 0xff);
    assert.equal(core.bytesToBase64(bytes), Buffer.from(bytes).toString('base64'));
  }
});

test('CRC32 matches zlib', () => {
  const data = Buffer.from('JanitorAI Backup & Export 🌸');
  assert.equal(core.crc32(data), zlib.crc32(data));
});

test('placeholder PNG is valid and decodes', () => {
  const png = core.makePlaceholderPng('Aiko');
  const chunks = core.readPngChunks(png);
  assert.deepEqual(chunks.map((c) => c.type), ['IHDR', 'PLTE', 'IDAT', 'IEND']);
  assert.ok(chunks.every((c) => c.crcOk));
  const raw = zlib.inflateSync(Buffer.from(chunks[2].data));
  assert.equal(raw.length, (256 + 1) * 384);
});

test('PNG round-trip: chara (V2) and ccv3 (V3) read back identical, UTF-8 intact', () => {
  const cards = sampleCards();
  const png = core.writeCardPng(core.makePlaceholderPng('x'), cards);
  const back = core.readCardPng(png);
  assert.ok(back.crcOk, 'all chunk CRCs valid');
  assert.deepEqual(back.chara, cards.v2);
  assert.deepEqual(back.ccv3, cards.v3);
  assert.equal(back.chara.data.name, 'Aiko 🌸 Tanaka');
  assert.match(back.ccv3.data.description, /抹茶/);
  assert.match(back.chara.data.alternate_greetings[1], /「また会えるね」/);
});

test('card chunks are base64 tEXt chunks placed before IEND', () => {
  const png = core.writeCardPng(core.makePlaceholderPng('x'), sampleCards());
  const chunks = core.readPngChunks(png);
  const types = chunks.map((c) => c.type);
  assert.equal(types[types.length - 1], 'IEND');
  const texts = chunks.filter((c) => c.type === 'tEXt').map((c) => {
    const zero = c.data.indexOf(0);
    return { keyword: Buffer.from(c.data.subarray(0, zero)).toString('latin1'), text: Buffer.from(c.data.subarray(zero + 1)).toString('latin1') };
  });
  assert.deepEqual(texts.map((t) => t.keyword), ['chara', 'ccv3']);
  for (const t of texts) {
    assert.match(t.text, /^[A-Za-z0-9+/]+=*$/, 'value is plain base64, not raw JSON');
    assert.doesNotThrow(() => JSON.parse(Buffer.from(t.text, 'base64').toString('utf8')));
  }
  assert.ok(types.indexOf('tEXt') > types.indexOf('IDAT'));
});

test('re-writing a card replaces old chara/ccv3 chunks instead of adding more', () => {
  const first = core.writeCardPng(core.makePlaceholderPng('x'), sampleCards());
  const cards2 = sampleCards();
  cards2.v2.data.name = 'Renamed';
  cards2.v3.data.name = 'Renamed';
  const second = core.writeCardPng(first, cards2);
  const texts = core.readPngChunks(second).filter((c) => c.type === 'tEXt');
  assert.equal(texts.length, 2);
  assert.equal(core.readCardPng(second).chara.data.name, 'Renamed');
});

test('a real-world PNG from another encoder keeps its image chunks', () => {
  // Build a tiny RGBA PNG with zlib (as a browser canvas would) plus an unrelated tEXt chunk.
  const raw = Buffer.alloc((1 + 2 * 4) * 2);
  const idat = zlib.deflateSync(raw);
  const ihdr = Buffer.from([0, 0, 0, 2, 0, 0, 0, 2, 8, 6, 0, 0, 0]);
  const png = core.encodePng([
    { type: 'IHDR', data: ihdr },
    { type: 'tEXt', data: Buffer.from('Software\u0000canvas', 'latin1') },
    { type: 'IDAT', data: idat },
    { type: 'IEND', data: new Uint8Array(0) },
  ]);
  const out = core.writeCardPng(png, sampleCards());
  const types = core.readPngChunks(out).map((c) => c.type);
  assert.deepEqual(types, ['IHDR', 'tEXt', 'IDAT', 'tEXt', 'tEXt', 'IEND']);
});

test('non-PNG input is rejected', () => {
  assert.throws(() => core.readPngChunks(new Uint8Array([1, 2, 3])), /Not a PNG/);
});
