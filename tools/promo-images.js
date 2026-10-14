#!/usr/bin/env node
// Listing images for Sleazy Fork (1280×800 PNG, each well under 1 MB).
// The panel in them is the real userscript running against the mocked
// janitorai.com from the browser tests; the backdrop is our own, so nothing
// pretends to be JanitorAI's site.
//
//   node tools/promo-images.js [outDir=docs/promo]
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const { setup } = require('../test/browser/harness');

const OUT = path.resolve(process.argv[2] || path.join(__dirname, '..', 'docs', 'promo'));
const AIKO = '3f1c2a9e-7b4d-4e2a-9c1b-5d6e7f8a9b0c';
const HIDDEN = '9a101281-ca8d-4fba-85d8-0c74ab7bf008';

const CSS = `
*{box-sizing:border-box}html,body{margin:0;height:100%}
body{background:radial-gradient(1200px 700px at 15% 10%,#2a1f4d 0%,#141220 55%,#0d0c14 100%);color:#f2f0f7;
  font:16px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;overflow:hidden}
.copy{position:absolute;left:72px;top:96px;width:620px}
.kicker{font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#a99cf0;font-weight:600}
h1{font-size:46px;line-height:1.12;margin:14px 0 18px;letter-spacing:-.01em}
p.lead{font-size:19px;color:#c9c4d8;margin:0 0 28px}
ul{list-style:none;padding:0;margin:0}
li{font-size:18px;margin:12px 0;padding-left:34px;position:relative;color:#e8e5f0}
li:before{content:"✓";position:absolute;left:0;top:0;width:24px;height:24px;border-radius:12px;background:#7c5cff;color:#fff;
  font-size:14px;line-height:24px;text-align:center;font-weight:700}
.foot{position:absolute;left:72px;bottom:44px;font-size:14px;color:#8d87a3}
.tree{font:15px/1.9 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);
  border-radius:14px;padding:18px 22px;margin-top:8px;color:#d9d5e6}
.tree b{color:#b9a8ff;font-weight:600}.tree span{color:#8d87a3}
`;

function page(title, body) {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><style>${CSS}</style></head><body>${body}</body></html>`;
}

async function showcase(env, urlPath, html) {
  await env.context.route(`https://janitorai.com${urlPath}`, (route) => route.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: html }));
  await env.open(urlPath);
}

async function shot(pg, name) {
  const file = path.join(OUT, name);
  await pg.screenshot({ path: file });
  console.log(`${name}  ${Math.round(fs.statSync(file).size / 1024)} KB`);
}

async function heroCard() {
  const env = await setup({ viewport: { width: 1280, height: 800 } });
  try {
    await showcase(env, `/characters/${AIKO}_promo`, page('promo', `
      <div class="copy"><div class="kicker">Userscript · Tampermonkey / Violentmonkey</div>
      <h1>Back up your JanitorAI chats and characters</h1>
      <p class="lead">One button on janitorai.com. Cards, chats, personas and lorebooks, ready for SillyTavern, SpicyChat and Saucepan.</p>
      <ul><li>PNG cards with V2 + V3 data and the real avatar</li><li>Pick exactly which parts to export</li>
      <li>Runs in your browser. No tracking</li><li>Hidden definitions are never extracted</li></ul></div>
      <div class="foot">JanitorAI Backup &amp; Export · open source (MIT)</div>`));
    const pg = env.page;
    await pg.locator('[data-jbe="fab"]').click();
    await pg.locator('[data-jbe="export-character"]').waitFor();
    await pg.locator('input[data-format="json_v2"]').check();
    await pg.locator('[data-jbe="panel"]').evaluate((p) => { Object.assign(p.style, { top: '24px', bottom: 'auto', maxHeight: 'calc(100vh - 48px)' }); p.scrollTop = 0; });
    await pg.locator('[data-jbe="fab"]').evaluate((f) => { f.style.display = 'none'; });
    // Keep the Export button in frame: hide the account and settings blocks below it.
    await pg.locator('[data-jbe="account-section"]').evaluate((s) => { s.style.display = 'none'; s.nextElementSibling.style.display = 'none'; });
    await shot(pg, '1-character-card.png');
  } finally {
    await env.browser.close();
  }
}

