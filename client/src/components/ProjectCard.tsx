import React from 'react';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc: string;
  categories: string[];
  technologies: string;
  projectLink?: string;
  codeLink?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  imageSrc, 
  categories, 
  technologies,
  projectLink, 
  codeLink 
}) => {
  return (
    <motion.div 
      className="project-card bg-card dark:bg-card rounded-xl shadow-md overflow-hidden flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      
      <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
          <h3 className="text-base sm:text-sm md:text-base font-medium">{title}</h3>
          <div className="flex flex-wrap gap-1">
            {categories.map((category, index) => (
              <span 
                key={index} 
                className="inline-block px-2 py-0.5 text-2xs sm:text-xs bg-neutral-200 dark:bg-neutral-800 rounded"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
        
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-2 flex-1">
          {description}
        </p>
        
        <div className="mb-3">
          <p className="text-2xs sm:text-xs font-medium text-accent">
            {technologies}
          </p>
        </div>
        
        <div className="flex justify-between items-center">
          {projectLink && (
            <motion.a 
              href={projectLink} 
              className="text-2xs sm:text-xs md:text-sm flex items-center gap-1 text-neutral-800 dark:text-neutral-200 hover:text-accent dark:hover:text-accent transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 3 }}
            >
              <span>View Project</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.a>
          )}
          
          {codeLink && (
            <motion.a 
              href={codeLink} 
              className="text-2xs sm:text-xs md:text-sm flex items-center gap-1 text-neutral-800 dark:text-neutral-200 hover:text-accent dark:hover:text-accent transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 3 }}
            >
              <span>Code</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
