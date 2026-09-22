import { afterEach, describe, expect, mock, spyOn, test } from "bun:test";
import { pushMainWithRetry } from "../scripts/publish-git";

afterEach(() => {
  mock.restore();
});

describe("pushMainWithRetry", () => {
  test("pushes once when main has not advanced", () => {
    const run = mock(() => "");

    pushMainWithRetry(run);

    expect(run).toHaveBeenCalledTimes(1);
    expect(run).toHaveBeenCalledWith(["git", "push", "origin", "main"], "pipe");
  });

  test("rebases and retries after a concurrent non-fast-forward push", () => {
    spyOn(console, "warn").mockImplementation(() => {});
    let pushes = 0;
    const run = mock((command) => {
      if (command[1] === "push" && pushes++ === 0) {
        throw new Error("main -> main (fetch first)");
      }
      return "";
    });

    pushMainWithRetry(run);

    expect(run.mock.calls.map(([command]) => command)).toEqual([
      ["git", "push", "origin", "main"],
      ["git", "pull", "--rebase", "origin", "main"],
      ["git", "push", "origin", "main"],
    ]);
  });

  test("does not retry authentication or network failures", () => {
    const run = mock(() => {
      throw new Error("Permission denied (publickey)");
    });

    expect(() => pushMainWithRetry(run)).toThrow("Permission denied");
    expect(run).toHaveBeenCalledTimes(1);
  });

  test("aborts a conflicted rebase before surfacing the error", () => {
    spyOn(console, "warn").mockImplementation(() => {});
    const run = mock((command) => {
      if (command[1] === "push") throw new Error("non-fast-forward");
      if (command[1] === "pull") throw new Error("merge conflict");
      return "";
    });

    expect(() => pushMainWithRetry(run)).toThrow("merge conflict");
    expect(run.mock.calls.at(-1)?.[0]).toEqual(["git", "rebase", "--abort"]);
  });
});
