#!/usr/bin/env node
// Check every HTTP link in the repository Markdown files.
// Usage: node scripts/check-links.mjs [file ...]
// Exit code 1 when a link does not answer with an HTTP 2xx or 3xx status.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";
const SKIP_DIRS = new Set(["node_modules", ".git"]);

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (entry.toLowerCase().endsWith(".md")) out.push(full);
  }
  return out;
}

function collect(file) {
  const text = readFileSync(file, "utf8");
  const urls = [...text.matchAll(/https?:\/\/[^\s)\]<>"]+/g)].map((m) => m[0].replace(/[.,;]+$/, ""));
  return [...new Set(urls)];
}

// GitHub rate-limits burst requests with HTTP 429, so retry those with backoff.
async function probe(url) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 25000);
      const response = await fetch(url, { headers: { "user-agent": UA }, redirect: "follow", signal: controller.signal });
      clearTimeout(timer);
      if (response.status !== 429) return response.status;
    } catch (error) {
      if (attempt === 2) return "ERR:" + error.name;
    }
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
  return 429;
}

const args = process.argv.slice(2);
const files = [];
for (const target of args.length ? args : [ROOT]) {
  if (statSync(target).isDirectory()) files.push(...walk(target));
  else files.push(target);
}

const checked = new Map();
let failures = 0;
for (const file of files) {
  for (const url of collect(file)) {
    if (!checked.has(url)) checked.set(url, probe(url));
  }
}
const results = [...checked.entries()];
const statuses = await Promise.all(results.map(async ([url, pending]) => [url, await pending]));
for (const [url, status] of statuses.sort((a, b) => String(a[1]).localeCompare(String(b[1])))) {
  const ok = typeof status === "number" && status < 400;
  if (!ok) failures += 1;
  console.log((ok ? "ok   " : "FAIL ") + status + "  " + url);
}
console.log(statuses.length + " unique link(s) checked in " + files.length + " file(s).");
console.log(failures ? "Link check failed: " + failures + " link(s)." : "All links resolve.");
process.exit(failures ? 1 : 0);
