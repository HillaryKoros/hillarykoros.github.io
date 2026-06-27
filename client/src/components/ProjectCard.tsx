/**
 * ProjectCard — total reface in Meshack's "Shipped Work" style.
 * Numbered glass card with sweep accent, mono tag chips, hover lift.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

type Status = 'operational' | 'ongoing' | 'completed' | 'planned';

const STATUS: Record<
  Status,
  { label: string; dot: string; chip: string; sweep: string; glow: string }
> = {
  operational: {
    label: 'Operational',
    dot: 'bg-emerald-500',
    chip: 'border-emerald-500/30 text-emerald-700 dark:text-emerald-400 bg-emerald-500/10',
    sweep: 'from-emerald-400 via-green-400 to-cyan-400',
    glow: 'shadow-emerald-500/15',
  },
  ongoing: {
    label: 'Ongoing',
    dot: 'bg-amber-500',
    chip: 'border-amber-500/30 text-amber-700 dark:text-amber-400 bg-amber-500/10',
    sweep: 'from-amber-400 via-orange-400 to-cyan-400',
    glow: 'shadow-amber-500/15',
  },
  completed: {
    label: 'Completed',
    dot: 'bg-cyan-500',
    chip: 'border-cyan-500/30 text-cyan-700 dark:text-cyan-400 bg-cyan-500/10',
    sweep: 'from-cyan-400 via-sky-400 to-indigo-500',
    glow: 'shadow-cyan-500/15',
  },
  planned: {
    label: 'Planned',
    dot: 'bg-violet-500',
    chip: 'border-violet-500/30 text-violet-700 dark:text-violet-400 bg-violet-500/10',
    sweep: 'from-violet-400 via-fuchsia-400 to-pink-500',
    glow: 'shadow-violet-500/15',
  },
};

interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc: string;
  iconKey?: string;
  gradient?: string;
  categories: string[];
  technologies: string;
  projectLink?: string;
  codeLink?: string;
  status?: Status;
  onViewDetails?: () => void;
  index?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  categories,
  technologies,
  projectLink,
  codeLink,
  status,
  onViewDetails,
  index = 0,
}) => {
  const s = status ? STATUS[status] : STATUS.operational;
  const primaryLabel = categories[0] ?? s.label;
  const linkHost = projectLink ? new URL(projectLink, 'http://x').host.replace(/^www\./, '') : null;

  return (
    <motion.article
      onClick={onViewDetails}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -7 }}
      className={`
        group relative overflow-hidden cursor-pointer flex flex-col h-full
        rounded-2xl border border-border/60
        bg-card/65 supports-[backdrop-filter]:bg-card/45 backdrop-blur-md backdrop-saturate-150
        p-7 sm:p-8
        transition-[border-color,box-shadow,background-color] duration-300
        hover:border-border hover:bg-card/85 hover:shadow-2xl ${s.glow}
      `}
    >
      {/* sweep accent line top */}
      <div
        aria-hidden
        className={`
          absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0
          bg-gradient-to-r ${s.sweep}
          transition-transform duration-500 ease-out
          group-hover:scale-x-100
        `}
      />

      {/* Big faded project number */}
      <div
        aria-hidden
        className="
          select-none pointer-events-none mb-4
          text-5xl sm:text-6xl font-black tracking-[-0.06em] leading-none tabular-nums
          text-foreground/10
          transition-colors duration-500
          group-hover:text-amber-500/30
        "
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Status chip + label */}
      <div className="flex items-center gap-2 mb-2">
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px] font-mono font-bold uppercase tracking-[0.12em] ${s.chip}`}>
          <span className="relative flex h-1.5 w-1.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${s.dot} opacity-75`} />
            <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${s.dot}`} />
          </span>
          {s.label}
        </span>
      </div>

      {/* Category label */}
      <div
        className="text-[11px] font-mono font-semibold uppercase tracking-[0.14em] text-cyan-600 dark:text-cyan-400 mb-2"
      >
        {primaryLabel}
      </div>

      {/* Project name */}
      <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 leading-tight tracking-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
        {description}
      </p>

      {/* Tech tag chips */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {technologies.split(', ').slice(0, 5).map((tech, i) => (
          <span
            key={i}
            className="
              inline-flex items-center px-2 py-0.5
              text-[11.5px] font-mono font-medium
              text-muted-foreground bg-secondary/40
              border border-border/40 rounded-md
              transition-colors duration-200
              group-hover:text-foreground group-hover:bg-secondary/70
            "
          >
            {tech}
          </span>
        ))}
        {technologies.split(', ').length > 5 && (
          <span className="text-[11.5px] font-mono text-muted-foreground self-center">
            +{technologies.split(', ').length - 5} more
          </span>
        )}
      </div>

      {/* Link footer */}
      {linkHost && projectLink && (
        <a
          href={projectLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="
            inline-flex items-center gap-1.5 mt-auto
            text-[13px] font-mono font-semibold text-amber-600 dark:text-amber-400
            transition-[gap,color] duration-300
            group-hover:gap-2.5
          "
        >
          {linkHost}
          <ExternalLink className="w-3.5 h-3.5" strokeWidth={2.4} />
        </a>
      )}
      {!linkHost && codeLink && (
        <a
          href={codeLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="
            inline-flex items-center gap-1.5 mt-auto
            text-[13px] font-mono font-semibold text-amber-600 dark:text-amber-400
            transition-[gap,color] duration-300
            group-hover:gap-2.5
          "
        >
          Source
          <ExternalLink className="w-3.5 h-3.5" strokeWidth={2.4} />
        </a>
      )}
    </motion.article>
  );
};

export default ProjectCard;
