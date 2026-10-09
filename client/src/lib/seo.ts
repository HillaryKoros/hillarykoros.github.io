/**
 * Per-route document metadata.
 *
 * The old build was a single URL, so the careful OG/JSON-LD markup in
 * index.html described every page identically. Each route now sets its own
 * title, description and canonical URL as it mounts.
 */

import { useEffect } from 'react';
import { site } from '../data/site';

function setMeta(selector: string, attr: 'content' | 'href', value: string) {
  const el = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
  if (el) el.setAttribute(attr, value);
}

export interface SeoOptions {
  title: string;
  description: string;
  /** Path with a leading slash, e.g. `/work`. */
  path: string;
}

export function useSeo({ title, description, path }: SeoOptions): void {
  useEffect(() => {
    // The name leads on every route, so a tab, a bookmark or a shared link
    // always reads as the person first and the page second.
    const fullTitle =
      path === '/'
        ? `${site.name} — ${site.role}, ${site.org.name}`
        : `${site.name} — ${title}`;
    const canonical = `${site.url}${path === '/' ? '/' : path}`;

    document.title = fullTitle;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('link[rel="canonical"]', 'href', canonical);
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', canonical);
    setMeta('meta[name="twitter:title"]', 'content', fullTitle);
    setMeta('meta[name="twitter:description"]', 'content', description);
  }, [title, description, path]);
}
