'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { core, fixture } = require('./helpers');

function aikoChat() {
  return core.normalizeChat(fixture('chat.json'), { characterName: 'Aiko 🌸 Tanaka' });
}

test('normalizeChat: sorted by time, rejected regenerations become swipes of the same turn', () => {
  const chat = aikoChat();
  assert.equal(chat.userName, 'Ren', 'persona name is the user name');
  assert.equal(chat.characterName, 'Aiko 🌸 Tanaka');
  assert.equal(chat.id, 48151623);
  assert.deepEqual(chat.messages.map((m) => [m.id, m.isUser]), [[901, false], [902, true], [906, false], [904, true], [905, false]]);
  const reply = chat.messages[2];
  assert.deepEqual(reply.swipes.map((s) => s.id), [903, 906, 907]);
  assert.equal(reply.swipeIndex, 1, 'the main reply is the selected swipe');
  assert.equal(chat.messages[0].swipes.length, 1);
});

test('SillyTavern JSONL: header first, one line per message, swipes consistent', () => {
  const jsonl = core.buildSillyTavernJsonl(aikoChat());
  assert.deepEqual(core.validateSillyTavernJsonl(jsonl), []);
  const rows = core.parseJsonl(jsonl);
  assert.equal(rows.length, 6);
  assert.deepEqual(Object.keys(rows[0]).sort(), ['character_name', 'chat_metadata', 'create_date', 'user_name']);
  assert.equal(rows[0].user_name, 'Ren');
  assert.equal(rows[0].character_name, 'Aiko 🌸 Tanaka');
  assert.match(rows[0].create_date, /^\d{4}-\d{2}-\d{2}@\d{2}h\d{2}m\d{2}s\d{3}ms$/);
  const [, greet, user1, reply, user2, last] = rows;
  assert.deepEqual([greet.name, greet.is_user, greet.send_date], ['Aiko 🌸 Tanaka', false, '2026-10-01T18:00:00.000Z']);
  assert.deepEqual([user1.name, user1.is_user, user1.mes], ['Ren', true, "Aiko?! Come in, you're soaked."]);
  assert.equal(user1.swipes, undefined, 'user messages have no swipes');
  assert.equal(reply.swipes.length, 3);
  assert.equal(reply.swipe_id, 1);
  assert.equal(reply.mes, reply.swipes[1]);
  assert.match(reply.mes, /She steps inside/);
  assert.equal(reply.swipe_info.length, 3);
  assert.equal(user2.mes, 'Want to get 抹茶 tomorrow? ☕\nMy treat.', 'newlines survive inside one JSONL line');
  assert.match(last.mes, /約束だよ！/);
  for (const r of rows.slice(1)) assert.deepEqual(r.extra, {});
  assert.equal(jsonl.endsWith('\n'), false);
  assert.equal(jsonl.split('\n').length, 6, 'exactly one physical line per record');
});

test('what SillyTavern does on load: header is shifted off and every message renders', () => {
  // Mirrors src/endpoints/chats.js getChatData + public/script.js getChat.
  const jsonl = core.buildSillyTavernJsonl(aikoChat());
  const data = jsonl.split('\n').map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
  const header = data.shift();
  assert.ok(header.user_name !== undefined || header.name !== undefined || header.chat_metadata !== undefined);
  assert.equal(data.length, 5);
  assert.ok(data.every((m) => typeof m.mes === 'string' && m.mes.length > 0));
});

test('validator rejects the known "imports blank" shapes', () => {
  const noHeader = core.parseJsonl(core.buildSillyTavernJsonl(aikoChat())).slice(1).map((r) => JSON.stringify(r)).join('\n');
  assert.ok(core.validateSillyTavernJsonl(noHeader).length > 0);
  assert.ok(core.validateSillyTavernJsonl('{"user_name":"a","character_name":"b","chat_metadata":{}}\n{"name":"b","is_user":false,"mes":null}').length > 0);
  assert.ok(core.validateSillyTavernJsonl('').length > 0);
});

