import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Globe2, Rocket } from 'lucide-react';
import { animateValue } from '../lib/utils';

interface Stat {
  label: string;
  value: number;
  suffix?: string;
  icon: typeof Globe2;
  /** Tailwind classes for the icon chip background + foreground */
  accent: { bg: string; ring: string; fg: string };
}

const STATS: Stat[] = [
  {
    label: 'Countries served',
    value: 11,
    icon: Globe2,
    accent: { bg: 'bg-emerald-500/10', ring: 'ring-emerald-500/30', fg: 'text-emerald-600 dark:text-emerald-400' },
  },
  {
    label: 'Platforms shipped',
    value: 5,
    suffix: '+',
    icon: Rocket,
    accent: { bg: 'bg-amber-500/10', ring: 'ring-amber-500/30', fg: 'text-amber-600 dark:text-amber-400' },
  },
];

const formatNumber = (n: number) => n.toLocaleString('en-US');

const StatsBand: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [counts, setCounts] = useState<number[]>(STATS.map(() => 0));

  useEffect(() => {
    if (!wrapRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !active) {
          setActive(true);
          STATS.forEach((s, i) => {
            const dur = 1100 + i * 120;
            animateValue(0, s.value, dur, (v) =>
              setCounts((prev) => {
                const next = [...prev];
                next[i] = v;
                return next;
              })
            );
          });
        }
      },
      { threshold: 0.35 }
    );
    io.observe(wrapRef.current);
    return () => io.disconnect();
  }, [active]);

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 my-8"
    >
      {STATS.map((s, i) => {
        const Icon = s.icon;
        return (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -3 }}
            className="
              group relative overflow-hidden rounded-xl border border-border/70
              bg-card/65 supports-[backdrop-filter]:bg-card/45 backdrop-blur-md backdrop-saturate-150
              p-4 sm:p-5
              transition-[border-color,box-shadow,background-color] duration-300
              hover:border-border hover:bg-card/85 hover:shadow-lg
            "
          >
            {/* Sweep accent line in this stat's accent colour */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0
                         bg-gradient-to-r from-amber-400 via-orange-400 to-cyan-400
                         transition-transform duration-500 ease-out
                         group-hover:scale-x-100"
            />

            <div className="relative flex items-center gap-3">
              <span
                className={`flex items-center justify-center w-10 h-10 rounded-lg ${s.accent.bg} ring-1 ${s.accent.ring} transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon className={`w-5 h-5 ${s.accent.fg}`} strokeWidth={2.25} />
              </span>
              <div className="min-w-0">
                <div className="text-2xl sm:text-3xl font-bold text-foreground tabular-nums leading-none tracking-tight">
                  {formatNumber(counts[i])}
                  {s.suffix && (
                    <span className="text-primary/80">{s.suffix}</span>
                  )}
                </div>
                <div className="mt-1 text-[0.76rem] font-mono font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {s.label}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default StatsBand;
