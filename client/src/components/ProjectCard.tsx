import React from 'react';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc: string;
  gradient?: string;
  categories: string[];
  technologies: string;
  projectLink?: string;
  codeLink?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageSrc,
  gradient = "from-gray-500 to-gray-400",
  categories,
  technologies,
  projectLink,
  codeLink
}) => {
  return (
    <motion.div
      className="bg-card rounded-xl border border-border/50 overflow-hidden flex flex-col h-full hover:shadow-lg transition-all duration-300"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Gradient Header with Icon */}
      <div className={`relative h-32 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
          <img
            src={imageSrc}
            alt={title}
            className="w-10 h-10 object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        {/* Category badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {categories.map((category, index) => (
            <span
              key={index}
              className="px-2 py-0.5 text-xs font-medium bg-white/90 text-gray-800 rounded-md"
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-1">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
          {description}
        </p>

        {/* Technologies */}
        <p className="text-xs text-primary font-medium mb-4 line-clamp-1">
          {technologies}
        </p>

        {/* Links */}
        <div className="flex items-center gap-4 pt-3 border-t border-border">
          {projectLink && (
            <a
              href={projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>Demo</span>
            </a>
          )}

          {codeLink && (
            <a
              href={codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>Code</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
