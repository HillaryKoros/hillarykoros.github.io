import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { talks } from '../data/talks';

const SelectedTalks: React.FC = () => {
  // Featured first, then take top 3
  const featured = [...talks]
    .sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false))
    .slice(0, 3);

  return (
    <section className="relative py-6">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-2 mb-3 text-[0.76rem] font-mono font-bold uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400"
      >
        <span className="w-6 h-px bg-amber-500/60" />
        Speaking
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="text-2xl md:text-3xl font-bold mb-3 tracking-tight"
      >
        Talks
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.10 }}
        className="text-sm text-muted-foreground mb-6 max-w-prose"
      >
        Recent conference presentations on operational geospatial systems.
      </motion.p>

      <div className="space-y-2.5">
        {featured.map((talk, index) => {
          const isPresenting = talk.role === 'presenting';
          return (
            <motion.article
              key={talk.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="
                group relative overflow-hidden rounded-xl border border-border/70
                bg-card/65 supports-[backdrop-filter]:bg-card/45 backdrop-blur-md backdrop-saturate-150
                p-5
                transition-[border-color,box-shadow,background-color] duration-300
                hover:border-border hover:bg-card/85 hover:shadow-lg
              "
            >
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0
                           bg-gradient-to-r from-amber-400 via-orange-400 to-cyan-400
                           transition-transform duration-500 ease-out
                           group-hover:scale-x-100"
              />
              <div className="relative flex flex-wrap items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded-md text-base font-mono font-bold uppercase tracking-[0.12em] border ${
                  isPresenting
                    ? 'border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-400'
                    : 'border-border/60 bg-secondary/40 text-muted-foreground'
                }`}>
                  {isPresenting ? 'Presenting Author' : 'Co-author'}
                </span>
                <span className="text-xs font-mono text-muted-foreground">
                  {talk.venue}{talk.location ? ` · ${talk.location}` : ''} · {talk.date}
                </span>
              </div>
              <h3 className="text-base font-bold text-foreground mb-1.5 leading-tight tracking-tight line-clamp-2">
                {talk.title}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                {talk.summary}
              </p>
              <div className="flex flex-wrap gap-3 text-xs font-mono font-semibold">
                {talk.abstractUrl && (
                  <a href={talk.abstractUrl} target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 hover:underline">
                    Abstract <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {talk.slidesUrl && (
                  <a href={talk.slidesUrl} target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 hover:underline">
                    Slides <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {talk.recordingUrl && (
                  <a href={talk.recordingUrl} target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 hover:underline">
                    Recording <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};

export default SelectedTalks;
