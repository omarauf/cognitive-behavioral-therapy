import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { parseGuide } from "./guide-content";

const source = readFileSync(new URL("../../docs/CBT.md", import.meta.url), "utf8");

test("the canonical guide keeps all five parts and eighteen ordered sections", () => {
  const guide = parseGuide(source);
  assert.equal(guide.parts.length, 5);
  assert.deepEqual(
    guide.sections.map((section) => section.number),
    Array.from({ length: 18 }, (_, index) => index + 1),
  );
  const ids = guide.sections.flatMap((section) => [
    section.id,
    ...section.subsections.map((subsection) => subsection.id),
  ]);
  assert.equal(new Set(ids).size, ids.length);
});

test("splitting the guide preserves every source paragraph, table row, example, and reference", () => {
  const guide = parseGuide(source);
  const content = [
    guide.introduction,
    ...guide.sections.map((section) => section.body),
    guide.references,
  ].join("\n");
  const bodyLines = source
    .replace(/\r\n/g, "\n")
    .split("\n")
    .filter((line) => line.trim() && !/^# |^## /.test(line));
  for (const line of bodyLines)
    assert.ok(content.includes(line), `Missing source content: ${line}`);
  assert.equal((guide.references.match(/https:\/\//g) ?? []).length, 3);
});

test("Windows and Unix line endings produce the same navigable content", () => {
  assert.deepEqual(
    parseGuide(source.replace(/\r\n/g, "\n")),
    parseGuide(source.replace(/\r?\n/g, "\r\n")),
  );
});
