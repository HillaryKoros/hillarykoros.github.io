/**
 * Per-route document metadata.
 *
 * The old build was a single URL, so the careful OG/JSON-LD markup in
 * index.html described every page identically. Each route now sets its own
 * title, description and canonical URL as it mounts.
 */

import { useEffect } from 'react';
import { canonicalUrl, documentTitle } from '../data/routes';

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
    // Same helpers the build-time pre-render uses, so the markup a crawler
    // receives and the markup this sets can never be out of step.
    const fullTitle = documentTitle({ path, title });
    const canonical = canonicalUrl(path);

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
