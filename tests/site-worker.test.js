import { describe, expect, test } from "bun:test";
import worker from "../workers/site/index.js";

const envWith = (res) => ({ ASSETS: { fetch: async () => res } });
const get = (path) => new Request(`https://pdzeng.com${path}`);

describe("site worker", () => {
  test("turns the asset layer's 307 trailing-slash redirect into a 308 with the same location", async () => {
    const res = await worker.fetch(get("/cv?a=1"), envWith(new Response(null, { status: 307, headers: { location: "/cv/?a=1" } })));
    expect(res.status).toBe(308);
    expect(res.headers.get("location")).toBe("/cv/?a=1");
  });

  test.each([200, 304, 404])("passes %i through untouched", async (status) => {
    const original = new Response(status === 304 ? null : "body", { status });
    const res = await worker.fetch(get("/cv/"), envWith(original));
    expect(res).toBe(original);
  });
});
