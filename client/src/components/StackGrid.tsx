import { useMemo } from 'react';
import { techCategories } from '../data/technologies';
import { projects } from '../data/projects';
import { icon } from '../lib/icons';
import Reveal from './Reveal';
import { cn } from '../lib/utils';

const CATEGORY_ICON: Record<string, string> = {
  'GIS & Earth Observation': 'globe',
  'Cloud-Native Data': 'cloud',
  Languages: 'workflow',
  'ML & Data': 'brain',
  Databases: 'database',
  'DevOps & Infrastructure': 'settings',
};

const normalise = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

/**
 * Tools that appear in the stack of at least one project in `projects.ts`.
 *
 * A stack list of 42 logos says nothing on its own — every portfolio has one.
 * Cross-referencing against shipped work turns it into a claim that can be
 * checked: these are the tools that actually show up in the projects on this
 * site, and clicking through to any of them will show the same name again.
 * Derived, never hand-maintained, so it cannot drift from the project data.
 */
function useShippedTools(): Set<string> {
  return useMemo(() => {
    const tokens = new Set<string>();
    for (const p of projects) {
      for (const part of p.technologies.split(/,\s*/)) {
        // The whole entry ("CI/CD", "NetCDF/GRIB") and each side of a slash,
        // so both spellings resolve whichever way the stack list writes it.
        for (const piece of [part, ...part.split(/\s*\/\s*/)]) {
          // Keep single letters: "R" is a real entry in two project stacks.
          // They can only ever match exactly — containment needs >= 4 below.
          const n = normalise(piece);
          if (n) tokens.add(n);
        }
      }
    }
    return tokens;
  }, []);
}

function isShipped(toolName: string, tokens: Set<string>): boolean {
  const n = normalise(toolName);
  if (tokens.has(n)) return true;
  // "PostgreSQL / PostGIS" in the stack vs "PostGIS" in a project, and vice
  // versa. Both sides must be >= 4 characters: without that guard a one- or
  // two-letter name like "R" matches anything containing an r.
  if (n.length < 4) return false;
  for (const t of tokens) {
    if (t.length >= 4 && (n.includes(t) || t.includes(n))) return true;
  }
  return false;
}

export default function StackGrid() {
  const tokens = useShippedTools();

  return (
    <div>
      <ul className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
        {techCategories.map((category, i) => {
          const Icon = icon(CATEGORY_ICON[category.name]);
          return (
            <Reveal as="li" key={category.name} index={i} className="flex flex-col bg-surface p-6">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4 text-primary" strokeWidth={1.75} aria-hidden />
                  <h3 className="text-sm font-semibold">{category.name}</h3>
                </div>
                <span className="font-mono text-[0.78rem] tabular-nums text-faint-foreground">
                  {String(category.items.length).padStart(2, '0')}
                </span>
              </div>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {category.items.map((tech) => {
                  const shipped = isShipped(tech.name, tokens);
                  return (
                    <li
                      key={tech.name}
                      title={shipped ? 'Used in shipped work on this site' : undefined}
                      className={cn(
                        'rounded-sm border px-2.5 py-1 font-mono text-[0.8rem] transition-colors',
                        shipped
                          ? 'border-primary/35 bg-primary/[0.07] font-medium text-foreground'
                          : 'border-border bg-surface-sunken text-muted-foreground',
                      )}
                    >
                      {tech.name}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          );
        })}
      </ul>

      {/* Colour alone never carries the meaning — the key spells it out. */}
      <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
        <span
          aria-hidden
          className="rounded-sm border border-primary/35 bg-primary/[0.07] px-2 py-0.5 font-mono text-[0.78rem] font-medium text-foreground"
        >
          Highlighted
        </span>
        tools appear in the stack of at least one project listed under Work.
      </p>
    </div>
  );
}
