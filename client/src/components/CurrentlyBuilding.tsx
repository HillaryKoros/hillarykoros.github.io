import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Waves, Cloud, BrainCircuit, Settings2, type LucideIcon } from 'lucide-react';

interface BuildItem {
  title: string;
  detail: string;
  icon: LucideIcon;
  accent: {
    fg: string;
    bg: string;
    ring: string;
    sweep: string;
  };
}

const items: BuildItem[] = [
  {
    title: 'East Africa Flood Watch v3',
    detail: 'Multi-model ensemble · finer admin · faster publication.',
    icon: Waves,
    accent: {
      fg: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-500/10',
      ring: 'ring-blue-500/30',
      sweep: 'from-blue-400 via-sky-400 to-cyan-400',
    },
  },
  {
    title: 'Icechunk-backed ARCO',
    detail: 'Transactional Zarr stores for IMERG · CHIRPS · ERA5.',
    icon: Cloud,
    accent: {
      fg: 'text-cyan-600 dark:text-cyan-400',
      bg: 'bg-cyan-500/10',
      ring: 'ring-cyan-500/30',
      sweep: 'from-cyan-400 via-sky-400 to-blue-500',
    },
  },
  {
    title: 'RAG over climate knowledge',
    detail: 'Retrieval-augmented assistants for bulletins, sitreps, briefs.',
    icon: BrainCircuit,
    accent: {
      fg: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-500/10',
      ring: 'ring-purple-500/30',
      sweep: 'from-purple-400 via-fuchsia-400 to-pink-500',
    },
  },
  {
    title: 'DevOps for hydro models',
    detail: 'Reproducible pipelines for WRF‑Hydro · HYPE · GeoSFM.',
    icon: Settings2,
    accent: {
      fg: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-500/10',
      ring: 'ring-amber-500/30',
      sweep: 'from-amber-400 via-orange-400 to-red-500',
    },
  },
];

const CurrentlyBuilding: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveIndex((n) => (n + 1) % items.length);
    }, 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      {/* Section header outside the tile grid so it matches the StatsBand visual rhythm */}
      <div className="flex items-center justify-between mb-3">
        <span className="inline-flex items-center gap-2 text-[0.76rem] font-mono font-bold uppercase tracking-[0.16em] text-amber-600 dark:text-amber-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          Currently Building
        </span>
      </div>

      {/* 2 × 2 tile grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {items.map((item, i) => {
          const Icon = item.icon;
          const isActive = i === activeIndex;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              animate={{
                scale: isActive ? 1.012 : 1,
              }}
              whileHover={{ y: -3 }}
              className={`
                group relative overflow-hidden rounded-xl border
                bg-card/65 supports-[backdrop-filter]:bg-card/45 backdrop-blur-md backdrop-saturate-150
                p-4 sm:p-5
                transition-[border-color,box-shadow,background-color] duration-300
                hover:shadow-lg
                ${isActive
                  ? 'border-amber-500/40 shadow-md shadow-amber-500/10'
                  : 'border-border/70 hover:border-border'}
              `}
            >
              {/* sweep accent in the item's colour, fully drawn while active */}
              <div
                aria-hidden
                className={`
                  absolute inset-x-0 top-0 h-[2px] origin-left
                  bg-gradient-to-r ${item.accent.sweep}
                  transition-transform duration-500 ease-out
                  ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                `}
              />

              <div className="relative flex items-start gap-3">
                <span
                  className={`flex items-center justify-center w-10 h-10 rounded-lg shrink-0 ${item.accent.bg} ring-1 ${item.accent.ring} transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
                >
                  <Icon className={`w-5 h-5 ${item.accent.fg}`} strokeWidth={2.25} />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="text-[0.76rem] font-mono font-bold uppercase tracking-[0.12em] text-muted-foreground mb-1">
                    {isActive ? '● Active' : 'Shipping'}
                  </div>
                  <div className="text-base font-bold text-foreground leading-tight mb-1 tracking-tight">
                    {item.title}
                  </div>
                  <div className="text-base text-muted-foreground leading-snug">
                    {item.detail}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CurrentlyBuilding;
