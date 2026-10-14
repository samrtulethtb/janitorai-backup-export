// ==UserScript==
// @name         JanitorAI Backup & Export – chats, character cards & lorebooks to SillyTavern, SpicyChat, Saucepan
// @name:pt-BR  JanitorAI Backup e Exportação – chats, cartões de personagem e lorebooks para SillyTavern e mais
// @name:es     JanitorAI Copia y Exportación – chats, tarjetas de personaje y lorebooks a SillyTavern y más
// @name:id     JanitorAI Backup & Ekspor – chat, kartu karakter & lorebook ke SillyTavern, SpicyChat, Saucepan
// @name:fr     JanitorAI Sauvegarde & Export – chats, cartes de personnage et lorebooks vers SillyTavern
// @name:de     JanitorAI Backup & Export – Chats, Charakterkarten & Lorebooks für SillyTavern, SpicyChat
// @name:it     JanitorAI Backup ed Esportazione – chat, schede personaggio e lorebook per SillyTavern
// @name:ru     JanitorAI Бэкап и экспорт – чаты, карточки персонажей и лорбуки в SillyTavern, SpicyChat
// @name:pl     JanitorAI Kopia i eksport – czaty, karty postaci i lorebooki do SillyTavern, SpicyChat
// @name:tr     JanitorAI Yedekleme ve Dışa Aktarma – sohbetler, karakter kartları, lorebook → SillyTavern
// @name:vi     JanitorAI Sao lưu & Xuất – chat, thẻ nhân vật & lorebook sang SillyTavern, SpicyChat
// @name:ja     JanitorAI バックアップ＆エクスポート – チャット・キャラカード・ロアブックを SillyTavern へ
// @name:ko     JanitorAI 백업 & 내보내기 – 채팅, 캐릭터 카드, 로어북을 SillyTavern·SpicyChat으로
// @name:zh-CN  JanitorAI 备份与导出 – 聊天、角色卡和世界书导出到 SillyTavern、SpicyChat、Saucepan
// @name:zh-TW  JanitorAI 備份與匯出 – 聊天、角色卡與世界書匯出到 SillyTavern、SpicyChat、Saucepan
// @namespace    https://github.com/samrtulethtb/janitorai-backup-export
// @version      1.0.1
// @description  Back up your JanitorAI chats, characters, personas and lorebooks. Standards-correct V2/V3 PNG and JSON cards, SillyTavern JSONL chats that import, Markdown/TXT/HTML/JSON. Runs in your browser, talks only to janitorai.com, no tracking. Hidden definitions are never extracted.
// @description:pt-BR Faça backup dos seus chats, personagens, personas e lorebooks do JanitorAI. Cartões V2/V3 PNG e JSON corretos, chats JSONL que importam no SillyTavern. Roda no seu navegador, fala só com janitorai.com, sem rastreamento. Definições ocultas nunca são extraídas.
// @description:es Haz copia de tus chats, personajes, personas y lorebooks de JanitorAI. Tarjetas V2/V3 PNG y JSON correctas, chats JSONL que se importan en SillyTavern. Funciona en tu navegador, solo habla con janitorai.com, sin rastreo. Nunca extrae definiciones ocultas.
// @description:id Cadangkan chat, karakter, persona, dan lorebook JanitorAI kamu. Kartu V2/V3 PNG dan JSON yang benar, chat JSONL yang bisa diimpor ke SillyTavern. Berjalan di browser kamu, hanya terhubung ke janitorai.com, tanpa pelacakan. Definisi tersembunyi tidak pernah diambil.
// @description:fr Sauvegardez vos chats, personnages, personas et lorebooks JanitorAI. Cartes PNG et JSON V2/V3 conformes, chats JSONL qui s'importent dans SillyTavern. Tout se passe dans votre navigateur, uniquement avec janitorai.com, sans pistage. Les définitions masquées ne sont jamais extraites.
// @description:de Sichere deine JanitorAI-Chats, Charaktere, Personas und Lorebooks. Standardkonforme V2/V3-Karten als PNG und JSON, SillyTavern-JSONL-Chats, die sich importieren lassen. Läuft in deinem Browser, spricht nur mit janitorai.com, kein Tracking. Versteckte Definitionen werden nie ausgelesen.
// @description:it Salva chat, personaggi, persona e lorebook di JanitorAI. Schede V2/V3 PNG e JSON conformi, chat JSONL importabili in SillyTavern. Funziona nel tuo browser, comunica solo con janitorai.com, nessun tracciamento. Le definizioni nascoste non vengono mai estratte.
// @description:ru Резервная копия ваших чатов, персонажей, персон и лорбуков JanitorAI. Корректные карточки V2/V3 в PNG и JSON, чаты JSONL, которые импортируются в SillyTavern. Работает в браузере, обращается только к janitorai.com, без слежки. Скрытые определения никогда не извлекаются.
// @description:pl Kopia zapasowa czatów, postaci, person i lorebooków z JanitorAI. Poprawne karty V2/V3 w PNG i JSON, czaty JSONL, które importują się do SillyTavern. Działa w przeglądarce, łączy się tylko z janitorai.com, bez śledzenia. Ukryte definicje nigdy nie są wyciągane.
// @description:tr JanitorAI sohbetlerini, karakterlerini, personalarını ve lorebook'larını yedekle. Standartlara uygun V2/V3 PNG ve JSON kartlar, SillyTavern'e aktarılabilen JSONL sohbetler. Tarayıcında çalışır, yalnızca janitorai.com ile konuşur, izleme yok. Gizli tanımlar asla çıkarılmaz.
// @description:vi Sao lưu chat, nhân vật, persona và lorebook JanitorAI của bạn. Thẻ V2/V3 PNG và JSON đúng chuẩn, chat JSONL nhập được vào SillyTavern. Chạy trong trình duyệt, chỉ kết nối với janitorai.com, không theo dõi. Không bao giờ trích xuất định nghĩa bị ẩn.
// @description:ja JanitorAI のチャット、キャラクター、ペルソナ、ロアブックをバックアップ。規格どおりの V2/V3 PNG・JSON カード、SillyTavern に取り込める JSONL チャット。ブラウザ内で動作し、通信先は janitorai.com のみ、トラッキングなし。非公開の定義は決して抽出しません。
// @description:ko JanitorAI 채팅, 캐릭터, 페르소나, 로어북을 백업하세요. 규격에 맞는 V2/V3 PNG·JSON 카드, SillyTavern으로 가져올 수 있는 JSONL 채팅. 브라우저에서만 실행되고 janitorai.com 하고만 통신하며 추적이 없습니다. 숨겨진 정의는 절대 추출하지 않습니다.
// @description:zh-CN 备份你的 JanitorAI 聊天、角色、人设和世界书。符合规范的 V2/V3 PNG 与 JSON 角色卡，可导入 SillyTavern 的 JSONL 聊天。完全在浏览器中运行，只与 janitorai.com 通信，无追踪。绝不提取被隐藏的角色定义。
// @description:zh-TW 備份你的 JanitorAI 聊天、角色、人設與世界書。符合規範的 V2/V3 PNG 與 JSON 角色卡，可匯入 SillyTavern 的 JSONL 聊天。完全在瀏覽器中執行，只與 janitorai.com 通訊，無追蹤。絕不擷取被隱藏的角色定義。
// @author       samrtulethtb
// @license      MIT
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjOGI2Y2ZmIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZDYyODk2Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMTQiIGZpbGw9InVybCgjZykiLz48cGF0aCBkPSJNMzIgMTN2MjRtLTEwLTEwIDEwIDEwIDEwLTEwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iNS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMTYgNDF2NmE0IDQgMCAwIDAgNCA0aDI0YTQgNCAwIDAgMCA0LTR2LTYiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSI1LjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPgo=
// @homepageURL  https://github.com/samrtulethtb/janitorai-backup-export
// @supportURL   https://github.com/samrtulethtb/janitorai-backup-export/issues
// @match        *://janitorai.com/*
// @match        *://www.janitorai.com/*
// @noframes
// @run-at       document-idle
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        unsafeWindow
// @connect      janitorai.com
// @connect      ella.janitorai.com
// ==/UserScript==

/*
 * JanitorAI Backup & Export
 *
 * Hard rules (SPEC §2), enforced in code and by tests:
 *  1. Never extract hidden definitions. When `showdefinition !== true` and the
 *     viewer is not the creator, only public fields are kept (whitelist), and
 *     the export says why the definition is missing. There is no proxy trick,
 *     no generation-payload capture and no probing for hidden data.
 *  2. Only janitorai.com (and its asset CDN) is contacted. No telemetry.
 *  3. Bulk work is throttled: at most 2 requests in flight, a delay between
 *     them, backoff on 429/5xx.
 *  4. The UI is built with DOM APIs only and lives in a Shadow DOM host.
 *
 * Layout: the pure core (parsers, mappers, card builders, PNG, ZIP, JSONL…)
 * comes first and is exported for Node tests. The browser layer below it is
 * thin and only runs inside the userscript manager.
 */

