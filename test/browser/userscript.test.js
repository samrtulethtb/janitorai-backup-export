'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { setup, download, today, core, MISSING_CHARACTER } = require('./harness');

const AIKO = '3f1c2a9e-7b4d-4e2a-9c1b-5d6e7f8a9b0c';
const HIDDEN = '9a101281-ca8d-4fba-85d8-0c74ab7bf008';
const MAREN = '0b1c2d3e-4f50-4617-8a9b-c0d1e2f3a4b5';

// SCREENSHOTS=docs/screenshots npm run test:browser saves panel screenshots.
async function shot(page, name) {
  if (!process.env.SCREENSHOTS) return;
  require('node:fs').mkdirSync(process.env.SCREENSHOTS, { recursive: true });
  await page.screenshot({ path: require('node:path').join(process.env.SCREENSHOTS, name) });
}

function assertOnlyJanitorHosts(stats) {
  for (const u of stats.requests) {
    const host = new URL(u).hostname;
    assert.ok(['janitorai.com', 'ella.janitorai.com'].includes(host) || u.startsWith('blob:') || u.startsWith('data:'), `request to ${u}`);
  }
}

test('character page: button appears, checklist, PNG card with both chunks and re-encoded avatar', async () => {
  const env = await setup();
  try {
    const { page, stats } = env;
    await env.open(`/characters/${AIKO}_character-aiko-tanaka`);
    await page.locator('[data-jbe="fab"]').click();
    const section = page.locator('[data-jbe="character-section"]');
    await section.locator('[data-jbe="export-character"]').waitFor();
    // Checklist: available parts ticked, empty ones disabled.
    assert.equal(await section.locator('input[data-part="scenario"]').isChecked(), true);
    assert.equal(await section.locator('input[data-part="system_prompt"]').isDisabled(), true);
    assert.equal(await section.locator('input[data-part="character_book"]').isDisabled(), true);
    await shot(page, 'panel-character-desktop.png');

    const file = await download(page, () => section.locator('[data-jbe="export-character"]').click());
    assert.equal(file.name, `Aiko 🌸 Tanaka - maple_writer - ${today()}.png`);
    const card = core.readCardPng(file.bytes);
    assert.equal(card.chara.spec, 'chara_card_v2');
    assert.equal(card.ccv3.spec, 'chara_card_v3');
    assert.match(card.chara.data.description, /抹茶/);
    assert.equal(card.chara.data.alternate_greetings.length, 2);
    const ihdr = core.readPngChunks(file.bytes)[0].data;
    assert.deepEqual([ihdr[3], ihdr[7]], [40, 60], 'webp avatar re-encoded to PNG at its own size');
    await page.locator('[data-jbe="status"]', { hasText: 'Saved:' }).waitFor();
    assert.equal(await page.locator('[data-jbe="sponsor"]').count(), 0, 'sponsor card disabled');
    assertOnlyJanitorHosts(stats);
  } finally {
    await env.browser.close();
  }
});

test('character page: unticking parts and choosing several formats gives a ZIP with the right files', async () => {
  const env = await setup();
  try {
    const { page } = env;
    await env.open(`/characters/${MAREN}_character-queen-maren`);
    await page.locator('[data-jbe="fab"]').click();
    const s = page.locator('[data-jbe="character-section"]');
    await s.locator('[data-jbe="export-character"]').waitFor();
    for (const f of ['json_v2', 'json_v3', 'lorebook', 'txt', 'raw']) await s.locator(`input[data-format="${f}"]`).check();
    await s.locator('input[data-part="scenario"]').uncheck();
    const file = await download(page, () => s.locator('[data-jbe="export-character"]').click());
    assert.equal(file.name, `Queen Maren - maple_writer - ${today()}.zip`);
    const zip = core.readZip(file.bytes);
    const base = `Queen Maren - maple_writer - ${today()}`;
    assert.deepEqual(Array.from(zip.keys()).sort(), [
      `${base} - Ash Kingdom.lorebook.json`, `${base}.card-v3.json`, `${base}.card.json`, `${base}.janitorai.json`, `${base}.png`, `${base}.txt`,
    ].sort());
    const v2 = JSON.parse(Buffer.from(zip.get(`${base}.card.json`)).toString());
    assert.equal(v2.data.scenario, '', 'unticked part left out');
    assert.equal(v2.data.character_book.entries.length, 3, 'lorebook embedded by default');
    const wi = JSON.parse(Buffer.from(zip.get(`${base} - Ash Kingdom.lorebook.json`)).toString());
    assert.equal(Object.keys(wi.entries).length, 3);
    await page.locator('[data-jbe="extra"]', { hasText: 'script-based lorebook' }).waitFor();
  } finally {
    await env.browser.close();
  }
});

