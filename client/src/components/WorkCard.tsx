import { Link } from 'wouter';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../data/projects';
import { icon } from '../lib/icons';
import { prettyHost } from '../lib/utils';
import Reveal from './Reveal';
import { StatusChip, Tag } from './primitives';

/**
 * The whole card is a link to the detail page, with outbound links layered on
 * top. Using a real anchor (rather than an onClick on a div, as before) means
 * middle-click, ctrl-click, "copy link" and keyboard focus all behave.
 */
export default function WorkCard({ project, index }: { project: Project; index: number }) {
  const Icon = icon(project.iconKey);
  const techs = project.technologies.split(', ');

  return (
    <Reveal as="article" index={index} className="group relative flex h-full flex-col">
      <div
        className="flex h-full flex-col rounded-lg border border-border bg-surface p-7
                   transition-colors duration-200 group-hover:border-border-strong
                   group-focus-within:border-border-strong"
      >
        <div className="flex items-start justify-between gap-4">
          <Icon className="h-5 w-5 text-primary" strokeWidth={1.75} aria-hidden />
          <StatusChip status={project.status} />
        </div>

        <h3 className="mt-5 text-[1.15rem] font-semibold leading-snug">
          <Link href={`/work/${project.id}`} className="before:absolute before:inset-0">
            {project.title}
          </Link>
        </h3>

        {project.organization && (
          <p className="mt-1.5 font-mono text-[0.78rem] uppercase tracking-[0.14em] text-faint-foreground">
            {project.displayCategories[0]}
          </p>
        )}

        <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {techs.slice(0, 4).map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
          {techs.length > 4 && (
            <span className="self-center font-mono text-[0.8rem] text-faint-foreground">
              +{techs.length - 4}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          {project.projectLink ? (
            /* Sits above the card-wide link so it stays independently clickable. */
            <a
              href={project.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-1 font-mono text-[0.82rem] text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
            >
              {prettyHost(project.projectLink)}
              <ArrowUpRight className="h-3 w-3" aria-hidden />
            </a>
          ) : (
            <span />
          )}
          <span className="font-mono text-[0.82rem] text-faint-foreground transition-colors group-hover:text-primary">
            Read more →
          </span>
        </div>
      </div>
    </Reveal>
  );
}
