import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { dependencyFingerprint, ensureDependencies, typecheck } from "../scripts/publish-deps";

const INSTALL = ["bun", "install", "--frozen-lockfile"];
const STAMP = join("node_modules", ".publish-writing-deps");

let repo;

beforeEach(() => {
  repo = mkdtempSync(join(tmpdir(), "publish-deps-"));
  writeFileSync(join(repo, "package.json"), '{"dependencies":{"gsap":"3.15.0"}}\n');
  writeFileSync(join(repo, "bun.lock"), "lock v1\n");
});

afterEach(() => {
  rmSync(repo, { recursive: true, force: true });
  mock.restore();
});

describe("ensureDependencies", () => {
  test("installs from the frozen lockfile when nothing was installed by the publisher yet", () => {
    const run = mock(() => "");

    expect(ensureDependencies(repo, run)).toBe(true);

    expect(run.mock.calls).toEqual([[INSTALL]]);
    expect(readFileSync(join(repo, STAMP), "utf8").trim()).toBe(dependencyFingerprint(repo));
  });

  test("skips the install when package.json and bun.lock are unchanged", () => {
    ensureDependencies(repo, () => "");
    const run = mock(() => "");

    expect(ensureDependencies(repo, run)).toBe(false);

    expect(run).not.toHaveBeenCalled();
  });

  test("reinstalls after a pull changes bun.lock", () => {
    ensureDependencies(repo, () => "");
    writeFileSync(join(repo, "bun.lock"), "lock v2\n");
    const run = mock(() => "");

    expect(ensureDependencies(repo, run)).toBe(true);

    expect(run.mock.calls).toEqual([[INSTALL]]);
  });

  test("reinstalls after a pull changes package.json", () => {
    ensureDependencies(repo, () => "");
    writeFileSync(join(repo, "package.json"), '{"dependencies":{"gsap":"3.15.0","lenis":"1.3.27"}}\n');
    const run = mock(() => "");

    expect(ensureDependencies(repo, run)).toBe(true);

    expect(run.mock.calls).toEqual([[INSTALL]]);
  });

  test("ignores pnpm-lock.yaml", () => {
    ensureDependencies(repo, () => "");
    writeFileSync(join(repo, "pnpm-lock.yaml"), "lockfileVersion: '9.0'\n");
    const run = mock(() => "");

    expect(ensureDependencies(repo, run)).toBe(false);
  });

  test("leaves the stamp alone when the install fails so the next run retries", () => {
    const run = mock(() => {
      throw new Error("bun install --frozen-lockfile exited 1");
    });

    expect(() => ensureDependencies(repo, run)).toThrow("frozen-lockfile exited 1");
    expect(existsSync(join(repo, STAMP))).toBe(false);
  });
});

describe("typecheck", () => {
  test("generates the velite collections before running tsc", () => {
    const run = mock(() => "");

    typecheck(run);

    expect(run.mock.calls).toEqual([[["bun", "x", "velite"]], [["bun", "run", "typecheck"]]]);
  });

  test("does not run tsc against stale collections when velite fails", () => {
    const run = mock((command) => {
      if (command.includes("velite")) throw new Error("bun x velite exited 1");
      return "";
    });

    expect(() => typecheck(run)).toThrow("velite exited 1");
    expect(run).toHaveBeenCalledTimes(1);
  });
});
