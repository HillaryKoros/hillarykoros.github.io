import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ExternalLink, Mail } from 'lucide-react';

const CV_URL = 'https://drive.google.com/file/d/191QzSUJbrNyoMm7ISvMVnwlzWGD0av1P/view';
const CONTACT_EMAIL = 'koroshillary12@gmail.com';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-6 pb-2">
      {/* Eyebrow chip */}
      <motion.span
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                   border border-border/70 bg-card/50 backdrop-blur-md
                   text-[0.76rem] font-mono font-semibold uppercase tracking-[0.18em]
                   text-muted-foreground mb-5"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        ICPAC · GREATER HORN OF AFRICA
      </motion.span>

      {/* Tagline */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.06 }}
        className="text-3xl md:text-4xl lg:text-[42px] font-bold mb-4 leading-[1.1] tracking-tight max-w-4xl"
      >
        Engineering geospatial systems that turn
        climate data into decisions.
      </motion.h1>

      {/* Subtitle / one-line pitch — broad scope, not flood-only */}
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.14 }}
        className="text-base md:text-base text-muted-foreground leading-relaxed mb-7 max-w-2xl"
      >
        I work at the intersection of Earth observation, hydroinformatics, machine learning,
        and cloud-native architecture — building operational platforms for governments and
        partners across <span className="text-foreground font-semibold">11 GHA countries</span>.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.22 }}
        className="flex flex-wrap items-center gap-3"
      >
        <motion.a
          href={CV_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-4 py-2.5
                     text-sm font-bold rounded-lg
                     bg-primary text-primary-foreground
                     shadow-md shadow-primary/30 ring-1 ring-primary/40
                     hover:shadow-lg hover:shadow-primary/40 transition-shadow"
        >
          <FileText className="w-4 h-4" />
          Download CV
          <ExternalLink className="w-3.5 h-3.5 opacity-80" />
        </motion.a>

        <motion.a
          href={`mailto:${CONTACT_EMAIL}`}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-4 py-2.5
                     text-sm font-bold rounded-lg
                     border border-border/70 bg-card/50 backdrop-blur-md
                     text-foreground hover:border-border hover:bg-card/80
                     transition-colors"
        >
          <Mail className="w-4 h-4 text-amber-500" />
          Talk to me
        </motion.a>

        <span className="ml-1 hidden sm:inline-flex items-center gap-1.5 px-3 py-1
                         text-base font-mono font-bold uppercase tracking-[0.14em]
                         text-emerald-700 dark:text-emerald-400
                         bg-emerald-500/10 border border-emerald-500/30 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          Open for collaborations
        </span>
      </motion.div>
    </section>
  );
};

export default Hero;
