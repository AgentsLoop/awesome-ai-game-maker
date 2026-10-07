#!/usr/bin/env node
// Validate Markdown tables: every row inside one table must expose the same cell count.
// The AI game-generator index shipped a 15-column checklist with a 14-column separator row,
// which GitHub rendered as plain text; this guard prevents a repeat.
// Usage: node scripts/validate-markdown-tables.mjs [file-or-directory ...]
// Defaults to every Markdown file in the repository, excluding node_modules, .git, games, and assets.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SKIP_DIRS = new Set(["node_modules", ".git", "games", "assets", "coverage", "dist", "outputs"]);
const SKIP_PREFIXES = [".agent_cache"];

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    if (SKIP_PREFIXES.some((prefix) => entry.startsWith(prefix))) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (entry.toLowerCase().endsWith(".md")) out.push(full);
  }
  return out;
}

function countCells(line) {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").length;
}

function checkFile(file) {
  const lines = readFileSync(file, "utf8").split("\n");
  const problems = [];
  for (let i = 0; i < lines.length; i += 1) {
    if (!lines[i].trim().startsWith("|")) continue;
    const start = i + 1;
    const rows = [];
    while (i < lines.length && lines[i].trim().startsWith("|")) {
      rows.push({ line: i + 1, cells: countCells(lines[i]) });
      i += 1;
    }
    if (new Set(rows.map((row) => row.cells)).size > 1) {
      problems.push({
        start,
        expected: rows[0].cells,
        rows: rows.filter((row) => row.cells !== rows[0].cells).map((row) => row.line + " (" + row.cells + " cells)"),
      });
    }
  }
  return problems;
}

const args = process.argv.slice(2);
const files = [];
for (const target of args.length ? args : [ROOT]) {
  if (statSync(target).isDirectory()) files.push(...walk(target));
  else files.push(target);
}

let failures = 0;
for (const file of files) {
  for (const problem of checkFile(file)) {
    failures += 1;
    console.log(
      relative(ROOT, file) +
        ":" +
        problem.start +
        " table expects " +
        problem.expected +
        " columns; mismatched rows: " +
        problem.rows.join(", "),
    );
  }
}

console.log(files.length + " Markdown file(s) checked.");
console.log(failures ? "Markdown table validation failed: " + failures + " table(s)." : "Markdown tables valid.");
process.exit(failures ? 1 : 0);
