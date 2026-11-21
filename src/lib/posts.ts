import { getCollection, type CollectionEntry } from 'astro:content';
import { locales, otherLocale, type Locale } from '../i18n';

export type Post = CollectionEntry<'blog'>;

/** a post as it appears in the blog of one language */
export interface ListedPost {
  post: Post;
  /** the language the post is written in */
  postLang: Locale;
  /** true when the blog shows the other language's post because no translation exists */
  fallback: boolean;
  slug: string;
  /** the same post in the other language, if it exists */
  translation?: { lang: Locale; slug: string };
  readingMinutes: number;
}

const langOf = (p: Post) => p.id.split('/')[0] as Locale;
const slugOf = (p: Post) => p.id.split('/')[1];

// a post is visible once its date has passed; drafts never (in dev too, unless SHOW_DRAFTS is set)
const isVisible = (p: Post) =>
  (!p.data.draft || import.meta.env.SHOW_DRAFTS === 'true') && p.data.date.getTime() <= Date.now();

export function readingMinutes(p: Post): number {
  const words = (p.body ?? '').replace(/<[^>]+>|[#*_>`!\[\]()-]/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

/** all posts of a blog, newest first: its own posts plus the other language's posts that have no translation yet */
export async function getPosts(lang: Locale): Promise<ListedPost[]> {
  const all = (await getCollection('blog')).filter(isVisible);
  const byKey = new Map<string, Partial<Record<Locale, Post>>>();
  for (const p of all) {
    const entry = byKey.get(p.data.translationKey) ?? {};
    entry[langOf(p)] = p;
    byKey.set(p.data.translationKey, entry);
  }

  const list: ListedPost[] = [];
  for (const versions of byKey.values()) {
    const own = versions[lang];
    const other = versions[otherLocale(lang)];
    const post = own ?? other!;
    list.push({
      post,
      postLang: own ? lang : otherLocale(lang),
      fallback: !own,
      slug: slugOf(post),
      translation: own && other ? { lang: otherLocale(lang), slug: slugOf(other) } : undefined,
      readingMinutes: readingMinutes(post),
    });
  }
  return list.sort((a, b) => b.post.data.date.getTime() - a.post.data.date.getTime());
}

export async function getAllTags(lang: Locale): Promise<string[]> {
  const posts = await getPosts(lang);
  return [...new Set(posts.flatMap((p) => p.post.data.tags))].sort((a, b) => a.localeCompare(b));
}

export const tagSlug = (tag: string) => tag.toLowerCase();

export { locales };
