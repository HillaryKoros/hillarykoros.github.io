import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { site } from '../data/site';

const INTERVAL_MS = 4000;

/**
 * Cycles through `site.roles` in the hero.
 *
 * Two accessibility details: the rotation is aria-hidden and the canonical
 * `site.role` is exposed to assistive tech once, so a screen reader is not
 * interrupted every four seconds; and under prefers-reduced-motion the line
 * holds the canonical role instead of animating.
 */
export default function RotatingRole() {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced || site.roles.length < 2) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % site.roles.length), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduced]);

  if (reduced) {
    return <span className="text-primary">{site.role}</span>;
  }

  return (
    <>
      <span className="sr-only">{site.role}</span>
      {/* Reserve the line height so the hero does not jolt on each swap. */}
      <span aria-hidden className="relative block h-[1.5em] overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={i}
            className="absolute inset-x-0 top-0 text-primary"
            initial={{ opacity: 0, y: '0.5em' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-0.5em' }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            {site.roles[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </>
  );
}
