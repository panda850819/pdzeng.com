import { expect, test } from "bun:test";
import { experience } from "@/lib/cv-data";

test("records the completed Yei Finance tenure", () => {
  const yeiRole = experience.find((job) => job.company === "Yei Finance");

  expect(yeiRole).toMatchObject({
    role: "Ops Manager",
    period: "2026/01/26 – 2026/08/31",
  });
});
