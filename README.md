# blog.wust.dev / blog.tobiaswust.de

Tobias Wust's blog, built with [Astro](https://astro.build), hosted on Netlify.

- **English:** https://blog.wust.dev
- **Deutsch:** https://blog.tobiaswust.de

One build serves both domains: pages are generated under `/en` and `/de`, and
`public/_redirects` maps each domain onto its folder.

## Writing a post

Each post is a folder with an `index.md` and its images:

```
src/content/blog/de/<slug>/index.md
src/content/blog/en/<slug>/index.md
```

Frontmatter (see `src/content.config.ts`):

```yaml
title: "…"
description: "…"            # teaser for cards, search, RSS and social previews
date: 2026-11-21T08:00:00+01:00
translationKey: grimoire    # same key in both languages links a post to its translation
category: ai-agents         # ai-agents | tools | games (src/i18n.ts)
tags: ["KI", "ClaudeCode"]
cover: ./cover.png          # 1920×1080
coverAlt: "…"
linkedin: https://…         # optional, the matching LinkedIn article
draft: false                # optional
```

A post without a translation also appears on the other blog, in its original
language with `lang` set accordingly, so browsers offer to translate it, plus a
link to Google Translate.

Posts with a date in the future stay hidden until the next build after that date.

## Commands

```bash
npm run dev            # http://localhost:4321/en/ and /de/
npm run build          # production build + Pagefind search index
npm run preview:local  # production build with /en and /de prefixes, served locally
```

Pushing to `main` deploys via Netlify.