(function () {
  'use strict';

  // ===========================================================================
  // Constants
  // ===========================================================================

  const VERSION = '1.0.1';
  const EXPORTER_ID = 'janitorai-backup-export';
  const REPO_URL = 'https://github.com/samrtulethtb/janitorai-backup-export';
  const SITE_ORIGIN = 'https://janitorai.com';
  const AVATAR_BASE = 'https://ella.janitorai.com/bot-avatars/';
  const ALLOWED_HOSTS = ['janitorai.com', 'www.janitorai.com', 'ella.janitorai.com'];

  // Sponsor card (SPEC §7). Ships DISABLED until the owner confirms the offer
  // allows userscript traffic. When this flips to true, `@antifeature ads`
  // must be added to the header in the same commit (a test enforces this).
  const SPONSOR_ENABLED = false;
  const SPONSOR = {
    baseUrl: 'https://t.vlmai-5.com/425026/10338/0',
    params: { aff_sub5: 'SF_006OG000004lmDN', aff_sub: 'jai_export' },
    cooldownMs: 24 * 60 * 60 * 1000,
    // The owner supplies a small webp; until then the card uses a CSS block.
    imageDataUri: '',
  };

  const MAX_CONCURRENCY = 2;
  // Conservative on purpose: this is not a crawler (robots.txt disallows
  // /hampter/ for crawlers). It only acts when the user clicks, on their own
  // account or the pages they open, and spaces every request start by at
  // least MIN_REQUEST_DELAY_MS whatever the setting says.
  const MIN_REQUEST_DELAY_MS = 1000;
  const THROTTLE_PRESETS = { slow: 3000, normal: 1500, fast: 1000 };
  const RETRYABLE_STATUS = [429, 500, 502, 503, 504];

  // Definition fields: never exported for someone else's hidden character.
  const DEFINITION_FIELDS = [
    'personality', 'scenario', 'example_dialogs', 'first_message', 'first_messages',
    'system_prompt', 'post_history_instructions', 'scripts',
  ];

  // Public fields: the only fields kept when the definition is hidden.
  const PUBLIC_FIELDS = [
    'id', 'name', 'avatar', 'description', 'tags', 'custom_tags',
    'creator_id', 'creator_name', 'creator_verified', 'is_nsfw', 'is_public',
    'showdefinition', 'stats', 'total_chat', 'total_message', 'created_at', 'updated_at',
  ];

  const CARD_PARTS = [
    'description', 'personality', 'scenario', 'first_mes', 'alternate_greetings',
    'mes_example', 'system_prompt', 'post_history_instructions', 'tags',
    'creator_notes', 'character_book',
  ];

  const DEFAULT_SETTINGS = {
    cardFormats: ['png'],
    chatFormats: ['jsonl'],
    macroMode: 'keep', // 'keep' | 'normalize'
    target: 'sillytavern', // 'sillytavern' | 'compat'
    embedLorebook: true,
    filenameTemplate: '{name} - {creator} - {date}',
    throttle: 'normal',
    sponsorOff: false,
    language: 'auto',
    retryBaseMs: 2000,
  };

  // ===========================================================================
  // Small text and byte helpers
  // ===========================================================================

  const textEncoder = new TextEncoder();
  const textDecoder = new TextDecoder('utf-8');

  function utf8Encode(str) {
    return textEncoder.encode(String(str));
  }

  function utf8Decode(bytes) {
    return textDecoder.decode(bytes);
  }

  function latin1Bytes(str) {
    const out = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) out[i] = str.charCodeAt(i) & 0xff;
    return out;
  }

  function latin1String(bytes) {
    let s = '';
    for (let i = 0; i < bytes.length; i += 8192) {
      s += String.fromCharCode.apply(null, bytes.subarray(i, i + 8192));
    }
    return s;
  }

  const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  const B64_LOOKUP = (() => {
    const t = new Int16Array(128).fill(-1);
    for (let i = 0; i < B64.length; i++) t[B64.charCodeAt(i)] = i;
    t['-'.charCodeAt(0)] = 62;
    t['_'.charCodeAt(0)] = 63;
    return t;
  })();

  function bytesToBase64(bytes) {
    const parts = [];
    let i = 0;
    for (; i + 2 < bytes.length; i += 3) {
      const n = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
      parts.push(B64[(n >> 18) & 63] + B64[(n >> 12) & 63] + B64[(n >> 6) & 63] + B64[n & 63]);
    }
    const rem = bytes.length - i;
    if (rem === 1) {
      const n = bytes[i] << 16;
      parts.push(B64[(n >> 18) & 63] + B64[(n >> 12) & 63] + '==');
    } else if (rem === 2) {
      const n = (bytes[i] << 16) | (bytes[i + 1] << 8);
      parts.push(B64[(n >> 18) & 63] + B64[(n >> 12) & 63] + B64[(n >> 6) & 63] + '=');
    }
    return parts.join('');
  }

  // Accepts standard and URL-safe base64, with or without padding.
  function base64ToBytes(str) {
    const clean = String(str).replace(/[^A-Za-z0-9+/\-_]/g, '');
    const out = new Uint8Array(Math.floor((clean.length * 3) / 4));
    let buffer = 0;
    let bits = 0;
    let o = 0;
    for (let i = 0; i < clean.length; i++) {
      const v = B64_LOOKUP[clean.charCodeAt(i)];
      if (v < 0) continue;
      buffer = (buffer << 6) | v;
      bits += 6;
      if (bits >= 8) {
        bits -= 8;
        out[o++] = (buffer >> bits) & 0xff;
      }
    }
    return out.subarray(0, o);
  }

  function base64EncodeUtf8(str) {
    return bytesToBase64(utf8Encode(str));
  }

  function base64DecodeUtf8(str) {
    return utf8Decode(base64ToBytes(str));
  }

  function concatBytes(chunks) {
    let total = 0;
    for (const c of chunks) total += c.length;
    const out = new Uint8Array(total);
    let off = 0;
    for (const c of chunks) {
      out.set(c, off);
      off += c.length;
    }
    return out;
  }

  function toBytes(data) {
    if (data instanceof Uint8Array) return data;
    if (data instanceof ArrayBuffer) return new Uint8Array(data);
    if (ArrayBuffer.isView(data)) return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    return utf8Encode(typeof data === 'string' ? data : JSON.stringify(data));
  }

  const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', hellip: '…', mdash: '—', ndash: '–', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“' };

  function decodeEntities(s) {
    return String(s).replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, code) => {
      if (code[0] === '#') {
        const n = code[1] === 'x' || code[1] === 'X' ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
        return Number.isFinite(n) && n > 0 && n <= 0x10ffff ? String.fromCodePoint(n) : m;
      }
      const v = ENTITIES[code.toLowerCase()];
      return v === undefined ? m : v;
    });
  }

  // JanitorAI's character "description" is the public HTML tagline. Card
  // readers expect plain text in creator_notes, so it is flattened here.
  function htmlToText(html) {
    if (html === null || html === undefined) return '';
    let s = String(html);
    s = s.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '');
    s = s.replace(/<\s*br\s*\/?\s*>/gi, '\n');
    s = s.replace(/<li\b[^>]*>/gi, '\n- ');
    s = s.replace(/<\/\s*li\s*>/gi, '');
    s = s.replace(/<\/\s*(p|div|h[1-6]|blockquote|tr|ul|ol|pre)\s*>/gi, '\n');
    s = s.replace(/<[^>]*>/g, '');
    s = decodeEntities(s);
    s = s.replace(/\r\n?/g, '\n').replace(/ /g, ' ').replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n');
    return s.trim();
  }

  function escapeHtml(s) {
    return String(s === null || s === undefined ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function escapeRegExp(s) {
    return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function str(v) {
    if (v === null || v === undefined) return '';
    return typeof v === 'string' ? v : String(v);
  }

  function pad(n, len) {
    return String(n).padStart(len || 2, '0');
  }

  function formatDate(date) {
    const d = date instanceof Date ? date : new Date(date);
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }

  // SillyTavern's own `create_date` style: 2026-10-13@15h04m05s123ms
  function humanizedDateTime(date) {
    const d = date instanceof Date ? date : new Date(date === undefined ? Date.now() : date);
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}@${pad(d.getHours())}h${pad(d.getMinutes())}m${pad(d.getSeconds())}s${pad(d.getMilliseconds(), 3)}ms`;
  }

  function toIsoDate(value, fallback) {
    const d = value ? new Date(value) : null;
    if (d && !Number.isNaN(d.getTime())) return d.toISOString();
    return fallback !== undefined ? fallback : new Date(0).toISOString();
  }

  // Windows, macOS, Android and Linux safe. Keeps Unicode letters (CJK, emoji).
  function sanitizeFilename(name, maxLen) {
    let s = str(name)
      .replace(/[\u0000-\u001f\u007f<>:"/\\|?*]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/^[.\s]+|[.\s]+$/g, '');
    if (/^(con|prn|aux|nul|com\d|lpt\d)$/i.test(s)) s = `_${s}`;
    const limit = maxLen || 120;
    if (s.length > limit) s = Array.from(s).slice(0, limit).join('').trim();
    return s || 'untitled';
  }

  function applyFilenameTemplate(template, vars) {
    const tpl = str(template) || DEFAULT_SETTINGS.filenameTemplate;
    const filled = tpl.replace(/\{(\w+)\}/g, (m, key) => (vars[key] !== undefined && vars[key] !== null ? str(vars[key]) : ''));
    // Drop separators left dangling by empty variables ("Name -  - 2026").
    const tidy = filled.replace(/(\s*-\s*){2,}/g, ' - ').replace(/^\s*-\s*|\s*-\s*$/g, '');
    return sanitizeFilename(tidy);
  }

  function uniqueName(used, name) {
    if (!used.has(name)) {
      used.add(name);
      return name;
    }
    const dot = name.lastIndexOf('.');
    const slash = name.lastIndexOf('/');
    const hasExt = dot > slash + 1;
    const base = hasExt ? name.slice(0, dot) : name;
    const ext = hasExt ? name.slice(dot) : '';
    for (let i = 2; ; i++) {
      const candidate = `${base} (${i})${ext}`;
      if (!used.has(candidate)) {
        used.add(candidate);
        return candidate;
      }
    }
  }

  // ===========================================================================
  // CRC32 / Adler32
  // ===========================================================================

  const CRC_TABLE = (() => {
    const t = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      t[n] = c >>> 0;
    }
    return t;
  })();

  function crc32(bytes, crc) {
    let c = crc === undefined ? 0xffffffff : crc ^ 0xffffffff;
    for (let i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
  }

  function adler32(bytes) {
    let a = 1;
    let b = 0;
    for (let i = 0; i < bytes.length; i++) {
      a = (a + bytes[i]) % 65521;
      b = (b + a) % 65521;
    }
    return ((b << 16) | a) >>> 0;
  }

  function u32be(n) {
    return new Uint8Array([(n >>> 24) & 0xff, (n >>> 16) & 0xff, (n >>> 8) & 0xff, n & 0xff]);
  }

  function readU32be(bytes, off) {
    return ((bytes[off] << 24) | (bytes[off + 1] << 16) | (bytes[off + 2] << 8) | bytes[off + 3]) >>> 0;
  }

  // ===========================================================================
  // PNG: chunk reader/writer, chara + ccv3 tEXt chunks, placeholder image
  // ===========================================================================

  const PNG_SIGNATURE = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);

  function isPng(bytes) {
    if (!bytes || bytes.length < 8) return false;
    for (let i = 0; i < 8; i++) if (bytes[i] !== PNG_SIGNATURE[i]) return false;
    return true;
  }

  function readPngChunks(input) {
    const bytes = toBytes(input);
    if (!isPng(bytes)) throw new Error('Not a PNG file');
    const chunks = [];
    let off = 8;
    while (off + 12 <= bytes.length) {
      const length = readU32be(bytes, off);
      const type = latin1String(bytes.subarray(off + 4, off + 8));
      const dataEnd = off + 8 + length;
      if (dataEnd + 4 > bytes.length) throw new Error(`Truncated PNG chunk ${type}`);
      const data = bytes.subarray(off + 8, dataEnd);
      const crc = readU32be(bytes, dataEnd);
      const expected = crc32(bytes.subarray(off + 4, dataEnd));
      chunks.push({ type, data, crcOk: crc === expected });
      off = dataEnd + 4;
      if (type === 'IEND') break;
    }
    if (!chunks.length || chunks[chunks.length - 1].type !== 'IEND') throw new Error('PNG has no IEND chunk');
    return chunks;
  }

  function encodePngChunk(type, data) {
    const typeBytes = latin1Bytes(type);
    const body = concatBytes([typeBytes, data]);
    return concatBytes([u32be(data.length), body, u32be(crc32(body))]);
  }

  function encodePng(chunks) {
    return concatBytes([PNG_SIGNATURE].concat(chunks.map((c) => encodePngChunk(c.type, c.data))));
  }

  function decodeTextChunk(data) {
    const zero = data.indexOf(0);
    if (zero < 0) return null;
    return { keyword: latin1String(data.subarray(0, zero)), text: latin1String(data.subarray(zero + 1)) };
  }

  function makeTextChunkData(keyword, text) {
    return concatBytes([latin1Bytes(keyword), new Uint8Array([0]), latin1Bytes(text)]);
  }

  const CARD_KEYWORDS = ['chara', 'ccv3'];

  // Writes both chunks: `chara` (V2) and `ccv3` (V3), each base64(UTF-8 JSON),
  // inserted before IEND. Old card chunks are removed so readers never see two.
  function writeCardPng(pngBytes, cards) {
    const chunks = readPngChunks(pngBytes).filter((c) => {
      if (c.type !== 'tEXt' && c.type !== 'iTXt' && c.type !== 'zTXt') return true;
      const zero = c.data.indexOf(0);
      const keyword = zero < 0 ? '' : latin1String(c.data.subarray(0, zero)).toLowerCase();
      return !CARD_KEYWORDS.includes(keyword);
    });
    const iend = chunks.findIndex((c) => c.type === 'IEND');
    const extra = [];
    if (cards.v2) extra.push({ type: 'tEXt', data: makeTextChunkData('chara', base64EncodeUtf8(JSON.stringify(cards.v2))) });
    if (cards.v3) extra.push({ type: 'tEXt', data: makeTextChunkData('ccv3', base64EncodeUtf8(JSON.stringify(cards.v3))) });
    chunks.splice(iend, 0, ...extra);
    return encodePng(chunks);
  }

  function readCardPng(pngBytes) {
    const result = { chara: null, ccv3: null, crcOk: true };
    for (const c of readPngChunks(pngBytes)) {
      if (!c.crcOk) result.crcOk = false;
      if (c.type !== 'tEXt') continue;
      const t = decodeTextChunk(c.data);
      if (!t) continue;
      const key = t.keyword.toLowerCase();
      if (key === 'chara' || key === 'ccv3') result[key] = JSON.parse(base64DecodeUtf8(t.text));
    }
    return result;
  }

  function zlibStored(data) {
    const blocks = [new Uint8Array([0x78, 0x01])];
    const max = 65535;
    let off = 0;
    do {
      const len = Math.min(max, data.length - off);
      const final = off + len >= data.length ? 1 : 0;
      blocks.push(new Uint8Array([final, len & 0xff, (len >> 8) & 0xff, ~len & 0xff, (~len >> 8) & 0xff]));
      blocks.push(data.subarray(off, off + len));
      off += len;
    } while (off < data.length);
    blocks.push(u32be(adler32(data)));
    return concatBytes(blocks);
  }

  function hashString(s) {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  // A dependency-free placeholder (palette PNG, stored deflate) used when the
  // avatar can't be loaded. Colour is derived from the name so it is stable.
  function makePlaceholderPng(seed, width, height) {
    const w = width || 256;
    const h = height || 384;
    const hue = hashString(str(seed) || 'card') % 360;
    const steps = 32;
    const palette = new Uint8Array(steps * 3);
    for (let i = 0; i < steps; i++) {
      const [r, g, b] = hslToRgb(hue, 0.45, 0.25 + (0.35 * i) / (steps - 1));
      palette.set([r, g, b], i * 3);
    }
    const raw = new Uint8Array((w + 1) * h);
    for (let y = 0; y < h; y++) {
      const row = y * (w + 1);
      raw[row] = 0;
      const idx = Math.min(steps - 1, Math.floor((y / h) * steps));
      raw.fill(idx, row + 1, row + 1 + w);
    }
    const ihdr = concatBytes([u32be(w), u32be(h), new Uint8Array([8, 3, 0, 0, 0])]);
    return encodePng([
      { type: 'IHDR', data: ihdr },
      { type: 'PLTE', data: palette },
      { type: 'IDAT', data: zlibStored(raw) },
      { type: 'IEND', data: new Uint8Array(0) },
    ]);
  }

  function hslToRgb(h, s, l) {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let rgb;
    if (h < 60) rgb = [c, x, 0];
    else if (h < 120) rgb = [x, c, 0];
    else if (h < 180) rgb = [0, c, x];
    else if (h < 240) rgb = [0, x, c];
    else if (h < 300) rgb = [x, 0, c];
    else rgb = [c, 0, x];
    return rgb.map((v) => Math.round((v + m) * 255));
  }

  // ===========================================================================
  // ZIP: store-only writer (and a reader for tests and self-checks)
  // ===========================================================================

  function dosDateTime(date) {
    const d = date instanceof Date ? date : new Date();
    const year = Math.max(1980, d.getFullYear());
    return {
      time: ((d.getHours() << 11) | (d.getMinutes() << 5) | Math.floor(d.getSeconds() / 2)) & 0xffff,
      date: (((year - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate()) & 0xffff,
    };
  }

  function le16(n) {
    return [n & 0xff, (n >>> 8) & 0xff];
  }

  function le32(n) {
    return [n & 0xff, (n >>> 8) & 0xff, (n >>> 16) & 0xff, (n >>> 24) & 0xff];
  }

  function createZip(files, opts) {
    const when = dosDateTime((opts && opts.date) || new Date());
    const locals = [];
    const centrals = [];
    const used = new Set();
    let offset = 0;
    for (const f of files) {
      const name = uniqueName(used, f.name.replace(/\\/g, '/').replace(/^\/+/, ''));
      const nameBytes = utf8Encode(name);
      const data = toBytes(f.data);
      const crc = crc32(data);
      const common = [
        ...le16(20), ...le16(0x0800), ...le16(0), ...le16(when.time), ...le16(when.date),
        ...le32(crc), ...le32(data.length), ...le32(data.length), ...le16(nameBytes.length), ...le16(0),
      ];
      const local = concatBytes([new Uint8Array([...le32(0x04034b50), ...common]), nameBytes, data]);
      const central = concatBytes([
        new Uint8Array([...le32(0x02014b50), ...le16(20), ...common, ...le16(0), ...le16(0), ...le16(0), ...le32(0), ...le32(offset)]),
        nameBytes,
      ]);
      locals.push(local);
      centrals.push(central);
      offset += local.length;
      if (offset > 0xfffffffe) throw new Error('Backup is larger than 4 GB; export in smaller parts.');
    }
    const cd = concatBytes(centrals);
    const end = new Uint8Array([
      ...le32(0x06054b50), ...le16(0), ...le16(0), ...le16(files.length), ...le16(files.length),
      ...le32(cd.length), ...le32(offset), ...le16(0),
    ]);
    return concatBytes([...locals, cd, end]);
  }

  function readZip(input) {
    const bytes = toBytes(input);
    const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    let eocd = -1;
    for (let i = bytes.length - 22; i >= 0; i--) {
      if (dv.getUint32(i, true) === 0x06054b50) {
        eocd = i;
        break;
      }
    }
    if (eocd < 0) throw new Error('Not a ZIP file');
    const count = dv.getUint16(eocd + 10, true);
    let p = dv.getUint32(eocd + 16, true);
    const out = new Map();
    for (let i = 0; i < count; i++) {
      if (dv.getUint32(p, true) !== 0x02014b50) throw new Error('Bad central directory');
      const crc = dv.getUint32(p + 16, true);
      const size = dv.getUint32(p + 20, true);
      const nameLen = dv.getUint16(p + 28, true);
      const extraLen = dv.getUint16(p + 30, true);
      const commentLen = dv.getUint16(p + 32, true);
      const localOff = dv.getUint32(p + 42, true);
      const name = utf8Decode(bytes.subarray(p + 46, p + 46 + nameLen));
      const lNameLen = dv.getUint16(localOff + 26, true);
      const lExtraLen = dv.getUint16(localOff + 28, true);
      const start = localOff + 30 + lNameLen + lExtraLen;
      const data = bytes.subarray(start, start + size);
      if (crc32(data) !== crc) throw new Error(`CRC mismatch in ${name}`);
      out.set(name, data);
      p += 46 + nameLen + extraLen + commentLen;
    }
    return out;
  }

  // ===========================================================================
  // Routes
  // ===========================================================================


  function extractCharacterId(href) {
    const m = str(href).match(/\/characters\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i);
    return m ? m[1].toLowerCase() : null;
  }

  function parseRoute(pathname) {
    const path = str(pathname).replace(/\/+$/, '') || '/';
    const charId = extractCharacterId(path);
    if (charId) return { type: 'character', id: charId };
    const chat = path.match(/^\/chats\/([A-Za-z0-9_-]+)/);
    if (chat) return { type: 'chat', id: chat[1] };
    if (/^\/my_characters\b/.test(path)) return { type: 'list', kind: 'my_characters' };
    if (/^\/(favorites|my_favorites|favourites)\b/.test(path)) return { type: 'list', kind: 'favorites' };
    if (/^\/profiles\/[^/]+/.test(path)) return { type: 'list', kind: 'profile' };
    if (/^\/my_personas\b|\/edit_persona\b/.test(path)) return { type: 'personas' };
    return { type: 'other' };
  }

  function isAllowedUrl(url) {
    try {
      const u = new URL(url, SITE_ORIGIN);
      return (u.protocol === 'https:' || u.protocol === 'http:') && ALLOWED_HOSTS.includes(u.hostname);
    } catch (e) {
      return false;
    }
  }

  function avatarUrl(avatar) {
    const a = str(avatar).trim();
    if (!a) return '';
    if (/^https?:\/\//i.test(a)) return a;
    if (a.startsWith('/')) return SITE_ORIGIN + a;
    return AVATAR_BASE + a;
  }

  function characterPageUrl(raw) {
    return raw && raw.id ? `${SITE_ORIGIN}/characters/${raw.id}` : '';
  }

  function creatorProfileUrl(raw) {
    return raw && raw.creator_id ? `${SITE_ORIGIN}/profiles/${raw.creator_id}` : '';
  }

  // ===========================================================================
  // Auth token discovery (the user's own session)
  // ===========================================================================

  function parseCookies(cookieString) {
    const out = {};
    for (const part of str(cookieString).split(';')) {
      const eq = part.indexOf('=');
      if (eq < 0) continue;
      const k = part.slice(0, eq).trim();
      let v = part.slice(eq + 1).trim();
      try {
        v = decodeURIComponent(v);
      } catch (e) {
        /* keep raw */
      }
      if (k) out[k] = v;
    }
    return out;
  }

  function decodeSupabaseSession(value) {
    if (!value) return null;
    let raw = String(value).trim();
    try {
      if (raw.startsWith('{') || raw.startsWith('[')) return JSON.parse(raw);
      raw = raw.replace(/^base64-/, '');
      return JSON.parse(base64DecodeUtf8(raw));
    } catch (e) {
      return null;
    }
  }

  function sessionAccessToken(session) {
    if (!session) return null;
    if (Array.isArray(session)) return typeof session[0] === 'string' ? session[0] : null; // old supabase-js array form
    if (typeof session.access_token === 'string') return session.access_token;
    if (session.currentSession && typeof session.currentSession.access_token === 'string') return session.currentSession.access_token;
    return null;
  }

  // The Supabase cookie is `sb-auth-auth-token`, or split into `.0`, `.1`, …
  function tokenFromCookies(cookieString) {
    const cookies = parseCookies(cookieString);
    let value = cookies['sb-auth-auth-token'] || '';
    if (!value) {
      for (let i = 0; cookies[`sb-auth-auth-token.${i}`] !== undefined; i++) value += cookies[`sb-auth-auth-token.${i}`];
    }
    if (!value) {
      // Other project refs: sb-<ref>-auth-token(.N)
      const keys = Object.keys(cookies).filter((k) => /^sb-[\w-]+-auth-token(\.\d+)?$/.test(k)).sort();
      const base = keys.find((k) => !/\.\d+$/.test(k));
      if (base) value = cookies[base];
      else value = keys.filter((k) => /\.\d+$/.test(k)).sort((a, b) => Number(a.split('.').pop()) - Number(b.split('.').pop())).map((k) => cookies[k]).join('');
    }
    return sessionAccessToken(decodeSupabaseSession(value));
  }

  function tokenFromStorageEntries(entries) {
    for (const [key, value] of entries) {
      if (!/^sb-[\w-]*auth-token$/.test(key) && key !== 'supabase.auth.token') continue;
      const t = sessionAccessToken(decodeSupabaseSession(value));
      if (t) return t;
    }
    return null;
  }

  // Reads ONLY the Authorization header of a request the app makes itself.
  function extractBearer(headers) {
    if (!headers) return null;
    let value = null;
    try {
      if (typeof headers.get === 'function') value = headers.get('authorization');
      else if (Array.isArray(headers)) {
        const pair = headers.find((h) => Array.isArray(h) && String(h[0]).toLowerCase() === 'authorization');
        value = pair ? pair[1] : null;
      } else if (typeof headers === 'object') {
        for (const k of Object.keys(headers)) if (k.toLowerCase() === 'authorization') value = headers[k];
      }
    } catch (e) {
      return null;
    }
    const m = /^\s*Bearer\s+(\S+)\s*$/i.exec(str(value));
    return m ? m[1] : null;
  }

  function decodeJwtPayload(token) {
    try {
      const part = str(token).split('.')[1];
      return part ? JSON.parse(base64DecodeUtf8(part)) : null;
    } catch (e) {
      return null;
    }
  }

  function viewerFromToken(token) {
    const payload = decodeJwtPayload(token);
    return { userId: payload && payload.sub ? String(payload.sub) : null, loggedIn: !!token };
  }

  // ===========================================================================
  // Page state (`window._storeState_`) and DOM fallbacks
  // ===========================================================================

  // Decodes the body of a JS string literal ("…" or '…').
  function decodeJsStringLiteral(body) {
    return body.replace(/\\(u\{[0-9a-fA-F]+\}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{2}|[\s\S])/g, (m, e) => {
      switch (e[0]) {
        case 'n': return '\n';
        case 'r': return '\r';
        case 't': return '\t';
        case 'b': return '\b';
        case 'f': return '\f';
        case 'v': return '\v';
        case '0': return '\0';
        case 'x': return String.fromCharCode(parseInt(e.slice(1), 16));
        case 'u': return e[1] === '{' ? String.fromCodePoint(parseInt(e.slice(2, -1), 16)) : String.fromCharCode(parseInt(e.slice(1), 16));
        case '\n': return '';
        default: return e;
      }
    });
  }

  function extractStoreStateFromScript(text) {
    const s = str(text);
    const at = s.indexOf('_storeState_');
    if (at < 0) return null;
    const m = /JSON\.parse\(\s*(["'])/.exec(s.slice(at));
    if (!m) return null;
    const quote = m[1];
    let i = at + m.index + m[0].length;
    const start = i;
    while (i < s.length) {
      const ch = s[i];
      if (ch === '\\') {
        i += 2;
        continue;
      }
      if (ch === quote) break;
      i++;
    }
    if (i >= s.length) return null;
    try {
      return JSON.parse(decodeJsStringLiteral(s.slice(start, i)));
    } catch (e) {
      return null;
    }
  }

  function deepFind(root, predicate, maxNodes) {
    const limit = maxNodes || 50000;
    const seen = new Set();
    const stack = [root];
    let n = 0;
    while (stack.length && n < limit) {
      const node = stack.pop();
      if (!node || typeof node !== 'object' || seen.has(node)) continue;
      seen.add(node);
      n++;
      if (predicate(node)) return node;
      for (const k of Object.keys(node)) {
        const v = node[k];
        if (v && typeof v === 'object') stack.push(v);
      }
    }
    return null;
  }

  function findCharacterInState(state, id) {
    if (!state || !id) return null;
    const want = String(id).toLowerCase();
    return deepFind(state, (o) => !Array.isArray(o) && typeof o.id === 'string' && o.id.toLowerCase() === want && typeof o.name === 'string');
  }

  function findPersonasInState(state) {
    if (!state) return [];
    const holder = deepFind(state, (o) => !Array.isArray(o) && Array.isArray(o.personas) && o.personas.some((p) => p && typeof p.name === 'string'));
    return holder ? holder.personas.filter((p) => p && typeof p.name === 'string') : [];
  }

  // DOM last resort: public data only (title, avatar, tagline).
  function characterFromDomSnapshot(snap, id) {
    if (!snap) return null;
    const name = str(snap.h1 || snap.ogTitle || snap.title).replace(/\s*[|–-]\s*Janitor\s*AI.*$/i, '').trim();
    if (!name) return null;
    return {
      id: id || null,
      name,
      avatar: snap.ogImage || '',
      description: snap.metaDescription ? escapeHtml(snap.metaDescription) : '',
      tags: (snap.tags || []).map((t) => ({ name: t })),
      showdefinition: false, // unknown → treated as hidden; DOM never gives definitions
      _source: 'dom',
    };
  }

  // ===========================================================================
  // Hidden-definition guard (SPEC §2.1)
  // ===========================================================================

  function isOwnCharacter(raw, viewer) {
    const uid = viewer && viewer.userId;
    if (!uid || !raw) return false;
    return [raw.creator_id, raw.creator_user_id, raw.user_id].some((v) => v !== undefined && v !== null && String(v) === String(uid));
  }

  function hasAnyDefinition(raw) {
    return ['personality', 'scenario', 'example_dialogs', 'first_message'].some((k) => typeof raw[k] === 'string' && raw[k].trim())
      || (Array.isArray(raw.first_messages) && raw.first_messages.some((m) => str(m && m.message !== undefined ? m.message : m).trim()));
  }

  /**
   * Returns `{ char, definitionHidden, isOwner, reason }`.
   * When the definition is not visible to this viewer, `char` is rebuilt from
   * PUBLIC_FIELDS only (a whitelist), so nothing else can leak through even if
   * the server or page state carried it.
   */
  function guardCharacter(raw, viewer) {
    if (!raw || typeof raw !== 'object') throw new Error('No character data');
    const isOwner = isOwnCharacter(raw, viewer);
    const visible = raw.showdefinition === true || isOwner;
    if (visible) {
      const char = Object.assign({}, raw);
      let reason = null;
      // JanitorAI sends the definition only to logged-in users: logged out, the
      // fields come back null (and token_counts 0) even with showdefinition true.
      if (!hasAnyDefinition(char)) reason = isOwner ? 'owner_missing' : viewer && viewer.loggedIn ? 'empty' : 'login_required';
      return { char, definitionHidden: false, isOwner, reason };
    }
    const char = {};
    for (const k of PUBLIC_FIELDS) if (raw[k] !== undefined) char[k] = raw[k];
    char.showdefinition = false;
    return { char, definitionHidden: true, isOwner: false, reason: 'hidden' };
  }

  const HIDDEN_NOTICE = "The creator hid this character's definition, so only the public parts can be saved.";
  const UNAVAILABLE_NOTICE = 'JanitorAI no longer serves this character (deleted or private), so only its name and picture could be saved.';

  const LOGIN_REQUIRED_NOTICE = "Log in to janitorai.com to save this character's definition — JanitorAI only sends it to logged-in users.";

  function noticeFor(guarded) {
    if (guarded && guarded.reason === 'unavailable') return UNAVAILABLE_NOTICE;
    if (guarded && guarded.reason === 'login_required') return LOGIN_REQUIRED_NOTICE;
    return HIDDEN_NOTICE;
  }

  // A skipped.json entry for a character saved without its definition, or null.
  function definitionSkipEntry(id, name, guarded) {
    if (!guarded || !(guarded.definitionHidden || guarded.reason === 'login_required')) return null;
    return { id, name, what: 'definition', why: noticeFor(guarded) };
  }

  // ===========================================================================
  // Mapping: JanitorAI API → Character Card V2/V3
  // ===========================================================================

  function normalizeTags(raw) {
    const out = [];
    const seen = new Set();
    for (const t of [].concat(raw.tags || [], raw.custom_tags || [])) {
      const name = str(typeof t === 'string' ? t : t && (t.name || t.slug)).trim();
      if (name && !seen.has(name.toLowerCase())) {
        seen.add(name.toLowerCase());
        out.push(name);
      }
    }
    return out;
  }

  // JanitorAI appends a credit line to `first_message` ("created by <name>
  // 2026© on janitorai.com") but not to the same greeting in `first_messages`.
  // Seen on real data; without this the greeting shows up twice.
  const GREETING_CREDIT_RE = /\s*created by\s[^\n]{0,120}?janitorai\.com\s*$/i;

  function greetingKey(text) {
    return str(text).replace(GREETING_CREDIT_RE, '').replace(/\s+/g, ' ').trim();
  }

  function collectGreetings(raw) {
    const list = [];
    const keys = new Set();
    const push = (m) => {
      const text = str(m && typeof m === 'object' ? m.message || m.text || m.content : m);
      const key = greetingKey(text);
      if (key && !keys.has(key)) {
        keys.add(key);
        list.push(text);
      }
    };
    push(raw.first_message);
    if (Array.isArray(raw.first_messages)) raw.first_messages.forEach(push);
    return list;
  }

  function normalizeMacros(text, names) {
    let s = str(text);
    if (!s) return s;
    s = s.replace(/\{\{\s*char\s*\}\}|<\s*(?:bot|char)\s*>/gi, '{{char}}');
    s = s.replace(/\{\{\s*user\s*\}\}|<\s*user\s*>/gi, '{{user}}');
    const charName = str(names && names.charName).trim();
    if (charName.length >= 2) {
      const re = new RegExp(`(^|[^\\p{L}\\p{N}_{])${escapeRegExp(charName)}(?=$|[^\\p{L}\\p{N}_}])`, 'gu');
      s = s.replace(re, '$1{{char}}');
    }
    return s;
  }

  function defaultParts() {
    const p = {};
    for (const k of CARD_PARTS) p[k] = true;
    return p;
  }

  /**
   * Builds the V2 `data` object.
   * opts: { parts, macroMode, target, lorebooks, now, exporterVersion }
   */
  function mapCharacterToCardData(guarded, opts) {
    const o = opts || {};
    const parts = Object.assign(defaultParts(), o.parts || {});
    const raw = guarded.char;
    const name = str(raw.name).trim() || 'Unnamed character';
    const greetings = guarded.definitionHidden ? [] : collectGreetings(raw);
    const fix = o.macroMode === 'normalize' ? (t) => normalizeMacros(t, { charName: name }) : (t) => str(t);
    const mainText = guarded.definitionHidden ? '' : fix(raw.personality);

    let notes = htmlToText(raw.description);
    const notice = noticeFor(guarded);
    if (guarded.definitionHidden) notes = notes ? `${notes}\n\n[${notice}]` : `[${notice}]`;

    const data = {
      name,
      // JanitorAI's "personality" is the main definition text → V2 description.
      description: parts.description ? mainText : '',
      personality: parts.personality && o.target === 'compat' ? mainText : '',
      scenario: parts.scenario && !guarded.definitionHidden ? fix(raw.scenario) : '',
      first_mes: parts.first_mes && greetings.length ? fix(greetings[0]) : '',
      mes_example: parts.mes_example && !guarded.definitionHidden ? fix(raw.example_dialogs) : '',
      creator_notes: parts.creator_notes ? notes : (guarded.definitionHidden ? `[${notice}]` : ''),
      system_prompt: parts.system_prompt && !guarded.definitionHidden ? fix(raw.system_prompt) : '',
      post_history_instructions: parts.post_history_instructions && !guarded.definitionHidden ? fix(raw.post_history_instructions) : '',
      alternate_greetings: parts.alternate_greetings ? greetings.slice(1).map(fix) : [],
      tags: parts.tags ? normalizeTags(raw) : [],
      creator: str(raw.creator_name),
      character_version: raw.updated_at ? formatDate(raw.updated_at) : '',
      extensions: {
        janitorai: {
          id: raw.id || null,
          url: characterPageUrl(raw),
          creator_id: raw.creator_id || null,
          creator_url: creatorProfileUrl(raw),
          is_nsfw: !!raw.is_nsfw,
          definition_hidden: !!guarded.definitionHidden,
          exported_at: toIsoDate(o.now || Date.now()),
          exporter: `${EXPORTER_ID}@${o.exporterVersion || VERSION}`,
        },
      },
    };
    const books = guarded.definitionHidden ? [] : (o.lorebooks || []).filter((b) => b && b.entries && b.entries.length);
    if (parts.character_book && books.length) data.character_book = toCharacterBook(books, `${name} lorebook`);
    return data;
  }

  function buildCardV2(data) {
    return { spec: 'chara_card_v2', spec_version: '2.0', data: JSON.parse(JSON.stringify(data)) };
  }

  function buildCardV3(data, meta) {
    const m = meta || {};
    const d = JSON.parse(JSON.stringify(data));
    const now = Math.floor((m.now || Date.now()) / 1000);
    const created = m.createdAt ? Math.floor(new Date(m.createdAt).getTime() / 1000) : now;
    const modified = m.updatedAt ? Math.floor(new Date(m.updatedAt).getTime() / 1000) : now;
    d.group_only_greetings = [];
    d.source = m.sourceUrl ? [m.sourceUrl] : [];
    d.creation_date = Number.isFinite(created) ? created : now;
    d.modification_date = Number.isFinite(modified) ? modified : now;
    d.assets = [{ type: 'icon', uri: 'ccdefault:', name: 'main', ext: 'png' }];
    return { spec: 'chara_card_v3', spec_version: '3.0', data: d };
  }

  const V2_STRING_FIELDS = ['name', 'description', 'personality', 'scenario', 'first_mes', 'mes_example', 'creator_notes', 'system_prompt', 'post_history_instructions', 'creator', 'character_version'];

  function isStringArray(v) {
    return Array.isArray(v) && v.every((x) => typeof x === 'string');
  }

  function validateCharacterBook(book, errors) {
    if (!book || typeof book !== 'object' || Array.isArray(book)) return errors.push('character_book must be an object');
    if (!Array.isArray(book.entries)) return errors.push('character_book.entries must be an array');
    if (book.extensions === undefined || typeof book.extensions !== 'object') errors.push('character_book.extensions must be an object');
    book.entries.forEach((e, i) => {
      if (!isStringArray(e.keys)) errors.push(`entry ${i}: keys must be string[]`);
      if (typeof e.content !== 'string') errors.push(`entry ${i}: content must be a string`);
      if (typeof e.enabled !== 'boolean') errors.push(`entry ${i}: enabled must be boolean`);
      if (typeof e.insertion_order !== 'number') errors.push(`entry ${i}: insertion_order must be a number`);
      if (!e.extensions || typeof e.extensions !== 'object') errors.push(`entry ${i}: extensions must be an object`);
      if (e.position !== undefined && e.position !== 'before_char' && e.position !== 'after_char') errors.push(`entry ${i}: bad position`);
    });
    return errors;
  }

  // Schema-like checks against the V2/V3 specs; used by tests and before every
  // export (a failing check is reported, not silently written).
  function validateCard(card, version) {
    const errors = [];
    const v = version || (card && card.spec === 'chara_card_v3' ? 3 : 2);
    if (!card || typeof card !== 'object') return ['card must be an object'];
    if (v === 2 && (card.spec !== 'chara_card_v2' || card.spec_version !== '2.0')) errors.push('spec must be chara_card_v2 / 2.0');
    if (v === 3 && (card.spec !== 'chara_card_v3' || card.spec_version !== '3.0')) errors.push('spec must be chara_card_v3 / 3.0');
    const d = card.data;
    if (!d || typeof d !== 'object') return errors.concat('data must be an object');
    for (const k of V2_STRING_FIELDS) if (typeof d[k] !== 'string') errors.push(`data.${k} must be a string`);
    if (!d.name.trim()) errors.push('data.name must not be empty');
    if (!isStringArray(d.alternate_greetings)) errors.push('data.alternate_greetings must be string[]');
    if (!isStringArray(d.tags)) errors.push('data.tags must be string[]');
    if (!d.extensions || typeof d.extensions !== 'object' || Array.isArray(d.extensions)) errors.push('data.extensions must be an object');
    if (d.character_book !== undefined) validateCharacterBook(d.character_book, errors);
    if (v === 3) {
      if (!isStringArray(d.group_only_greetings)) errors.push('data.group_only_greetings must be string[]');
      if (d.source !== undefined && !isStringArray(d.source)) errors.push('data.source must be string[]');
      if (d.nickname !== undefined && typeof d.nickname !== 'string') errors.push('data.nickname must be a string');
      for (const k of ['creation_date', 'modification_date']) if (d[k] !== undefined && !Number.isInteger(d[k])) errors.push(`data.${k} must be an integer (seconds)`);
      if (d.assets !== undefined) {
        if (!Array.isArray(d.assets)) errors.push('data.assets must be an array');
        else d.assets.forEach((a, i) => ['type', 'uri', 'name', 'ext'].forEach((k) => { if (typeof a[k] !== 'string') errors.push(`asset ${i}: ${k} must be a string`); }));
      }
    }
    return errors;
  }

  // ===========================================================================
  // Lorebooks: JanitorAI script → V2 character_book / SillyTavern World Info
  // ===========================================================================

  function splitKeys(v) {
    if (Array.isArray(v)) return v.map((k) => str(k).trim()).filter(Boolean);
    return str(v).split(',').map((k) => k.trim()).filter(Boolean);
  }

  function parseMaybeJson(v) {
    if (typeof v !== 'string') return v;
    try {
      return JSON.parse(v);
    } catch (e) {
      return undefined;
    }
  }

  function normalizeLoreEntry(e, i) {
    if (!e || typeof e !== 'object') return null;
    const content = str(e.content !== undefined ? e.content : e.text !== undefined ? e.text : e.entry !== undefined ? e.entry : e.value);
    if (!content.trim()) return null;
    const keys = splitKeys(e.key !== undefined ? e.key : e.keys !== undefined ? e.keys : e.keywords !== undefined ? e.keywords : e.triggers);
    const constant = e.constant === true || e.always === true;
    return {
      id: i,
      name: str(e.comment || e.name || e.title),
      keys,
      secondary_keys: splitKeys(e.keysecondary !== undefined ? e.keysecondary : e.secondary_keys),
      content,
      enabled: e.enabled !== undefined ? e.enabled !== false : e.disable !== true,
      constant,
      selective: e.selective === true,
      insertion_order: Number.isFinite(Number(e.order !== undefined ? e.order : e.insertion_order !== undefined ? e.insertion_order : e.priority)) ? Number(e.order !== undefined ? e.order : e.insertion_order !== undefined ? e.insertion_order : e.priority) : 100,
      case_sensitive: e.case_sensitive === true || e.caseSensitive === true,
    };
  }

  /**
   * Parses a `/hampter/script/<id>` response. Returns
   * `{ id, title, description, kind: 'static'|'advanced'|'empty', entries, raw }`.
   * "Advanced" lorebooks are programs that build entries at chat time, so they
   * have no static entries to export (they are listed in `skipped`).
   */
  function parseJanitorLorebook(resp, id) {
    const book = resp && (resp.script !== undefined || resp.title !== undefined) ? resp : resp && resp.data ? resp.data : resp;
    if (!book || typeof book !== 'object') return null;
    let body = parseMaybeJson(book.script !== undefined ? book.script : book.entries);
    let kind = 'static';
    if (body === undefined && typeof book.script === 'string' && book.script.trim()) kind = 'advanced';
    if (body && !Array.isArray(body) && typeof body === 'object') body = body.entries || body.loreEntries || Object.values(body);
    const entries = Array.isArray(body) ? body.map(normalizeLoreEntry).filter(Boolean) : [];
    entries.forEach((e, i) => { e.id = i; });
    if (kind === 'static' && !entries.length) kind = 'empty';
    const settings = parseMaybeJson(book.settings) || {};
    return {
      id: book.id || id || null,
      title: str(book.title || book.name) || 'Lorebook',
      description: htmlToText(book.description),
      scanDepth: Number.isFinite(Number(settings.depth)) ? Number(settings.depth) : undefined,
      kind,
      entries,
      isPublic: book.is_public,
      creatorId: book.creator_id || book.user_id || null,
    };
  }

  function toCharacterBook(books, name) {
    const entries = [];
    for (const b of books) {
      for (const e of b.entries) {
        entries.push({
          id: entries.length,
          keys: e.keys.slice(),
          secondary_keys: e.secondary_keys.slice(),
          comment: e.name || (books.length > 1 ? b.title : ''),
          content: e.content,
          constant: e.constant,
          selective: e.selective || e.secondary_keys.length > 0,
          insertion_order: e.insertion_order,
          enabled: e.enabled,
          position: 'before_char',
          case_sensitive: e.case_sensitive,
          name: e.name,
          priority: e.insertion_order,
          extensions: { janitorai_lorebook: b.title },
        });
      }
    }
    const book = { name: books.length === 1 ? books[0].title : name, description: '', recursive_scanning: false, extensions: {}, entries };
    const depth = books.find((b) => b.scanDepth !== undefined);
    if (depth) book.scan_depth = depth.scanDepth;
    return book;
  }

  // SillyTavern World Info file: `{ entries: { "<uid>": {…} } }`. Field names
  // and defaults follow SillyTavern's `newWorldInfoEntryDefinition`.
  function toWorldInfo(book) {
    const entries = {};
    book.entries.forEach((e, i) => {
      entries[i] = {
        uid: i,
        key: e.keys.slice(),
        keysecondary: e.secondary_keys.slice(),
        comment: e.name || '',
        content: e.content,
        constant: e.constant,
        vectorized: false,
        selective: true,
        selectiveLogic: 0,
        addMemo: true,
        order: e.insertion_order,
        position: 0,
        disable: !e.enabled,
        ignoreBudget: false,
        excludeRecursion: false,
        preventRecursion: false,
        matchPersonaDescription: false,
        matchCharacterDescription: false,
        matchCharacterPersonality: false,
        matchCharacterDepthPrompt: false,
        matchScenario: false,
        matchCreatorNotes: false,
        delayUntilRecursion: 0,
        probability: 100,
        useProbability: true,
        depth: 4,
        outletName: '',
        group: '',
        groupOverride: false,
        groupWeight: 100,
        scanDepth: book.scanDepth !== undefined ? book.scanDepth : null,
        caseSensitive: e.case_sensitive ? true : null,
        matchWholeWords: null,
        useGroupScoring: null,
        automationId: '',
        role: 0,
        sticky: null,
        cooldown: null,
        delay: null,
        triggers: [],
        displayIndex: i,
        extensions: {},
      };
    });
    return { name: book.title, description: book.description || '', entries, extensions: { janitorai: { id: book.id || null } } };
  }

  // ===========================================================================
  // Character exports: TXT and raw JSON
  // ===========================================================================

  function buildCharacterText(data, guarded) {
    const lines = [];
    const section = (title, body) => {
      if (body === undefined || body === null || (Array.isArray(body) ? !body.length : !String(body).trim())) return;
      lines.push(`=== ${title} ===`);
      if (Array.isArray(body)) body.forEach((b, i) => lines.push(`--- #${i + 1} ---`, b));
      else lines.push(String(body));
      lines.push('');
    };
    lines.push(data.name, '');
    if (guarded && guarded.definitionHidden) lines.push(`NOTE: ${noticeFor(guarded)}`, '');
    section('Creator', data.creator ? `${data.creator}${data.extensions.janitorai.creator_url ? ` (${data.extensions.janitorai.creator_url})` : ''}` : '');
    section('Source', data.extensions.janitorai.url);
    section('Tags', data.tags.join(', '));
    section('Creator notes / tagline', data.creator_notes);
    section('Personality / description (main definition)', data.description);
    if (data.personality && data.personality !== data.description) section('Personality', data.personality);
    section('Scenario', data.scenario);
    section('First message', data.first_mes);
    section('Alternate greetings', data.alternate_greetings);
    section('Example dialogs', data.mes_example);
    section('System prompt', data.system_prompt);
    section('Post-history instructions', data.post_history_instructions);
    if (data.character_book) {
      section('Lorebook', data.character_book.entries.map((e) => `[${e.keys.join(', ') || (e.constant ? 'always on' : 'no keys')}]${e.comment ? ` ${e.comment}` : ''}\n${e.content}`));
    }
    return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
  }

  function buildRawCharacterJson(guarded) {
    return Object.assign({}, guarded.char, {
      _export: {
        exporter: `${EXPORTER_ID}@${VERSION}`,
        definition_hidden: guarded.definitionHidden,
        note: guarded.definitionHidden ? noticeFor(guarded) : undefined,
      },
    });
  }

  // ===========================================================================
  // Chats
  // ===========================================================================

  function messageText(m) {
    return str(m.message !== undefined ? m.message : m.content !== undefined ? m.content : m.text);
  }

  function messageTime(m) {
    const t = new Date(m.created_at || m.createdAt || m.date || 0).getTime();
    return Number.isFinite(t) ? t : 0;
  }

  /**
   * Turns a `/hampter/chats/<id>` response into a normalized chat.
   * Bot messages with `is_main === false` become swipes of the bot reply in the
   * same turn. On earlier turns they are rerolls the user did not keep. On the
   * latest turn every reply is `is_main: false` until the user writes again
   * (seen live), so the newest one is the selected swipe.
   */
  function normalizeChat(resp, ctx) {
    const c = ctx || {};
    const r = resp || {};
    const meta = r.chat || {};
    const rawMessages = Array.isArray(r.chatMessages) ? r.chatMessages : Array.isArray(r.messages) ? r.messages : Array.isArray(r) ? r : [];
    const persona = (Array.isArray(r.personas) && r.personas[0]) || r.persona || null;
    const sorted = rawMessages
      .filter((m) => m && typeof m === 'object')
      .map((m, i) => ({ m, i }))
      .sort((a, b) => messageTime(a.m) - messageTime(b.m) || a.i - b.i)
      .map((x) => x.m);

    const messages = [];
    let turnStart = 0;
    let orphans = [];
    const lastBotInTurn = () => {
      for (let k = messages.length - 1; k >= turnStart; k--) if (!messages[k].isUser) return messages[k];
      return null;
    };
    const flushOrphans = () => {
      if (!orphans.length) return;
      const target = lastBotInTurn();
      if (target) {
        target.swipes.push(...orphans.map(toSwipe));
      } else {
        // A turn whose replies were all rejected: keep them, show the latest.
        const last = orphans[orphans.length - 1];
        messages.push({ id: last.id, isUser: false, text: messageText(last), date: toIsoDate(last.created_at), isMain: false, swipes: orphans.map(toSwipe) });
      }
      orphans = [];
    };
    const toSwipe = (m) => ({ id: m.id, text: messageText(m), date: toIsoDate(m.created_at), isMain: m.is_main !== false });

    for (const m of sorted) {
      const isUser = m.is_bot === false || m.role === 'user' || m.is_user === true;
      if (isUser) {
        flushOrphans();
        messages.push({ id: m.id, isUser: true, text: messageText(m), date: toIsoDate(m.created_at), isMain: true, swipes: [] });
        turnStart = messages.length;
        continue;
      }
      if (m.is_main === false) {
        const target = lastBotInTurn();
        if (target) target.swipes.push(toSwipe(m));
        else orphans.push(m);
        continue;
      }
      const msg = { id: m.id, isUser: false, text: messageText(m), date: toIsoDate(m.created_at), isMain: true, swipes: [toSwipe(m)] };
      if (orphans.length) {
        msg.swipes = orphans.map(toSwipe).concat(msg.swipes);
        orphans = [];
      }
      messages.push(msg);
    }
    flushOrphans();

    for (const msg of messages) {
      if (msg.isUser) continue;
      msg.swipes.sort((a, b) => new Date(a.date) - new Date(b.date));
      let idx = msg.swipes.findIndex((s) => s.id === msg.id && s.isMain);
      if (idx < 0) idx = msg.swipes.length - 1;
      msg.swipeIndex = idx;
    }

    const character = r.character || c.character || {};
    return {
      id: meta.id !== undefined ? meta.id : c.chatId !== undefined ? c.chatId : null,
      characterId: meta.character_id || character.id || c.characterId || null,
      characterName: str(c.characterName || character.name || meta.character_name).trim() || 'Character',
      userName: str(c.userName || (persona && persona.name)).trim() || 'You',
      persona: persona ? { name: str(persona.name), appearance: str(persona.appearance || persona.description), pronouns: str(persona.pronouns) } : null,
      title: str(meta.title || meta.summary || c.title),
      createdAt: toIsoDate(meta.created_at || (messages[0] && messages[0].date)),
      updatedAt: toIsoDate(meta.updated_at || (messages.length && messages[messages.length - 1].date)),
      messages,
      raw: r,
    };
  }

  /**
   * SillyTavern chat file. Checked against SillyTavern's importer: the first
   * line must be a header with `user_name`/`character_name`/`chat_metadata`;
   * it is shifted off on load, so a missing header eats the first message.
   * Every message carries `extra: {}` (SillyTavern writes into it without a
   * guard) and bot messages carry consistent `swipes`/`swipe_id`/`swipe_info`.
   */
  function buildSillyTavernJsonl(chat, opts) {
    const o = opts || {};
    const userName = str(o.userName || chat.userName) || 'You';
    const charName = str(o.characterName || chat.characterName) || 'Character';
    const header = {
      user_name: userName,
      character_name: charName,
      create_date: humanizedDateTime(chat.createdAt ? new Date(chat.createdAt) : new Date()),
      chat_metadata: {},
    };
    const lines = [JSON.stringify(header)];
    for (const m of chat.messages) {
      const line = {
        name: m.isUser ? userName : charName,
        is_user: m.isUser,
        is_system: false,
        send_date: m.date,
        mes: str(m.isUser ? m.text : (m.swipes[m.swipeIndex] || { text: m.text }).text),
        extra: {},
      };
      if (!m.isUser) {
        const swipes = m.swipes.length ? m.swipes : [{ text: m.text, date: m.date }];
        line.swipe_id = Math.min(Math.max(0, m.swipeIndex || 0), swipes.length - 1);
        line.swipes = swipes.map((s) => str(s.text));
        line.swipe_info = swipes.map((s) => ({ send_date: s.date || m.date, extra: {} }));
        line.mes = line.swipes[line.swipe_id];
      }
      lines.push(JSON.stringify(line));
    }
    return lines.join('\n');
  }

  function parseJsonl(text) {
    return str(text).split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l));
  }

  // Mirrors what SillyTavern's /api/chats/import + getChat() accept.
  function validateSillyTavernJsonl(text) {
    const errors = [];
    let rows;
    try {
      rows = parseJsonl(text);
    } catch (e) {
      return [`invalid JSON line: ${e.message}`];
    }
    if (!rows.length) return ['empty file'];
    const h = rows[0];
    if (!(h.user_name !== undefined || h.name !== undefined || h.chat_metadata !== undefined)) errors.push('header line missing user_name/name/chat_metadata');
    if (h.mes !== undefined) errors.push('first line is a message, not a header');
    rows.slice(1).forEach((m, i) => {
      if (typeof m.mes !== 'string') errors.push(`message ${i}: mes must be a string`);
      if (typeof m.is_user !== 'boolean') errors.push(`message ${i}: is_user must be boolean`);
      if (typeof m.name !== 'string') errors.push(`message ${i}: name must be a string`);
      if (!m.extra || typeof m.extra !== 'object') errors.push(`message ${i}: extra must be an object`);
      if (m.swipes !== undefined) {
        if (!isStringArray(m.swipes) || !m.swipes.length) errors.push(`message ${i}: swipes must be a non-empty string[]`);
        else {
          if (!Number.isInteger(m.swipe_id) || m.swipe_id < 0 || m.swipe_id >= m.swipes.length) errors.push(`message ${i}: swipe_id out of range`);
          if (m.swipes[m.swipe_id] !== m.mes) errors.push(`message ${i}: mes differs from the selected swipe`);
          if (!Array.isArray(m.swipe_info) || m.swipe_info.length !== m.swipes.length) errors.push(`message ${i}: swipe_info length mismatch`);
        }
      }
    });
    return errors;
  }

  function chatHeading(chat) {
    return `Chat with ${chat.characterName}`;
  }

  function buildChatMarkdown(chat) {
    const out = [`# ${chatHeading(chat)}`, ''];
    if (chat.title) out.push(`*${chat.title}*`, '');
    out.push(`- Character: ${chat.characterName}`, `- You: ${chat.userName}`, `- Messages: ${chat.messages.length}`, `- Started: ${chat.createdAt}`, `- Exported: ${new Date().toISOString()} by JanitorAI Backup & Export ${VERSION}`, '', '---', '');
    for (const m of chat.messages) {
      const text = m.isUser ? m.text : (m.swipes[m.swipeIndex] || m).text;
      out.push(`**${m.isUser ? chat.userName : chat.characterName}** · ${m.date}`, '', text, '');
      const others = m.isUser ? [] : m.swipes.filter((_, i) => i !== m.swipeIndex);
      if (others.length) {
        out.push(`<details><summary>${others.length} other repl${others.length === 1 ? 'y' : 'ies'} (swipes)</summary>`, '');
        others.forEach((s) => out.push(s.text.split('\n').map((l) => `> ${l}`).join('\n'), ''));
        out.push('</details>', '');
      }
    }
    return out.join('\n');
  }

  function buildChatText(chat) {
    const out = [chatHeading(chat), '='.repeat(chatHeading(chat).length), ''];
    if (chat.title) out.push(chat.title, '');
    for (const m of chat.messages) {
      const text = m.isUser ? m.text : (m.swipes[m.swipeIndex] || m).text;
      out.push(`[${m.date}] ${m.isUser ? chat.userName : chat.characterName}:`, text, '');
      const others = m.isUser ? [] : m.swipes.filter((_, i) => i !== m.swipeIndex);
      others.forEach((s, i) => out.push(`    (swipe ${i + 1}) ${s.text.replace(/\n/g, '\n    ')}`, ''));
    }
    return out.join('\n');
  }

  function buildChatHtml(chat) {
    const rows = chat.messages.map((m) => {
      const text = m.isUser ? m.text : (m.swipes[m.swipeIndex] || m).text;
      const others = m.isUser ? [] : m.swipes.filter((_, i) => i !== m.swipeIndex);
      const swipes = others.length
        ? `<details><summary>${others.length} other repl${others.length === 1 ? 'y' : 'ies'}</summary>${others.map((s) => `<div class="swipe">${escapeHtml(s.text)}</div>`).join('')}</details>`
        : '';
      return `<article class="msg ${m.isUser ? 'user' : 'bot'}"><header><b>${escapeHtml(m.isUser ? chat.userName : chat.characterName)}</b> <time>${escapeHtml(m.date)}</time></header><div class="text">${escapeHtml(text)}</div>${swipes}</article>`;
    }).join('\n');
    return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(chatHeading(chat))}</title>
