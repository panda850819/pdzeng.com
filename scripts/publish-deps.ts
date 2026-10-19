import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import type { CommandRunner } from "./publish-git";

// bun.lock is the lockfile of record (CI and deploy install from it); pnpm-lock.yaml is stale.
const MANIFESTS = ["package.json", "bun.lock"];
const STAMP = join("node_modules", ".publish-writing-deps");

export const dependencyFingerprint = (repo: string) => {
  const hash = createHash("sha256");
  for (const file of MANIFESTS) hash.update(`${file}\0`).update(readFileSync(join(repo, file))).update("\0");
  return hash.digest("hex");
};

// Compares against what this publisher last installed, not against the pull, so a
// checkout that was pulled by an older publisher still gets its dependencies.
export const ensureDependencies = (repo: string, run: CommandRunner) => {
  const stamp = join(repo, STAMP);
  const fingerprint = dependencyFingerprint(repo);
  if (existsSync(stamp) && readFileSync(stamp, "utf8").trim() === fingerprint) return false;

  run(["bun", "install", "--frozen-lockfile"]);
  mkdirSync(dirname(stamp), { recursive: true });
  writeFileSync(stamp, `${fingerprint}\n`);
  return true;
};

// tsconfig maps "#content" to the gitignored .velite output, so regenerate it from
// the current velite.config.ts and content/ before tsc reads it.
export const typecheck = (run: CommandRunner) => {
  run(["bun", "x", "velite"]);
  run(["bun", "run", "typecheck"]);
};
