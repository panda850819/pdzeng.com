import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { GridCard } from "@/components/writing-list";
import { writingHeadline } from "@/lib/writing-display";

const telegramItem = (overrides = {}) => ({
  id: "telegram:test",
  title: "https://example.com/",
  description: "",
  url: "https://t.me/example/1",
  publishedAt: "2026-07-17T00:00:00.000Z",
  locale: "zh-TW",
  source: "telegram",
  category: "telegram",
  external: true,
  ...overrides,
});

test("uses Telegram note text instead of a leading URL", () => {
  const item = telegramItem({ title: "https://example.com/ 這是可讀的摘要" });
  expect(writingHeadline(item)).toBe("這是可讀的摘要");
});

test("uses preview title when a Telegram item only contains a URL", () => {
  const item = telegramItem({
    preview: {
      targetUrl: "https://example.com/",
      siteName: "Example",
      title: "A readable preview title",
      description: "Preview description",
    },
  });
  expect(writingHeadline(item)).toBe("A readable preview title");
});

test("renders one Telegram grid heading without a preview", () => {
  const html = renderToStaticMarkup(<GridCard item={telegramItem({ title: "一則 Telegram 筆記" })} />);
  expect(html.match(/<h2/g)).toHaveLength(1);
  expect(html.match(/一則 Telegram 筆記/g)).toHaveLength(1);
});

test("renders one Telegram grid heading when preview text is the fallback", () => {
  const item = telegramItem({
    preview: {
      targetUrl: "https://example.com/",
      siteName: "Example",
      title: "A readable preview title",
      description: "Preview description",
    },
  });
  const html = renderToStaticMarkup(<GridCard item={item} />);
  expect(html.match(/<h2/g)).toHaveLength(1);
  expect(html.match(/A readable preview title/g)).toHaveLength(1);
});
