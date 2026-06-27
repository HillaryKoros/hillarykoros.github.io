import React from 'react';
import { motion } from 'framer-motion';
import { Globe2, Cloud, Code2, BrainCircuit, Database, Settings2, LucideIcon } from 'lucide-react';
import { techCategories } from '../data/technologies';

const iconMap: Record<string, LucideIcon> = {
  globe: Globe2,
  cloud: Cloud,
  code: Code2,
  brain: BrainCircuit,
  database: Database,
  settings: Settings2
};

/**
 * Per-category accent palette — each category gets a coordinated
 * icon foreground, soft fill, ring, and a gradient used for the
 * sweep-line that draws across the top of the card on hover.
 */
const accentMap: Record<
  string,
  { fg: string; bg: string; ring: string; sweep: string; glow: string }
> = {
  globe:    { fg: 'text-green-600 dark:text-green-400',  bg: 'bg-green-500/10',  ring: 'ring-green-500/20',  sweep: 'from-green-400 via-emerald-400 to-cyan-400',   glow: 'shadow-green-500/15' },
  cloud:    { fg: 'text-cyan-600 dark:text-cyan-400',    bg: 'bg-cyan-500/10',   ring: 'ring-cyan-500/20',   sweep: 'from-cyan-400 via-sky-400 to-blue-500',         glow: 'shadow-cyan-500/15'  },
  code:     { fg: 'text-blue-600 dark:text-blue-400',    bg: 'bg-blue-500/10',   ring: 'ring-blue-500/20',   sweep: 'from-blue-400 via-indigo-400 to-violet-500',    glow: 'shadow-blue-500/15'  },
  brain:    { fg: 'text-purple-600 dark:text-purple-400',bg: 'bg-purple-500/10', ring: 'ring-purple-500/20', sweep: 'from-purple-400 via-fuchsia-400 to-pink-500',   glow: 'shadow-purple-500/15'},
  database: { fg: 'text-orange-600 dark:text-orange-400',bg: 'bg-orange-500/10', ring: 'ring-orange-500/20', sweep: 'from-amber-400 via-orange-400 to-red-500',      glow: 'shadow-orange-500/15'},
  settings: { fg: 'text-rose-600 dark:text-rose-400',    bg: 'bg-rose-500/10',   ring: 'ring-rose-500/20',   sweep: 'from-rose-400 via-pink-400 to-fuchsia-500',     glow: 'shadow-rose-500/15'  }
};

const TechGrid: React.FC = () => {
  // 6-col grid like Meshack: most cards span 2 cols, wider sections (web/cloud) span 3
  const spanForIndex = (i: number, total: number) => {
    // Last two cards (web/db, cloud/devops) span 3 of 6 on lg+; everything else spans 2
    if (i >= total - 2) return 'lg:col-span-3';
    return 'lg:col-span-2';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
      {techCategories.map((category, catIndex) => {
        const span = spanForIndex(catIndex, techCategories.length);
        const Icon = iconMap[category.iconKey] ?? Settings2;
        const accent = accentMap[category.iconKey] ?? accentMap.settings;
        return (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: catIndex * 0.06, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -3 }}
            className={`
              group relative overflow-hidden rounded-2xl border border-border/70
              bg-card/65 supports-[backdrop-filter]:bg-card/45 backdrop-blur-md backdrop-saturate-150
              p-6 sm:p-7
              transition-[border-color,box-shadow,background-color] duration-300
              hover:border-border hover:bg-card/85 hover:shadow-xl ${accent.glow}
              ${span}
            `}
          >
            {/* sweep accent line — scales in from left on hover */}
            <div
              aria-hidden
              className={`
                absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0
                bg-gradient-to-r ${accent.sweep}
                transition-transform duration-500 ease-out
                group-hover:scale-x-100
              `}
            />

            {/* subtle radial glow that fades in on hover */}
            <div
              aria-hidden
              className={`
                pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full
                bg-gradient-to-br ${accent.sweep} opacity-0 blur-2xl
                transition-opacity duration-500 group-hover:opacity-15
              `}
            />

            {/* header: icon chip + category name */}
            <div className="relative flex items-center gap-3.5 mb-5">
              <span
                className={`
                  flex items-center justify-center w-12 h-12 rounded-xl
                  ${accent.bg} ring-1 ${accent.ring}
                  transition-transform duration-300 group-hover:scale-110
                `}
              >
                <Icon className={`w-6 h-6 ${accent.fg}`} strokeWidth={2.25} />
              </span>
              <h4 className="text-[13px] font-bold uppercase tracking-[0.14em] text-foreground/90">
                {category.name}
              </h4>
            </div>

            {/* tag pills — softly emphasized on card hover */}
            <div className="relative flex flex-wrap gap-2">
              {category.items.map((tech) => (
                <span
                  key={tech.name}
                  className={`
                    inline-flex items-center px-2.5 py-1
                    text-[12.5px] font-medium font-mono tracking-tight
                    text-muted-foreground bg-secondary/50 border border-border/40
                    rounded-md
                    transition-all duration-200
                    group-hover:text-foreground group-hover:border-border/80 group-hover:bg-secondary/80
                  `}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default TechGrid;