<style>
:root{color-scheme:light dark;--bg:#f6f5f2;--fg:#1d1d1f;--user:#e3eefc;--bot:#fff;--muted:#6b6b70;--line:#d9d9de}
@media (prefers-color-scheme:dark){:root{--bg:#141417;--fg:#ececf0;--user:#1f2d44;--bot:#1e1e23;--muted:#9a9aa3;--line:#2c2c33}}
body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.55 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
main{max-width:760px;margin:0 auto;padding:24px 16px 64px}
h1{font-size:1.4rem;margin:0 0 4px}.meta{color:var(--muted);font-size:.9rem;margin-bottom:24px}
.msg{border:1px solid var(--line);border-radius:12px;padding:12px 14px;margin:12px 0;background:var(--bot)}
.msg.user{background:var(--user)}.msg header{font-size:.85rem;color:var(--muted);margin-bottom:6px}.msg header b{color:var(--fg)}
.text,.swipe{white-space:pre-wrap;overflow-wrap:anywhere}.swipe{border-top:1px dashed var(--line);margin-top:8px;padding-top:8px;opacity:.85}
details summary{cursor:pointer;color:var(--muted);font-size:.85rem;margin-top:8px}
</style></head><body><main>
<h1>${escapeHtml(chatHeading(chat))}</h1>
<div class="meta">${escapeHtml(chat.title ? `${chat.title} · ` : '')}${chat.messages.length} messages · you: ${escapeHtml(chat.userName)} · exported ${escapeHtml(new Date().toISOString())}</div>
${rows}
</main></body></html>
`;
  }

  function buildChatJson(chat) {
    return {
      format: `${EXPORTER_ID}/chat`,
      version: 1,
      exported_at: new Date().toISOString(),
      chat_id: chat.id,
      character_id: chat.characterId,
      character_name: chat.characterName,
      user_name: chat.userName,
      persona: chat.persona,
      title: chat.title,
      created_at: chat.createdAt,
      updated_at: chat.updatedAt,
      messages: chat.messages.map((m) => ({
        id: m.id,
        is_user: m.isUser,
        is_main: m.isMain,
        date: m.date,
        text: m.isUser ? m.text : (m.swipes[m.swipeIndex] || m).text,
        swipe_index: m.isUser ? undefined : m.swipeIndex,
        swipes: m.isUser ? undefined : m.swipes.map((s) => ({ id: s.id, text: s.text, date: s.date, is_main: s.isMain })),
      })),
      // The exact API response, for full fidelity.
      janitorai_raw: chat.raw,
    };
  }

  // ===========================================================================
  // Personas
  // ===========================================================================

  function normalizePersona(p) {
    if (!p || typeof p !== 'object' || !str(p.name).trim()) return null;
    return {
      id: p.id || null,
      name: str(p.name).trim(),
      description: str(p.appearance !== undefined ? p.appearance : p.description),
      pronouns: str(p.pronouns),
      avatar: str(p.avatar),
      isDefault: p.is_default === true || p.isDefault === true,
    };
  }

  function dedupePersonas(list) {
    const out = [];
    const seen = new Set();
    for (const p of list.map(normalizePersona).filter(Boolean)) {
      const key = p.id ? `id:${p.id}` : `n:${p.name}\u0000${p.description}`;
      if (!seen.has(key)) {
        seen.add(key);
        out.push(p);
      }
    }
    return out;
  }

  // SillyTavern "Backup personas" format (Persona Management → Restore).
  function buildSillyTavernPersonaBackup(personas, now) {
    const stamp = now || Date.now();
    const backup = { personas: {}, persona_descriptions: {}, default_persona: null };
    const files = [];
    const used = new Set();
    personas.forEach((p, i) => {
      const slug = sanitizeFilename(p.name).replace(/[^\p{L}\p{N}_-]+/gu, '_').slice(0, 40) || 'persona';
      const file = uniqueName(used, `${stamp + i}-${slug}.png`);
      backup.personas[file] = p.name;
      const desc = p.pronouns && !p.description.includes(p.pronouns) ? `${p.description}${p.description ? '\n' : ''}Pronouns: ${p.pronouns}` : p.description;
      backup.persona_descriptions[file] = { description: desc, position: 0, depth: 2, role: 0, lorebook: '', title: '' };
      if (p.isDefault) backup.default_persona = file;
      files.push({ file, persona: p });
    });
    if (!backup.default_persona) delete backup.default_persona;
    return { backup, files };
  }

  // ===========================================================================
  // Throttling, retry, bulk orchestration
  // ===========================================================================

  function defaultSleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  function createLimiter(options) {
    const o = options || {};
    const concurrency = Math.max(1, Math.min(MAX_CONCURRENCY, o.concurrency || MAX_CONCURRENCY));
    let delayMs = o.delayMs || 0;
    const sleep = o.sleep || defaultSleep;
    const now = o.now || (() => Date.now());
    const queue = [];
    let active = 0;
    let nextSlot = 0;
    const stats = { maxActive: 0, started: 0 };
    function pump() {
      while (active < concurrency && queue.length) {
        const job = queue.shift();
        active++;
        stats.maxActive = Math.max(stats.maxActive, active);
        (async () => {
          const t = now();
          const wait = Math.max(0, nextSlot - t);
          nextSlot = Math.max(t, nextSlot) + delayMs;
          if (wait) await sleep(wait);
          stats.started++;
          try {
            job.resolve(await job.fn());
          } catch (e) {
            job.reject(e);
          } finally {
            active--;
            pump();
          }
        })();
      }
    }
    return {
      run(fn) {
        return new Promise((resolve, reject) => {
          queue.push({ fn, resolve, reject });
          pump();
        });
      },
      setDelay(ms) {
        delayMs = ms;
      },
      get active() {
        return active;
      },
      stats,
    };
  }

  class HttpError extends Error {
    constructor(message, info) {
      super(message);
      const i = info || {};
      this.name = 'HttpError';
      this.status = i.status || 0;
      this.source = i.source || 'network';
      this.url = i.url || '';
      this.retryAfter = i.retryAfter;
      this.network = !!i.network;
      // 401/403: login lost or the site's firewall said no. 429 here means the
      // retries with backoff were already used up. All three pause a bulk run
      // instead of moving on to the next item.
      this.fatal = this.status === 401 || this.status === 403 || this.status === 429;
    }
  }

  function throttleDelayMs(preset) {
    const ms = Object.prototype.hasOwnProperty.call(THROTTLE_PRESETS, preset) ? THROTTLE_PRESETS[preset] : THROTTLE_PRESETS.normal;
    return Math.max(MIN_REQUEST_DELAY_MS, ms);
  }

  function isRetryable(err) {
    return !!err && (err.network || RETRYABLE_STATUS.includes(err.status));
  }

  function computeBackoff(attempt, retryAfterSec, baseMs, maxMs, random) {
    const cap = maxMs || 30000;
    if (retryAfterSec !== undefined && retryAfterSec !== null && Number.isFinite(Number(retryAfterSec))) {
      return Math.min(cap, Math.max(0, Number(retryAfterSec) * 1000));
    }
    const base = baseMs === undefined ? 1000 : baseMs;
    const jitter = (random || Math.random)() * base * 0.5;
    return Math.min(cap, base * Math.pow(2, attempt) + jitter);
  }

  async function withRetry(fn, options) {
    const o = options || {};
    const retries = o.retries === undefined ? 4 : o.retries;
    const sleep = o.sleep || defaultSleep;
    for (let attempt = 0; ; attempt++) {
      try {
        return await fn(attempt);
      } catch (e) {
        if (attempt >= retries || !isRetryable(e)) throw e;
        if (o.onRetry) o.onRetry(e, attempt);
        await sleep(computeBackoff(attempt, e.retryAfter, o.baseMs, o.maxMs, o.random));
      }
    }
  }

  /**
   * Runs `worker(item)` for each item in order. Per-item failures go to
   * `skipped` with a reason; a fatal error (lost login, offline) pauses the run
   * and returns `nextIndex` so the caller can resume from there.
   */
  async function runBulk(items, worker, options) {
    const o = options || {};
    const state = o.state || { nextIndex: 0, results: [], skipped: [] };
    for (let i = state.nextIndex; i < items.length; i++) {
      if (o.isCancelled && o.isCancelled()) return Object.assign(state, { status: 'cancelled' });
      const item = items[i];
      if (o.onProgress) o.onProgress({ done: i, total: items.length, item });
      try {
        const res = await worker(item, i);
        if (res !== undefined) state.results.push(res);
      } catch (e) {
        if (e && e.fatal) {
          state.nextIndex = i;
          return Object.assign(state, { status: 'paused', error: e });
        }
        state.skipped.push({
          id: item && item.id !== undefined ? item.id : null,
          name: item && item.name ? item.name : null,
          what: item && item.kind ? item.kind : 'item',
          why: describeError(e),
        });
      }
      state.nextIndex = i + 1;
    }
    if (o.onProgress) o.onProgress({ done: items.length, total: items.length, item: null });
    return Object.assign(state, { status: 'done', error: null });
  }

  function describeError(e) {
    if (!e) return 'unknown error';
    if (e.status) return `HTTP ${e.status}${e.source ? ` from ${e.source}` : ''}`;
    if (e.network) return 'network error';
    return str(e.message || e);
  }

  /**
   * One page of a chat list response. Returns `{ batch, hasMore }`, or null
   * when none of the known array keys is there (JanitorAI changed the API), so
   * the caller can say so instead of exporting nothing.
   */
  function readListPage(resp, keys) {
    if (!resp || typeof resp !== 'object') return null;
    const key = keys.find((k) => Array.isArray(resp[k]));
    if (!key) return Array.isArray(resp) ? { batch: resp, hasMore: false } : null;
    return { batch: resp[key], hasMore: resp.hasMore === true || resp.has_more === true };
  }

  function buildManifest(info) {
    const i = info || {};
    return {
      format: `${EXPORTER_ID}/backup`,
      exporter_version: VERSION,
      created_at: toIsoDate(i.now || Date.now()),
      source: SITE_ORIGIN,
      counts: Object.assign({ characters: 0, chats: 0, messages: 0, personas: 0, lorebooks: 0, skipped: 0 }, i.counts || {}),
      card_spec: ['chara_card_v2 2.0', 'chara_card_v3 3.0'],
      chat_formats: i.chatFormats || [],
      notes: [
        'Characters whose creator hid the definition contain public data only.',
        'Card PNGs carry both a `chara` (V2) and a `ccv3` (V3) chunk.',
        'Import a character card into SillyTavern before importing its chats.',
      ].concat(i.notes || []),
    };
  }

  // ===========================================================================
  // Sponsor card logic (SPEC §7)
  // ===========================================================================

  function buildSponsorUrl(placement) {
    const params = Object.assign({}, SPONSOR.params, { aff_sub2: str(placement) || 'panel' });
    const qs = Object.keys(params).map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&');
    return `${SPONSOR.baseUrl}?${qs}`;
  }

  function shouldShowSponsor(s) {
    const x = s || {};
    const enabled = x.enabled === undefined ? SPONSOR_ENABLED : x.enabled;
    if (!enabled) return false;
    if (!x.exportSucceeded) return false;
    if (x.dismissedForever || x.userDisabled) return false;
    const last = Number(x.lastShownAt) || 0;
    return (x.now || Date.now()) - last >= SPONSOR.cooldownMs;
  }

  // ===========================================================================
  // i18n (panel): en, pt-BR, es, id
  // ===========================================================================

  const STRINGS = {
    en: {
      btn_open: 'Backup / Export',
      panel_title: 'JanitorAI Backup & Export',
      close: 'Close',
      privacy: 'Runs in your browser. Talks only to janitorai.com. No tracking.',
      section_character: 'This character',
      section_chat: 'This chat',
      section_account: 'Your account',
      section_list: 'Characters on this page',
      section_settings: 'Settings',
      loading: 'Loading…',
      parts_title: 'Parts to include',
      part_description: 'Description (main definition)',
      part_personality: 'Personality field (SpicyChat / Saucepan target)',
      part_scenario: 'Scenario',
      part_first_mes: 'First message',
      part_alternate_greetings: 'Alternate greetings',
      part_mes_example: 'Example dialogs',
      part_system_prompt: 'System prompt',
      part_post_history_instructions: 'Post-history instructions',
      part_tags: 'Tags',
      part_creator_notes: 'Creator notes (tagline)',
      part_character_book: 'Lorebook entries',
      empty: '(empty)',
      formats_title: 'Formats',
      fmt_png: 'PNG card (V2 + V3)',
      fmt_json_v2: 'JSON card V2',
      fmt_json_v3: 'JSON card V3',
      fmt_lorebook: 'Lorebook (SillyTavern World Info)',
      fmt_txt: 'TXT (readable)',
      fmt_raw: 'JanitorAI JSON (raw)',
      fmt_jsonl: 'SillyTavern JSONL',
      fmt_md: 'Markdown',
      fmt_chat_txt: 'TXT',
      fmt_html: 'HTML (readable)',
      fmt_json: 'JSON (full, with swipes)',
      macros_title: 'Names in the text',
      macros_keep: 'Keep the original text',
      macros_normalize: 'Use {{char}} / {{user}}',
      target_title: 'Import target',
      target_st: 'SillyTavern and Tavern readers',
      target_compat: 'SpicyChat / Saucepan (also fill “personality”)',
      export: 'Export',
      exporting: 'Exporting…',
      saved: 'Saved: {file}',
      hidden_notice: "The creator hid this character's definition, so only the public parts can be saved.",
      owner_missing: "You made this character, but JanitorAI didn't return its definition. Only the public parts can be saved.",
      login_for_definition: "Log in to janitorai.com to save this character's definition — JanitorAI only sends it to logged-in users.",
      chat_tip: 'Tip: import the character card into SillyTavern first, then import this chat from that character’s chat list.',
      chat_with_card: 'Card + chat as one ZIP',
      export_all_chats: 'Export all my chats',
      backup_all: 'Back up everything',
      export_personas: 'Export personas',
      export_selected: 'Export selected ({n})',
      export_page: 'Export all on this page ({n})',
      progress: '{done} / {total} {name}',
      skipped_n: '{n} item(s) skipped. The reasons are in skipped.json.',
      resume: 'Resume',
      save_partial: 'Save what we have',
      cancel: 'Cancel',
      paused: 'Paused: {reason}',
      login_needed: 'Log in to janitorai.com first. Chats need your own login.',
      report: 'Report this',
      src_character_api: 'JanitorAI changed its character API',
      src_chat_api: 'JanitorAI changed its chat API',
      src_chat_list_api: 'JanitorAI changed its chat list API',
      src_lorebook_api: 'A lorebook could not be read',
      src_page_state: 'JanitorAI changed its page data',
      src_dom: 'JanitorAI changed its page layout',
      src_network: 'Network problem',
      src_failed_detail: '{source} ({detail}).',
      using_fallback: 'Using a fallback source: {layer}.',
      avatar_placeholder: 'The avatar could not be loaded, so a placeholder image was used.',
      pick_format: 'Pick at least one format.',
      no_cards_found: 'No character cards found on this page yet. Scroll to load them.',
      no_personas: 'No personas found. Open your personas page or a chat, then try again.',
      no_chats_found: 'No chats found on this account, so there is nothing to back up yet. Chat with a character first (comments on a character page are not chats).',
      set_card_formats: 'Default card formats',
      set_chat_formats: 'Default chat formats',
      set_template: 'File name template',
      set_template_hint: 'Variables: {name} {creator} {date} {id}',
      set_throttle: 'Speed',
      throttle_slow: 'Gentle',
      throttle_normal: 'Normal',
      throttle_fast: 'Faster',
      set_sponsor_off: 'Never show the sponsor card',
      set_language: 'Language',
      lang_auto: 'Automatic',
      save: 'Save',
      saved_settings: 'Settings saved.',
      select: 'Select',
      export_one: 'Export this card',
      sponsor_label: 'Sponsored',
      sponsor_title: 'Want this character to send you pictures?',
      sponsor_text: 'Chat with an AI that replies and sends photos.',
      sponsor_button: 'Try Promptchan',
      sponsor_dismiss: "Don't show again",
      validation_failed: 'Self-check failed: {detail}',
    },
    'pt-BR': {
      btn_open: 'Backup / Exportar',
      panel_title: 'JanitorAI Backup e Exportação',
      close: 'Fechar',
      privacy: 'Roda no seu navegador. Fala só com janitorai.com. Sem rastreamento.',
      section_character: 'Este personagem',
      section_chat: 'Este chat',
      section_account: 'Sua conta',
      section_list: 'Personagens nesta página',
      section_settings: 'Configurações',
      loading: 'Carregando…',
      parts_title: 'Partes a incluir',
      part_description: 'Descrição (definição principal)',
      part_personality: 'Campo personalidade (destino SpicyChat / Saucepan)',
      part_scenario: 'Cenário',
      part_first_mes: 'Primeira mensagem',
      part_alternate_greetings: 'Saudações alternativas',
      part_mes_example: 'Diálogos de exemplo',
      part_system_prompt: 'Prompt de sistema',
      part_post_history_instructions: 'Instruções pós-histórico',
      part_tags: 'Tags',
      part_creator_notes: 'Notas do criador (resumo)',
      part_character_book: 'Entradas do lorebook',
      empty: '(vazio)',
      formats_title: 'Formatos',
      fmt_png: 'Cartão PNG (V2 + V3)',
      fmt_json_v2: 'Cartão JSON V2',
      fmt_json_v3: 'Cartão JSON V3',
      fmt_lorebook: 'Lorebook (World Info do SillyTavern)',
      fmt_txt: 'TXT (legível)',
      fmt_raw: 'JSON do JanitorAI (bruto)',
      fmt_jsonl: 'JSONL do SillyTavern',
      fmt_md: 'Markdown',
      fmt_chat_txt: 'TXT',
      fmt_html: 'HTML (legível)',
      fmt_json: 'JSON (completo, com swipes)',
      macros_title: 'Nomes no texto',
      macros_keep: 'Manter o texto original',
      macros_normalize: 'Usar {{char}} / {{user}}',
      target_title: 'Destino da importação',
      target_st: 'SillyTavern e leitores Tavern',
      target_compat: 'SpicyChat / Saucepan (preenche também “personality”)',
      export: 'Exportar',
      exporting: 'Exportando…',
      saved: 'Salvo: {file}',
      hidden_notice: 'O criador ocultou a definição deste personagem, então só as partes públicas podem ser salvas.',
      owner_missing: 'Você criou este personagem, mas o JanitorAI não enviou a definição. Só as partes públicas podem ser salvas.',
      login_for_definition: 'Entre no janitorai.com para salvar a definição deste personagem — o JanitorAI só a envia para usuários logados.',
      chat_tip: 'Dica: importe primeiro o cartão do personagem no SillyTavern e depois importe este chat na lista de chats desse personagem.',
      chat_with_card: 'Cartão + chat em um ZIP',
      export_all_chats: 'Exportar todos os meus chats',
      backup_all: 'Fazer backup de tudo',
      export_personas: 'Exportar personas',
      export_selected: 'Exportar selecionados ({n})',
      export_page: 'Exportar todos desta página ({n})',
      progress: '{done} / {total} {name}',
      skipped_n: '{n} item(ns) ignorado(s). Os motivos estão em skipped.json.',
      resume: 'Continuar',
      save_partial: 'Salvar o que já foi feito',
      cancel: 'Cancelar',
      paused: 'Pausado: {reason}',
      login_needed: 'Entre no janitorai.com primeiro. Os chats precisam do seu login.',
      report: 'Relatar',
      src_character_api: 'O JanitorAI mudou a API de personagens',
      src_chat_api: 'O JanitorAI mudou a API de chats',
      src_chat_list_api: 'O JanitorAI mudou a API da lista de chats',
      src_lorebook_api: 'Não foi possível ler um lorebook',
      src_page_state: 'O JanitorAI mudou os dados da página',
      src_dom: 'O JanitorAI mudou o layout da página',
      src_network: 'Problema de rede',
      using_fallback: 'Usando uma fonte alternativa: {layer}.',
      avatar_placeholder: 'Não foi possível carregar o avatar; foi usada uma imagem provisória.',
      pick_format: 'Escolha pelo menos um formato.',
      no_cards_found: 'Nenhum cartão encontrado nesta página ainda. Role para carregar.',
      no_personas: 'Nenhuma persona encontrada. Abra sua página de personas ou um chat e tente de novo.',
      no_chats_found: 'Nenhum chat encontrado nesta conta, então ainda não há nada para salvar. Converse com um personagem primeiro (comentários na página do personagem não são chats).',
      set_card_formats: 'Formatos padrão de cartão',
      set_chat_formats: 'Formatos padrão de chat',
      set_template: 'Modelo de nome de arquivo',
      set_template_hint: 'Variáveis: {name} {creator} {date} {id}',
      set_throttle: 'Velocidade',
      throttle_slow: 'Suave',
      throttle_normal: 'Normal',
      throttle_fast: 'Mais rápida',
      set_sponsor_off: 'Nunca mostrar o cartão patrocinado',
      set_language: 'Idioma',
      lang_auto: 'Automático',
      save: 'Salvar',
      saved_settings: 'Configurações salvas.',
      select: 'Selecionar',
      export_one: 'Exportar este cartão',
      sponsor_label: 'Patrocinado',
      validation_failed: 'Autoverificação falhou: {detail}',
    },
    es: {
      btn_open: 'Copia / Exportar',
      panel_title: 'JanitorAI Copia y Exportación',
      close: 'Cerrar',
      privacy: 'Funciona en tu navegador. Solo habla con janitorai.com. Sin rastreo.',
      section_character: 'Este personaje',
      section_chat: 'Este chat',
      section_account: 'Tu cuenta',
      section_list: 'Personajes en esta página',
      section_settings: 'Ajustes',
      loading: 'Cargando…',
      parts_title: 'Partes a incluir',
      part_description: 'Descripción (definición principal)',
      part_personality: 'Campo personalidad (destino SpicyChat / Saucepan)',
      part_scenario: 'Escenario',
      part_first_mes: 'Primer mensaje',
      part_alternate_greetings: 'Saludos alternativos',
      part_mes_example: 'Diálogos de ejemplo',
      part_system_prompt: 'Prompt de sistema',
      part_post_history_instructions: 'Instrucciones post-historial',
      part_tags: 'Etiquetas',
      part_creator_notes: 'Notas del creador (resumen)',
      part_character_book: 'Entradas del lorebook',
      empty: '(vacío)',
      formats_title: 'Formatos',
      fmt_png: 'Tarjeta PNG (V2 + V3)',
      fmt_json_v2: 'Tarjeta JSON V2',
      fmt_json_v3: 'Tarjeta JSON V3',
      fmt_lorebook: 'Lorebook (World Info de SillyTavern)',
      fmt_txt: 'TXT (legible)',
      fmt_raw: 'JSON de JanitorAI (sin procesar)',
      fmt_jsonl: 'JSONL de SillyTavern',
      fmt_md: 'Markdown',
      fmt_chat_txt: 'TXT',
      fmt_html: 'HTML (legible)',
      fmt_json: 'JSON (completo, con swipes)',
      macros_title: 'Nombres en el texto',
      macros_keep: 'Mantener el texto original',
      macros_normalize: 'Usar {{char}} / {{user}}',
      target_title: 'Destino de importación',
      target_st: 'SillyTavern y lectores Tavern',
      target_compat: 'SpicyChat / Saucepan (rellena también “personality”)',
      export: 'Exportar',
      exporting: 'Exportando…',
      saved: 'Guardado: {file}',
      hidden_notice: 'El creador ocultó la definición de este personaje, así que solo se pueden guardar las partes públicas.',
      owner_missing: 'Tú creaste este personaje, pero JanitorAI no devolvió su definición. Solo se pueden guardar las partes públicas.',
      login_for_definition: 'Inicia sesión en janitorai.com para guardar la definición de este personaje: JanitorAI solo la envía a usuarios con sesión iniciada.',
      chat_tip: 'Consejo: importa primero la tarjeta del personaje en SillyTavern y luego importa este chat desde la lista de chats de ese personaje.',
      chat_with_card: 'Tarjeta + chat en un ZIP',
      export_all_chats: 'Exportar todos mis chats',
      backup_all: 'Copia de todo',
      export_personas: 'Exportar personas',
      export_selected: 'Exportar seleccionados ({n})',
      export_page: 'Exportar todos los de esta página ({n})',
      progress: '{done} / {total} {name}',
      skipped_n: '{n} elemento(s) omitido(s). Los motivos están en skipped.json.',
      resume: 'Continuar',
      save_partial: 'Guardar lo que hay',
      cancel: 'Cancelar',
      paused: 'En pausa: {reason}',
      login_needed: 'Inicia sesión en janitorai.com primero. Los chats necesitan tu sesión.',
      report: 'Informar',
      src_character_api: 'JanitorAI cambió su API de personajes',
      src_chat_api: 'JanitorAI cambió su API de chats',
      src_chat_list_api: 'JanitorAI cambió su API de lista de chats',
      src_lorebook_api: 'No se pudo leer un lorebook',
      src_page_state: 'JanitorAI cambió los datos de la página',
      src_dom: 'JanitorAI cambió el diseño de la página',
      src_network: 'Problema de red',
      using_fallback: 'Usando una fuente alternativa: {layer}.',
      avatar_placeholder: 'No se pudo cargar el avatar; se usó una imagen provisional.',
      pick_format: 'Elige al menos un formato.',
      no_cards_found: 'Aún no hay tarjetas en esta página. Desplázate para cargarlas.',
      no_personas: 'No se encontraron personas. Abre tu página de personas o un chat y vuelve a intentarlo.',
      no_chats_found: 'No hay chats en esta cuenta, así que aún no hay nada que guardar. Chatea primero con un personaje (los comentarios en su página no son chats).',
      set_card_formats: 'Formatos de tarjeta por defecto',
      set_chat_formats: 'Formatos de chat por defecto',
      set_template: 'Plantilla de nombre de archivo',
      set_template_hint: 'Variables: {name} {creator} {date} {id}',
      set_throttle: 'Velocidad',
      throttle_slow: 'Suave',
      throttle_normal: 'Normal',
      throttle_fast: 'Más rápida',
      set_sponsor_off: 'No mostrar nunca la tarjeta patrocinada',
      set_language: 'Idioma',
      lang_auto: 'Automático',
      save: 'Guardar',
      saved_settings: 'Ajustes guardados.',
      select: 'Seleccionar',
      export_one: 'Exportar esta tarjeta',
      sponsor_label: 'Patrocinado',
      validation_failed: 'La autocomprobación falló: {detail}',
    },
    id: {
      btn_open: 'Backup / Ekspor',
      panel_title: 'JanitorAI Backup & Ekspor',
      close: 'Tutup',
      privacy: 'Berjalan di browser kamu. Hanya terhubung ke janitorai.com. Tanpa pelacakan.',
      section_character: 'Karakter ini',
      section_chat: 'Chat ini',
      section_account: 'Akun kamu',
      section_list: 'Karakter di halaman ini',
      section_settings: 'Pengaturan',
      loading: 'Memuat…',
      parts_title: 'Bagian yang disertakan',
      part_description: 'Deskripsi (definisi utama)',
      part_personality: 'Kolom personality (tujuan SpicyChat / Saucepan)',
      part_scenario: 'Skenario',
      part_first_mes: 'Pesan pertama',
      part_alternate_greetings: 'Sapaan alternatif',
      part_mes_example: 'Contoh dialog',
      part_system_prompt: 'System prompt',
      part_post_history_instructions: 'Instruksi pasca-riwayat',
      part_tags: 'Tag',
      part_creator_notes: 'Catatan kreator (tagline)',
      part_character_book: 'Entri lorebook',
      empty: '(kosong)',
      formats_title: 'Format',
      fmt_png: 'Kartu PNG (V2 + V3)',
      fmt_json_v2: 'Kartu JSON V2',
      fmt_json_v3: 'Kartu JSON V3',
      fmt_lorebook: 'Lorebook (World Info SillyTavern)',
      fmt_txt: 'TXT (mudah dibaca)',
      fmt_raw: 'JSON JanitorAI (mentah)',
      fmt_jsonl: 'JSONL SillyTavern',
      fmt_md: 'Markdown',
      fmt_chat_txt: 'TXT',
      fmt_html: 'HTML (mudah dibaca)',
      fmt_json: 'JSON (lengkap, dengan swipe)',
      macros_title: 'Nama di dalam teks',
      macros_keep: 'Pertahankan teks asli',
      macros_normalize: 'Gunakan {{char}} / {{user}}',
      target_title: 'Tujuan impor',
      target_st: 'SillyTavern dan pembaca Tavern',
      target_compat: 'SpicyChat / Saucepan (juga isi “personality”)',
      export: 'Ekspor',
      exporting: 'Mengekspor…',
      saved: 'Tersimpan: {file}',
      hidden_notice: 'Kreator menyembunyikan definisi karakter ini, jadi hanya bagian publik yang bisa disimpan.',
      owner_missing: 'Kamu membuat karakter ini, tetapi JanitorAI tidak mengirim definisinya. Hanya bagian publik yang bisa disimpan.',
      login_for_definition: 'Masuk ke janitorai.com untuk menyimpan definisi karakter ini — JanitorAI hanya mengirimnya ke pengguna yang sudah login.',
      chat_tip: 'Tips: impor kartu karakter ke SillyTavern dulu, lalu impor chat ini dari daftar chat karakter tersebut.',
      chat_with_card: 'Kartu + chat dalam satu ZIP',
      export_all_chats: 'Ekspor semua chat saya',
      backup_all: 'Backup semuanya',
      export_personas: 'Ekspor persona',
      export_selected: 'Ekspor yang dipilih ({n})',
      export_page: 'Ekspor semua di halaman ini ({n})',
      progress: '{done} / {total} {name}',
      skipped_n: '{n} item dilewati. Alasannya ada di skipped.json.',
      resume: 'Lanjutkan',
      save_partial: 'Simpan yang sudah ada',
      cancel: 'Batal',
      paused: 'Dijeda: {reason}',
      login_needed: 'Masuk ke janitorai.com dulu. Chat memerlukan login kamu sendiri.',
      report: 'Laporkan',
      src_character_api: 'JanitorAI mengubah API karakternya',
      src_chat_api: 'JanitorAI mengubah API chatnya',
      src_chat_list_api: 'JanitorAI mengubah API daftar chat',
      src_lorebook_api: 'Sebuah lorebook tidak bisa dibaca',
      src_page_state: 'JanitorAI mengubah data halamannya',
      src_dom: 'JanitorAI mengubah tata letak halamannya',
      src_network: 'Masalah jaringan',
      using_fallback: 'Memakai sumber cadangan: {layer}.',
      avatar_placeholder: 'Avatar tidak bisa dimuat, jadi dipakai gambar pengganti.',
      pick_format: 'Pilih setidaknya satu format.',
      no_cards_found: 'Belum ada kartu karakter di halaman ini. Gulir untuk memuatnya.',
      no_personas: 'Tidak ada persona. Buka halaman persona kamu atau sebuah chat, lalu coba lagi.',
      no_chats_found: 'Tidak ada chat di akun ini, jadi belum ada yang bisa dicadangkan. Chat dengan karakter dulu (komentar di halaman karakter bukan chat).',
      set_card_formats: 'Format kartu bawaan',
      set_chat_formats: 'Format chat bawaan',
      set_template: 'Templat nama file',
      set_template_hint: 'Variabel: {name} {creator} {date} {id}',
      set_throttle: 'Kecepatan',
      throttle_slow: 'Pelan',
      throttle_normal: 'Normal',
      throttle_fast: 'Lebih cepat',
      set_sponsor_off: 'Jangan pernah tampilkan kartu sponsor',
      set_language: 'Bahasa',
      lang_auto: 'Otomatis',
      save: 'Simpan',
      saved_settings: 'Pengaturan tersimpan.',
      select: 'Pilih',
      export_one: 'Ekspor kartu ini',
      sponsor_label: 'Sponsor',
      validation_failed: 'Pemeriksaan mandiri gagal: {detail}',
    },
  };

  function pickLocale(preferred, languages) {
    if (preferred && preferred !== 'auto' && STRINGS[preferred]) return preferred;
    for (const lang of languages || []) {
      const l = str(lang).toLowerCase();
      if (l.startsWith('pt')) return 'pt-BR';
      if (l.startsWith('es')) return 'es';
      if (l === 'id' || l.startsWith('id-') || l.startsWith('in')) return 'id';
      if (l.startsWith('en')) return 'en';
    }
    return 'en';
  }

  function translate(locale, key, vars) {
    const table = STRINGS[locale] || STRINGS.en;
    let s = table[key] !== undefined ? table[key] : STRINGS.en[key] !== undefined ? STRINGS.en[key] : key;
    if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] !== undefined ? String(vars[k]) : m));
    return s;
  }

  function buildIssueUrl(info) {
    const i = info || {};
    const title = `[self-check] ${i.source || 'unknown'} failed`;
    const body = [
      `Script version: ${VERSION}`,
      `Failed source: ${i.source || 'unknown'}`,
      `Detail: ${i.detail || '-'}`,
      `Page type: ${i.pageType || '-'}`,
      `Browser: ${i.userAgent || '-'}`,
      '',
      'What were you trying to export? (no personal data needed)',
    ].join('\n');
    return `${REPO_URL}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
  }

  // ===========================================================================
  // Export assembly (pure: takes loaded data, returns files)
  // ===========================================================================

  /**
   * Builds the files for one character.
   * input: { guarded, lorebooks, avatarPng, formats, parts, macroMode, target, embedLorebook, baseName, now }
   * returns: { files: [{ name, data, mime }], card: { v2, v3 }, errors }
   */
  function buildCharacterFiles(input) {
    const i = input;
    const formats = new Set(i.formats || ['png']);
    const parts = Object.assign(defaultParts(), i.parts || {});
    if (i.embedLorebook === false) parts.character_book = false;
    const data = mapCharacterToCardData(i.guarded, { parts, macroMode: i.macroMode, target: i.target, lorebooks: i.lorebooks, now: i.now });
    const v2 = buildCardV2(data);
    const v3 = buildCardV3(data, { sourceUrl: characterPageUrl(i.guarded.char), createdAt: i.guarded.char.created_at, updatedAt: i.guarded.char.updated_at, now: i.now });
    const errors = validateCard(v2, 2).concat(validateCard(v3, 3));
    const base = i.baseName;
    const files = [];
    if (formats.has('png')) files.push({ name: `${base}.png`, data: writeCardPng(i.avatarPng || makePlaceholderPng(data.name), { v2, v3 }), mime: 'image/png' });
    if (formats.has('json_v2')) files.push({ name: `${base}.card.json`, data: JSON.stringify(v2, null, 2), mime: 'application/json' });
    if (formats.has('json_v3')) files.push({ name: `${base}.card-v3.json`, data: JSON.stringify(v3, null, 2), mime: 'application/json' });
    if (formats.has('lorebook') && !i.guarded.definitionHidden) {
      for (const b of (i.lorebooks || []).filter((x) => x.entries.length)) {
        files.push({ name: `${base} - ${sanitizeFilename(b.title, 60)}.lorebook.json`, data: JSON.stringify(toWorldInfo(b), null, 2), mime: 'application/json' });
      }
    }
    if (formats.has('txt')) files.push({ name: `${base}.txt`, data: buildCharacterText(data, i.guarded), mime: 'text/plain' });
    if (formats.has('raw')) files.push({ name: `${base}.janitorai.json`, data: JSON.stringify(buildRawCharacterJson(i.guarded), null, 2), mime: 'application/json' });
    return { files, card: { v2, v3 }, data, errors };
  }

  function buildChatFiles(chat, formats, baseName) {
    const f = new Set(formats || ['jsonl']);
    const files = [];
    if (f.has('jsonl')) files.push({ name: `${baseName}.jsonl`, data: buildSillyTavernJsonl(chat), mime: 'application/x-ndjson' });
    if (f.has('md')) files.push({ name: `${baseName}.md`, data: buildChatMarkdown(chat), mime: 'text/markdown' });
    if (f.has('txt')) files.push({ name: `${baseName}.txt`, data: buildChatText(chat), mime: 'text/plain' });
    if (f.has('html')) files.push({ name: `${baseName}.html`, data: buildChatHtml(chat), mime: 'text/html' });
    if (f.has('json')) files.push({ name: `${baseName}.json`, data: JSON.stringify(buildChatJson(chat), null, 2), mime: 'application/json' });
    return files;
  }

  function characterBaseName(template, raw, now) {
    return applyFilenameTemplate(template, {
      name: raw && raw.name ? raw.name : 'character',
      creator: raw && raw.creator_name ? raw.creator_name : '',
      date: formatDate(now || Date.now()),
      id: raw && raw.id ? String(raw.id).slice(0, 8) : '',
    });
  }

  function chatBaseName(chat, now) {
    const title = chat.title ? ` - ${sanitizeFilename(chat.title, 40)}` : '';
    return sanitizeFilename(`${chat.characterName} - chat ${chat.id}${title} - ${formatDate(now || Date.now())}`, 150);
  }

  const Core = {
    VERSION, SPONSOR_ENABLED, SPONSOR, DEFINITION_FIELDS, PUBLIC_FIELDS, CARD_PARTS, DEFAULT_SETTINGS, HIDDEN_NOTICE, UNAVAILABLE_NOTICE, LOGIN_REQUIRED_NOTICE,
    MAX_CONCURRENCY, THROTTLE_PRESETS, MIN_REQUEST_DELAY_MS, STRINGS, ALLOWED_HOSTS,
    utf8Encode, utf8Decode, bytesToBase64, base64ToBytes, base64EncodeUtf8, base64DecodeUtf8,
    htmlToText, escapeHtml, decodeEntities, sanitizeFilename, applyFilenameTemplate, uniqueName, humanizedDateTime, formatDate,
    crc32, adler32, isPng, readPngChunks, encodePng, writeCardPng, readCardPng, makePlaceholderPng,
    createZip, readZip,
    parseRoute, extractCharacterId, isAllowedUrl, avatarUrl,
    parseCookies, tokenFromCookies, tokenFromStorageEntries, extractBearer, decodeJwtPayload, viewerFromToken,
    decodeJsStringLiteral, extractStoreStateFromScript, findCharacterInState, findPersonasInState, characterFromDomSnapshot,
    isOwnCharacter, guardCharacter, noticeFor, definitionSkipEntry, normalizeTags, collectGreetings, normalizeMacros,
    mapCharacterToCardData, buildCardV2, buildCardV3, validateCard,
    parseJanitorLorebook, toCharacterBook, toWorldInfo,
    buildCharacterText, buildRawCharacterJson, buildCharacterFiles, characterBaseName,
    normalizeChat, buildSillyTavernJsonl, parseJsonl, validateSillyTavernJsonl,
    buildChatMarkdown, buildChatText, buildChatHtml, buildChatJson, buildChatFiles, chatBaseName,
    normalizePersona, dedupePersonas, buildSillyTavernPersonaBackup,
    createLimiter, HttpError, throttleDelayMs, isRetryable, readListPage, greetingKey, computeBackoff, withRetry, runBulk, describeError, buildManifest,
    buildSponsorUrl, shouldShowSponsor, pickLocale, translate, buildIssueUrl,
  };

  if (typeof module === 'object' && module && module.exports) {
    module.exports = Core;
    return;
  }

  // ===========================================================================
  // ===========================================================================
  // Browser layer (userscript only)
  // ===========================================================================
  // ===========================================================================

  /* global GM_getValue, GM_setValue, GM_registerMenuCommand, GM_xmlhttpRequest, unsafeWindow, exportFunction */

  const pageWindow = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;
  const nativeFetch = window.fetch.bind(window);

  const store = {
    get(key, fallback) {
      try {
        if (typeof GM_getValue === 'function') {
          const v = GM_getValue(key);
          return v === undefined ? fallback : v;
        }
      } catch (e) {
        /* fall through */
      }
      return fallback;
    },
    set(key, value) {
      try {
        if (typeof GM_setValue === 'function') GM_setValue(key, value);
      } catch (e) {
        /* settings just won't persist */
      }
    },
  };

  function loadSettings() {
    const saved = store.get('settings', {}) || {};
    return Object.assign({}, DEFAULT_SETTINGS, saved);
  }

  let settings = loadSettings();
  let locale = pickLocale(settings.language, navigator.languages || [navigator.language]);
  const t = (key, vars) => translate(locale, key, vars);

  const limiter = createLimiter({ concurrency: MAX_CONCURRENCY, delayMs: throttleDelayMs(settings.throttle) });

  // --- Auth ------------------------------------------------------------------

  let sniffedToken = null;

  // <fetch-hook> Reads only the Authorization header of the app's own
  // janitorai.com requests, to reuse the user's session. It never reads
  // request or response bodies and never changes the request.
  function sniffAuthorization(resource, init) {
    try {
      const url = typeof resource === 'string' ? resource : resource && resource.url;
      if (url && !isAllowedUrl(url)) return;
      const token = extractBearer(init && init.headers) || extractBearer(resource && resource.headers);
      if (token) sniffedToken = token;
    } catch (e) {
      /* never break the app */
    }
  }

  function installFetchHook() {
    try {
      const original = pageWindow.fetch;
      if (!original || original.__jbeHooked) return;
      const wrapped = function (resource, init) {
        sniffAuthorization(resource, init);
        return original.apply(this, arguments);
      };
      wrapped.__jbeHooked = true;
      pageWindow.fetch = typeof exportFunction === 'function' ? exportFunction(wrapped, pageWindow) : wrapped;
    } catch (e) {
      /* the cookie and storage layers still work */
    }
  }
  // </fetch-hook>

  function storageEntries() {
    const out = [];
    try {
      const ls = pageWindow.localStorage;
      for (let i = 0; i < ls.length; i++) {
        const k = ls.key(i);
        out.push([k, ls.getItem(k)]);
      }
    } catch (e) {
      /* storage blocked */
    }
    return out;
  }

  function getToken() {
    return tokenFromCookies(document.cookie) || tokenFromStorageEntries(storageEntries()) || sniffedToken || null;
  }

  // --- HTTP ------------------------------------------------------------------

  async function apiGet(path, source, opts) {
    const o = opts || {};
    const url = new URL(path, location.origin).href;
    if (!isAllowedUrl(url)) throw new HttpError('Blocked URL', { source, url });
    return limiter.run(() => withRetry(async () => {
      const token = o.auth === false ? null : getToken();
      const headers = { accept: 'application/json' };
      if (token) headers.authorization = `Bearer ${token}`;
      let res;
      try {
        res = await nativeFetch(url, { headers, credentials: 'include' });
      } catch (e) {
        throw new HttpError(`Network error for ${source}`, { source, url, network: true });
      }
      if (!res.ok) {
        const ra = res.headers.get('retry-after');
        throw new HttpError(`HTTP ${res.status} for ${source}`, { status: res.status, source, url, retryAfter: ra !== null && ra !== '' ? Number(ra) : undefined });
      }
      try {
        return await res.json();
      } catch (e) {
        throw new HttpError(`Bad JSON from ${source}`, { status: res.status, source, url });
      }
    }, { baseMs: settings.retryBaseMs, retries: 4 }));
  }

  function fetchBytes(url) {
    if (!isAllowedUrl(url)) return Promise.reject(new HttpError('Blocked URL', { source: 'avatar', url }));
    return limiter.run(() => withRetry(() => new Promise((resolve, reject) => {
      if (typeof GM_xmlhttpRequest === 'function') {
        GM_xmlhttpRequest({
          method: 'GET',
          url,
          responseType: 'arraybuffer',
          anonymous: true,
          onload: (r) => (r.status >= 200 && r.status < 300 ? resolve(new Uint8Array(r.response)) : reject(new HttpError(`HTTP ${r.status}`, { status: r.status, source: 'avatar', url }))),
          onerror: () => reject(new HttpError('Network error', { source: 'avatar', url, network: true })),
          ontimeout: () => reject(new HttpError('Timeout', { source: 'avatar', url, network: true })),
          timeout: 30000,
        });
      } else {
        nativeFetch(url, { credentials: 'omit' })
          .then((r) => (r.ok ? r.arrayBuffer().then((b) => resolve(new Uint8Array(b))) : reject(new HttpError(`HTTP ${r.status}`, { status: r.status, source: 'avatar', url }))))
          .catch(() => reject(new HttpError('Network error', { source: 'avatar', url, network: true })));
      }
    }), { baseMs: settings.retryBaseMs, retries: 2 }));
  }

  async function imageToPng(bytes) {
    if (isPng(bytes)) return bytes;
    const blob = new Blob([bytes]);
    let source;
    try {
      source = await createImageBitmap(blob);
    } catch (e) {
      source = await new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(blob);
        img.onload = () => {
          URL.revokeObjectURL(url);
          resolve(img);
        };
        img.onerror = () => {
          URL.revokeObjectURL(url);
          reject(new Error('Image decode failed'));
        };
        img.src = url;
      });
    }
    const canvas = document.createElement('canvas');
    canvas.width = source.width;
    canvas.height = source.height;
    canvas.getContext('2d').drawImage(source, 0, 0);
    const out = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
    if (!out) throw new Error('PNG encode failed');
    return new Uint8Array(await out.arrayBuffer());
  }

  async function loadAvatarPng(avatar, warnings) {
    const url = avatarUrl(avatar);
    if (url && isAllowedUrl(url)) {
      try {
        return await imageToPng(await fetchBytes(url));
      } catch (e) {
        /* fall through to placeholder */
      }
    }
    if (warnings) warnings.push({ kind: 'avatar', text: t('avatar_placeholder') });
    return null;
  }

  // --- Data sources (layered) ------------------------------------------------

  function readPageState() {
    try {
      if (pageWindow._storeState_ && typeof pageWindow._storeState_ === 'object') return pageWindow._storeState_;
    } catch (e) {
      /* ignore */
    }
    for (const s of document.querySelectorAll('script:not([src])')) {
      if (s.textContent.includes('_storeState_')) {
        const state = extractStoreStateFromScript(s.textContent);
        if (state) return state;
      }
    }
    return null;
  }

  function domSnapshot() {
    const meta = (sel) => {
      const m = document.querySelector(sel);
      return m ? m.getAttribute('content') || '' : '';
    };
    const h1 = document.querySelector('h1');
    return {
      h1: h1 ? h1.textContent.trim() : '',
      title: document.title,
      ogTitle: meta('meta[property="og:title"]'),
      ogImage: meta('meta[property="og:image"]'),
      metaDescription: meta('meta[name="description"]') || meta('meta[property="og:description"]'),
      tags: [],
    };
  }

  /** Character: API → page state → DOM. Returns { raw, layer, failures }. */
  async function loadCharacter(id, fallbackRaw) {
    const failures = [];
    try {
      const raw = await apiGet(`/hampter/characters/${encodeURIComponent(id)}`, 'character_api');
      if (raw && typeof raw === 'object' && (raw.name || raw.id)) return { raw, layer: 'api', failures };
      failures.push({ source: 'character_api', detail: 'unexpected response shape' });
    } catch (e) {
      failures.push({ source: e.network ? 'network' : 'character_api', detail: describeError(e) });
    }
    const state = readPageState();
    const fromState = findCharacterInState(state, id);
    if (fromState) return { raw: fromState, layer: 'page_state', failures };
    if (parseRoute(location.pathname).id === id) failures.push({ source: 'page_state', detail: state ? 'character not found in page data' : 'page data not found' });
    if (fallbackRaw && fallbackRaw.name) return { raw: fallbackRaw, layer: 'chat', failures };
    if (parseRoute(location.pathname).id === id) {
      const fromDom = characterFromDomSnapshot(domSnapshot(), id);
      if (fromDom) return { raw: fromDom, layer: 'dom', failures };
      failures.push({ source: 'dom', detail: 'no title found' });
    }
    const err = new Error('Character data unavailable');
    err.failures = failures;
    throw err;
  }

  async function loadLorebooks(guarded, skipped) {
    if (guarded.definitionHidden) return [];
    const refs = Array.isArray(guarded.char.scripts) ? guarded.char.scripts : [];
    const viewer = viewerFromToken(getToken());
    const books = [];
    for (const ref of refs) {
      const id = ref && (ref.id || ref.script_id);
      const title = (ref && (ref.title || ref.name)) || id;
      if (!id) continue;
      try {
        const resp = await apiGet(`/hampter/script/${encodeURIComponent(id)}`, 'lorebook_api');
        const book = parseJanitorLorebook(resp, id);
        const ownBook = book && book.creatorId && viewer.userId && String(book.creatorId) === String(viewer.userId);
        if (!book || (book.isPublic === false && !ownBook && !guarded.isOwner)) {
          skipped.push({ id, name: title, what: 'lorebook', why: 'private lorebook (not visible to you)' });
        } else if (book.kind === 'advanced') {
          skipped.push({ id, name: book.title, what: 'lorebook', why: 'script-based lorebook with no static entries' });
        } else if (book.kind === 'empty') {
          skipped.push({ id, name: book.title, what: 'lorebook', why: 'lorebook has no entries' });
        } else books.push(book);
      } catch (e) {
        const why = e.status === 404 || e.status === 403 ? 'private lorebook (not visible to you)' : describeError(e);
        skipped.push({ id, name: title, what: 'lorebook', why });
      }
    }
    return books;
  }

  async function loadChat(chatId) {
    const resp = await apiGet(`/hampter/chats/${encodeURIComponent(chatId)}`, 'chat_api');
    if (!resp || typeof resp !== 'object' || !(Array.isArray(resp.chatMessages) || Array.isArray(resp.messages))) {
      throw new HttpError('Unexpected chat response', { source: 'chat_api' });
    }
    return resp;
  }

  async function listChatCharacters() {
    const out = [];
    for (let page = 1; page < 500; page++) {
      const j = await apiGet(`/hampter/chats/character-chats?page=${page}`, 'chat_list_api');
      const pg = readListPage(j, ['characters', 'data']);
      if (!pg) throw new HttpError('Unexpected chat list response', { source: 'chat_list_api' });
      out.push(...pg.batch);
      if (!pg.hasMore || !pg.batch.length) break;
    }
    return out;
  }

  async function listCharacterChats(characterId) {
    const out = [];
    for (let page = 1; page < 500; page++) {
      const j = await apiGet(`/hampter/chats/character/${encodeURIComponent(characterId)}/chats?page=${page}`, 'chat_list_api');
      const pg = readListPage(j, ['chats', 'data']);
      if (!pg) throw new HttpError('Unexpected chat list response', { source: 'chat_list_api' });
      out.push(...pg.batch);
      if (!pg.hasMore || !pg.batch.length) break;
    }
    return out;
  }

  function collectListCharacterIds() {
    const ids = new Map();
    for (const a of document.querySelectorAll('a[href*="/characters/"]')) {
      const id = extractCharacterId(a.getAttribute('href'));
      if (id && !ids.has(id)) ids.set(id, a);
    }
    return ids;
  }

  function rememberOwnCharacters() {
    if (parseRoute(location.pathname).kind !== 'my_characters') return;
    const known = new Set(store.get('ownCharacterIds', []));
    for (const id of collectListCharacterIds().keys()) known.add(id);
    store.set('ownCharacterIds', Array.from(known).slice(-2000));
  }

  // --- Downloads -------------------------------------------------------------

  function saveFile(data, filename, mime) {
    const blob = new Blob([toBytes(data)], { type: mime || 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.rel = 'noopener';
    a.style.display = 'none';
    // In the DOM and revoked late: Firefox ignores clicks on detached anchors.
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      a.remove();
      URL.revokeObjectURL(url);
    }, 60000);
  }

  function saveFiles(files, zipName) {
    if (files.length === 1) {
      saveFile(files[0].data, files[0].name, files[0].mime);
      return files[0].name;
    }
    const name = zipName.endsWith('.zip') ? zipName : `${zipName}.zip`;
    saveFile(createZip(files), name, 'application/zip');
    return name;
  }

  // --- Export flows ------------------------------------------------------------

  async function prepareCharacter(id, fallbackRaw) {
    const loaded = await loadCharacter(id, fallbackRaw);
    const viewer = viewerFromToken(getToken());
    const guarded = guardCharacter(loaded.raw, viewer);
    if (loaded.layer === 'chat' && guarded.definitionHidden) guarded.reason = 'unavailable';
    return { loaded, guarded };
  }

  async function exportCharacterFiles(prep, opts) {
    const warnings = [];
    const skipped = [];
    const lorebooks = await loadLorebooks(prep.guarded, skipped);
    const formats = opts.formats;
    const avatarPng = formats.includes('png') ? await loadAvatarPng(prep.guarded.char.avatar, warnings) : null;
    const now = Date.now();
    const built = buildCharacterFiles({
      guarded: prep.guarded,
      lorebooks,
      avatarPng,
      formats,
      parts: opts.parts,
      macroMode: opts.macroMode,
      target: opts.target,
      embedLorebook: settings.embedLorebook,
      baseName: opts.baseName || characterBaseName(settings.filenameTemplate, prep.guarded.char, now),
      now,
    });
    if (built.errors.length) throw new Error(t('validation_failed', { detail: built.errors.join('; ') }));
    return { files: built.files, warnings, skipped, lorebooks, data: built.data };
  }

  function chatContext(listChar, guarded) {
    return {
      characterName: (guarded && guarded.char.name) || (listChar && listChar.name),
      characterId: (guarded && guarded.char.id) || (listChar && (listChar.character_id || listChar.id)),
    };
  }

  // Bulk: every chat (and optionally everything else) into one ZIP.
  async function runAccountExport(mode, ui) {
    const token = getToken();
    if (!token) throw Object.assign(new Error(t('login_needed')), { fatal: true, source: 'auth' });
    const job = ui.job || {
      mode,
      files: [],
      skipped: [],
      counts: { characters: 0, chats: 0, messages: 0, personas: 0, lorebooks: 0 },
      personas: [],
      items: null,
      state: null,
      characterCache: new Map(),
    };
    ui.job = job;
    if (!job.items) {
      ui.progress(t('loading'), 0, 0);
      const chars = await listChatCharacters();
      const items = [];
      for (const c of chars) {
        const cid = c.character_id || c.id;
        let chats = [];
        try {
          chats = await listCharacterChats(cid);
        } catch (e) {
          if (e.fatal) throw e;
          job.skipped.push({ id: cid, name: c.name, what: 'chat list', why: describeError(e) });
        }
        if (mode === 'all') items.push({ kind: 'character', id: cid, name: c.name, listChar: c });
        for (const ch of chats) items.push({ kind: 'chat', id: ch.id, name: `${c.name}${ch.summary ? ` – ${ch.summary}` : ''}`, listChar: c });
      }
      if (mode === 'all') {
        const seen = new Set(items.filter((x) => x.kind === 'character').map((x) => x.id));
        for (const id of store.get('ownCharacterIds', [])) if (!seen.has(id)) items.unshift({ kind: 'character', id, name: id, listChar: null });
      }
      // Nothing to export: say so instead of saving an empty ZIP.
      if (!items.length) {
        ui.job = null;
        throw new Error(t('no_chats_found'));
      }
      job.items = items;
    }

    const used = new Set(job.files.map((f) => f.name));
    const add = (name, data, mime) => job.files.push({ name: uniqueName(used, name), data, mime });
    const now = Date.now();

    const worker = async (item) => {
      if (item.kind === 'character') {
        // Deleted bots you still have chats with: fall back to the chat list's name and picture.
        const lc = item.listChar;
        const prep = await prepareCharacter(item.id, lc ? { id: item.id, name: lc.name, avatar: lc.avatar } : null);
        job.characterCache.set(item.id, prep.guarded);
        const out = await exportCharacterFiles(prep, { formats: ['png', 'json_v2', 'raw'], parts: null, macroMode: settings.macroMode, target: settings.target });
        out.files.forEach((f) => add(`characters/${f.name}`, f.data, f.mime));
        out.lorebooks.forEach((b) => {
          add(`lorebooks/${sanitizeFilename(b.title, 60)} - ${b.id}.json`, JSON.stringify(toWorldInfo(b), null, 2), 'application/json');
          job.counts.lorebooks++;
        });
        job.skipped.push(...out.skipped.map((s) => Object.assign({ character: prep.guarded.char.name }, s)));
        const defSkip = definitionSkipEntry(item.id, prep.guarded.char.name, prep.guarded);
        if (defSkip) job.skipped.push(defSkip);
        job.counts.characters++;
        return;
      }
      const resp = await loadChat(item.id);
      const guarded = job.characterCache.get(item.listChar.character_id || item.listChar.id);
      const chat = normalizeChat(resp, Object.assign({ chatId: item.id }, chatContext(item.listChar, guarded)));
      if (Array.isArray(resp.personas)) job.personas.push(...resp.personas);
      const base = `chats/${sanitizeFilename(chat.characterName, 60)}/${chatBaseName(chat, now)}`;
      const formats = mode === 'all' ? ['jsonl', 'json'] : settings.chatFormats;
      buildChatFiles(chat, formats, base).forEach((f) => add(f.name, f.data, f.mime));
      job.counts.chats++;
      job.counts.messages += chat.messages.length;
    };

    job.state = await runBulk(job.items, worker, {
      state: job.state || undefined,
      isCancelled: () => ui.cancelled,
      onProgress: (p) => ui.progress(t('progress', { done: p.done, total: p.total, name: p.item ? p.item.name : '' }), p.done, p.total),
    });
    job.skipped.push(...job.state.skipped);
    job.state.skipped = [];
    return job;
  }

  function finishAccountZip(job) {
    const files = job.files.slice();
    if (job.mode === 'all') {
      const personas = dedupePersonas(job.personas.concat(findPersonasInState(readPageState())));
      if (personas.length) {
        const { backup } = buildSillyTavernPersonaBackup(personas);
        files.push({ name: 'personas/personas.json', data: JSON.stringify(backup, null, 2) });
        job.counts.personas = personas.length;
      }
    }
    job.counts.skipped = job.skipped.length;
    files.push({ name: 'manifest.json', data: JSON.stringify(buildManifest({ counts: job.counts, chatFormats: job.mode === 'all' ? ['jsonl', 'json'] : settings.chatFormats, notes: job.state && job.state.status !== 'done' ? [`Partial export (${job.state.status}).`] : [] }), null, 2) });
    files.push({ name: 'skipped.json', data: JSON.stringify(job.skipped, null, 2) });
    const name = `${job.mode === 'all' ? 'JanitorAI backup' : 'JanitorAI chats'} - ${formatDate(Date.now())}${job.state && job.state.status !== 'done' ? ' (partial)' : ''}.zip`;
    saveFile(createZip(files), name, 'application/zip');
    return name;
  }

  // ===========================================================================
  // UI (Shadow DOM, DOM APIs only)
  // ===========================================================================

  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    if (attrs) {
      for (const [k, v] of Object.entries(attrs)) {
        if (v === undefined || v === null || v === false) continue;
        if (k === 'class') node.className = v;
        else if (k === 'text') node.textContent = v;
        else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
        else if (k === 'checked' || k === 'disabled' || k === 'value' || k === 'selected') node[k] = v;
        else node.setAttribute(k, v === true ? '' : String(v));
      }
    }
    for (const c of [].concat(children || [])) {
      if (c === null || c === undefined || c === false) continue;
      node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    }
    return node;
  }

  const CSS = `
:host{all:initial}
*{box-sizing:border-box}
.root{--bg:#17171c;--fg:#f0eff4;--muted:#a3a2ad;--line:#2e2d36;--acc:#7c5cff;--acc2:#5b3fe0;--warn:#ffb648;--err:#ff6b6b;--ok:#4cd486;--card:#1f1e26;
  font:14px/1.45 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:var(--fg)}
.fab{position:fixed;z-index:2147483646;min-width:48px;height:48px;padding:0 16px;border-radius:24px;border:0;background:var(--acc);color:#fff;
  font:600 14px/1 system-ui,sans-serif;box-shadow:0 6px 20px rgba(0,0,0,.35);cursor:pointer;touch-action:none;user-select:none;display:flex;align-items:center;gap:8px}
.fab:focus-visible,button:focus-visible,a:focus-visible,input:focus-visible,select:focus-visible{outline:2px solid #fff;outline-offset:2px}
.panel{position:fixed;z-index:2147483647;right:16px;bottom:80px;width:380px;max-width:calc(100vw - 32px);max-height:calc(100vh - 110px);overflow:auto;
  background:var(--bg);border:1px solid var(--line);border-radius:16px;box-shadow:0 18px 50px rgba(0,0,0,.5);padding:14px 16px 16px;display:none}
.panel.open{display:block}
.root.sheet .panel{left:0;right:0;bottom:0;width:100%;max-width:100%;max-height:85vh;border-radius:18px 18px 0 0;padding-bottom:calc(16px + env(safe-area-inset-bottom))}
.head{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:6px}
.head h2{font-size:16px;margin:0}
.x{background:transparent;border:0;color:var(--muted);font-size:22px;min-width:44px;min-height:44px;cursor:pointer}
.privacy{color:var(--muted);font-size:12px;margin:0 0 10px}
section{border-top:1px solid var(--line);padding:12px 0 4px}
h3{font-size:13px;text-transform:uppercase;letter-spacing:.04em;color:var(--muted);margin:0 0 8px}
label.row{display:flex;align-items:center;gap:10px;min-height:36px;cursor:pointer}
label.row input{flex:none;width:20px;height:20px;margin:0;accent-color:var(--acc)}
label.row.dim{opacity:.5}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:0 10px}
@media (max-width:420px){.grid{grid-template-columns:1fr}}
.btn{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:0 16px;border-radius:12px;border:1px solid var(--line);
  background:var(--card);color:var(--fg);font:600 14px system-ui,sans-serif;cursor:pointer;margin:4px 6px 4px 0;text-decoration:none}
.btn.primary{background:var(--acc);border-color:var(--acc);color:#fff}
.btn.primary:hover{background:var(--acc2)}
.btn[disabled]{opacity:.5;cursor:default}
.notice{border-radius:10px;padding:10px 12px;margin:8px 0;font-size:13px;background:var(--card);border:1px solid var(--line)}
.notice.warn{border-color:var(--warn)}.notice.err{border-color:var(--err)}.notice.ok{border-color:var(--ok)}
.notice a{color:#b9a8ff}
.status{min-height:20px;font-size:13px;color:var(--muted)}
progress{width:100%;height:8px;accent-color:var(--acc)}
select,input[type=text]{width:100%;min-height:40px;border-radius:10px;border:1px solid var(--line);background:var(--card);color:var(--fg);padding:0 10px;font:14px system-ui,sans-serif}
.field{margin:8px 0}.field>span{display:block;font-size:12px;color:var(--muted);margin-bottom:4px}
.hint{font-size:12px;color:var(--muted)}
details>summary{cursor:pointer;min-height:36px;display:flex;align-items:center;color:var(--muted)}
.sponsor{display:flex;gap:12px;align-items:center;border:1px solid var(--line);border-radius:12px;padding:10px;margin-top:10px;background:var(--card)}
.sponsor .img{width:56px;height:56px;border-radius:10px;flex:none;background:linear-gradient(135deg,#ff5fa2,#7c5cff);background-size:cover}
.sponsor .tag{font-size:11px;color:var(--muted)}
.sponsor b{display:block;font-size:14px}
`;

  const MINI_CSS = `
:host{all:initial}
.mini{display:inline-flex;gap:4px;align-items:center;font:600 12px system-ui,sans-serif}
button,label{min-width:36px;min-height:36px;border-radius:10px;border:1px solid rgba(255,255,255,.25);background:rgba(23,23,28,.85);color:#fff;
  display:inline-flex;align-items:center;justify-content:center;cursor:pointer;padding:0 8px}
input{width:18px;height:18px;margin:0;accent-color:#7c5cff}
`;

  const ui = {
    host: null,
    root: null,
    panel: null,
    body: null,
    statusEl: null,
    progressEl: null,
    cancelled: false,
    job: null,
    route: { type: 'other' },
    charState: null,
    selected: new Set(),
    busy: false,
  };

  function isPhone() {
    return Math.min(window.innerWidth, screen.width || window.innerWidth) <= 640;
  }

  function mountUi() {
    if (ui.host && document.documentElement.contains(ui.host)) return;
    const host = document.createElement('div');
    host.id = 'jbe-host';
    host.setAttribute('data-jbe', 'host');
    const shadow = host.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = CSS;
    const root = el('div', { class: 'root' });
    const fab = el('button', { class: 'fab', type: 'button', 'aria-haspopup': 'dialog', 'data-jbe': 'fab', title: t('panel_title') }, ['⤓ ', t('btn_open')]);
    const panel = el('div', { class: 'panel', role: 'dialog', 'aria-label': t('panel_title'), 'data-jbe': 'panel' });
    root.append(fab, panel);
    shadow.append(style, root);
    document.documentElement.appendChild(host);
    ui.host = host;
    ui.root = root;
    ui.panel = panel;
    ui.fab = fab;
    placeFab();
    makeDraggable(fab);
    applyLayout();
    window.addEventListener('resize', applyLayout);
  }

  function applyLayout() {
    if (ui.root) ui.root.classList.toggle('sheet', isPhone());
  }

  function placeFab() {
    const pos = store.get('fabPos', null);
    const fab = ui.fab;
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (pos && Number.isFinite(pos.x) && Number.isFinite(pos.y)) {
      fab.style.left = `${Math.min(Math.max(8, pos.x * w), w - 64)}px`;
      fab.style.top = `${Math.min(Math.max(8, pos.y * h), h - 56)}px`;
    } else {
      fab.style.right = '16px';
      fab.style.bottom = isPhone() ? '88px' : '24px';
    }
  }

  function makeDraggable(fab) {
    let start = null;
    let moved = false;
    fab.addEventListener('pointerdown', (e) => {
      start = { x: e.clientX, y: e.clientY, rect: fab.getBoundingClientRect() };
      moved = false;
      try {
        fab.setPointerCapture(e.pointerId);
      } catch (err) {
        /* ignore */
      }
    });
    fab.addEventListener('pointermove', (e) => {
      if (!start) return;
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      if (!moved && Math.hypot(dx, dy) < 8) return;
      moved = true;
      const x = Math.min(Math.max(4, start.rect.left + dx), window.innerWidth - start.rect.width - 4);
      const y = Math.min(Math.max(4, start.rect.top + dy), window.innerHeight - start.rect.height - 4);
      fab.style.left = `${x}px`;
      fab.style.top = `${y}px`;
      fab.style.right = 'auto';
      fab.style.bottom = 'auto';
    });
    fab.addEventListener('pointerup', () => {
      if (moved) {
        const r = fab.getBoundingClientRect();
        store.set('fabPos', { x: r.left / window.innerWidth, y: r.top / window.innerHeight });
      }
      start = null;
    });
    fab.addEventListener('click', (e) => {
      if (moved) {
        e.preventDefault();
        moved = false;
        return;
      }
      togglePanel();
    });
  }

  function togglePanel(force) {
    const open = force !== undefined ? force : !ui.panel.classList.contains('open');
    ui.panel.classList.toggle('open', open);
    ui.fab.setAttribute('aria-expanded', String(open));
    if (open) renderPanel();
  }

  function setStatus(text, kind) {
    if (!ui.statusEl) return;
    ui.statusEl.textContent = text || '';
    ui.statusEl.className = `status${kind ? ` ${kind}` : ''}`;
  }

  function progress(text, done, total) {
    setStatus(text);
    if (ui.progressEl) {
      ui.progressEl.hidden = !total;
      ui.progressEl.max = total || 1;
      ui.progressEl.value = done || 0;
    }
  }

  function noticeEl(kind, children) {
    return el('div', { class: `notice ${kind || ''}`, role: kind === 'err' ? 'alert' : 'status' }, children);
  }

  function failureNotice(failures) {
    if (!failures || !failures.length) return null;
    const items = failures.map((f) => {
      const label = t(`src_${f.source}`) !== `src_${f.source}` ? t(`src_${f.source}`) : f.source;
      return el('div', null, [
        `${label} (${f.detail}). `,
        el('a', { href: buildIssueUrl({ source: f.source, detail: f.detail, pageType: ui.route.type, userAgent: navigator.userAgent }), target: '_blank', rel: 'noopener noreferrer', text: t('report') }),
      ]);
    });
    return noticeEl('warn', items);
  }

  function renderPanel() {
    const p = ui.panel;
    p.replaceChildren();
    p.append(
      el('div', { class: 'head' }, [
        el('h2', { text: t('panel_title') }),
        el('button', { class: 'x', type: 'button', 'aria-label': t('close'), text: '×', onclick: () => togglePanel(false) }),
      ]),
      el('p', { class: 'privacy', text: t('privacy') }),
    );
    ui.body = el('div');
    p.append(ui.body);
    const route = ui.route;
    if (route.type === 'character') renderCharacterSection(route.id);
    if (route.type === 'chat') renderChatSection(route.id);
    if (route.type === 'list') renderListSection();
    renderAccountSection();
    renderSettingsSection();
    ui.statusEl = el('div', { class: 'status', 'aria-live': 'polite', 'data-jbe': 'status' });
    ui.progressEl = el('progress', { hidden: true, max: 1, value: 0 });
    ui.extraEl = el('div', { 'data-jbe': 'extra' });
    p.append(el('section', null, [ui.progressEl, ui.statusEl, ui.extraEl]));
  }

  function checkbox(label, checked, attrs) {
    const input = el('input', Object.assign({ type: 'checkbox', checked }, attrs || {}));
    return { input, row: el('label', { class: `row${attrs && attrs.disabled ? ' dim' : ''}` }, [input, label]) };
  }

  function radioGroup(name, options, value) {
    const inputs = [];
    const rows = options.map(([v, label]) => {
      const input = el('input', { type: 'radio', name, value: v, checked: v === value });
      inputs.push(input);
      return el('label', { class: 'row' }, [input, label]);
    });
    return { rows, get value() { const c = inputs.find((i) => i.checked); return c ? c.value : value; } };
  }

  function partAvailable(part, guarded, lorebookCount) {
    if (!guarded) return true;
    const c = guarded.char;
    if (guarded.definitionHidden) return part === 'tags' || part === 'creator_notes';
    switch (part) {
      case 'description': return !!str(c.personality).trim();
      case 'personality': return !!str(c.personality).trim();
      case 'scenario': return !!str(c.scenario).trim();
      case 'first_mes': return collectGreetings(c).length > 0;
      case 'alternate_greetings': return collectGreetings(c).length > 1;
      case 'mes_example': return !!str(c.example_dialogs).trim();
      case 'system_prompt': return !!str(c.system_prompt).trim();
      case 'post_history_instructions': return !!str(c.post_history_instructions).trim();
      case 'tags': return normalizeTags(c).length > 0;
      case 'creator_notes': return !!str(c.description).trim();
      case 'character_book': return lorebookCount > 0;
      default: return true;
    }
  }

  function renderCharacterSection(id) {
    const sec = el('section', { 'data-jbe': 'character-section' }, [el('h3', { text: t('section_character') })]);
    ui.body.append(sec);
    const content = el('div', null, [el('div', { class: 'status', text: t('loading') })]);
    sec.append(content);
    const state = ui.charState && ui.charState.id === id ? ui.charState : null;
    const ready = state && state.prep ? Promise.resolve(state.prep) : prepareCharacter(id, null);
    ready.then((prep) => {
      ui.charState = { id, prep };
      content.replaceChildren(...characterControls(prep, (opts) => exportCharacterFromPanel(prep, opts)));
    }).catch((e) => {
      content.replaceChildren(failureNotice(e.failures || [{ source: 'character_api', detail: describeError(e) }]));
    });
  }

  function characterControls(prep, onExport) {
    const g = prep.guarded;
    const nodes = [];
    const refs = Array.isArray(g.char.scripts) ? g.char.scripts.length : 0;
    nodes.push(el('div', { class: 'hint', text: `${g.char.name}${g.char.creator_name ? ` · ${g.char.creator_name}` : ''}${prep.loaded.layer !== 'api' ? ` · ${t('using_fallback', { layer: prep.loaded.layer })}` : ''}` }));
    if (g.definitionHidden) nodes.push(noticeEl('warn', [t('hidden_notice')]));
    else if (g.reason === 'owner_missing') nodes.push(noticeEl('warn', [t('owner_missing')]));
    else if (g.reason === 'login_required') nodes.push(noticeEl('warn', [t('login_for_definition')]));
    const fail = failureNotice(prep.loaded.failures);
    if (fail && prep.loaded.layer !== 'api') nodes.push(fail);

    const parts = {};
    const partRows = CARD_PARTS.map((part) => {
      const available = partAvailable(part, g, refs);
      const { input, row } = checkbox(`${t(`part_${part}`)}${available ? '' : ` ${t('empty')}`}`, available, { disabled: !available, 'data-part': part });
      parts[part] = input;
      return row;
    });
    if (!g.definitionHidden) {
      nodes.push(el('details', { open: !isPhone() }, [el('summary', { text: t('parts_title') }), el('div', { class: 'grid' }, partRows)]));
    }

    const fmts = {};
    const fmtList = [['png', 'fmt_png'], ['json_v2', 'fmt_json_v2'], ['json_v3', 'fmt_json_v3'], ['lorebook', 'fmt_lorebook'], ['txt', 'fmt_txt'], ['raw', 'fmt_raw']];
    const fmtRows = fmtList.map(([k, label]) => {
      const disabled = k === 'lorebook' && (g.definitionHidden || !refs);
      const { input, row } = checkbox(t(label), settings.cardFormats.includes(k) && !disabled, { disabled, 'data-format': k });
      fmts[k] = input;
      return row;
    });
    nodes.push(el('h3', { text: t('formats_title') }), el('div', { class: 'grid' }, fmtRows));

    const macros = radioGroup('jbe-macros', [['keep', t('macros_keep')], ['normalize', t('macros_normalize')]], settings.macroMode);
    const target = radioGroup('jbe-target', [['sillytavern', t('target_st')], ['compat', t('target_compat')]], settings.target);
    if (!g.definitionHidden) {
      nodes.push(el('details', null, [el('summary', { text: `${t('macros_title')} · ${t('target_title')}` }), el('h3', { text: t('macros_title') }), ...macros.rows, el('h3', { text: t('target_title') }), ...target.rows]));
    }

    const btn = el('button', {
      class: 'btn primary', type: 'button', 'data-jbe': 'export-character', text: t('export'),
      onclick: () => {
        const formats = Object.keys(fmts).filter((k) => fmts[k].checked && !fmts[k].disabled);
        if (!formats.length) return setStatus(t('pick_format'), 'err');
        const p = {};
        for (const k of Object.keys(parts)) p[k] = parts[k].checked && !parts[k].disabled;
        onExport({ formats, parts: p, macroMode: macros.value, target: target.value });
      },
    });
    nodes.push(btn);
    return nodes;
  }

  async function guardedRun(fn) {
    if (ui.busy) return;
    ui.busy = true;
    ui.cancelled = false;
    if (ui.extraEl) ui.extraEl.replaceChildren();
    try {
      await fn();
    } catch (e) {
      setStatus(e && e.message ? e.message : String(e), 'err');
      if (e && e.source && e.source !== 'auth' && ui.extraEl) ui.extraEl.append(failureNotice([{ source: e.source, detail: describeError(e) }]));
    } finally {
      ui.busy = false;
    }
  }

  function showWarnings(warnings, skipped) {
    if (!ui.extraEl) return;
    for (const w of warnings || []) ui.extraEl.append(noticeEl('warn', [w.text]));
    if (skipped && skipped.length) ui.extraEl.append(noticeEl('warn', [skipped.map((s) => `${s.what}: ${s.name || s.id} – ${s.why}`).join('\n')]));
  }

  function exportCharacterFromPanel(prep, opts) {
    return guardedRun(async () => {
      setStatus(t('exporting'));
      const out = await exportCharacterFiles(prep, opts);
      const base = characterBaseName(settings.filenameTemplate, prep.guarded.char, Date.now());
      const name = saveFiles(out.files, base);
      setStatus(t('saved', { file: name }), 'ok');
      showWarnings(out.warnings, out.skipped);
      afterSuccessfulExport('character');
    });
  }

  function renderChatSection(chatId) {
    const sec = el('section', { 'data-jbe': 'chat-section' }, [el('h3', { text: t('section_chat') })]);
    ui.body.append(sec);
    const fmts = {};
    const list = [['jsonl', 'fmt_jsonl'], ['md', 'fmt_md'], ['txt', 'fmt_chat_txt'], ['html', 'fmt_html'], ['json', 'fmt_json']];
    const rows = list.map(([k, label]) => {
      const { input, row } = checkbox(t(label), settings.chatFormats.includes(k), { 'data-format': k });
      fmts[k] = input;
      return row;
    });
    const withCard = checkbox(t('chat_with_card'), false, { 'data-jbe': 'with-card' });
    sec.append(
      el('div', { class: 'grid' }, rows),
      withCard.row,
      el('p', { class: 'hint', text: t('chat_tip') }),
      el('button', {
        class: 'btn primary', type: 'button', 'data-jbe': 'export-chat', text: t('export'),
        onclick: () => {
          const formats = Object.keys(fmts).filter((k) => fmts[k].checked);
          if (!formats.length) return setStatus(t('pick_format'), 'err');
          exportChatFromPanel(chatId, formats, withCard.input.checked);
        },
      }),
    );
  }

  function exportChatFromPanel(chatId, formats, withCard) {
    return guardedRun(async () => {
      if (!getToken()) throw Object.assign(new Error(t('login_needed')), { source: 'auth' });
      setStatus(t('exporting'));
      const resp = await loadChat(chatId);
      const cid = (resp.chat && resp.chat.character_id) || (resp.character && resp.character.id);
      let prep = null;
      const warnings = [];
      const skipped = [];
      if (cid) {
        try {
          prep = await prepareCharacter(cid, resp.character || null);
        } catch (e) {
          warnings.push({ text: t('src_character_api') });
        }
      }
      const chat = normalizeChat(resp, { chatId, characterName: prep ? prep.guarded.char.name : undefined, characterId: cid });
      const now = Date.now();
      let files = buildChatFiles(chat, formats, chatBaseName(chat, now));
      if (withCard && prep) {
        const out = await exportCharacterFiles(prep, { formats: ['png'], parts: null, macroMode: settings.macroMode, target: settings.target });
        warnings.push(...out.warnings);
        skipped.push(...out.skipped);
        files = out.files.concat(files);
      }
      const name = saveFiles(files, `${chatBaseName(chat, now)}${withCard ? ' + card' : ''}`);
      setStatus(t('saved', { file: name }), 'ok');
      showWarnings(warnings, skipped);
      afterSuccessfulExport('chat');
    });
  }

  function renderListSection() {
    const ids = collectListCharacterIds();
    const sec = el('section', { 'data-jbe': 'list-section' }, [el('h3', { text: t('section_list') })]);
    if (!ids.size) sec.append(el('p', { class: 'hint', text: t('no_cards_found') }));
    const selectedIds = () => Array.from(ui.selected).filter((id) => ids.has(id));
    sec.append(
      el('button', { class: 'btn', type: 'button', 'data-jbe': 'export-selected', text: t('export_selected', { n: selectedIds().length }), disabled: !selectedIds().length, onclick: () => exportManyCharacters(selectedIds()) }),
      el('button', { class: 'btn', type: 'button', 'data-jbe': 'export-page', text: t('export_page', { n: ids.size }), disabled: !ids.size, onclick: () => exportManyCharacters(Array.from(ids.keys())) }),
    );
    ui.body.append(sec);
  }

  function exportManyCharacters(ids) {
    return guardedRun(async () => {
      const files = [];
      const skipped = [];
      const used = new Set();
      const now = Date.now();
      const state = await runBulk(ids.map((id) => ({ kind: 'character', id, name: id })), async (item) => {
        const prep = await prepareCharacter(item.id, null);
        item.name = prep.guarded.char.name;
        const out = await exportCharacterFiles(prep, { formats: settings.cardFormats, parts: null, macroMode: settings.macroMode, target: settings.target });
        out.files.forEach((f) => files.push({ name: uniqueName(used, f.name), data: f.data, mime: f.mime }));
        skipped.push(...out.skipped);
        const defSkip = definitionSkipEntry(item.id, item.name, prep.guarded);
        if (defSkip) skipped.push(defSkip);
      }, {
        isCancelled: () => ui.cancelled,
        onProgress: (p) => progress(t('progress', { done: p.done, total: p.total, name: p.item ? p.item.name : '' }), p.done, p.total),
      });
      const allSkipped = skipped.concat(state.skipped);
      if (files.length) {
        // One card, one file, nothing failed: save just that file (the notes are in the card).
        const failed = allSkipped.filter((x) => x.what !== 'definition');
        const out = files.length === 1 && !failed.length ? files : files.concat({ name: 'skipped.json', data: JSON.stringify(allSkipped, null, 2) });
        const name = saveFiles(out, `JanitorAI cards - ${formatDate(now)}`);
        setStatus(t('saved', { file: name }), 'ok');
        if (allSkipped.length) ui.extraEl.append(noticeEl('warn', [t('skipped_n', { n: allSkipped.length })]));
        afterSuccessfulExport('list');
      } else {
        setStatus(t('skipped_n', { n: allSkipped.length }), 'err');
        showWarnings([], allSkipped);
      }
    });
  }

  function renderAccountSection() {
    const sec = el('section', { 'data-jbe': 'account-section' }, [el('h3', { text: t('section_account') })]);
    sec.append(
      el('button', { class: 'btn', type: 'button', 'data-jbe': 'export-all-chats', text: t('export_all_chats'), onclick: () => startAccountExport('chats') }),
      el('button', { class: 'btn', type: 'button', 'data-jbe': 'backup-all', text: t('backup_all'), onclick: () => startAccountExport('all') }),
      el('button', { class: 'btn', type: 'button', 'data-jbe': 'export-personas', text: t('export_personas'), onclick: exportPersonas }),
    );
    if (!getToken()) sec.append(el('p', { class: 'hint', text: t('login_needed') }));
    ui.body.append(sec);
  }

  function startAccountExport(mode, resume) {
    return guardedRun(async () => {
      if (!resume) ui.job = null;
      const cancelBtn = el('button', { class: 'btn', type: 'button', text: t('cancel'), onclick: () => { ui.cancelled = true; } });
      ui.extraEl.append(cancelBtn);
      const job = await runAccountExport(mode, { get job() { return ui.job; }, set job(v) { ui.job = v; }, progress, get cancelled() { return ui.cancelled; } });
      cancelBtn.remove();
      if (job.state.status === 'paused') {
        setStatus(t('paused', { reason: job.state.error.message }), 'err');
        ui.extraEl.append(
          el('button', { class: 'btn primary', type: 'button', 'data-jbe': 'resume', text: t('resume'), onclick: () => startAccountExport(mode, true) }),
          el('button', { class: 'btn', type: 'button', 'data-jbe': 'save-partial', text: t('save_partial'), onclick: () => { finishAccountZip(job); ui.job = null; } }),
        );
        return;
      }
      const name = finishAccountZip(job);
      ui.job = null;
      setStatus(t('saved', { file: name }), 'ok');
      if (job.skipped.length) ui.extraEl.append(noticeEl('warn', [t('skipped_n', { n: job.skipped.length })]));
      if (job.state.status === 'done') afterSuccessfulExport(mode === 'all' ? 'backup' : 'all_chats');
    });
  }

  function exportPersonas() {
    return guardedRun(async () => {
      const personas = dedupePersonas(findPersonasInState(readPageState()));
      if (!personas.length) {
        ui.extraEl.append(failureNotice([{ source: 'page_state', detail: 'no personas in page data' }]));
        return setStatus(t('no_personas'), 'err');
      }
      const { backup, files } = buildSillyTavernPersonaBackup(personas);
      const out = [{ name: 'personas.json', data: JSON.stringify(backup, null, 2) }];
      for (const f of files) {
        const png = f.persona.avatar ? await loadAvatarPng(f.persona.avatar, null) : null;
        if (png) out.push({ name: f.file, data: png });
      }
      const name = saveFiles(out, `JanitorAI personas - ${formatDate(Date.now())}`);
      setStatus(t('saved', { file: name }), 'ok');
      afterSuccessfulExport('personas');
    });
  }

  function renderSettingsSection() {
    const cardF = {};
    const chatF = {};
    const cardRows = [['png', 'fmt_png'], ['json_v2', 'fmt_json_v2'], ['json_v3', 'fmt_json_v3'], ['txt', 'fmt_txt'], ['raw', 'fmt_raw']].map(([k, l]) => {
      const c = checkbox(t(l), settings.cardFormats.includes(k));
      cardF[k] = c.input;
      return c.row;
    });
    const chatRows = [['jsonl', 'fmt_jsonl'], ['md', 'fmt_md'], ['txt', 'fmt_chat_txt'], ['html', 'fmt_html'], ['json', 'fmt_json']].map(([k, l]) => {
      const c = checkbox(t(l), settings.chatFormats.includes(k));
      chatF[k] = c.input;
      return c.row;
    });
    const tpl = el('input', { type: 'text', value: settings.filenameTemplate, 'aria-label': t('set_template') });
    const throttle = el('select', { 'aria-label': t('set_throttle') }, ['slow', 'normal', 'fast'].map((k) => el('option', { value: k, selected: settings.throttle === k, text: t(`throttle_${k}`) })));
    const lang = el('select', { 'aria-label': t('set_language') }, [['auto', t('lang_auto')], ['en', 'English'], ['pt-BR', 'Português (Brasil)'], ['es', 'Español'], ['id', 'Bahasa Indonesia']].map(([k, l]) => el('option', { value: k, selected: settings.language === k, text: l })));
    const macros = radioGroup('jbe-set-macros', [['keep', t('macros_keep')], ['normalize', t('macros_normalize')]], settings.macroMode);
    const sponsorOff = checkbox(t('set_sponsor_off'), !!settings.sponsorOff);
    const sec = el('details', { 'data-jbe': 'settings' }, [
      el('summary', { text: t('section_settings') }),
      el('h3', { text: t('set_card_formats') }), el('div', { class: 'grid' }, cardRows),
      el('h3', { text: t('set_chat_formats') }), el('div', { class: 'grid' }, chatRows),
      el('h3', { text: t('macros_title') }), ...macros.rows,
      el('label', { class: 'field' }, [el('span', { text: t('set_template') }), tpl, el('span', { class: 'hint', text: t('set_template_hint') })]),
      el('label', { class: 'field' }, [el('span', { text: t('set_throttle') }), throttle]),
      el('label', { class: 'field' }, [el('span', { text: t('set_language') }), lang]),
      SPONSOR_ENABLED ? sponsorOff.row : null,
      el('button', {
        class: 'btn', type: 'button', text: t('save'),
        onclick: () => {
          settings = Object.assign({}, settings, {
            cardFormats: Object.keys(cardF).filter((k) => cardF[k].checked),
            chatFormats: Object.keys(chatF).filter((k) => chatF[k].checked),
            macroMode: macros.value,
            filenameTemplate: tpl.value.trim() || DEFAULT_SETTINGS.filenameTemplate,
            throttle: throttle.value,
            language: lang.value,
            sponsorOff: sponsorOff.input.checked,
          });
          store.set('settings', settings);
          limiter.setDelay(throttleDelayMs(settings.throttle));
          locale = pickLocale(settings.language, navigator.languages || [navigator.language]);
          renderPanel();
          setStatus(t('saved_settings'), 'ok');
        },
      }),
    ]);
    ui.body.append(el('section', null, [sec]));
  }

  // Sponsor: only after a successful export, inside our panel, max once a day.
  function afterSuccessfulExport(placement) {
    const s = store.get('sponsor', {}) || {};
    if (!shouldShowSponsor({ exportSucceeded: true, dismissedForever: s.dismissed, userDisabled: settings.sponsorOff, lastShownAt: s.lastShownAt, now: Date.now() })) return;
    store.set('sponsor', Object.assign({}, s, { lastShownAt: Date.now() }));
    const card = el('div', { class: 'sponsor', 'data-jbe': 'sponsor' }, [
      el('div', { class: 'img', style: SPONSOR.imageDataUri ? `background-image:url("${SPONSOR.imageDataUri}")` : null }),
      el('div', null, [
        el('div', { class: 'tag', text: t('sponsor_label') }),
        el('b', { text: t('sponsor_title') }),
        el('div', { text: t('sponsor_text') }),
        el('a', { class: 'btn primary', href: buildSponsorUrl(placement), target: '_blank', rel: 'noopener noreferrer sponsored', text: t('sponsor_button') }),
        el('button', { class: 'btn', type: 'button', text: t('sponsor_dismiss'), onclick: () => { store.set('sponsor', Object.assign({}, store.get('sponsor', {}), { dismissed: true })); card.remove(); } }),
      ]),
    ]);
    if (ui.extraEl) ui.extraEl.append(card);
  }

  // --- Per-card buttons on list pages ----------------------------------------

  function decorateListCards() {
    if (ui.route.type !== 'list') return;
    rememberOwnCharacters();
    for (const [id, anchor] of collectListCharacterIds()) {
      if (anchor.hasAttribute('data-jbe-decorated')) continue;
      // The card element around this link, unless it also holds other characters (a grid).
      let container = anchor.closest('[class*="card" i], li, article');
      if (container) {
        const ids = new Set(Array.from(container.querySelectorAll('a[href*="/characters/"]'), (a) => extractCharacterId(a.getAttribute('href'))));
        if (ids.size > 1) container = null;
      }
      container = container || anchor;
      if (container !== anchor && container.querySelector('[data-jbe-mini]')) continue;
      anchor.setAttribute('data-jbe-decorated', '');
      const host = document.createElement('span');
      host.setAttribute('data-jbe-mini', id);
      host.style.cssText = 'position:relative;z-index:5;display:inline-block;margin:4px';
      const shadow = host.attachShadow({ mode: 'open' });
      const style = document.createElement('style');
      style.textContent = MINI_CSS;
      const select = el('input', {
        type: 'checkbox', 'aria-label': t('select'), checked: ui.selected.has(id),
        onchange: (e) => {
          if (e.target.checked) ui.selected.add(id);
          else ui.selected.delete(id);
          if (ui.panel && ui.panel.classList.contains('open')) renderPanel();
        },
      });
      const stop = (e) => { e.stopPropagation(); };
      const wrap = el('span', { class: 'mini', onclick: stop }, [
        el('label', { title: t('select'), onclick: stop }, [select]),
        el('button', {
          type: 'button', title: t('export_one'), 'aria-label': t('export_one'), 'data-jbe': 'card-export', text: '⤓',
          onclick: (e) => {
            e.preventDefault();
            e.stopPropagation();
            togglePanel(true);
            exportManyCharacters([id]);
          },
        }),
      ]);
      shadow.append(style, wrap);
      // Outside the <a> so clicks don't navigate.
      if (container === anchor) anchor.insertAdjacentElement('afterend', host);
      else container.appendChild(host);
    }
  }

  // --- Routing (SPA) ----------------------------------------------------------

  let lastPath = null;
  function onRouteMaybeChanged() {
    if (location.pathname === lastPath) return;
    lastPath = location.pathname;
    ui.route = parseRoute(location.pathname);
    ui.charState = null;
    ui.selected.clear();
    if (ui.panel && ui.panel.classList.contains('open')) renderPanel();
    decorateListCards();
  }

  function start() {
    installFetchHook();
    mountUi();
    onRouteMaybeChanged();
    // Polling is the least invasive way to follow SPA navigation: nothing in
    // the page's history API is patched.
    setInterval(() => {
      onRouteMaybeChanged();
      if (!document.documentElement.contains(ui.host)) mountUi();
    }, 700);
    let pending = false;
    new MutationObserver(() => {
      if (pending || ui.route.type !== 'list') return;
      pending = true;
      setTimeout(() => {
        pending = false;
        decorateListCards();
      }, 400);
    }).observe(document.body, { childList: true, subtree: true });
    if (typeof GM_registerMenuCommand === 'function') {
      GM_registerMenuCommand(t('panel_title'), () => togglePanel(true));
      GM_registerMenuCommand(t('backup_all'), () => {
        togglePanel(true);
        startAccountExport('all');
      });
    }
  }

  start();
})();
