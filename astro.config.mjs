// @ts-check
import { defineConfig } from 'astro/config';

// One build serves two domains: blog.wust.dev (English) and blog.tobiaswust.de (German).
// Pages are generated under /en and /de; public/_redirects maps each domain onto its folder.
export default defineConfig({
  site: 'https://blog.wust.dev',
  trailingSlash: 'always',
  build: { format: 'directory' },
  markdown: {
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
});
