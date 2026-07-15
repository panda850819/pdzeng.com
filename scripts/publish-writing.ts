/**
 * Refresh the writing archive from Panda's logged-in Mac, verify the site, and
 * publish a content-only commit to main. Intended to run from launchd.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REPO = join(import.meta.dir, "..");
const SNAPSHOT = "content/writing-sources.json";
const SNAPSHOT_PATH = join(REPO, SNAPSHOT);
const DRY_RUN = Bun.argv.includes("--dry-run");

const run = (command: string[], output: "inherit" | "pipe" = "inherit") => {
  const result = Bun.spawnSync(command, {
    cwd: REPO,
    stdout: output,
    stderr: output,
  });
  if (result.exitCode !== 0) {
    const detail = output === "pipe" ? result.stderr.toString().trim() : "";
    throw new Error(`${command.join(" ")} exited ${result.exitCode}${detail ? `: ${detail}` : ""}`);
  }
  return output === "pipe" ? result.stdout.toString().trim() : "";
};

const status = run(["git", "status", "--porcelain"], "pipe");
if (status && !DRY_RUN) throw new Error("Refusing to publish from a dirty worktree");

if (!DRY_RUN) {
  const branch = run(["git", "branch", "--show-current"], "pipe");
  if (branch !== "main") throw new Error(`Expected main, found ${branch || "detached HEAD"}`);
  run(["git", "pull", "--ff-only", "origin", "main"]);
  const unpublished = Number(run(["git", "rev-list", "--count", "origin/main..HEAD"], "pipe"));
  if (unpublished > 0) throw new Error(`main has ${unpublished} unpublished local commit(s)`);
}

const originalSnapshot = readFileSync(SNAPSHOT_PATH, "utf8");
let staged = false;
let committed = false;

try {
  run(["bun", "scripts/sync-writing.ts", "--require-x"]);
  const changed = readFileSync(SNAPSHOT_PATH, "utf8") !== originalSnapshot;

  if (changed || DRY_RUN) run(["bun", "run", "build"]);

  if (!changed) {
    console.log(DRY_RUN ? "dry run passed; snapshot was already current" : "writing archive is already current");
  } else if (DRY_RUN) {
    console.log("dry run passed; snapshot will be restored");
  } else {
    run(["git", "add", SNAPSHOT]);
    staged = true;
    run(["git", "-c", "commit.gpgsign=false", "commit", "-m", "chore: sync writing archive"]);
    committed = true;
    run(["git", "push", "origin", "main"]);
    console.log("writing archive published");
  }
} catch (error) {
  if (!DRY_RUN && !staged && !committed) writeFileSync(SNAPSHOT_PATH, originalSnapshot);
  throw error;
} finally {
  if (DRY_RUN) writeFileSync(SNAPSHOT_PATH, originalSnapshot);
}
