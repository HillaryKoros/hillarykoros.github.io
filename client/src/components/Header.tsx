import { useEffect, useState, useSyncExternalStore } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { applyTheme, currentTheme, subscribeTheme } from '../lib/theme';
import { site } from '../data/site';
import { cn } from '../lib/utils';
import { AvailabilityDot } from './primitives';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/writing', label: 'Writing' },
  { href: '/contact', label: 'Contact' },
];

function isActive(href: string, location: string) {
  return href === '/' ? location === '/' : location.startsWith(href);
}

export default function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const theme = useSyncExternalStore(subscribeTheme, currentTheme, () => 'light' as const);

  // Close the mobile sheet on navigation.
  useEffect(() => setOpen(false), [location]);

  return (
    <header
      className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur
                 supports-[backdrop-filter]:bg-background/80"
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Wordmark */}
        <Link
          href="/"
          className="group flex items-baseline gap-2 font-semibold tracking-[-0.02em]"
        >
          <span>{site.name}</span>
          <span className="hidden font-mono text-[0.78rem] font-medium uppercase tracking-[0.14em] text-faint-foreground sm:inline">
            {site.engagement} · {site.org.name}
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => {
                const active = isActive(item.href, location);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'relative rounded-md px-3 py-2 text-sm font-medium transition-colors',
                        active
                          ? 'text-foreground'
                          : 'text-muted-foreground hover:text-foreground',
                      )}
                    >
                      {item.label}
                      {active && (
                        <span
                          aria-hidden
                          className="absolute inset-x-3 -bottom-[1px] h-0.5 rounded-full bg-primary"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {site.available && (
            <AvailabilityDot label="Available" className="ml-3 hidden lg:inline-flex" />
          )}

          <button
            type="button"
            onClick={() => applyTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="ml-2 inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-surface-sunken hover:text-foreground"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-surface-sunken hover:text-foreground md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Primary" className="border-t border-border md:hidden">
          <ul className="container flex flex-col py-2">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href, location) ? 'page' : undefined}
                  className={cn(
                    'block rounded-md px-3 py-3 text-sm font-medium transition-colors',
                    isActive(item.href, location)
                      ? 'bg-surface-sunken text-foreground'
                      : 'text-muted-foreground hover:bg-surface-sunken hover:text-foreground',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
