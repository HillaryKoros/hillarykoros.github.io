import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';

const ProjectsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filterCategories = [
    { key: 'all', label: 'All' },
    { key: 'websites', label: 'Websites' },
    { key: 'applications', label: 'Applications' },
    { key: 'designs', label: 'Designs' }
  ];
  
  const filteredProjects = projects.filter(project => 
    activeFilter === 'all' || project.categories.includes(activeFilter)
  );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="animate-fade-in"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <motion.h2 
          className="text-2xl font-semibold mb-4 md:mb-0 relative inline-block"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Projects
          <span className="absolute -bottom-1 left-0 w-1/3 h-1 bg-accent dark:bg-accent rounded-full"></span>
        </motion.h2>
        
        <motion.div 
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {filterCategories.map((category) => (
            <motion.button 
              key={category.key}
              className={`px-4 py-1 text-sm rounded-full transition-colors ${
                activeFilter === category.key 
                  ? 'bg-accent dark:bg-accent text-white dark:text-neutral-900 font-medium' 
                  : 'bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700'
              }`}
              onClick={() => setActiveFilter(category.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>
      </div>
      
      {/* Projects Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        layout
      >
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imageSrc={project.imageSrc}
              categories={project.displayCategories}
              technologies={project.technologies}
              projectLink={project.projectLink}
              codeLink={project.codeLink}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
};

export default ProjectsPage;
