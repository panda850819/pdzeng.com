/**
 * Strict well-formedness gate for content/writing-sources.json. JSON.parse accepts
 * lone UTF-16 surrogate escapes (e.g. "\ud83d"), but Turbopack's JSON loader rejects
 * them, so a snapshot can parse yet still break `next build`.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

const findMalformedStrings = (value: unknown, path: string, found: string[]) => {
  if (typeof value === "string") {
    if (!value.isWellFormed()) found.push(path);
  } else if (Array.isArray(value)) {
    value.forEach((item, index) => findMalformedStrings(item, `${path}[${index}]`, found));
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      if (!key.isWellFormed()) found.push(`${path} (key)`);
      findMalformedStrings(item, `${path}.${key}`, found);
    }
  }
  return found;
};

export const assertWellFormedSnapshot = (raw: string) => {
  const malformed = findMalformedStrings(JSON.parse(raw), "$", []);
  if (malformed.length > 0) {
    throw new Error(`writing snapshot has lone UTF-16 surrogates at ${malformed.join(", ")}`);
  }
};

if (import.meta.main) {
  assertWellFormedSnapshot(readFileSync(join(import.meta.dir, "..", "content/writing-sources.json"), "utf8"));
  console.log("writing snapshot is well-formed");
}