test('hidden definition: clear note and a public-only export', async () => {
  const env = await setup();
  try {
    const { page, stats } = env;
    await env.open(`/characters/${HIDDEN}_character-bots-log-saucepan`);
    await page.locator('[data-jbe="fab"]').click();
    const s = page.locator('[data-jbe="character-section"]');
    await s.getByText("The creator hid this character's definition, so only the public parts can be saved.").waitFor();
    await shot(page, 'panel-hidden-definition.png');
    await s.locator('input[data-format="json_v2"]').check();
    const file = await download(page, () => s.locator('[data-jbe="export-character"]').click());
    const zip = core.readZip(file.bytes);
    const v2 = JSON.parse(Buffer.from(Array.from(zip.entries()).find(([n]) => n.endsWith('.card.json'))[1]).toString());
    assert.equal(v2.data.description, '');
    assert.equal(v2.data.first_mes, '');
    assert.match(v2.data.creator_notes, /creator hid/);
    assert.equal(stats.apiCalls.some((c) => c.startsWith('/hampter/script/')), false, 'hidden character lorebooks are not even requested');
  } finally {
    await env.browser.close();
  }
});

test('chat page: SillyTavern JSONL and "card + chat" ZIP', async () => {
  const env = await setup();
  try {
    const { page } = env;
    await env.open('/chats/48151623');
    await page.locator('[data-jbe="fab"]').click();
    const s = page.locator('[data-jbe="chat-section"]');
    await s.getByText('Tip: import the character card into SillyTavern first').waitFor();
    const jsonl = await download(page, () => s.locator('[data-jbe="export-chat"]').click());
    assert.equal(jsonl.name, `Aiko 🌸 Tanaka - chat 48151623 - Rainy reunion - ${today()}.jsonl`);
    const text = jsonl.bytes.toString('utf8');
    assert.deepEqual(core.validateSillyTavernJsonl(text), []);
    assert.equal(core.parseJsonl(text).length, 6);

    await s.locator('[data-jbe="with-card"]').check();
    await s.locator('input[data-format="html"]').check();
    const zipFile = await download(page, () => s.locator('[data-jbe="export-chat"]').click());
    assert.match(zipFile.name, /\+ card\.zip$/);
    const names = Array.from(core.readZip(zipFile.bytes).keys());
    assert.equal(names.length, 3);
    assert.ok(names.some((n) => n.endsWith('.png')));
    assert.ok(names.some((n) => n.endsWith('.jsonl')));
    assert.ok(names.some((n) => n.endsWith('.html')));
  } finally {
    await env.browser.close();
  }
});

test('chat page logged out: says why instead of doing nothing', async () => {
  const env = await setup({ loggedIn: false });
  try {
    const { page } = env;
    await env.open('/chats/48151623');
    await page.locator('[data-jbe="fab"]').click();
    await page.locator('[data-jbe="export-chat"]').click();
    await page.locator('[data-jbe="status"]', { hasText: 'Log in to janitorai.com first' }).waitFor();
  } finally {
    await env.browser.close();
  }
});

