'use strict';
// Mocked janitorai.com for browser tests. Every request to janitorai.com and
// ella.janitorai.com is answered from test/fixtures; nothing leaves the machine.
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const { core, fixture, fixtureText, ROOT } = require('../unit/helpers');

const SCRIPT = fs.readFileSync(path.join(ROOT, 'janitor-backup-export.user.js'), 'utf8');
const USER_ID = '11111111-2222-4333-8444-555555555555';

const CHARACTERS = {
  '3f1c2a9e-7b4d-4e2a-9c1b-5d6e7f8a9b0c': 'character-public.json',
  '9a101281-ca8d-4fba-85d8-0c74ab7bf008': 'character-hidden.json',
  'd4e5f6a7-b8c9-4d0e-9f1a-2b3c4d5e6f70': 'character-nsfw.json',
  '0b1c2d3e-4f50-4617-8a9b-c0d1e2f3a4b5': 'character-lorebook.json',
};
const MISSING_CHARACTER = 'eeeeeeee-0000-4000-8000-00000000dead';

function jwt(payload) {
  const b = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
  return `${b({ alg: 'HS256', typ: 'JWT' })}.${b(payload)}.signature`;
}

function sessionCookies() {
  const session = `base64-${Buffer.from(JSON.stringify({ access_token: jwt({ sub: USER_ID, exp: 4102444800 }), refresh_token: 'r', user: { id: USER_ID } })).toString('base64url')}`;
  const half = Math.ceil(session.length / 2);
  return [session.slice(0, half), session.slice(half)].map((value, i) => ({ name: `sb-auth-auth-token.${i}`, value, domain: 'janitorai.com', path: '/' }));
}

