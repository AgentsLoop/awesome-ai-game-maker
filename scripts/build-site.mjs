#!/usr/bin/env node
// Build the GitHub Pages site from README.md and games.md.
// Usage: node scripts/build-site.mjs
// Emits index.html, games.html, and poster.html at the repository root.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPO = 'https://github.com/AgentsLoop/awesome-ai-game-maker';

const esc = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

function slug(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
}

function inline(text) {
  let out = esc(text);
  out = out.replace(/\`([^\`]+)\`/g, '<code>$1</code>');
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
    const external = /^https?:/.test(href);
    return '<a href="' + href + '"' + (external ? ' target="_blank" rel="noopener"' : '') + '>' + label + '</a>';
  });
  out = out.replace(/(^|[\s(])(https?:\/\/[^\s<)]+)/g, (_, lead, url) => lead + '<a href="' + url + '" target="_blank" rel="noopener">' + url + '</a>');
  return out;
}

function renderTable(lines) {
  const cells = (line) => line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());
  const header = cells(lines[0]);
  const body = lines.slice(2).map(cells);
  let html = '<div class="table-wrap"><table><thead><tr>';
  html += header.map((c) => '<th>' + inline(c) + '</th>').join('');
  html += '</tr></thead><tbody>';
  for (const row of body) html += '<tr>' + row.map((c) => '<td>' + inline(c) + '</td>').join('') + '</tr>';
  return html + '</tbody></table></div>';
}

function markdownToHtml(markdown, options = {}) {
  const lines = markdown.split('\n');
  const out = [];
  const headings = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i += 1; continue; }
    if (line.startsWith('<')) { i += 1; continue; }
    if (line.trim().startsWith('|')) {
      const block = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) block.push(lines[i++]);
      out.push(renderTable(block));
      continue;
    }
    const heading = line.match(/^(#{1,4})\s+(.*)$/);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2];
      if (level === 1 && options.skipTitle) { i += 1; continue; }
      const id = slug(text);
      if (level === 2) headings.push({ id, text });
      out.push('<h' + level + ' id="' + id + '">' + inline(text) + '</h' + level + '>');
      i += 1;
      continue;
    }
    if (line.startsWith('>')) {
      const block = [];
      while (i < lines.length && lines[i].startsWith('>')) block.push(lines[i++].replace(/^>\s?/, ''));
      out.push('<blockquote>' + inline(block.join(' ')) + '</blockquote>');
      continue;
    }
    if (/^[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) items.push(lines[i++].replace(/^[-*]\s+/, ''));
      out.push('<ul>' + items.map((item) => '<li>' + inline(item) + '</li>').join('') + '</ul>');
      continue;
    }
    const paragraph = [line];
    i += 1;
    while (i < lines.length && lines[i].trim() && !/^([#>|]|[-*]\s)/.test(lines[i])) paragraph.push(lines[i++]);
    out.push('<p>' + inline(paragraph.join(' ')) + '</p>');
  }
  return { html: out.join('\n'), headings };
}

const STYLE = [
  ':root { color-scheme: dark; --bg:#05060f; --panel:#0b1020; --line:#1d2946; --text:#dce6ff; --dim:#93a7d4; --cyan:#4fd8ff; --magenta:#c07bff; }',
  '* { box-sizing: border-box; }',
  'body { margin:0; background:var(--bg); color:var(--text); font:16px/1.6 Arial, Helvetica, sans-serif; }',
  'a { color:var(--cyan); }',
  'header.top { position:sticky; top:0; z-index:5; backdrop-filter:blur(10px); background:rgba(5,6,15,.86); border-bottom:1px solid var(--line); }',
  'header.top .inner { max-width:1180px; margin:0 auto; padding:12px 20px; display:flex; flex-wrap:wrap; gap:14px; align-items:center; }',
  'header.top strong { letter-spacing:.04em; }',
  'nav a { color:var(--dim); text-decoration:none; margin-right:14px; font-size:14px; }',
  'nav a:hover { color:var(--cyan); }',
  'main { max-width:1180px; margin:0 auto; padding:24px 20px 60px; }',
  '.hero { display:grid; gap:18px; }',
  '.hero img { width:100%; height:auto; border-radius:16px; border:1px solid var(--line); display:block; }',
  'h1 { font-size:clamp(28px,4vw,44px); margin:22px 0 6px; }',
  'h2 { font-size:clamp(20px,2.4vw,28px); margin:38px 0 10px; padding-top:10px; border-top:1px solid var(--line); }',
  'h3 { font-size:19px; margin:26px 0 8px; }',
  'p, li { color:var(--text); }',
  'blockquote { margin:16px 0; padding:12px 16px; border-left:3px solid var(--cyan); background:var(--panel); border-radius:0 10px 10px 0; color:#cfe0ff; }',
  'code { background:#121b33; border:1px solid var(--line); border-radius:6px; padding:1px 6px; font-size:14px; }',
  '.table-wrap { overflow-x:auto; margin:16px 0; border:1px solid var(--line); border-radius:12px; }',
  'table { border-collapse:collapse; width:100%; min-width:720px; font-size:14.5px; }',
  'th, td { text-align:left; vertical-align:top; padding:10px 12px; border-bottom:1px solid var(--line); }',
  'th { background:#0e1730; position:sticky; top:0; font-weight:700; }',
  'tr:last-child td { border-bottom:none; }',
  'footer { max-width:1180px; margin:0 auto; padding:24px 20px 60px; color:var(--dim); border-top:1px solid var(--line); }',
  '.controls { display:flex; flex-wrap:wrap; gap:10px; align-items:center; margin:14px 0; }',
  'button, input[type=range] { font:inherit; }',
  'button { background:#121b33; color:var(--text); border:1px solid var(--line); border-radius:8px; padding:7px 12px; cursor:pointer; }',
  'button[aria-pressed="true"] { border-color:var(--cyan); background:#16304f; }',
  '.chip { display:inline-flex; gap:6px; align-items:center; background:#0e1730; border:1px solid var(--line); border-radius:999px; padding:6px 12px; font-size:14px; }',
  '.stage object { display:block; width:100%; aspect-ratio:16/9; border:1px solid var(--line); border-radius:16px; background:#05060f; }',
  '.note { color:var(--dim); }',
].join('\n');

function page({ title, description, body, nav }) {
  return [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    '<title>' + esc(title) + '</title>',
    '<meta name="description" content="' + esc(description) + '">',
    '<meta property="og:title" content="' + esc(title) + '">',
    '<meta property="og:description" content="' + esc(description) + '">',
    '<meta property="og:image" content="' + REPO + '/raw/main/svg/poster-still.png">',
    '<style>',
    STYLE,
    '</style>',
    '</head>',
    '<body>',
    '<header class="top"><div class="inner"><strong>Awesome AI Game Maker</strong><nav>' + nav + '</nav></div></header>',
    '<main>',
    body,
    '</main>',
    '<footer>Built from README.md and games.md by node scripts/build-site.mjs. Repository: <a href="' + REPO + '" target="_blank" rel="noopener">' + REPO.replace('https://', '') + '</a>. Poster artwork is a hybrid SVG with embedded raster layers.</footer>',
    '</body>',
    '</html>',
    '',
  ].join('\n');
}

const NAV = [
  '<a href="index.html">Index</a>',
  '<a href="games.html">Example games</a>',
  '<a href="poster.html">Poster</a>',
  '<a href="' + REPO + '" target="_blank" rel="noopener">GitHub</a>',
].join('');

const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
const games = fs.readFileSync(path.join(ROOT, 'games.md'), 'utf8');

const readmeBody = readme.replace(/^# .*\n/, '').replace(/^<a [^\n]*\n/, '').replace(/Open \[the interactive poster preview\][^\n]*\n/, '').replace(/\n{3,}/g, '\n\n');
const indexParsed = markdownToHtml(readmeBody);
const indexBody = [
  '<section class="hero">',
  '<a href="poster.html"><img src="svg/poster.svg" alt="Awesome AI Game Maker poster: a robot maker in a neon workshop beside a holographic game diorama"></a>',
  '<p class="note">Animated poster with seven parallax layers. <a href="poster.html">Open the interactive poster</a> for pointer parallax, layer toggles, and pause controls.</p>',
  '</section>',
  indexParsed.html,
].join('\n');
fs.writeFileSync(path.join(ROOT, 'index.html'), page({
  title: 'Awesome AI Game Maker',
  description: 'AI game generators, AI-assisted engines, and asset or publishing services, each with verified example games.',
  body: indexBody,
  nav: NAV,
}));

const gamesParsed = markdownToHtml(games, { skipTitle: false });
fs.writeFileSync(path.join(ROOT, 'games.html'), page({
  title: 'Verified example games by tool — Awesome AI Game Maker',
  description: 'Every verified example game per AI game-creation tool, with page status and primary sources.',
  body: gamesParsed.html,
  nav: NAV,
}));

const posterBody = [
  '<h1>Animated poster</h1>',
  '<p>Seven depth layers, pointer parallax, and a loop that runs without JavaScript. The exported SVG keeps its motion opt-in, so an image tag plays the loop but cannot run the pointer parallax; this page uses an object embed for both.</p>',
  '<div class="stage"><object id="poster" type="image/svg+xml" data="svg/poster.svg" aria-label="Awesome AI Game Maker animated poster"></object></div>',
  '<div class="controls">',
  '<button id="play" aria-pressed="true">Play</button>',
  '<button id="pause" aria-pressed="false">Pause</button>',
  '<button id="parallax" aria-pressed="true">Pointer parallax</button>',
  '<label>Strength <input id="strength" type="range" min="0" max="2" step="0.1" value="1"></label>',
  '<button id="reset">Reset layers</button>',
  '<span id="state" class="note">loading</span>',
  '</div>',
  '<div id="layers" class="controls"></div>',
  '<p class="note">Static render: <a href="svg/poster-still.png">poster-still.png</a>. Source: <a href="svg/poster.template.svg">poster.template.svg</a>, prompts in <a href="svg/prompts.md">svg/prompts.md</a>.</p>',
  '<h2 id="transparent-variant">Transparent vector variant</h2>',
'<p>Vector-only with no raster artwork and no background. Light ink suits dark surfaces; dark ink suits light surfaces. The SVG also takes data-ink="dark" on its root, and both settings are exported as transparent PNGs.</p>',
'<div class="stage"><object id="poster-unslop" type="image/svg+xml" data="svg/poster-unslop.svg" aria-label="Transparent vector variant of the poster"></object></div>',
'<div class="controls"><button id="ink-toggle" aria-pressed="false">Dark ink</button><span class="note">Transparent PNG exports: <a href="svg/poster-unslop.png">light ink</a> &middot; <a href="svg/poster-unslop-ink-dark.png">dark ink</a></span></div>',
  '<script>',
  fs.readFileSync(path.join(ROOT, 'scripts', 'poster-controls.js'), 'utf8').trim(),
  '</script>',
].join('\n');
fs.writeFileSync(path.join(ROOT, 'poster.html'), page({
  title: 'Animated poster — Awesome AI Game Maker',
  description: 'Interactive animated poster with seven parallax depth layers and pause, parallax, strength, and layer controls.',
  body: posterBody,
  nav: NAV,
}));

console.log('Built index.html, games.html, and poster.html');
