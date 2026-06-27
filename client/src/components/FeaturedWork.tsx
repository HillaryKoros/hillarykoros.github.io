import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

interface FeaturedWorkProps {
  onViewProject?: (projectId: string) => void;
  onSeeAll?: () => void;
}

const FeaturedWork: React.FC<FeaturedWorkProps> = ({ onViewProject, onSeeAll }) => {
  // 3 flagship picks — pinned operational platforms
  const featured = projects.filter(p => p.status === 'operational').slice(0, 3);

  return (
    <section className="relative py-6">
      {/* Header */}
      <div className="flex items-end justify-between flex-wrap gap-3 mb-6">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 mb-3 text-[0.76rem] font-mono font-bold uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400"
          >
            <span className="w-6 h-px bg-amber-500/60" />
            Featured Work
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="text-2xl md:text-3xl font-bold tracking-tight"
          >
            Shipped Work
          </motion.h2>
        </div>

        {onSeeAll && (
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ x: 3 }}
            onClick={onSeeAll}
            className="group inline-flex items-center gap-1.5 text-sm font-mono font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
          >
            See all {projects.length} projects
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </motion.button>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {featured.map((project, index) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            imageSrc={project.imageSrc}
            iconKey={project.iconKey}
            gradient={project.gradient}
            categories={project.displayCategories}
            technologies={project.technologies}
            projectLink={project.projectLink}
            codeLink={project.codeLink}
            status={project.status}
            onViewDetails={() => onViewProject?.(project.id)}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedWork;
