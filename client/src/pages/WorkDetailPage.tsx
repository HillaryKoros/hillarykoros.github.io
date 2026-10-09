import { Link } from 'wouter';
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import { useSeo } from '../lib/seo';
import { projects } from '../data/projects';
import { icon } from '../lib/icons';
import Section from '../components/Section';
import Reveal from '../components/Reveal';
import NotFoundPage from './NotFoundPage';
import { StatusChip, Tag, buttonStyles, ExternalLink } from '../components/primitives';

export default function WorkDetailPage({ id }: { id: string }) {
  const project = projects.find((p) => p.id === id);

  useSeo({
    title: project?.title ?? 'Work',
    description: project?.description ?? '',
    path: `/work/${id}`,
  });

  if (!project) return <NotFoundPage />;

  const Icon = icon(project.iconKey);
  const techs = project.technologies.split(', ');

  return (
    <article className="pb-4">
      {/* ---------------------------------------------------------- header */}
      <header className="border-b border-border">
        <div className="container py-12 lg:py-16">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-mono text-[0.82rem] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            All work
          </Link>

          <div className="mt-8 flex items-start justify-between gap-6">
            <Icon className="h-7 w-7 shrink-0 text-primary" strokeWidth={1.5} aria-hidden />
            <StatusChip status={project.status} className="mt-1" />
          </div>

          <h1 className="text-title mt-5 max-w-[22ch]">{project.title}</h1>

          <p className="text-lede mt-5 max-w-measure text-muted-foreground">
            {project.description}
          </p>

          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            {project.role && (
              <div>
                <dt className="label">Role</dt>
                <dd className="mt-1.5 text-sm">{project.role}</dd>
              </div>
            )}
            {project.duration && (
              <div>
                <dt className="label">Timeline</dt>
                <dd className="mt-1.5 text-sm">{project.duration}</dd>
              </div>
            )}
            <div>
              <dt className="label">Focus</dt>
              <dd className="mt-1.5 text-sm">{project.displayCategories.join(' · ')}</dd>
            </div>
          </dl>

          {(project.projectLink || project.codeLink) && (
            <div className="mt-9 flex flex-wrap gap-3">
              {project.projectLink && (
                <a
                  href={project.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonStyles.primary}
                >
                  View live
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
              )}
              {project.codeLink && (
                <a
                  href={project.codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonStyles.secondary}
                >
                  <Github className="h-4 w-4" aria-hidden />
                  Source
                </a>
              )}
            </div>
          )}
        </div>
      </header>

      <div className="container space-y-16 py-16">
        {/* ------------------------------------------------- problem/solution */}
        {(project.problem || project.solution) && (
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {project.problem && (
              <Reveal>
                <h2 className="label">The problem</h2>
                <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">
                  {project.problem}
                </p>
              </Reveal>
            )}
            {project.solution && (
              <Reveal index={1}>
                <h2 className="label">The approach</h2>
                <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">
                  {project.solution}
                </p>
              </Reveal>
            )}
          </div>
        )}

        {/* ------------------------------------------------------- key metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <Section label="At a glance">
            <dl className="grid grid-cols-1 divide-y divide-border border-y border-border sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
              {project.metrics.map((m) => (
                <div key={m.label} className="px-6 py-7 first:pl-0 last:pr-0">
                  <dt className="label">{m.label}</dt>
                  <dd className="mt-2.5 text-[1.5rem] font-semibold leading-tight tracking-[-0.02em]">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>
        )}

        {/* ------------------------------------------------- results & features */}
        {(project.results || project.features) && (
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {project.results && (
              <Section label="Results & impact">
                <ul className="space-y-3">
                  {project.results.map((r) => (
                    <li
                      key={r}
                      className="relative pl-5 text-sm leading-relaxed text-muted-foreground
                                 before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1
                                 before:rounded-full before:bg-primary"
                    >
                      {r}
                    </li>
                  ))}
                </ul>
              </Section>
            )}
            {project.features && (
              <Section label="Key features">
                <ul className="space-y-3">
                  {project.features.map((f) => (
                    <li
                      key={f}
                      className="relative pl-5 text-sm leading-relaxed text-muted-foreground
                                 before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1
                                 before:rounded-full before:bg-border-strong"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </Section>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------ stack */}
        <Section label="Stack">
          <div className="flex flex-wrap gap-1.5">
            {techs.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        </Section>

        {/* -------------------------------------------------------- tutorials */}
        {project.tutorials && project.tutorials.length > 0 && (
          <Section label="Material" title="Tutorials & notebooks">
            <ul className="divide-y divide-border border-y border-border">
              {project.tutorials.map((t, i) => (
                <Reveal as="li" key={t.id} index={i} className="py-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="text-[1.05rem] font-semibold">
                      {t.url ? (
                        <ExternalLink href={t.url}>{t.title}</ExternalLink>
                      ) : (
                        t.title
                      )}
                    </h3>
                    <span className="font-mono text-[0.78rem] uppercase tracking-[0.14em] text-faint-foreground">
                      {t.type}
                      {t.duration && ` · ${t.duration}`}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-muted-foreground">{t.description}</p>
                </Reveal>
              ))}
            </ul>
          </Section>
        )}
      </div>
    </article>
  );
}
