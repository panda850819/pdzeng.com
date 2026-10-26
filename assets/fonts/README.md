# OG image font

`NotoSansTC-og-subset.ttf` is the only font `app/opengraph-image.tsx` renders with, read from disk at
build time so the OG image never fetches fonts over the network. It covers printable ASCII plus the CJK
and punctuation of both candidate OG taglines; `tests/e2e-home.test.js` fails if the current tagline
needs a glyph it lacks.

- Font: Noto Sans TC, SIL Open Font License 1.1 (`OFL.txt`). Reserved Font Name: "Source"; the subset keeps
  the Noto Sans TC name, which is not reserved.
- Source: `ofl/notosanstc/NotoSansTC[wght].ttf` from github.com/google/fonts at
  3be1884c48c3e45b52ecc725676a08f87776373e (sha256 864727d2…246bd44f).
- Built outside the repo with fonttools 4.55.3:

```sh
fonttools varLib.instancer 'NotoSansTC[wght].ttf' wght=400 --update-name-table -o NotoSansTC-400.ttf
pyftsubset NotoSansTC-400.ttf --text-file=og-text.txt --unicodes=U+0020-007E \
  --name-IDs='*' --name-legacy --name-languages='*' --notdef-outline --no-hinting \
  --output-file=NotoSansTC-og-subset.ttf
```

`og-text.txt` is the two taglines concatenated. Changing the tagline to new characters means regenerating
the subset the same way.
