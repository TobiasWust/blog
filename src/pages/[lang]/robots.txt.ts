import type { APIContext } from 'astro';
import { canonicalUrl, locales, type Locale } from '../../i18n';

export function getStaticPaths() {
  return locales.map((lang) => ({ params: { lang } }));
}

export function GET({ params }: APIContext) {
  const lang = params.lang as Locale;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${canonicalUrl(lang, '/sitemap.xml')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
