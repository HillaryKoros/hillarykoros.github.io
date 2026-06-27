import React from 'react';
import { motion } from 'framer-motion';

/**
 * Minimal sign-off footer — one line, no horizon scene.
 */
const PortfolioFooter: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="mt-16 pt-5 border-t border-border/40"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-base font-mono text-muted-foreground tracking-tight">
        <div>
          &copy; {new Date().getFullYear()}{' '}
          <span className="text-foreground font-semibold">Hillary Koros</span>
        </div>
        <div className="inline-flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-bold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-400">
            Live
          </span>
        </div>
      </div>
    </motion.footer>
  );
};

export default PortfolioFooter;
