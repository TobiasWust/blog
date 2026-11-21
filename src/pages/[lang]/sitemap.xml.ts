import type { APIContext } from 'astro';
import { canonicalUrl, categoryIds, locales, otherLocale, type Locale } from '../../i18n';
import { getPosts } from '../../lib/posts';

export function getStaticPaths() {
  return locales.map((lang) => ({ params: { lang } }));
}

// one sitemap per domain, with hreflang links between translations
export async function GET({ params }: APIContext) {
  const lang = params.lang as Locale;
  const other = otherLocale(lang);
  const posts = (await getPosts(lang)).filter((p) => !p.fallback);
  const used = categoryIds.filter((c) => posts.some((p) => p.post.data.category === c));

  const entry = (path: string, alternate?: string, lastmod?: Date) => `  <url>
    <loc>${canonicalUrl(lang, path)}</loc>${lastmod ? `\n    <lastmod>${lastmod.toISOString()}</lastmod>` : ''}${alternate ? `
    <xhtml:link rel="alternate" hreflang="${lang}" href="${canonicalUrl(lang, path)}"/>
    <xhtml:link rel="alternate" hreflang="${other}" href="${canonicalUrl(other, alternate)}"/>` : ''}
  </url>`;

  const urls = [
    entry('/', '/'),
    ...used.map((c) => entry(`/category/${c}/`, `/category/${c}/`)),
    ...posts.map((p) => entry(`/${p.slug}/`, p.translation && `/${p.translation.slug}/`, p.post.data.updated ?? p.post.data.date)),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
