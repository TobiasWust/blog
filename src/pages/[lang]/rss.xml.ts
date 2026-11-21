import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { canonicalUrl, locales, ui, type Locale } from '../../i18n';
import { getPosts } from '../../lib/posts';

export function getStaticPaths() {
  return locales.map((lang) => ({ params: { lang } }));
}

export async function GET({ params }: APIContext) {
  const lang = params.lang as Locale;
  const t = ui[lang];
  // the feed only lists posts written in its language
  const posts = (await getPosts(lang)).filter((p) => !p.fallback);
  return rss({
    title: t.siteTitle,
    description: t.siteDescription,
    site: canonicalUrl(lang),
    customData: `<language>${lang === 'de' ? 'de-DE' : 'en-US'}</language>`,
    items: posts.map(({ post, slug }) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: canonicalUrl(lang, `/${slug}/`),
      categories: post.data.tags,
    })),
  });
}
