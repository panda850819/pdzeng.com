import type { UnifiedWritingItem } from "@/lib/writing";

export const telegramNote = (item: UnifiedWritingItem) =>
  (item.description || item.title)
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/🔗/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export const splitXCopy = (item: UnifiedWritingItem) => {
  const text = (item.description || item.title).trim();
  if (text.length <= 96) return { headline: text, body: "" };
  const firstParagraphEnd = text.indexOf("\n\n");
  if (firstParagraphEnd >= 24 && firstParagraphEnd <= 120) {
    return {
      headline: text.slice(0, firstParagraphEnd).trim(),
      body: text.slice(firstParagraphEnd).trim(),
    };
  }
  const excerpt = text.slice(0, 96);
  const punctuationEnd = Math.max(
    excerpt.lastIndexOf("。") + 1,
    excerpt.lastIndexOf("！") + 1,
    excerpt.lastIndexOf("？") + 1,
  );
  const splitAt = punctuationEnd >= 24 ? punctuationEnd : 96;
  return {
    headline: `${text.slice(0, splitAt).trimEnd()}…`,
    body: text.slice(splitAt).trimStart(),
  };
};

export const writingHeadline = (item: UnifiedWritingItem) => {
  if (item.source === "telegram") {
    return telegramNote(item) || item.preview?.title || item.preview?.description || item.title;
  }
  if (item.source === "x") return splitXCopy(item).headline;
  return item.title;
};
