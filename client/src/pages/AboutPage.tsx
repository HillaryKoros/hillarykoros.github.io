import React from 'react';
import { motion } from 'framer-motion';

import Hero from '../components/Hero';
import CurrentlyBuilding from '../components/CurrentlyBuilding';
import StatsBand from '../components/StatsBand';
import SkillsConstellation from '../components/SkillsConstellation';
import TechGrid from '../components/TechGrid';
import SelectedTalks from '../components/SelectedTalks';
import ExperienceTimeline from '../components/ExperienceTimeline';

/**
 * Landing page — single scrolling experience.
 * Order:
 *   Hero → Currently Building + Impact → What I Do →
 *   Tech Stack → Talks → Experience → Contact.
 *
 * Shipped work lives on /projects, not on the landing page.
 */
const AboutPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 md:space-y-10"
    >
      {/* 1 — Hero */}
      <Hero />

      {/* 2 — Currently Building + Impact stats, side by side on lg */}
      <section className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-start">
          <div className="lg:col-span-2">
            <CurrentlyBuilding />
          </div>
          <div className="lg:col-span-3">
            <StatsBand />
          </div>
        </div>
      </section>

      {/* 3 — Tech Stack — 2-col on desktop (text + legend left, constellation right); grid on mobile */}
      <section className="relative py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
          {/* Left rail: eyebrow + h2 + intro + category legend */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 mb-3 text-[0.76rem] font-mono font-bold uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400"
            >
              <span className="w-6 h-px bg-amber-500/60" />
              Skills
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="text-2xl md:text-3xl font-bold mb-3 tracking-tight"
            >
              Tools &amp; Technologies
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.10 }}
              className="text-sm text-muted-foreground leading-relaxed mb-5"
            >
              40+ tools spanning spatial computing, hydroinformatics, ML pipelines, and cloud-native
              infrastructure — the operational stack behind regional early-warning platforms.
            </motion.p>

            {/* Category legend — small key for the constellation hubs */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="hidden lg:flex flex-col gap-1.5"
            >
              {[
                { label: 'GIS & Earth Observation', color: '#22d3ee' },
                { label: 'Cloud-Native Data',       color: '#a78bfa' },
                { label: 'Languages',               color: '#f59e0b' },
                { label: 'ML & Data',               color: '#f472b6' },
                { label: 'Databases',               color: '#34d399' },
                { label: 'DevOps & Infrastructure', color: '#f87171' },
              ].map(c => (
                <div key={c.label} className="inline-flex items-center gap-2 text-[12.5px] font-mono text-muted-foreground">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  {c.label}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: constellation (lg+) / grid (mobile) */}
          <div className="lg:col-span-3 min-w-0">
            <div className="hidden lg:block">
              <SkillsConstellation />
            </div>
            <div className="lg:hidden">
              <TechGrid />
            </div>
          </div>
        </div>
      </section>

      {/* 4 — Talks + 5 — Experience, side-by-side on xl to cut scroll */}
      <section className="grid grid-cols-1 xl:grid-cols-5 gap-6 xl:gap-8 items-start">
        <div className="xl:col-span-3 min-w-0">
          <SelectedTalks />
        </div>
        <div className="xl:col-span-2 min-w-0">
          <ExperienceTimeline />
        </div>
      </section>
    </motion.div>
  );
};

export default AboutPage;
