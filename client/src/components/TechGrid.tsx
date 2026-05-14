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

const accentMap: Record<string, { fg: string; bg: string; ring: string }> = {
  globe: { fg: 'text-green-600 dark:text-green-400', bg: 'bg-green-500/10', ring: 'ring-green-500/20' },
  cloud: { fg: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-500/10', ring: 'ring-cyan-500/20' },
  code: { fg: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10', ring: 'ring-blue-500/20' },
  brain: { fg: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-500/10', ring: 'ring-purple-500/20' },
  database: { fg: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-500/10', ring: 'ring-orange-500/20' },
  settings: { fg: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-500/10', ring: 'ring-rose-500/20' }
};

const TechGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {techCategories.map((category, catIndex) => {
        const Icon = iconMap[category.iconKey] ?? Settings2;
        const accent = accentMap[category.iconKey] ?? accentMap.settings;
        return (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: catIndex * 0.04 }}
            className="bg-card rounded-xl border border-border p-4 hover:border-border/80 hover:shadow-sm transition-all duration-200"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <span className={`flex items-center justify-center w-8 h-8 rounded-lg ${accent.bg} ring-1 ${accent.ring}`}>
                <Icon className={`w-4 h-4 ${accent.fg}`} strokeWidth={2.25} />
              </span>
              <h4 className="text-sm font-semibold text-foreground">{category.name}</h4>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {category.items.map((tech) => (
                <span
                  key={tech.name}
                  className="px-2 py-0.5 text-xs font-medium text-muted-foreground bg-secondary/70 rounded-md"
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