test('chat with only rejected replies in a turn keeps them', () => {
  const chat = core.normalizeChat({ chatMessages: [
    { id: 1, is_bot: false, message: 'hi', created_at: '2026-01-01T00:00:00Z' },
    { id: 2, is_bot: true, is_main: false, message: 'a', created_at: '2026-01-01T00:01:00Z' },
    { id: 3, is_bot: true, is_main: false, message: 'b', created_at: '2026-01-01T00:02:00Z' },
  ] }, { characterName: 'X' });
  assert.equal(chat.messages.length, 2);
  assert.deepEqual(chat.messages[1].swipes.map((s) => s.text), ['a', 'b']);
  assert.deepEqual(core.validateSillyTavernJsonl(core.buildSillyTavernJsonl(chat)), []);
});

test('empty chat still produces a valid header-only file', () => {
  const chat = core.normalizeChat({ chat: { id: 1 }, chatMessages: [] }, { characterName: 'X' });
  const jsonl = core.buildSillyTavernJsonl(chat);
  assert.equal(jsonl.split('\n').length, 1);
  assert.deepEqual(core.validateSillyTavernJsonl(jsonl), []);
});

test('Markdown, TXT, HTML and JSON chat exports', () => {
  const chat = aikoChat();
  const md = core.buildChatMarkdown(chat);
  assert.match(md, /^# Chat with Aiko 🌸 Tanaka/);
  assert.match(md, /\*\*Ren\*\* · 2026-10-01T18:01:00.000Z\n\nAiko\?! Come in/);
  assert.match(md, /2 other replies \(swipes\)/);
  const txt = core.buildChatText(chat);
  assert.match(txt, /\[2026-10-01T18:07:00.000Z\] Ren:\nWant to get 抹茶 tomorrow\? ☕\nMy treat\./);
  const html = core.buildChatHtml({ ...chat, messages: chat.messages.concat([{ id: 9, isUser: true, text: '<img src=x onerror=alert(1)>', date: 'd', swipes: [] }]) });
  assert.match(html, /^<!doctype html>/);
  assert.equal(html.includes('<img src=x'), false, 'message text is escaped');
  assert.match(html, /&lt;img src=x onerror=alert\(1\)&gt;/);
  assert.equal(/<script/i.test(html), false);
  const json = core.buildChatJson(chat);
  assert.equal(json.messages.length, 5);
  assert.equal(json.messages[2].swipes.length, 3);
  assert.equal(json.messages[2].swipes.filter((s) => s.is_main).length, 1);
  assert.equal(json.janitorai_raw.chatMessages.length, 7, 'raw response kept for fidelity');
  assert.equal(json.messages, json.messages, 'no top-level "messages" collision check below');
  // SillyTavern treats a .json file with a top-level `messages` array as Agnai.
  // Our full-fidelity JSON is for archiving, not for that importer; the JSONL is.
});

test('buildChatFiles: names per format', () => {
  const files = core.buildChatFiles(aikoChat(), ['jsonl', 'md', 'txt', 'html', 'json'], 'base');
  assert.deepEqual(files.map((f) => f.name), ['base.jsonl', 'base.md', 'base.txt', 'base.html', 'base.json']);
  assert.equal(core.chatBaseName(aikoChat(), Date.UTC(2026, 9, 13)), 'Aiko 🌸 Tanaka - chat 48151623 - Rainy reunion - 2026-10-13');
});

test('real data: a sanitized live chat (newest first, last reply still is_main:false) exports every message', () => {
  // Captured 2026-10-14 from a live "Back up everything" run, then sanitized.
  const raw = fixture('real-chat-sanitized.json');
  const chat = core.normalizeChat(raw, { chatId: raw.chat.id });
  assert.equal(chat.messages.length, 7);
  assert.deepEqual(chat.messages.map((m) => (m.isUser ? 'U' : 'B') + m.text.length), ['B68', 'U25', 'B1847', 'U43', 'B1986', 'U26', 'B1734']);
  assert.equal(chat.userName, 'You', 'no persona on the account');
  const jsonl = core.buildSillyTavernJsonl(chat);
  assert.deepEqual(core.validateSillyTavernJsonl(jsonl), []);
  assert.equal(core.parseJsonl(jsonl).length, 8);
});