test('token from the app\'s own fetch Authorization header when there is no cookie', async () => {
  const env = await setup({ loggedIn: false });
  try {
    const { page } = env;
    await env.open('/chats/48151623');
    const token = await page.evaluate(() => {
      const b = (o) => btoa(JSON.stringify(o)).replace(/=+$/, '');
      return `${b({ alg: 'none' })}.${b({ sub: 'u' })}.s`;
    });
    // The app makes its own authenticated call; the hook only reads the header.
    await page.evaluate((tk) => fetch('/hampter/chats/character-chats?page=1', { headers: { Authorization: `Bearer ${tk}` } }), token);
    await page.locator('[data-jbe="fab"]').click();
    const file = await download(page, () => page.locator('[data-jbe="export-chat"]').click());
    assert.match(file.name, /\.jsonl$/);
  } finally {
    await env.browser.close();
  }
});

test('list page: a small button on every card, export one and export selected', async () => {
  const env = await setup();
  try {
    const { page } = env;
    await env.open('/my_characters');
    const minis = page.locator('[data-jbe-mini]');
    await page.waitForFunction(() => document.querySelectorAll('[data-jbe-mini]').length === 4);
    assert.equal(await minis.count(), 4);
    const one = await download(page, () => minis.nth(0).locator('[data-jbe="card-export"]').click());
    assert.equal(one.name, `Aiko 🌸 Tanaka - maple_writer - ${today()}.png`);

    await minis.nth(2).locator('input[type=checkbox]').check();
    await minis.nth(3).locator('input[type=checkbox]').check();
    const btn = page.locator('[data-jbe="export-selected"]');
    await page.waitForFunction(() => document.querySelector('#jbe-host').shadowRoot.querySelector('[data-jbe="export-selected"]').textContent.includes('(2)'));
    const many = await download(page, () => btn.click());
    const zip = core.readZip(many.bytes);
    const names = Array.from(zip.keys());
    assert.deepEqual(names.filter((n) => n.endsWith('.png')), [`Vex - maple_writer - ${today()}.png`]);
    const skipped = JSON.parse(Buffer.from(zip.get('skipped.json')).toString());
    assert.equal(skipped.length, 1);
    assert.equal(skipped[0].id, MISSING_CHARACTER);
    assert.match(skipped[0].why, /Character data unavailable/);
    assert.deepEqual(await page.evaluate(() => window.__gm.ownCharacterIds.length), 4, 'own character IDs remembered for the full backup');
  } finally {
    await env.browser.close();
  }
});

test('bulk: "Export all my chats" throttles, reports skipped items and writes a manifest', async () => {
  const env = await setup();
  try {
    const { page, stats } = env;
    await env.open('/');
    await page.locator('[data-jbe="fab"]').click();
    const file = await download(page, () => page.locator('[data-jbe="export-all-chats"]').click());
    assert.equal(file.name, `JanitorAI chats - ${today()}.zip`);
    const zip = core.readZip(file.bytes);
    const names = Array.from(zip.keys());
    assert.ok(names.includes('manifest.json'));
    assert.ok(names.includes('skipped.json'));
    const chats = names.filter((n) => n.startsWith('chats/'));
    assert.equal(chats.length, 2, names.join('\n'));
    assert.ok(chats.every((n) => n.endsWith('.jsonl')));
    const skipped = JSON.parse(Buffer.from(zip.get('skipped.json')).toString());
    assert.deepEqual(skipped.map((s) => [s.id, s.why]), [[48151624, 'HTTP 500 from chat_api']]);
    const manifest = JSON.parse(Buffer.from(zip.get('manifest.json')).toString());
    assert.equal(manifest.counts.chats, 2);
    assert.equal(manifest.counts.skipped, 1);
    assert.ok(stats.maxInFlight <= 2, `max in flight ${stats.maxInFlight}`);
    const retries = stats.apiCalls.filter((c) => c === '/hampter/chats/48151624').length;
    assert.equal(retries, 5, 'a 500 is retried 4 times with backoff before it is skipped');
    await page.locator('[data-jbe="extra"]', { hasText: '1 item(s) skipped' }).waitFor();
  } finally {
    await env.browser.close();
  }
});

