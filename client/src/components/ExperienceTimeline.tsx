import React from 'react';
import { motion } from 'framer-motion';
import { experience } from '../data/experience';

const ExperienceTimeline: React.FC = () => {
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
        Career
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="text-2xl md:text-3xl font-bold mb-6 tracking-tight"
      >
        Experience
      </motion.h2>

      <div className="relative">
        <div className="absolute left-2 top-1.5 bottom-1.5 w-0.5 bg-gradient-to-b from-amber-500/40 via-border to-border/30" aria-hidden />
        <ol className="space-y-3">
          {experience.map((role, index) => (
            <motion.li
              key={role.id}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="relative pl-8"
            >
              <span
                className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 ${
                  role.current
                    ? 'bg-amber-500 border-amber-500 shadow-[0_0_0_4px_rgba(245,158,11,0.15)]'
                    : 'bg-background border-border'
                }`}
                aria-hidden
              />
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 mb-1">
                <h3 className="text-base font-bold text-foreground tracking-tight">
                  {role.title}
                  <span className="font-normal text-muted-foreground"> · {role.organization}</span>
                </h3>
                <span className="text-xs font-mono font-semibold text-muted-foreground whitespace-nowrap">
                  {role.start} – {role.end}
                </span>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed line-clamp-2">{role.summary}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
