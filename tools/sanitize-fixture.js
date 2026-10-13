#!/usr/bin/env node
// Turns a real JanitorAI API capture into a shareable test fixture: IDs,
// names, free text and URLs become stable placeholders, the structure stays.
// Usage: node tools/sanitize-fixture.js capture.json > test/fixtures/real-x.json
'use strict';
const fs = require('node:fs');

const KEEP_TEXT = new Set(['spec', 'spec_version', 'role', 'slug']);
const ids = new Map();
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function fakeId(value) {
  if (!ids.has(value)) {
    const n = String(ids.size + 1).padStart(12, '0');
    ids.set(value, UUID.test(value) ? `00000000-0000-4000-8000-${n}` : `id-${ids.size + 1}`);
  }
  return ids.get(value);
}

function scrub(value, key) {
  if (Array.isArray(value)) return value.map((v) => scrub(v, key));
  if (value && typeof value === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = scrub(v, k);
    return out;
  }
  if (typeof value !== 'string') return value;
  if (/(^|_)id$/.test(key || '') || UUID.test(value)) return fakeId(value);
  if (/token|authorization|email/i.test(key || '')) return '[redacted]';
  if (KEEP_TEXT.has(key) || value === '') return value;
  if (/^\d{4}-\d{2}-\d{2}T/.test(value)) return value;
  if (/^https?:\/\//.test(value)) return 'https://ella.janitorai.com/bot-avatars/placeholder.webp';
  // Keep length and line structure so parsers see realistic text.
  return value.replace(/[^\s{}<>*"]/g, 'x');
}

const input = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
process.stdout.write(`${JSON.stringify(scrub(input), null, 2)}\n`);