test('bulk: "Back up everything" has characters, chats, personas, lorebooks, manifest, skipped', async () => {
  const env = await setup({ gm: { settings: { retryBaseMs: 5, throttle: 'fast' }, ownCharacterIds: [MAREN] } });
  try {
    const { page } = env;
    await env.open(`/characters/${AIKO}_x`);
    await page.locator('[data-jbe="fab"]').click();
    const file = await download(page, () => page.locator('[data-jbe="backup-all"]').click());
    assert.equal(file.name, `JanitorAI backup - ${today()}.zip`);
    const zip = core.readZip(file.bytes);
    const names = Array.from(zip.keys());
    const dirs = new Set(names.map((n) => n.split('/')[0]));
    for (const d of ['characters', 'chats', 'personas', 'lorebooks', 'manifest.json', 'skipped.json']) assert.ok(dirs.has(d), `missing ${d}: ${names.join(', ')}`);
    assert.equal(names.filter((n) => n.startsWith('characters/') && n.endsWith('.png')).length, 3);
    const hiddenCard = core.readCardPng(zip.get(names.find((n) => n.startsWith("characters/Bot's Log") && n.endsWith('.png'))));
    assert.equal(hiddenCard.chara.data.description, '');
    const personas = JSON.parse(Buffer.from(zip.get('personas/personas.json')).toString());
    assert.deepEqual(Object.values(personas.personas).sort(), ['Kai 🌙', 'Mika', 'Ren']);
    const skipped = JSON.parse(Buffer.from(zip.get('skipped.json')).toString());
    assert.ok(skipped.some((s) => s.what === 'definition'));
    assert.ok(skipped.some((s) => s.id === 48151624));
    assert.ok(skipped.some((s) => /script-based/.test(s.why)));
    const manifest = JSON.parse(Buffer.from(zip.get('manifest.json')).toString());
    assert.deepEqual([manifest.counts.characters, manifest.counts.chats, manifest.counts.lorebooks, manifest.counts.personas], [3, 2, 1, 3]);
  } finally {
    await env.browser.close();
  }
});

test('bulk: a lost login pauses the run; Resume finishes it', async () => {
  const env = await setup();
  try {
    const { page, context } = env;
    await env.open('/');
    let calls = 0;
    // The second chat request answers 401 once (login expired mid-run).
    await context.route('https://janitorai.com/hampter/chats/77700001', async (route) => {
      calls++;
      if (calls === 1) return route.fulfill({ status: 401, contentType: 'application/json', body: '{}' });
      return route.fallback();
    });
    await page.locator('[data-jbe="fab"]').click();
    await page.locator('[data-jbe="export-all-chats"]').click();
    await page.locator('[data-jbe="resume"]').waitFor();
    await page.locator('[data-jbe="status"]', { hasText: 'Paused' }).waitFor();
    const file = await download(page, () => page.locator('[data-jbe="resume"]').click());
    const names = Array.from(core.readZip(file.bytes).keys()).filter((n) => n.startsWith('chats/'));
    assert.equal(names.length, 2);
  } finally {
    await env.browser.close();
  }
});

