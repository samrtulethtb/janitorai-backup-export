# Sleazy Fork listing (draft, not published)

Copy for the Sleazy Fork script page. Every claim here is checked against the
hard rules (SPEC §2) and the allowed claims (SPEC §6), and
`test/unit/sponsor-listing.test.js` checks the key ones.

- **Script URL to sync from:** `https://raw.githubusercontent.com/samrtulethtb/janitorai-backup-export/main/janitor-backup-export.user.js`
- **Antifeature:** none in v1.0.0. The sponsor card ships disabled. If it is turned
  on later, add `@antifeature ads` to the header and the "Sponsor card" paragraph
  below in the same release.

## Name (English, 98 characters)

JanitorAI Backup & Export – chats, character cards & lorebooks to SillyTavern, SpicyChat, Saucepan

## Short description (English)

Back up your JanitorAI chats, characters, personas and lorebooks. Standards-correct V2/V3 PNG and JSON cards, SillyTavern JSONL chats that import, Markdown/TXT/HTML/JSON. Runs in your browser, talks only to janitorai.com, no tracking. Hidden definitions are never extracted.

## Full description (English)

**The reliable JanitorAI backup & migration kit.**

JanitorAI has no export button. This script adds one.

**What it saves**
- **Your chats**: SillyTavern JSONL that actually imports, plus Markdown, TXT, readable HTML, and full JSON with every swipe. You can export one chat, or all of them at once with a progress bar.
- **Character cards** as PNG with both the `chara` (V2) and `ccv3` (V3) chunks, or as V2/V3 JSON, TXT, or the raw JanitorAI JSON.
- **Lorebooks**: embedded in the card, or as a separate SillyTavern World Info file.
- **Personas** in SillyTavern's persona backup format.
- **Back up everything**: one ZIP with characters, chats, personas, lorebooks, a manifest, and a `skipped.json` that lists anything that could not be saved and why.

**Why this one**
- A checklist before every export. Untick any part (system prompt, example dialogs, tags…).
- Names stay exactly as written. Switching them to `{{char}}`/`{{user}}` is optional.
- Every card has a small export button on My Characters, favorites and creator pages, plus "export selected" and "export all".
- Large batches are throttled, retry on errors, can resume, and never drop items silently.
- When JanitorAI changes something, the panel tells you which part broke and links to a prefilled report. It never just does nothing.
- Works on desktop and in Firefox for Android (Tampermonkey), with big touch targets and a bottom sheet on phones.
- Panel in English, Português (Brasil), Español and Bahasa Indonesia.

**Privacy**
- It runs entirely in your browser.
- It talks only to janitorai.com and its image server, using your own login.
- No tracking, no analytics, nothing sent to us.

**Hidden definitions are never extracted.** If a creator hid a character's definition, you get only the public parts (name, picture, tagline, tags, creator, stats) and the export says why. There is no proxy trick. You still get the full definition of characters you created yourself.

**Importing into SillyTavern:** import the character card first, open it, then use "Import chat" from its chat list.

**SpicyChat / Saucepan:** choose the "SpicyChat / Saucepan" target in the panel. It also fills the card's `personality` field.

<!-- Add only when SPONSOR_ENABLED is true and @antifeature ads is in the header:
**Sponsor card (ads):** after a successful export, the panel may show one small, clearly labelled sponsor card. It appears at most once a day, never before or during an export, and never after a failure. One click turns it off for good.
-->

## Localized names (≤ 100 characters each)

Machine-drafted. Please have a native speaker check them before publishing.

| Locale | Name |
|---|---|
| `en` | JanitorAI Backup & Export – chats, character cards & lorebooks to SillyTavern, SpicyChat, Saucepan |
| `pt-BR` | JanitorAI Backup e Exportação – chats, cartões de personagem e lorebooks para SillyTavern e mais |
| `es` | JanitorAI Copia y Exportación – chats, tarjetas de personaje y lorebooks a SillyTavern y más |
| `id` | JanitorAI Backup & Ekspor – chat, kartu karakter & lorebook ke SillyTavern, SpicyChat, Saucepan |
| `fr` | JanitorAI Sauvegarde & Export – chats, cartes de personnage et lorebooks vers SillyTavern |
| `de` | JanitorAI Backup & Export – Chats, Charakterkarten & Lorebooks für SillyTavern, SpicyChat |
| `it` | JanitorAI Backup ed Esportazione – chat, schede personaggio e lorebook per SillyTavern |
| `ru` | JanitorAI Бэкап и экспорт – чаты, карточки персонажей и лорбуки в SillyTavern, SpicyChat |
| `pl` | JanitorAI Kopia i eksport – czaty, karty postaci i lorebooki do SillyTavern, SpicyChat |
| `tr` | JanitorAI Yedekleme ve Dışa Aktarma – sohbetler, karakter kartları, lorebook → SillyTavern |
| `vi` | JanitorAI Sao lưu & Xuất – chat, thẻ nhân vật & lorebook sang SillyTavern, SpicyChat |
| `ja` | JanitorAI バックアップ＆エクスポート – チャット・キャラカード・ロアブックを SillyTavern へ |
| `ko` | JanitorAI 백업 & 내보내기 – 채팅, 캐릭터 카드, 로어북을 SillyTavern·SpicyChat으로 |
| `zh-CN` | JanitorAI 备份与导出 – 聊天、角色卡和世界书导出到 SillyTavern、SpicyChat、Saucepan |
| `zh-TW` | JanitorAI 備份與匯出 – 聊天、角色卡與世界書匯出到 SillyTavern、SpicyChat、Saucepan |
| `fil` | JanitorAI Backup at Export – chats, character card at lorebook papunta sa SillyTavern |

## Localized short descriptions

