# Bulk Bytes Website

Bulk Bytes is a Next.js App Router website configured for static export and GitHub Pages deployment at `https://bulkbytes.org`.

## Technology Stack

- Next.js with App Router and TypeScript
- Static export for GitHub Pages
- Repository-managed MDX blog posts
- Build-time API content from `https://api.bulkbytes.org/api`
- Client-side contact form submissions to the existing Bulk Bytes API

## Local Setup

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run validate:legacy
npm run typecheck
npm run lint
npm run build
```

The production build writes the static website to `out/`.

## Environment Variables

Create `.env.local` when overriding defaults:

```bash
NEXT_PUBLIC_SITE_URL=https://bulkbytes.org
NEXT_PUBLIC_API_BASE_URL=https://api.bulkbytes.org/api
NEXT_PUBLIC_ENABLE_LIVE_API=true
```

Do not commit secrets. The current frontend only uses public API URLs.

`NEXT_PUBLIC_ENABLE_LIVE_API` defaults to listening to the public API. If the API is unavailable during a build, fallback content in `src/lib/fallback-data.ts` keeps static export working. Keep those fallback records updated until the API contract is fully stable.

## Deployment

The GitHub Actions workflow in `.github/workflows/deploy.yml` runs on pushes to `main`.

It installs dependencies, validates legacy public files, typechecks, lints, builds the static site, verifies the exported legacy files, uploads `out/`, and deploys to GitHub Pages.

The custom domain is preserved through `public/CNAME`.

## Critical Public URLs - Do Not Rename or Remove

These URLs are published in mobile apps, app stores, forms, and client-facing material:

```text
/clients-policy/udrive-privacy.html
/clients-policy/utrack-privacy.html
/support/udrive-support.html
```

They must remain public, direct `.html` files with the same casing and extensions. Do not convert them into Next.js routes, redirects, rewrites, or extensionless paths.

Their source files live in:

```text
public/clients-policy/udrive-privacy.html
public/clients-policy/utrack-privacy.html
public/support/udrive-support.html
```

Before deployment, `scripts/validate-legacy-pages.mjs` confirms these files exist in `public/` and, after build, in `out/`.

## Blog Authoring

Blog posts live in `content/blog/*.mdx`.

Required frontmatter:

```yaml
---
title: "Article Title"
slug: "article-title"
description: "Short SEO description."
publishedAt: "2026-08-05"
updatedAt: "2026-08-05"
author: "Bulk Bytes"
category: "Mobile Apps"
tags:
  - Mobile Apps
featuredImage: "/images/blog/example.webp"
draft: false
---
```

Set `draft: true` to hide a post from production routes and listing pages.

Place blog images in `public/images/blog/` and reference them with `/images/blog/...`.

## SEO Checklist

- Use one clear `h1` per page.
- Give each route a unique title, description, canonical URL, and Open Graph image.
- Keep featured images descriptive and compressed.
- Add internal links between relevant service, portfolio, and blog pages.
- Validate blog frontmatter before publishing.
- Confirm `sitemap.xml` includes static, dynamic, blog, and critical legacy URLs.

## Safely Updating Policy Files

Edit only the intended file under `public/clients-policy/` or `public/support/`.

Do not change filenames, folder names, casing, or `.html` extensions. Legal/privacy/support content should only change when explicitly requested and reviewed.

## Rollback

Before replacing production, tag the last stable version and record GitHub Pages/DNS settings. If any critical legacy URL stops returning `200` after deployment, roll back to the last stable release immediately and verify the three URLs again on `https://bulkbytes.org`.
