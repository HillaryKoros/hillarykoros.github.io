import { site } from './site';
import { projects } from './projects';

export interface RouteMeta {
  /** Path with a leading slash. '/' is the home page. */
  path: string;
  /** Page name — the document title is built from this. */
  title: string;
  description: string;
}

/**
 * Every route the site serves, in one list.
 *
 * Read twice: by `useSeo` at runtime, and by the pre-render step in
 * vite.config.ts at build time. That shared list is what lets a crawler see
 * the same title and description a visitor's browser would set, without the
 * two having to be kept in step by hand.
 */
export const staticRoutes: RouteMeta[] = [
  {
    path: '/',
    title: 'Home',
    description: site.summary,
  },
  {
    path: '/work',
    title: 'Work',
    description:
      'Operational flood early warning, cloud-native Earth observation pipelines, spatial data infrastructure and applied research — built at ICPAC, the County Government of Bomet, KEMRI–Wellcome and in the open.',
  },
  {
    path: '/writing',
    title: 'Writing',
    description:
      'Field notes on multi-model flood forecasting, scaling Google Earth Engine exports, PostGIS for land parcels and fast geospatial APIs.',
  },
  {
    path: '/contact',
    title: 'Contact',
    description: `${site.availableFor} Reach ${site.name} by email, WhatsApp or book a call.`,
  },
];

export const projectRoutes: RouteMeta[] = projects.map((p) => ({
  path: `/work/${p.id}`,
  title: p.title,
  description: p.description,
}));

export const allRoutes: RouteMeta[] = [...staticRoutes, ...projectRoutes];

/** Lookup for the static pages, so a page component never retypes its own copy. */
export const routeMeta = Object.fromEntries(
  staticRoutes.map((r) => [r.path, r]),
) as Record<string, RouteMeta>;

/** The name leads on every route, so a tab always reads as the person first. */
export function documentTitle(route: Pick<RouteMeta, 'path' | 'title'>): string {
  return route.path === '/'
    ? `${site.name} — ${site.role}, ${site.org.name}`
    : `${site.name} — ${route.title}`;
}

export function canonicalUrl(path: string): string {
  return `${site.url}${path === '/' ? '/' : path}`;
}