Machine-drafted. Please have a native speaker check them before publishing.

- **pt-BR:** Faça backup dos seus chats, personagens, personas e lorebooks do JanitorAI. Cartões V2/V3 PNG e JSON corretos, chats JSONL que importam no SillyTavern. Roda no seu navegador, fala só com janitorai.com, sem rastreamento. Definições ocultas nunca são extraídas.
- **es:** Haz copia de tus chats, personajes, personas y lorebooks de JanitorAI. Tarjetas V2/V3 PNG y JSON correctas, chats JSONL que se importan en SillyTavern. Funciona en tu navegador, solo habla con janitorai.com, sin rastreo. Nunca extrae definiciones ocultas.
- **id:** Cadangkan chat, karakter, persona, dan lorebook JanitorAI kamu. Kartu V2/V3 PNG dan JSON yang benar, chat JSONL yang bisa diimpor ke SillyTavern. Berjalan di browser kamu, hanya terhubung ke janitorai.com, tanpa pelacakan. Definisi tersembunyi tidak pernah diambil.
- **fr:** Sauvegardez vos chats, personnages, personas et lorebooks JanitorAI. Cartes PNG et JSON V2/V3 conformes, chats JSONL qui s'importent dans SillyTavern. Tout se passe dans votre navigateur, uniquement avec janitorai.com, sans pistage. Les définitions masquées ne sont jamais extraites.
- **de:** Sichere deine JanitorAI-Chats, Charaktere, Personas und Lorebooks. Standardkonforme V2/V3-Karten als PNG und JSON, SillyTavern-JSONL-Chats, die sich importieren lassen. Läuft in deinem Browser, spricht nur mit janitorai.com, kein Tracking. Versteckte Definitionen werden nie ausgelesen.
- **it:** Salva chat, personaggi, persona e lorebook di JanitorAI. Schede V2/V3 PNG e JSON conformi, chat JSONL importabili in SillyTavern. Funziona nel tuo browser, comunica solo con janitorai.com, nessun tracciamento. Le definizioni nascoste non vengono mai estratte.
- **ru:** Резервная копия ваших чатов, персонажей, персон и лорбуков JanitorAI. Корректные карточки V2/V3 в PNG и JSON, чаты JSONL, которые импортируются в SillyTavern. Работает в браузере, обращается только к janitorai.com, без слежки. Скрытые определения никогда не извлекаются.
- **pl:** Kopia zapasowa czatów, postaci, person i lorebooków z JanitorAI. Poprawne karty V2/V3 w PNG i JSON, czaty JSONL, które importują się do SillyTavern. Działa w przeglądarce, łączy się tylko z janitorai.com, bez śledzenia. Ukryte definicje nigdy nie są wyciągane.
- **tr:** JanitorAI sohbetlerini, karakterlerini, personalarını ve lorebook'larını yedekle. Standartlara uygun V2/V3 PNG ve JSON kartlar, SillyTavern'e aktarılabilen JSONL sohbetler. Tarayıcında çalışır, yalnızca janitorai.com ile konuşur, izleme yok. Gizli tanımlar asla çıkarılmaz.
- **vi:** Sao lưu chat, nhân vật, persona và lorebook JanitorAI của bạn. Thẻ V2/V3 PNG và JSON đúng chuẩn, chat JSONL nhập được vào SillyTavern. Chạy trong trình duyệt, chỉ kết nối với janitorai.com, không theo dõi. Không bao giờ trích xuất định nghĩa bị ẩn.
- **ja:** JanitorAI のチャット、キャラクター、ペルソナ、ロアブックをバックアップ。規格どおりの V2/V3 PNG・JSON カード、SillyTavern に取り込める JSONL チャット。ブラウザ内で動作し、通信先は janitorai.com のみ、トラッキングなし。非公開の定義は決して抽出しません。
- **ko:** JanitorAI 채팅, 캐릭터, 페르소나, 로어북을 백업하세요. 규격에 맞는 V2/V3 PNG·JSON 카드, SillyTavern으로 가져올 수 있는 JSONL 채팅. 브라우저에서만 실행되고 janitorai.com 하고만 통신하며 추적이 없습니다. 숨겨진 정의는 절대 추출하지 않습니다.
- **zh-CN:** 备份你的 JanitorAI 聊天、角色、人设和世界书。符合规范的 V2/V3 PNG 与 JSON 角色卡，可导入 SillyTavern 的 JSONL 聊天。完全在浏览器中运行，只与 janitorai.com 通信，无追踪。绝不提取被隐藏的角色定义。
- **zh-TW:** 備份你的 JanitorAI 聊天、角色、人設與世界書。符合規範的 V2/V3 PNG 與 JSON 角色卡，可匯入 SillyTavern 的 JSONL 聊天。完全在瀏覽器中執行，只與 janitorai.com 通訊，無追蹤。絕不擷取被隱藏的角色定義。
- **fil:** I-back up ang iyong mga chat, character, persona at lorebook sa JanitorAI. Tamang V2/V3 PNG at JSON card, mga JSONL chat na naii-import sa SillyTavern. Tumatakbo sa iyong browser, sa janitorai.com lang kumokonekta, walang tracking. Hindi kailanman kinukuha ang mga nakatagong definition.

## Listing checklist (SPEC §9)

- [x] No claim of extracting, unlocking or revealing hidden definitions.
- [x] Says the script talks only to janitorai.com (the image server is a janitorai.com subdomain).
- [x] Says there is no tracking or analytics.
- [x] Sponsor card disclosed only when enabled. It is off in 1.0.0, so there is no `@antifeature`.
- [ ] Native-speaker review of the localized names and descriptions.
- [ ] Screenshots from a real janitorai.com session (the current ones use mocked pages).
