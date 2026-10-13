# Test fixtures

**These fixtures are synthetic.** The build environment could not reach
janitorai.com (the network policy blocks it, and JanitorAI answers 403 to
datacenter addresses anyway), so the JSON here was written by hand. The shapes follow:

- the field list in `RESEARCH_2026-10-13.md` ("How the data is reached"),
- what two MIT-licensed exporters read from the same endpoints
  (`unorouter/janitorai-full-export` and `itsfantomas/janitor-exporter`).

| File | Endpoint it stands in for |
|---|---|
| `character-public.json` | `GET /hampter/characters/<uuid>`: public, `showdefinition: true`, alternate greetings, emoji/CJK |
| `character-hidden.json` | the same endpoint for a hidden definition (the server returns definition fields as `null`) |
| `character-nsfw.json` | NSFW, mixed tag shapes, absolute avatar URL |
| `character-lorebook.json` | a character with two attached lorebooks (`scripts`) |
| `lorebook-static.json` | `GET /hampter/script/<id>`: static entries (JSON string in `script`) |
| `lorebook-advanced.json` | the same endpoint for a script-based ("advanced") lorebook |
| `chat.json`, `chat-hidden.json` | `GET /hampter/chats/<id>`, with rejected regenerations (`is_main: false`) |
| `chat-list-characters.json` | `GET /hampter/chats/character-chats?page=N` |
| `character-chats-*.json` | `GET /hampter/chats/character/<cid>/chats?page=N` |
| `store-state-script.txt` | the inline `window._storeState_ = JSON.parse("…")` script |

**Before v1 ships, replace or supplement them with sanitized real captures.**
Use the script's own "JanitorAI JSON (raw)" export, or copy the responses from
the browser's network tab, then run:

    node tools/sanitize-fixture.js path/to/capture.json > test/fixtures/real-<name>.json

This swaps IDs, names and free text for stable placeholders but keeps the
structure. Then add the file to `test/unit/mapping.test.js`.