async function backupAll() {
  // A clean run: one character, its chat, nothing failing.
  const env = await setup({ viewport: { width: 1280, height: 800 }, failChats: [] });
  try {
    await env.context.route('https://janitorai.com/hampter/chats/character-chats?page=1', (route) => route.fulfill({
      status: 200, contentType: 'application/json',
      body: JSON.stringify({ characters: [{ character_id: AIKO, name: 'Aiko 🌸 Tanaka', avatar: 'aiko-tanaka.webp' }], hasMore: false }),
    }));
    await env.context.route(`https://janitorai.com/hampter/chats/character/${AIKO}/chats?page=1`, (route) => route.fulfill({
      status: 200, contentType: 'application/json', body: JSON.stringify({ chats: [{ id: 48151623, summary: 'Rainy reunion' }], hasMore: false }),
    }));
    await showcase(env, '/promo-backup', page('promo', `
      <div class="copy"><div class="kicker">One click</div>
      <h1>Back up everything into one ZIP</h1>
      <p class="lead">Throttled, resumable, and it tells you what it could not save and why.</p>
      <div class="tree"><b>JanitorAI backup - 2026-10-14.zip</b><br>
      ├─ characters/ <span>PNG + JSON cards</span><br>├─ chats/ <span>SillyTavern JSONL + full JSON</span><br>
      ├─ personas/ <span>SillyTavern persona backup</span><br>├─ lorebooks/ <span>World Info</span><br>
      ├─ manifest.json<br>└─ skipped.json <span>anything that failed, with the reason</span></div></div>`));
    const pg = env.page;
    await pg.locator('[data-jbe="fab"]').click();
    const done = pg.waitForEvent('download', { timeout: 60000 });
    await pg.locator('[data-jbe="backup-all"]').click();
    await done;
    await pg.locator('[data-jbe="status"]', { hasText: 'Saved:' }).waitFor();
    if (await pg.locator('[data-jbe="extra"] .notice').count()) throw new Error('promo backup should not skip anything');
    await shot(pg, '2-back-up-everything.png');
  } finally {
    await env.browser.close();
  }
}

async function sillyTavern(browser) {
  const img = fs.readFileSync(path.join(__dirname, '..', 'docs', 'screenshots', 'sillytavern-chat-imported.png')).toString('base64');
  const pg = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await pg.setContent(page('promo', `
    <div class="copy" style="width:440px;top:150px"><div class="kicker">SillyTavern</div>
    <h1>Imports cleanly</h1>
    <p class="lead">Import the card, open it, then import the chat. Every message, swipe and emoji comes through.</p>
    <ul><li>Tested with SillyTavern 1.19.0</li><li>Rerolls become swipes</li><li>Lorebooks travel inside the card</li></ul></div>
    <div style="position:absolute;right:56px;top:64px;width:700px;height:672px;border-radius:16px;overflow:hidden;
      box-shadow:0 24px 60px rgba(0,0,0,.55);border:1px solid rgba(255,255,255,.12);background:#171717">
      <img src="data:image/png;base64,${img}" style="width:1280px;height:860px;object-fit:none;object-position:-310px 0;display:block"></div>`));
  await shot(pg, '3-sillytavern-import.png');
  await pg.close();
}

async function hidden() {
  const env = await setup({ viewport: { width: 1280, height: 800 } });
  try {
    await showcase(env, `/characters/${HIDDEN}_promo`, page('promo', `
      <div class="copy"><div class="kicker">Respects creators</div>
      <h1>Hidden definitions stay hidden</h1>
      <p class="lead">If a creator hid a character's definition, you get only the public parts, and the export says why. No proxy tricks.</p>
      <ul><li>Your own characters export in full</li><li>Logged out? It tells you to log in</li><li>Only talks to janitorai.com</li></ul></div>`));
    const pg = env.page;
    await pg.locator('[data-jbe="fab"]').click();
    await pg.getByText("The creator hid this character's definition").waitFor();
    await shot(pg, '4-hidden-definitions.png');
  } finally {
    await env.browser.close();
  }
}

async function phone(browser) {
  const env = await setup({ viewport: { width: 390, height: 844 }, isMobile: true });
  let png;
  try {
    await showcase(env, `/characters/${AIKO}_promo`, page('promo', ''));
    await env.page.locator('[data-jbe="fab"]').click();
    await env.page.locator('[data-jbe="export-character"]').waitFor();
    png = (await env.page.screenshot()).toString('base64');
  } finally {
    await env.browser.close();
  }
  const pg = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await pg.setContent(page('promo', `
    <div class="copy" style="top:200px;width:560px"><div class="kicker">Phones</div>
    <h1>Made for touch, too</h1>
    <p class="lead">Big buttons, a draggable launcher and a bottom sheet on small screens. Panel in English, Português, Español and Bahasa Indonesia.</p></div>
    <div style="position:absolute;right:150px;top:40px;width:340px;height:720px;border-radius:44px;background:#000;padding:14px;
      box-shadow:0 24px 60px rgba(0,0,0,.6);border:1px solid rgba(255,255,255,.18)">
      <img src="data:image/png;base64,${png}" style="width:312px;height:692px;object-fit:cover;object-position:bottom;border-radius:32px;display:block"></div>`));
  await shot(pg, '5-phone.png');
  await pg.close();
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  await heroCard();
  await backupAll();
  await hidden();
  const browser = await chromium.launch({ executablePath: process.env.CHROME_BIN || undefined, env: Object.assign({}, process.env, { LANG: 'C.UTF-8', LC_ALL: 'C.UTF-8' }) });
  try {
    await sillyTavern(browser);
    await phone(browser);
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
