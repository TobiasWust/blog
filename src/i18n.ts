export const locales = ['en', 'de'] as const;
export type Locale = (typeof locales)[number];

// each language lives on its own domain, like wust.dev / tobiaswust.de
export const siteUrls: Record<Locale, string> = {
  en: 'https://blog.wust.dev',
  de: 'https://blog.tobiaswust.de',
};
export const mainSiteUrls: Record<Locale, string> = {
  en: 'https://wust.dev',
  de: 'https://tobiaswust.de',
};

export const otherLocale = (lang: Locale): Locale => (lang === 'en' ? 'de' : 'en');

// In production every domain serves one language at its root, so links carry no language prefix.
// During `astro dev` (and a local preview build) both languages share one host under /en and /de.
const prefixLocale = import.meta.env.DEV || import.meta.env.PUBLIC_LOCAL_PREVIEW === 'true';

/** a link within the blog of the given language */
export function href(lang: Locale, path = '/'): string {
  return (prefixLocale ? `/${lang}` : '') + path;
}

/** an absolute link into the blog of the given language, used across domains and in feeds */
export function absoluteUrl(lang: Locale, path = '/'): string {
  if (prefixLocale) return `/${lang}${path}`;
  return siteUrls[lang] + path;
}

/** the canonical public URL, always absolute */
export function canonicalUrl(lang: Locale, path = '/'): string {
  return siteUrls[lang] + path;
}

export const categoryIds = ['ai-agents', 'tools', 'games', 'behind-the-scenes'] as const;
export type Category = (typeof categoryIds)[number];

export const categories: Record<Category, Record<Locale, { name: string; description: string }>> = {
  'ai-agents': {
    en: { name: 'AI agents', description: 'How I work with AI agents: where they decide on their own and where a human has to sign off.' },
    de: { name: 'KI-Agenten', description: 'Wie ich mit KI-Agenten arbeite: wo sie selbst entscheiden und wo ein Mensch freigibt.' },
  },
  tools: {
    en: { name: 'Own tools', description: 'Small tools I build for myself instead of renting them.' },
    de: { name: 'Eigene Werkzeuge', description: 'Kleine Werkzeuge, die ich mir selbst baue, statt sie zu mieten.' },
  },
  games: {
    en: { name: 'Games', description: 'Ad-free games and the factory that builds them.' },
    de: { name: 'Spiele', description: 'Spiele ohne Werbung und die Fabrik, die sie baut.' },
  },
  'behind-the-scenes': {
    en: { name: 'Behind the scenes', description: 'News about this blog and how I work.' },
    de: { name: 'In eigener Sache', description: 'Neues rund um diesen Blog und meine Arbeitsweise.' },
  },
};

export const ui = {
  en: {
    siteTitle: 'Tobias Wust · Blog',
    siteDescription: 'Notes from a freelance fullstack developer: projects, tools and what I learn while building them.',
    heroTitle: 'So I built it.',
    heroText: 'Notes from my work as a freelance fullstack developer: real projects, real screenshots and the one insight each of them taught me.',
    all: 'All',
    latest: 'Latest',
    morePosts: 'More articles',
    readMore: 'Read article',
    minRead: (n: number) => `${n} min read`,
    search: 'Search',
    searchPlaceholder: 'Search articles …',
    searchEmpty: 'Nothing found.',
    searchUnavailable: 'Search is available on the published site.',
    close: 'Close',
    categories: 'Categories',
    tags: 'Tags',
    taggedWith: (t: string) => `Articles tagged #${t}`,
    back: 'All articles',
    toggleTheme: 'Toggle light and dark mode',
    switchLanguage: 'Deutsch',
    switchLanguageLabel: 'Diesen Blog auf Deutsch lesen',
    translationAvailable: 'Diesen Artikel auf Deutsch lesen',
    alsoOnLinkedIn: 'Also on LinkedIn',
    discussOnLinkedIn: 'Discuss on LinkedIn',
    onlyInOtherLanguage: 'This article is only available in German so far.',
    translateHint: 'Your browser can translate it for you, or',
    translateLink: 'open it in Google Translate',
    authorRole: 'Freelance senior fullstack developer. I build web apps and bring AI agents into everyday work, safely and with clear rules.',
    authorCta: 'Work with me',
    previous: 'Previous',
    next: 'Next',
    rss: 'RSS feed',
    home: 'Blog home',
    mainSite: 'wust.dev',
    imprint: 'Imprint',
    privacy: 'Privacy',
    notFoundTitle: 'Page not found',
    notFoundText: 'This page does not exist (anymore).',
    published: 'Published',
    otherLangBadge: 'DE',
  },
  de: {
    siteTitle: 'Tobias Wust · Blog',
    siteDescription: 'Notizen eines freiberuflichen Fullstack-Entwicklers: Projekte, Werkzeuge und was ich beim Bauen lerne.',
    heroTitle: 'Also hab ich’s gebaut.',
    heroText: 'Notizen aus meiner Arbeit als freiberuflicher Fullstack-Entwickler: echte Projekte, echte Screenshots und die eine Erkenntnis, die jedes davon gebracht hat.',
    all: 'Alle',
    latest: 'Neu',
    morePosts: 'Weitere Artikel',
    readMore: 'Artikel lesen',
    minRead: (n: number) => `${n} Min. Lesezeit`,
    search: 'Suche',
    searchPlaceholder: 'Artikel durchsuchen …',
    searchEmpty: 'Nichts gefunden.',
    searchUnavailable: 'Die Suche funktioniert auf der veröffentlichten Seite.',
    close: 'Schließen',
    categories: 'Kategorien',
    tags: 'Tags',
    taggedWith: (t: string) => `Artikel mit #${t}`,
    back: 'Alle Artikel',
    toggleTheme: 'Zwischen hell und dunkel wechseln',
    switchLanguage: 'English',
    switchLanguageLabel: 'Read this blog in English',
    translationAvailable: 'Read this article in English',
    alsoOnLinkedIn: 'Auch auf LinkedIn',
    discussOnLinkedIn: 'Auf LinkedIn diskutieren',
    onlyInOtherLanguage: 'Diesen Artikel gibt es bisher nur auf Englisch.',
    translateHint: 'Dein Browser kann ihn übersetzen, oder',
    translateLink: 'öffne ihn in Google Übersetzer',
    authorRole: 'Freiberuflicher Senior Fullstack-Entwickler. Ich baue Web-Apps und bringe KI-Agenten in den Arbeitsalltag, sicher und mit klaren Regeln.',
    authorCta: 'Zusammenarbeiten',
    previous: 'Vorheriger',
    next: 'Nächster',
    rss: 'RSS-Feed',
    home: 'Blog-Startseite',
    mainSite: 'tobiaswust.de',
    imprint: 'Impressum',
    privacy: 'Datenschutz',
    notFoundTitle: 'Seite nicht gefunden',
    notFoundText: 'Diese Seite gibt es nicht (mehr).',
    published: 'Veröffentlicht',
    otherLangBadge: 'EN',
  },
} as const;

export function formatDate(date: Date, lang: Locale): string {
  return date.toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Berlin',
  });
}
