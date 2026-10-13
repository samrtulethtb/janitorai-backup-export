'use strict';
// Drives SillyTavern's real web UI the way a user would: Import Character →
// open it → Import Chat → open that chat; Persona Management → Restore.
//
//   ST_DIR=/path/to/SillyTavern npm run test:sillytavern
//   SCREENSHOTS=docs/screenshots ST_DIR=… npm run test:sillytavern   # also save screenshots
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const net = require('node:net');
const { spawn } = require('node:child_process');
const { chromium } = require('playwright');
const { core, fixture } = require('../unit/helpers');

const ST_DIR = process.env.ST_DIR;
const SHOTS = process.env.SCREENSHOTS;
const skip = !ST_DIR || !fs.existsSync(path.join(ST_DIR || '', 'server.js')) ? 'set ST_DIR to a SillyTavern checkout with dependencies installed' : false;

function freePort() {
  return new Promise((resolve) => {
    const s = net.createServer().listen(0, '127.0.0.1', () => {
      const { port } = s.address();
      s.close(() => resolve(port));
    });
  });
}

async function startSillyTavern() {
  const port = await freePort();
  const dataRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'jbe-stui-'));
  const proc = spawn(process.execPath, ['server.js', '--port', String(port), '--dataRoot', dataRoot, '--disableCsrf', '--listen', 'false', '--whitelist', 'false', '--browserLaunchEnabled', 'false'], { cwd: ST_DIR, stdio: 'ignore' });
  const base = `http://127.0.0.1:${port}`;
  for (let i = 0; i < 240; i++) {
    try {
      if ((await fetch(`${base}/api/ping`, { method: 'POST' })).status < 500) return { proc, base, dataRoot };
    } catch { /* starting */ }
    await new Promise((r) => setTimeout(r, 500));
  }
  proc.kill();
  throw new Error('SillyTavern did not start');
}

