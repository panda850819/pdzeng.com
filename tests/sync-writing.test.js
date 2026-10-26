import { describe, expect, mock, test } from "bun:test";
import { parseXbirdTweets, syncX } from "../scripts/sync-writing";

const tweet = (overrides = {}) => ({
  id: "1900000000000000001",
  text: "Shipping the xbird writing sync",
  createdAt: "Mon Oct 26 08:00:00 +0000 2026",
  conversationId: "1900000000000000001",
  author: { username: "PandaZeng1", name: "Panda" },
  replyCount: 2,
  retweetCount: 3,
  likeCount: 5,
  ...overrides,
});

const envelope = (data, meta = {}) => JSON.stringify({ ok: true, data, meta: { partial: false, ...meta } });

const runner = (result) => mock(() => ({ exitCode: 0, stderr: "", ...result }));

const previous = [
  {
    id: "1",
    title: "old",
    description: "old",
    url: "https://x.com/PandaZeng1/status/1",
    publishedAt: "2026-01-01T00:00:00.000Z",
    replies: 0,
    reposts: 0,
    likes: 0,
  },
];

describe("parseXbirdTweets", () => {
  test("reads paginated envelopes from data.tweets", () => {
    const stdout = envelope({ tweets: [tweet()], nextCursor: null }, { nextCursor: null });
    expect(parseXbirdTweets(stdout).map((item) => item.id)).toEqual(["1900000000000000001"]);
  });

  test("reads single-page envelopes where data is the tweet array", () => {
    expect(parseXbirdTweets(envelope([tweet()])).map((item) => item.id)).toEqual(["1900000000000000001"]);
  });

  test("throws on ok:false envelopes", () => {
    const stdout = JSON.stringify({
      ok: false,
      error: { code: "AUTHENTICATION_REQUIRED", message: "Missing required credentials" },
      meta: { partial: false },
    });
    expect(() => parseXbirdTweets(stdout)).toThrow("AUTHENTICATION_REQUIRED: Missing required credentials");
  });
});

describe("syncX", () => {
  test("invokes xbird user-tweets with paging and JSON output", () => {
    const run = runner({ stdout: envelope({ tweets: [], nextCursor: null }) });

    syncX(previous, { requireX: true, run });

    expect(run).toHaveBeenCalledWith([
      "xbird",
      "user-tweets",
      "PandaZeng1",
      "-n",
      "100",
      "--max-pages",
      "5",
      "--json",
    ]);
  });

  test("maps xbird tweets to XItems and drops replies, reposts, and other authors", () => {
    const quoted = tweet({
      id: "1800000000000000009",
      text: "Quoted context",
      author: { username: "someone", name: "Someone" },
      media: [{ type: "photo", url: "https://pbs.twimg.com/media/quoted.jpg" }],
    });
    const tweets = [
      tweet({ quotedTweet: quoted }),
      tweet({
        id: "1900000000000000002",
        createdAt: "Sun Oct 25 08:00:00 +0000 2026",
        conversationId: "1900000000000000002",
        text: "Photo post",
        media: [{ type: "photo", url: "https://pbs.twimg.com/media/own.jpg" }],
      }),
      tweet({ id: "1900000000000000003", conversationId: "1900000000000000001", text: "a reply" }),
      tweet({ id: "1900000000000000004", conversationId: "1900000000000000004", text: "RT @x: hi" }),
      tweet({
        id: "1900000000000000005",
        conversationId: "1900000000000000005",
        author: { username: "other", name: "Other" },
      }),
      tweet({ id: "1900000000000000006", conversationId: "1900000000000000006", createdAt: undefined }),
    ];
    const run = runner({ stdout: envelope({ tweets, nextCursor: "cursor" }) });

    expect(syncX(previous, { requireX: true, run })).toEqual([
      {
        id: "1900000000000000001",
        title: "Shipping the xbird writing sync",
        description: "Shipping the xbird writing sync",
        url: "https://x.com/PandaZeng1/status/1900000000000000001",
        publishedAt: "2026-10-26T08:00:00.000Z",
        replies: 2,
        reposts: 3,
        likes: 5,
        preview: {
          targetUrl: "https://x.com/someone/status/1800000000000000009",
          siteName: "X · @someone",
          title: "Someone",
          description: "Quoted context",
          imageUrl: "https://pbs.twimg.com/media/quoted.jpg",
        },
      },
      {
        id: "1900000000000000002",
        title: "Photo post",
        description: "Photo post",
        url: "https://x.com/PandaZeng1/status/1900000000000000002",
        publishedAt: "2026-10-25T08:00:00.000Z",
        replies: 2,
        reposts: 3,
        likes: 5,
        preview: {
          targetUrl: "https://x.com/PandaZeng1/status/1900000000000000002",
          siteName: "X",
          title: "",
          description: "",
          imageUrl: "https://pbs.twimg.com/media/own.jpg",
        },
      },
    ]);
  });

  test("--require-x throws when xbird exits non-zero, surfacing the envelope error", () => {
    const run = runner({
      exitCode: 3,
      stdout: JSON.stringify({
        ok: false,
        error: { code: "AUTHENTICATION_REQUIRED", message: "Missing required credentials" },
        meta: { partial: false },
      }),
      stderr: "[info] Looking up @PandaZeng1...",
    });

    expect(() => syncX(previous, { requireX: true, run })).toThrow(
      "xbird exited 3: AUTHENTICATION_REQUIRED: Missing required credentials",
    );
  });

  test("--require-x falls back to stderr when xbird exits non-zero without JSON", () => {
    const run = runner({ exitCode: 127, stdout: "", stderr: "xbird: command not found" });

    expect(() => syncX(previous, { requireX: true, run })).toThrow("xbird exited 127: xbird: command not found");
  });

  test("--require-x throws on ok:false even when xbird exits zero", () => {
    const run = runner({
      stdout: JSON.stringify({ ok: false, error: { code: "RUNTIME_ERROR", message: "boom" }, meta: {} }),
    });

    expect(() => syncX(previous, { requireX: true, run })).toThrow("xbird failed: RUNTIME_ERROR: boom");
  });

  test("preserves the previous snapshot on failure without --require-x", () => {
    const failing = runner({ exitCode: 5, stdout: "" });
    const notOk = runner({ stdout: JSON.stringify({ ok: false, meta: {} }) });

    expect(syncX(previous, { requireX: false, run: failing })).toBe(previous);
    expect(syncX(previous, { requireX: false, run: notOk })).toBe(previous);
  });
});
