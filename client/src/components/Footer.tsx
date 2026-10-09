import { Link } from 'wouter';
import { site, actions } from '../data/site';
import { ExternalLink } from './primitives';

const SITEMAP = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/writing', label: 'Writing' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-surface-sunken">
      <div className="container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <p className="font-semibold tracking-[-0.02em]">{site.name}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {site.role}. {site.engagement} at{' '}
            <ExternalLink href={site.org.url} bare className="font-medium">
              {site.org.longName}
            </ExternalLink>
            . Based in {site.location.city}, {site.location.country}.
          </p>
          <p className="mt-4">
            <a
              href={actions.mailto}
              className="text-sm text-primary underline-offset-4 hover:underline"
            >
              {site.email}
            </a>
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="label">Pages</p>
          <ul className="mt-4 space-y-2.5">
            {SITEMAP.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="label">Elsewhere</p>
          <ul className="mt-4 space-y-2.5">
            {site.socials.map((s) => (
              <li key={s.id}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container flex flex-wrap items-center justify-between gap-3 py-5">
          <p className="font-mono text-[0.8rem] text-faint-foreground">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="font-mono text-[0.8rem] text-faint-foreground">
            Built with React, Tailwind and Vite · Deployed on GitHub Pages
          </p>
        </div>
      </div>
    </footer>
  );
}
