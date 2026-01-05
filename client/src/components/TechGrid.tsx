import React from 'react';
import { motion } from 'framer-motion';
import { techCategories } from '../data/technologies';

const TechGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {techCategories.map((category, catIndex) => (
        <motion.div
          key={category.name}
          className="bg-card rounded-lg border border-border p-5 hover:shadow-md transition-shadow duration-200"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: catIndex * 0.05 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">{category.icon}</span>
            <h4 className="font-semibold text-foreground">{category.name}</h4>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {category.items.map((tech) => (
              <span
                key={tech.name}
                className="px-2.5 py-1.5 text-sm text-muted-foreground bg-secondary rounded-md"
              >
                {tech.name}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TechGrid;