function page(title, body, extraHead) {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title>${extraHead || ''}</head><body><div id="app">${body}</div></body></html>`;
}

function htmlFor(urlPath) {
  const route = core.parseRoute(urlPath);
  if (route.type === 'character') {
    const raw = fixture(CHARACTERS[route.id] || 'character-public.json');
    const state = route.id === '3f1c2a9e-7b4d-4e2a-9c1b-5d6e7f8a9b0c' ? `<script>${fixtureText('store-state-script.txt')}</script>` : '';
    return page(`${raw.name} | Janitor AI`, `<h1>${raw.name}</h1><img class="avatar" src="https://ella.janitorai.com/bot-avatars/${raw.avatar}">${state}`, `<meta property="og:title" content="${raw.name}">`);
  }
  if (route.type === 'chat') return page('Chat | Janitor AI', '<div class="chat">chat</div>');
  if (route.type === 'list' && route.kind === 'favorites') {
    // One grid container whose class contains "card" and holds every link.
    const links = Object.keys(CHARACTERS).map((id) => `<a class="tile" href="/characters/${id}_x"><span>${id.slice(0, 8)}</span></a>`).join('');
    return page('Favorites | Janitor AI', `<div class="card-grid">${links}</div>`);
  }
  if (route.type === 'list') {
    const cards = Object.keys(CHARACTERS).slice(0, 3).concat(MISSING_CHARACTER).map((id) => `<div class="profile-character-card"><a href="/characters/${id}_character-x"><span>${id.slice(0, 8)}</span></a></div>`).join('');
    return page('My characters | Janitor AI', `<div class="grid">${cards}</div>`);
  }
  return page('Janitor AI', '<h1>Home</h1>');
}

async function makeWebp(browser) {
  const p = await browser.newPage();
  const dataUrl = await p.evaluate(() => {
    const c = document.createElement('canvas');
    c.width = 40;
    c.height = 60;
    const g = c.getContext('2d');
    g.fillStyle = '#c47';
    g.fillRect(0, 0, 40, 60);
    return c.toDataURL('image/webp');
  });
  await p.close();
  return Buffer.from(dataUrl.split(',')[1], 'base64');
}

/**
 * opts: { loggedIn = true, viewport, isMobile, gm = {}, failChats = [48151624], apiDelayMs = 25 }
 * returns { browser, context, page, stats, open(path) }
 */
async function setup(opts) {
  const o = Object.assign({ loggedIn: true, failChats: [48151624], apiDelayMs: 25 }, opts);
  // Chromium names non-ASCII downloads "download" unless the locale is UTF-8
  // (real desktops are; bare CI containers often are not).
  const browser = await chromium.launch({ env: Object.assign({}, process.env, { LANG: 'C.UTF-8', LC_ALL: 'C.UTF-8' }) });
  const context = await browser.newContext({
    acceptDownloads: true,
    viewport: o.viewport || { width: 1280, height: 900 },
    isMobile: !!o.isMobile,
    hasTouch: !!o.isMobile,
    locale: o.locale || 'en-US',
  });
  const webp = await makeWebp(browser);
  const stats = { requests: [], inFlight: 0, maxInFlight: 0, apiCalls: [] };
  context.on('request', (r) => stats.requests.push(r.url()));
  if (o.loggedIn) await context.addCookies(sessionCookies());

  const gmSeed = Object.assign({ settings: { retryBaseMs: 5, throttle: 'fast' } }, o.gm || {});
  await context.addInitScript(({ src, seed }) => {
    const mem = Object.assign({}, seed);
    window.__gm = mem;
    window.GM_getValue = (k, d) => (k in mem ? JSON.parse(JSON.stringify(mem[k])) : d);
    window.GM_setValue = (k, v) => { mem[k] = JSON.parse(JSON.stringify(v)); };
    window.__menu = [];
    window.GM_registerMenuCommand = (name, fn) => window.__menu.push({ name, fn });
    window.GM_xmlhttpRequest = (d) => {
      fetch(d.url, { credentials: 'omit' })
        .then((r) => r.arrayBuffer().then((b) => d.onload({ status: r.status, response: b })))
        .catch(() => d.onerror && d.onerror());
    };
    window.unsafeWindow = window;
    if (location.hostname.endsWith('janitorai.com')) {
      // Userscript managers run @run-at document-idle scripts after load.
      window.addEventListener('load', () => setTimeout(() => {
        const s = document.createElement('script');
        s.textContent = src;
        document.documentElement.appendChild(s);
      }, 0));
    }
  }, { src: SCRIPT, seed: gmSeed });

  await context.route('https://ella.janitorai.com/**', (route) => route.fulfill({ status: 200, contentType: 'image/webp', body: webp, headers: { 'access-control-allow-origin': '*' } }));
  await context.route('https://janitorai.com/**', async (route) => {
    const req = route.request();
    const url = new URL(req.url());
    if (!url.pathname.startsWith('/hampter/')) {
      return route.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: htmlFor(url.pathname) });
    }
    stats.inFlight++;
    stats.maxInFlight = Math.max(stats.maxInFlight, stats.inFlight);
    stats.apiCalls.push(url.pathname + url.search);
    await new Promise((r) => setTimeout(r, o.apiDelayMs));
    stats.inFlight--;
    const json = (status, body) => route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) });
    const auth = req.headers().authorization || '';
    const p = url.pathname;
    let m;
    if ((m = p.match(/^\/hampter\/characters\/([0-9a-f-]+)$/))) {
      return CHARACTERS[m[1]] ? json(200, fixture(CHARACTERS[m[1]])) : json(404, { error: 'not found' });
    }
    if ((m = p.match(/^\/hampter\/script\/([0-9a-f-]+)$/))) {
      if (m[1].endsWith('0001')) return json(200, fixture('lorebook-static.json'));
      if (m[1].endsWith('0003')) return json(200, fixture('lorebook-advanced.json'));
      return json(404, { error: 'private' });
    }
    if (p.startsWith('/hampter/chats') && !/^Bearer \S+/.test(auth)) return json(401, { error: 'unauthorized' });
    if (p === '/hampter/chats/character-chats') return json(200, fixture('chat-list-characters.json'));
    if ((m = p.match(/^\/hampter\/chats\/character\/([0-9a-f-]+)\/chats$/))) {
      return json(200, fixture(m[1].startsWith('3f1c') ? 'character-chats-aiko.json' : 'character-chats-hidden.json'));
    }
    if ((m = p.match(/^\/hampter\/chats\/(\d+)$/))) {
      const id = Number(m[1]);
      if (o.failChats.includes(id)) return json(500, { error: 'boom' });
      if (id === 48151623) return json(200, fixture('chat.json'));
      if (id === 77700001) return json(200, fixture('chat-hidden.json'));
      return json(404, {});
    }
    return json(404, { error: 'unknown mock route' });
  });

  const pg = await context.newPage();
  const open = async (p) => {
    await pg.goto(`https://janitorai.com${p}`);
    await pg.locator('[data-jbe="fab"]').waitFor({ timeout: 10000 });
  };
  return { browser, context, page: pg, stats, open };
}

async function download(page, action) {
  const [d] = await Promise.all([page.waitForEvent('download', { timeout: 20000 }), action()]);
  const file = await d.path();
  return { name: d.suggestedFilename(), bytes: fs.readFileSync(file) };
}

function today() {
  return core.formatDate(Date.now());
}

module.exports = { setup, download, today, core, USER_ID, MISSING_CHARACTER };
