'use strict';
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..', '..');
const SCRIPT_PATH = path.join(ROOT, 'janitor-backup-export.user.js');
const core = require(SCRIPT_PATH);

function fixture(name) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, 'test', 'fixtures', name), 'utf8'));
}

function fixtureText(name) {
  return fs.readFileSync(path.join(ROOT, 'test', 'fixtures', name), 'utf8');
}

function scriptSource() {
  return fs.readFileSync(SCRIPT_PATH, 'utf8');
}

function userscriptHeader() {
  const src = scriptSource();
  return src.slice(src.indexOf('// ==UserScript=='), src.indexOf('// ==/UserScript==') + 18);
}

// A viewer who is not the creator of any fixture character.
const STRANGER = { userId: '11111111-2222-4333-8444-555555555555', loggedIn: true };

module.exports = { core, fixture, fixtureText, scriptSource, userscriptHeader, ROOT, STRANGER };
