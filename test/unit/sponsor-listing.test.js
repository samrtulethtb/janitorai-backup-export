'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { core, scriptSource, userscriptHeader, ROOT } = require('./helpers');

test('sponsor card ships disabled', () => {
  assert.equal(core.SPONSOR_ENABLED, false);
  assert.match(scriptSource(), /const SPONSOR_ENABLED = false;/);
  assert.equal(core.shouldShowSponsor({ exportSucceeded: true, now: Date.now() }), false);
});

test('@antifeature ads appears only together with an enabled sponsor card', () => {
  const header = userscriptHeader();
  assert.equal(/@antifeature\s+ads/.test(header), core.SPONSOR_ENABLED);
});

test('sponsor rules: only after success, max once per 24 h, dismissible', () => {
  const base = { enabled: true, exportSucceeded: true, now: 100 * 3600e3 };
  assert.equal(core.shouldShowSponsor(base), true);
  assert.equal(core.shouldShowSponsor({ ...base, exportSucceeded: false }), false, 'never on failure');
  assert.equal(core.shouldShowSponsor({ ...base, lastShownAt: base.now - 23 * 3600e3 }), false);
  assert.equal(core.shouldShowSponsor({ ...base, lastShownAt: base.now - 24 * 3600e3 }), true);
  assert.equal(core.shouldShowSponsor({ ...base, dismissedForever: true }), false);
  assert.equal(core.shouldShowSponsor({ ...base, userDisabled: true }), false);
});

test('sponsor link: exact offer, placement in aff_sub2, never po=', () => {
  const url = new URL(core.buildSponsorUrl('chat'));
  assert.equal(`${url.origin}${url.pathname}`, 'https://t.vlmai-5.com/425026/10338/0');
  assert.equal(url.searchParams.get('aff_sub5'), 'SF_006OG000004lmDN');
  assert.equal(url.searchParams.get('aff_sub'), 'jai_export');
  assert.equal(url.searchParams.get('aff_sub2'), 'chat');
  assert.equal(url.searchParams.has('po'), false);
  assert.equal(/[?&]po=/.test(scriptSource()), false);
});

test('sponsor is only offered from the post-export hook', () => {
  const src = scriptSource();
  const calls = Array.from(src.matchAll(/afterSuccessfulExport\((?!placement)/g));
  assert.ok(calls.length >= 5, `found ${calls.length} calls`);
  // Every call sits right after a success status.
  for (const m of calls) {
    const before = src.slice(Math.max(0, m.index - 600), m.index);
    assert.match(before, /t\('saved'/, `sponsor hook at ${m.index} is not preceded by a success message`);
  }
});

test('script name fits Sleazy Fork (100 chars) in every locale', () => {
  const header = userscriptHeader();
  const names = Array.from(header.matchAll(/@name(?::[\w-]+)?\s+(.+)/g), (m) => m[1].trim());
  assert.ok(names.length >= 4);
  for (const n of names) assert.ok(n.length <= 100, `${n.length}: ${n}`);
  assert.equal(names[0], 'JanitorAI Backup & Export – chats, character cards & lorebooks to SillyTavern, SpicyChat, Saucepan');
});

test('listing: ~15 locales, names ≤ 100 chars, claims match the hard rules', () => {
  const listing = fs.readFileSync(path.join(ROOT, 'SLEAZYFORK_LISTING.md'), 'utf8');
  const names = Array.from(listing.matchAll(/^\| `([\w-]+)` \| (.+?) \|$/gm), (m) => ({ locale: m[1], name: m[2] }));
  assert.ok(names.length >= 15, `only ${names.length} localized names`);
  for (const n of names) assert.ok(n.name.length <= 100, `${n.locale}: ${n.name.length}`);
  assert.match(listing, /runs (entirely )?in your browser/i);
  assert.match(listing, /only to janitorai\.com/i);
  assert.match(listing, /no (tracking|analytics)/i);
  assert.match(listing, /hidden definitions? (are|is) (never|not) extracted/i);
  // Forbidden claims.
  assert.equal(/bypass|unlock hidden|reveal hidden|extract hidden/i.test(listing.replace(/never extracted|not extracted/gi, '')), false);
});

test('panel strings: every locale has the keys the UI needs', () => {
  const en = Object.keys(core.STRINGS.en);
  for (const [loc, table] of Object.entries(core.STRINGS)) {
    const missing = en.filter((k) => !(k in table) && !k.startsWith('sponsor_') && k !== 'src_failed_detail');
    assert.deepEqual(missing, [], `${loc} missing ${missing}`);
  }
  assert.equal(core.pickLocale('auto', ['pt-BR', 'en']), 'pt-BR');
  assert.equal(core.pickLocale('auto', ['es-MX']), 'es');
  assert.equal(core.pickLocale('auto', ['id-ID']), 'id');
  assert.equal(core.pickLocale('auto', ['de-DE']), 'en');
  assert.equal(core.pickLocale('es', ['pt-BR']), 'es');
  assert.equal(core.translate('pt-BR', 'export_selected', { n: 3 }), 'Exportar selecionados (3)');
});

test('issue link carries no personal data', () => {
  const url = new URL(core.buildIssueUrl({ source: 'chat_api', detail: 'HTTP 404', pageType: 'chat', userAgent: 'UA' }));
  assert.equal(url.hostname, 'github.com');
  const body = url.searchParams.get('body');
  assert.match(body, /Failed source: chat_api/);
  assert.equal(/token|cookie|Bearer/i.test(body), false);
});

test('header carries the listing names and descriptions for each locale it declares', () => {
  const header = userscriptHeader();
  const listing = fs.readFileSync(path.join(ROOT, 'SLEAZYFORK_LISTING.md'), 'utf8');
  const listedNames = Object.fromEntries(Array.from(listing.matchAll(/^\| `([\w-]+)` \| (.+?) \|$/gm), (m) => [m[1], m[2]]));
  const listedDescs = Object.fromEntries(Array.from(listing.matchAll(/^- \*\*([\w-]+):\*\* (.+)$/gm), (m) => [m[1], m[2]]));
  const headerNames = Object.fromEntries(Array.from(header.matchAll(/^\/\/ @name:([\w-]+)\s+(.+)$/gm), (m) => [m[1], m[2].trim()]));
  const headerDescs = Object.fromEntries(Array.from(header.matchAll(/^\/\/ @description:([\w-]+)\s+(.+)$/gm), (m) => [m[1], m[2].trim()]));
  assert.ok(Object.keys(headerNames).length >= 14);
  for (const [loc, name] of Object.entries(headerNames)) {
    assert.equal(name, listedNames[loc], `@name:${loc}`);
    assert.equal(headerDescs[loc], listedDescs[loc], `@description:${loc}`);
  }
});
