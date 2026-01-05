import React from 'react';
import { motion } from 'framer-motion';
import { techCategories } from '../data/technologies';

const categoryStyles = [
  { bg: 'from-card to-blue-500/10', iconBg: 'bg-blue-500/15', badgeBg: 'bg-blue-500/10', hoverBorder: 'hover:border-blue-500/50' },
  { bg: 'from-card to-green-500/10', iconBg: 'bg-green-500/15', badgeBg: 'bg-green-500/10', hoverBorder: 'hover:border-green-500/50' },
  { bg: 'from-card to-purple-500/10', iconBg: 'bg-purple-500/15', badgeBg: 'bg-purple-500/10', hoverBorder: 'hover:border-purple-500/50' },
  { bg: 'from-card to-orange-500/10', iconBg: 'bg-orange-500/15', badgeBg: 'bg-orange-500/10', hoverBorder: 'hover:border-orange-500/50' },
  { bg: 'from-card to-cyan-500/10', iconBg: 'bg-cyan-500/15', badgeBg: 'bg-cyan-500/10', hoverBorder: 'hover:border-cyan-500/50' },
];

const TechGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {techCategories.map((category, catIndex) => {
        const style = categoryStyles[catIndex % categoryStyles.length];
        return (
          <motion.div
            key={category.name}
            className={`bg-gradient-to-br ${style.bg} rounded-3xl border-2 border-border p-6 ${style.hoverBorder} hover:shadow-xl transition-all duration-300`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: catIndex * 0.05 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className={`w-12 h-12 rounded-xl ${style.iconBg} flex items-center justify-center`}>
                <span className="text-2xl">{category.icon}</span>
              </div>
              <h4 className="font-bold text-foreground text-lg">{category.name}</h4>
            </div>

            <div className="flex flex-wrap gap-2">
              {category.items.map((tech) => (
                <span
                  key={tech.name}
                  className={`px-3 py-2 text-sm font-medium ${style.badgeBg} text-foreground rounded-lg border border-border/50 hover:border-border transition-colors`}
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