test('phone layout: bottom sheet, big touch targets, draggable button', async () => {
  const env = await setup({ viewport: { width: 390, height: 844 }, isMobile: true });
  try {
    const { page } = env;
    await env.open(`/characters/${AIKO}_x`);
    const fab = page.locator('[data-jbe="fab"]');
    const fb = await fab.boundingBox();
    assert.ok(fb.height >= 44 && fb.width >= 44, `fab ${fb.width}x${fb.height}`);
    await fab.click();
    const panel = page.locator('[data-jbe="panel"]');
    await page.locator('[data-jbe="export-character"]').waitFor();
    const pb = await panel.boundingBox();
    assert.equal(Math.round(pb.width), 390, 'sheet spans the screen');
    assert.equal(Math.round(pb.y + pb.height), 844, 'sheet sits on the bottom edge');
    for (const sel of ['[data-jbe="export-character"]', '[data-jbe="export-all-chats"]']) {
      const b = await page.locator(sel).boundingBox();
      assert.ok(b.height >= 44, `${sel} is ${b.height}px tall`);
    }
    await shot(page, 'panel-phone.png');
    const hasHScroll = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    assert.equal(hasHScroll, false);
    await page.locator('[data-jbe="panel"] .x').click();
    // Drag the floating button.
    await page.mouse.move(fb.x + fb.width / 2, fb.y + fb.height / 2);
    await page.mouse.down();
    await page.mouse.move(80, 200, { steps: 8 });
    await page.mouse.up();
    const moved = await fab.boundingBox();
    assert.ok(Math.abs(moved.y - (200 - fb.height / 2)) < 4, `fab moved to y=${moved.y}`);
    const saved = await page.evaluate(() => window.__gm.fabPos);
    assert.ok(saved && saved.x < 0.5);
  } finally {
    await env.browser.close();
  }
});

test('SPA navigation: the panel follows the route without a reload', async () => {
  const env = await setup();
  try {
    const { page } = env;
    await env.open(`/characters/${AIKO}_x`);
    await page.locator('[data-jbe="fab"]').click();
    await page.locator('[data-jbe="character-section"]').waitFor();
    await page.evaluate(() => history.pushState({}, '', '/chats/48151623'));
    await page.locator('[data-jbe="chat-section"]').waitFor({ timeout: 3000 });
    assert.equal(await page.locator('[data-jbe="character-section"]').count(), 0);
  } finally {
    await env.browser.close();
  }
});

test('panel language follows the browser (pt-BR)', async () => {
  const env = await setup({ locale: 'pt-BR' });
  try {
    const { page } = env;
    await env.open('/');
    await page.locator('[data-jbe="fab"]').click();
    await page.locator('[data-jbe="export-all-chats"]', { hasText: 'Exportar todos os meus chats' }).waitFor();
  } finally {
    await env.browser.close();
  }
});

test('list page where one grid holds every card: each card still gets its own button; a hidden card saves as a single PNG', async () => {
  const env = await setup();
  try {
    const { page } = env;
    await env.open('/favorites');
    await page.waitForFunction(() => document.querySelectorAll('[data-jbe-mini]').length === 4);
    const ids = await page.locator('[data-jbe-mini]').evaluateAll((els) => els.map((e) => e.getAttribute('data-jbe-mini')));
    assert.equal(new Set(ids).size, 4);
    const hidden = page.locator(`[data-jbe-mini="${HIDDEN}"]`);
    const file = await download(page, () => hidden.locator('[data-jbe="card-export"]').click());
    assert.equal(file.name, `Bot's Log (Saucepan) - hidden_author - ${today()}.png`);
    assert.match(core.readCardPng(file.bytes).chara.data.creator_notes, /creator hid/);
  } finally {
    await env.browser.close();
  }
});

