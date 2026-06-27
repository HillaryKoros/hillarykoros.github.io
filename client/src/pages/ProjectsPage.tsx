import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { projects, Project } from '../data/projects';

interface ProjectsPageProps {
  onViewProject?: (projectId: string) => void;
}

const ORDER: Project['status'][] = ['operational', 'ongoing', 'completed', 'planned'];

const ProjectsPage: React.FC<ProjectsPageProps> = ({ onViewProject }) => {
  // Sort: live work first, then ongoing, then completed, then planned. Index 1..N.
  const ordered = [...projects].sort(
    (a, b) => ORDER.indexOf(a.status) - ORDER.indexOf(b.status)
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      {/* Hero */}
      <section className="py-6 mb-4">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 mb-3 text-[0.76rem] font-mono font-bold uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400"
        >
          <span className="w-6 h-px bg-amber-500/60" />
          Projects
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 tracking-tight"
        >
          Shipped Work
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.14 }}
          className="text-base text-muted-foreground leading-relaxed max-w-prose"
        >
          Platforms actively used by governments, NGOs, and researchers across the Greater
          Horn of Africa — from early warning systems to ARCO-Zarr stores and operational
          flood pipelines.
        </motion.p>
      </section>

      {/* Single continuous grid — status now lives on the card as a chip */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ordered.map((project, index) => (
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
    </motion.div>
  );
};

export default ProjectsPage;
