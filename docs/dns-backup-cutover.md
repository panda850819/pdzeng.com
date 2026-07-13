# DNS rollback values — pre-cutover 2026-07-13

Zone: pdzeng.com (6144e5f81fd421dd7f0ce044f8617c97)

| host | type | content | proxied | source of truth |
|---|---|---|---|---|
| pdzeng.com | A | 216.198.79.1 | (Vercel) | dig 2026-07-13; Vercel project = personal-cv |
| blog.pdzeng.com | CNAME | blog-9jd.pages.dev | yes | wrangler pages project list |
| daily.pdzeng.com | CNAME | mini-blog-6e8.pages.dev | yes | untouched |

Rollback A: recreate the A record; re-add pdzeng.com to Vercel project.
Rollback B: re-add custom domain blog.pdzeng.com to Pages project `blog`.
