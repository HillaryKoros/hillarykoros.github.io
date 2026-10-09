import { useMemo, useState } from 'react';
import { useSeo } from '../lib/seo';
import { blogArticles, notebookLinks, categories } from '../data/blog';
import Section from '../components/Section';
import Reveal from '../components/Reveal';
import { ExternalLink, Tag } from '../components/primitives';
import { cn } from '../lib/utils';

/**
 * These four write-ups and the resource list have existed in `data/blog.ts`
 * since the first build but were never routed — the page that rendered them
 * was not reachable from anywhere in the app. They have a URL now.
 */
export default function WritingPage() {
  useSeo({
    title: 'Writing',
    description:
      'Field notes on multi-model flood forecasting, scaling Google Earth Engine exports, PostGIS for land parcels and fast geospatial APIs.',
    path: '/writing',
  });

  const [category, setCategory] = useState('All');

  const shown = useMemo(
    () => (category === 'All' ? blogArticles : blogArticles.filter((a) => a.category === category)),
    [category],
  );

  return (
    <div className="container py-16 lg:py-20">
      <header>
        <p className="label">Writing</p>
        <h1 className="text-display mt-5 max-w-[16ch]">Field notes.</h1>
        <p className="text-lede mt-6 max-w-measure text-muted-foreground">
          Problem, approach and verdict — short write-ups on things that broke, things that scaled,
          and what I would do differently next time.
        </p>
      </header>

      <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter writing by topic">
        {categories.map((c) => {
          const active = category === c;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={active}
              className={cn(
                'rounded-md border px-3 py-1.5 font-mono text-[0.82rem] font-medium transition-colors',
                active
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-muted-foreground hover:border-border-strong hover:text-foreground',
              )}
            >
              {c}
            </button>
          );
        })}
      </div>

      <div className="mt-12 space-y-14">
        {shown.map((article, i) => (
          <Reveal as="article" key={article.id} index={i} className="border-t border-border pt-8">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.8rem] text-faint-foreground">
              <span className="font-semibold uppercase tracking-[0.14em] text-primary">
                {article.category}
              </span>
              <span>{article.date}</span>
              <span>·</span>
              <span>{article.readTime}</span>
            </div>

            <h2 className="mt-3 text-heading">{article.title}</h2>
            <p className="mt-2 max-w-measure text-sm leading-relaxed text-muted-foreground">
              {article.description}
            </p>

            <dl className="mt-7 grid gap-8 lg:grid-cols-3">
              <div>
                <dt className="label">Problem</dt>
                <dd className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {article.problem}
                </dd>
              </div>
              <div>
                <dt className="label">Solution</dt>
                <dd className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {article.solution}
                </dd>
              </div>
              <div>
                <dt className="label !text-primary">Verdict</dt>
                <dd className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {article.verdict}
                </dd>
              </div>
            </dl>

            {article.keyPoints.length > 0 && (
              <ul className="mt-7 grid gap-2 sm:grid-cols-2">
                {article.keyPoints.map((p) => (
                  <li
                    key={p}
                    className="relative pl-5 text-sm leading-relaxed text-muted-foreground
                               before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1
                               before:rounded-full before:bg-primary"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 flex flex-wrap gap-1.5">
              {article.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-20">
        <Section
          label="Resources"
          title="Notebooks & snippets"
          lede="Runnable material that goes with the notes above."
        >
          <ul className="divide-y divide-border border-y border-border">
            {notebookLinks.map((link, i) => (
              <Reveal as="li" key={link.id} index={i} className="py-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-[1.05rem] font-semibold">
                    <ExternalLink href={link.url}>{link.title}</ExternalLink>
                  </h3>
                  <span className="font-mono text-[0.78rem] uppercase tracking-[0.14em] text-faint-foreground">
                    {link.type} · {link.category}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">{link.description}</p>
              </Reveal>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
}