test('SillyTavern UI: import card, import chat, restore personas', { skip, timeout: 300000 }, async (t) => {
  const st = await startSillyTavern();
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'jbe-files-'));
  const browser = await chromium.launch({ env: Object.assign({}, process.env, { LANG: 'C.UTF-8', LC_ALL: 'C.UTF-8' }) });
  t.after(async () => {
    await browser.close();
    st.proc.kill();
    fs.rmSync(st.dataRoot, { recursive: true, force: true });
    fs.rmSync(tmp, { recursive: true, force: true });
  });
  if (SHOTS) fs.mkdirSync(SHOTS, { recursive: true });
  const shot = async (page, name) => {
    if (!SHOTS) return;
    await page.evaluate(() => window.toastr && window.toastr.clear());
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(SHOTS, name) });
  };

  // Files exactly as the userscript writes them.
  const guarded = core.guardCharacter(fixture('character-public.json'), { userId: null });
  const card = core.buildCharacterFiles({ guarded, formats: ['png'], baseName: 'Aiko 🌸 Tanaka - maple_writer - 2026-10-13', now: Date.UTC(2026, 9, 13) }).files[0];
  const chat = core.normalizeChat(fixture('chat.json'), { characterName: guarded.char.name });
  const chatFile = { name: `${core.chatBaseName(chat, Date.UTC(2026, 9, 13))}.jsonl`, data: core.buildSillyTavernJsonl(chat) };
  const personas = core.buildSillyTavernPersonaBackup(core.dedupePersonas(fixture('chat.json').personas.concat(fixture('chat-hidden.json').personas)), 1760000000000).backup;
  for (const f of [card, chatFile, { name: 'personas.json', data: JSON.stringify(personas) }]) fs.writeFileSync(path.join(tmp, f.name), f.data);

  const page = await browser.newPage({ viewport: { width: 1280, height: 860 } });
  const errors = [];
  const serverErrors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('response', (r) => { if (r.status() >= 500) serverErrors.push(`${r.status()} ${r.request().method()} ${new URL(r.url()).pathname}`); });
  await page.goto(st.base);
  // First run asks for a user name.
  const onboarding = page.locator('.popup:visible .popup-input');
  await onboarding.waitFor({ timeout: 90000 });
  await onboarding.fill('Ren');
  await page.locator('.popup:visible .popup-button-ok').click();
  await page.locator('#character_import_file').waitFor({ state: 'attached' });

  await t.test('character card PNG imports through "Import Character from File"', async () => {
    await page.locator('#rightNavHolder').click();
    await page.locator('#character_import_file').setInputFiles(path.join(tmp, card.name));
    const entry = page.locator('.character_select', { hasText: 'Aiko 🌸 Tanaka' });
    await entry.first().waitFor({ timeout: 30000 });
    // SillyTavern asks what to do with the card's tags: all four are listed as new.
    const tagPopup = page.locator('dialog.popup[open]', { hasText: 'Import Tags For Aiko' });
    await tagPopup.waitFor({ timeout: 30000 });
    for (const tag of ['Female', 'Romance', 'slice of life', '幼馴染']) assert.ok((await tagPopup.innerText()).includes(tag), tag);
    await tagPopup.getByText('Import All', { exact: true }).click();
    await tagPopup.waitFor({ state: 'detached', timeout: 30000 });
    await entry.first().click();
    await page.locator('#character_name_pole, #rm_button_selected_ch').first().waitFor();
    await page.locator('#chat .mes').first().waitFor({ timeout: 30000 });
    const greeting = await page.locator('#chat .mes .mes_text').first().innerText();
    assert.match(greeting, /umbrella dripping/);
    await shot(page, 'sillytavern-card-imported.png');
  });

  await t.test('JSONL chat imports through "Import Chat" and every message renders', async () => {
    await page.locator('#options_button').click();
    await page.locator('#option_select_chat').click();
    await page.locator('#chat_import_file').setInputFiles(path.join(tmp, chatFile.name));
    await page.locator('.toast-success', { hasText: 'Successfully imported 1 chat' }).waitFor({ timeout: 30000 });
    const imported = page.locator('.select_chat_block', { hasText: 'imported' });
    await imported.first().waitFor({ timeout: 30000 });
    await imported.first().click();
    await page.waitForFunction(() => document.querySelectorAll('#chat .mes').length === 5, null, { timeout: 30000 });
    const texts = await page.locator('#chat .mes .mes_text').allInnerTexts();
    assert.match(texts[1], /Come in, you're soaked/);
    assert.match(texts[2], /She steps inside/);
    assert.match(texts[4], /約束だよ！/);
    const names = await page.locator('#chat .mes .name_text').allInnerTexts();
    assert.deepEqual(names.map((n) => n.trim()), ['Aiko 🌸 Tanaka', 'Ren', 'Aiko 🌸 Tanaka', 'Ren', 'Aiko 🌸 Tanaka']);
    await page.locator('.select_chat_block').first().waitFor({ state: 'hidden', timeout: 30000 }).catch(() => page.keyboard.press('Escape'));
    await page.locator('#chat .mes').last().scrollIntoViewIfNeeded();
    await shot(page, 'sillytavern-chat-imported.png');
  });

  await t.test('personas.json restores through Persona Management → Restore', async () => {
    await page.locator('#persona-management-button .drawer-toggle, #persona-management-button').first().click();
    await page.locator('#personas_restore_input').setInputFiles(path.join(tmp, 'personas.json'));
    await page.locator('.toast-success', { hasText: /Personas restored/ }).waitFor({ timeout: 30000 });
    await page.locator('#user_avatar_block .avatar-container', { hasText: 'Mika' }).first().waitFor({ timeout: 30000 });
    await shot(page, 'sillytavern-personas-restored.png');
  });

  t.diagnostic(`server errors: ${serverErrors.join(', ') || 'none'}`);
  // Offline sandboxes: SillyTavern's AI Horde status calls fail without
  // network and surface as a JSON parse error. Anything else is a real error.
  const offlineOnly = serverErrors.length > 0 && serverErrors.every((e) => e.includes('/api/horde/'));
  const unexplained = errors.filter((e) => !(offlineOnly && /"Internal S"/.test(e)));
  assert.deepEqual(unexplained, [], `page errors: ${unexplained.join('\n')}`);
});
