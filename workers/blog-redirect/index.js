import map from "../../docs/redirect-map.json";

const SITE = "https://pdzeng.com";

const staticMap = {
  "/": "/",
  "/blog": "/writing/",
  "/notes": "/writing/",
  "/projects": "/projects/",
  "/experience": "/cv/",
  "/bookmarks": "/",
  "/rss.xml": "/rss.xml",
  "/llms.txt": "/llms.txt",
};

export default {
  fetch(request) {
    const url = new URL(request.url);
    let path;
    try {
      path = decodeURIComponent(url.pathname);
    } catch {
      path = url.pathname;
    }
    if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);

    const target =
      staticMap[path] ??
      map[path] ??
      (path.startsWith("/blog/tags") || path.startsWith("/blog") || path.startsWith("/notes")
        ? "/writing/"
        : "/");

    return Response.redirect(SITE + target, 301);
  },
};
