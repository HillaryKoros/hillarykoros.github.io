import React from 'react';
import { motion } from 'framer-motion';

const statusConfig: Record<string, { bg: string; text: string; label: string; gradient: string; techBg: string; techText: string; techBorder: string }> = {
  operational: { bg: 'bg-green-500/90', text: 'text-white', label: 'Operational', gradient: 'from-green-500 to-emerald-400', techBg: 'bg-green-500/10', techText: 'text-green-600 dark:text-green-400', techBorder: 'border-green-500/30' },
  ongoing: { bg: 'bg-blue-500/90', text: 'text-white', label: 'Ongoing', gradient: 'from-blue-500 to-cyan-400', techBg: 'bg-blue-500/10', techText: 'text-blue-600 dark:text-blue-400', techBorder: 'border-blue-500/30' },
  completed: { bg: 'bg-amber-500/90', text: 'text-white', label: 'Completed', gradient: 'from-amber-500 to-yellow-400', techBg: 'bg-amber-500/10', techText: 'text-amber-600 dark:text-amber-400', techBorder: 'border-amber-500/30' },
  planned: { bg: 'bg-red-500/90', text: 'text-white', label: 'Planned', gradient: 'from-red-500 to-orange-400', techBg: 'bg-red-500/10', techText: 'text-red-600 dark:text-red-400', techBorder: 'border-red-500/30' }
};

interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc: string;
  gradient?: string;
  categories: string[];
  technologies: string;
  projectLink?: string;
  codeLink?: string;
  status?: 'operational' | 'ongoing' | 'completed' | 'planned';
  onViewDetails?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageSrc,
  gradient = "from-gray-500 to-gray-400",
  categories,
  technologies,
  projectLink,
  codeLink,
  status,
  onViewDetails
}) => {
  const statusStyle = status ? statusConfig[status] : null;
  const cardGradient = statusStyle ? statusStyle.gradient : gradient;

  return (
    <motion.div
      className="group bg-card rounded-xl border-2 border-border/50 overflow-hidden flex flex-col h-full hover:shadow-2xl transition-all duration-500 cursor-pointer"
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onViewDetails}
    >
      {/* Gradient Header with Icon */}
      <div className={`relative h-36 bg-gradient-to-br ${cardGradient} flex items-center justify-center overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all duration-500"></div>
        {/* Animated background shapes */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-4 right-4 w-24 h-24 rounded-full bg-white/20 blur-xl group-hover:scale-150 transition-transform duration-700"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-white/10 blur-lg group-hover:scale-125 transition-transform duration-500 delay-100"></div>
        </div>
        <div className="relative z-10 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
          <img
            src={imageSrc}
            alt={title}
            className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        {/* Status & Category badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {statusStyle && (
            <span className={`px-2.5 py-1 text-xs font-bold ${statusStyle.bg} ${statusStyle.text} rounded-lg shadow-sm`}>
              {statusStyle.label}
            </span>
          )}
          {categories.map((category, index) => (
            <span
              key={index}
              className="px-2.5 py-1 text-xs font-semibold bg-white/95 text-gray-800 rounded-lg shadow-sm"
            >
              {category}
            </span>
          ))}
        </div>
        {/* View Details indicator */}
        <div className="absolute bottom-3 right-3 transform group-hover:translate-x-1 transition-transform duration-300">
          <span className="px-3 py-1.5 text-xs font-semibold bg-white/95 text-gray-700 rounded-lg shadow-md flex items-center gap-1.5 group-hover:shadow-lg transition-shadow duration-300">
            View Details
            <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-base font-bold text-foreground mb-1.5 line-clamp-1">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground mb-3 flex-1 line-clamp-3 leading-relaxed">
          {description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {technologies.split(', ').slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className={`px-2 py-0.5 text-xs font-medium rounded-md border transition-all duration-300 hover:scale-105 ${
                statusStyle
                  ? `${statusStyle.techBg} ${statusStyle.techText} ${statusStyle.techBorder}`
                  : 'bg-primary/10 text-primary border-primary/30'
              }`}
            >
              {tech}
            </span>
          ))}
          {technologies.split(', ').length > 4 && (
            <span className="px-2 py-0.5 text-xs font-medium text-muted-foreground">
              +{technologies.split(', ').length - 4}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-2 border-t border-border">
          {projectLink && (
            <a
              href={projectLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-0.5"
            >
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>Live Demo</span>
            </a>
          )}

          {codeLink && (
            <a
              href={codeLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-0.5"
            >
              <svg className="w-4 h-4 transition-transform duration-300 hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
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
