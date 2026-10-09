import { useMemo, useState } from 'react';
import { useSeo } from '../lib/seo';
import { projects, type Project } from '../data/projects';
import WorkCard from '../components/WorkCard';
import { cn } from '../lib/utils';

const ORDER: Project['status'][] = ['operational', 'ongoing', 'completed', 'planned'];
const FILTERS: Array<{ value: 'all' | Project['status']; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'operational', label: 'Operational' },
  { value: 'ongoing', label: 'Ongoing' },
  { value: 'completed', label: 'Completed' },
  { value: 'planned', label: 'Planned' },
];

export default function WorkPage() {
  useSeo({
    title: 'Work',
    description:
      'Operational flood early warning, cloud-native Earth observation pipelines, spatial data infrastructure and research projects by Hillary Koros.',
    path: '/work',
  });

  const [filter, setFilter] = useState<'all' | Project['status']>('all');

  const ordered = useMemo(
    () => [...projects].sort((a, b) => ORDER.indexOf(a.status) - ORDER.indexOf(b.status)),
    [],
  );
  const shown = filter === 'all' ? ordered : ordered.filter((p) => p.status === filter);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: projects.length };
    for (const p of projects) c[p.status] = (c[p.status] ?? 0) + 1;
    return c;
  }, []);

  return (
    <div className="container py-16 lg:py-20">
      <header>
        <p className="label">Work</p>
        <h1 className="text-display mt-5 max-w-[16ch]">Systems in the field.</h1>
        <p className="text-lede mt-6 max-w-measure text-muted-foreground">
          Platforms actively used by governments, NGOs and researchers across the Greater Horn of
          Africa — from early warning systems to ARCO-Zarr stores and operational flood pipelines.
        </p>
      </header>

      <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter work by status">
        {FILTERS.map((f) => {
          const active = filter === f.value;
          const count = counts[f.value] ?? 0;
          if (!count) return null;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              aria-pressed={active}
              className={cn(
                'inline-flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-[0.82rem] font-medium transition-colors',
                active
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-muted-foreground hover:border-border-strong hover:text-foreground',
              )}
            >
              {f.label}
              <span className={active ? 'opacity-70' : 'text-faint-foreground'}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((project, i) => (
          <WorkCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}