test('backup: a deleted bot you still chat with is saved from the chat list, with an honest note', async () => {
  const env = await setup({ failChats: [] });
  try {
    const { page, context } = env;
    const DELETED = 'dddddddd-0000-4000-8000-00000000d0d0';
    await context.route('https://janitorai.com/hampter/chats/character-chats?page=1', (route) => route.fulfill({
      status: 200, contentType: 'application/json',
      body: JSON.stringify({ characters: [{ character_id: DELETED, name: 'Gone Girl', avatar: 'gone.webp' }], hasMore: false }),
    }));
    await context.route(`https://janitorai.com/hampter/chats/character/${DELETED}/chats?page=1`, (route) => route.fulfill({
      status: 200, contentType: 'application/json', body: JSON.stringify({ chats: [{ id: 77700001, summary: 'old chat' }], hasMore: false }),
    }));
    await env.open('/');
    await page.locator('[data-jbe="fab"]').click();
    const file = await download(page, () => page.locator('[data-jbe="backup-all"]').click());
    const zip = core.readZip(file.bytes);
    const names = Array.from(zip.keys());
    const png = names.find((n) => n.startsWith('characters/Gone Girl') && n.endsWith('.png'));
    assert.ok(png, names.join('\n'));
    const card = core.readCardPng(zip.get(png)).chara;
    assert.equal(card.data.name, 'Gone Girl');
    assert.equal(card.data.description, '');
    assert.match(card.data.creator_notes, /no longer serves this character/);
    assert.ok(names.some((n) => n.startsWith('chats/Gone Girl/') && n.endsWith('.jsonl')));
  } finally {
    await env.browser.close();
  }
});

test('logged out: a character whose definition JanitorAI did not send says to log in; the public parts still export', async () => {
  const LOGGED_OUT = '5c6d7e8f-9a0b-4c1d-8e2f-3a4b5c6d7e8f';
  const notice = "Log in to janitorai.com to save this character's definition — JanitorAI only sends it to logged-in users.";
  const env = await setup({ loggedIn: false });
  try {
    const { page } = env;
    await env.open(`/characters/${LOGGED_OUT}_character-strawberry-witch`);
    await page.locator('[data-jbe="fab"]').click();
    const s = page.locator('[data-jbe="character-section"]');
    await s.getByText(notice).waitFor();
    assert.equal(await s.getByText("The creator hid this character's definition").count(), 0);
    // The public parts can still be exported.
    await s.locator('input[data-format="json_v2"]').check();
    const file = await download(page, () => s.locator('[data-jbe="export-character"]').click());
    assert.match(file.name, /^🍓 Strawberry Witch ✨ - maple_writer - .*\.zip$/);
  } finally {
    await env.browser.close();
  }
});

test('logged out: bulk card export lists login_required characters in skipped.json', async () => {
  const LOGGED_OUT = '5c6d7e8f-9a0b-4c1d-8e2f-3a4b5c6d7e8f';
  const env = await setup({ loggedIn: false });
  try {
    const { page } = env;
    await env.open(`/characters/${LOGGED_OUT}_x`);
    // Run the same bulk card export the list pages use, for this one character plus a public one.
    await page.evaluate(() => { history.pushState({}, '', '/my_characters'); });
    await page.evaluate((ids) => {
      const grid = document.createElement('div');
      grid.innerHTML = ids.map((id) => `<div class="profile-character-card"><a href="/characters/${id}_x">${id}</a></div>`).join('');
      document.getElementById('app').replaceChildren(grid);
    }, [LOGGED_OUT, '3f1c2a9e-7b4d-4e2a-9c1b-5d6e7f8a9b0c']);
    await page.waitForFunction(() => document.querySelectorAll('[data-jbe-mini]').length === 2);
    await page.locator('[data-jbe="fab"]').click();
    const file = await download(page, () => page.locator('[data-jbe="export-page"]').click());
    const zip = core.readZip(file.bytes);
    const skipped = JSON.parse(Buffer.from(zip.get('skipped.json')).toString());
    assert.deepEqual(skipped, [{ id: LOGGED_OUT, name: '🍓 Strawberry Witch ✨', what: 'definition', why: core.LOGIN_REQUIRED_NOTICE }]);
  } finally {
    await env.browser.close();
  }
});

test('no API requests until the user asks: loading pages and list cards sends nothing to /hampter/', async () => {
  const env = await setup();
  try {
    const { page, stats } = env;
    for (const p of [`/characters/${AIKO}_x`, '/chats/48151623', '/my_characters', '/']) {
      await env.open(p);
      await page.waitForTimeout(1200);
    }
    assert.deepEqual(stats.apiCalls, []);
  } finally {
    await env.browser.close();
  }
});
