#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const contextPath = resolve(process.cwd(), "docs", "PROJECT_CONTEXT.md");

if (!existsSync(contextPath)) {
  console.error("[docs:check] Missing docs/PROJECT_CONTEXT.md");
  process.exit(1);
}

const content = readFileSync(contextPath, "utf8");

const hasSessionLog = content.includes("## 8) Session Log");
if (!hasSessionLog) {
  console.error("[docs:check] Missing '## 8) Session Log' section in docs/PROJECT_CONTEXT.md");
  process.exit(1);
}

const datedEntryPattern = /^###\s+\d{4}-\d{2}-\d{2}\s+-\s+.+$/m;
const hasDatedEntry = datedEntryPattern.test(content);

if (!hasDatedEntry) {
  console.warn("[docs:check] Reminder: add a real session entry under '## 8) Session Log' (e.g. '### 2026-02-16 - Setup on Windows').");
  process.exit(2);
}

console.log("[docs:check] OK: docs/PROJECT_CONTEXT.md exists and includes at least one dated session entry.");