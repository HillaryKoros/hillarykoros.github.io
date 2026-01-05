import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Technology {
  name: string;
  imageSrc: string;
  alt: string;
}

interface TechScrollProps {
  technologies: Technology[];
}

const TechScroll: React.FC<TechScrollProps> = ({ technologies }) => {
  const [imageStatus, setImageStatus] = useState<Record<string, boolean>>({});

  const handleImageError = (techName: string) => {
    setImageStatus(prev => ({ ...prev, [techName]: false }));
  };

  const handleImageLoad = (techName: string) => {
    setImageStatus(prev => ({ ...prev, [techName]: true }));
  };

  const getColorForTech = (techName: string): string => {
    const techLower = techName.toLowerCase();
    if (techLower.includes('arcgis')) return 'bg-blue-100 dark:bg-blue-900/30';
    if (techLower.includes('qgis')) return 'bg-emerald-100 dark:bg-emerald-900/30';
    if (techLower === 'r') return 'bg-sky-100 dark:bg-sky-900/30';
    if (techLower.includes('python')) return 'bg-yellow-100 dark:bg-yellow-900/30';
    if (techLower.includes('javascript')) return 'bg-amber-100 dark:bg-amber-900/30';
    if (techLower.includes('typescript')) return 'bg-blue-100 dark:bg-blue-900/30';
    if (techLower.includes('react')) return 'bg-cyan-100 dark:bg-cyan-900/30';
    if (techLower.includes('node')) return 'bg-green-100 dark:bg-green-900/30';
    if (techLower.includes('mongodb')) return 'bg-green-100 dark:bg-green-900/30';
    if (techLower.includes('postgre') || techLower.includes('sql')) return 'bg-indigo-100 dark:bg-indigo-900/30';
    if (techLower.includes('docker')) return 'bg-blue-100 dark:bg-blue-900/30';
    if (techLower.includes('git')) return 'bg-orange-100 dark:bg-orange-900/30';
    return 'bg-gray-100 dark:bg-gray-800/50';
  };

  const getIconForTech = (techName: string) => {
    const techLower = techName.toLowerCase();
    if (techLower.includes('arcgis')) return '🗺️';
    if (techLower.includes('qgis')) return '🌐';
    if (techLower === 'r') return 'R';
    if (techLower.includes('python')) return '🐍';
    if (techLower.includes('gdal')) return '📊';
    if (techLower.includes('adobe')) return '🎨';
    if (techLower.includes('post') || techLower.includes('sql')) return '🛢️';
    if (techLower.includes('docker')) return '🐳';
    if (techLower.includes('git')) return '📂';
    return '🛠️';
  };

  const renderTechItem = (tech: Technology, index: number, isSecondCopy: boolean = false) => {
    const keyPrefix = isSecondCopy ? 'copy-' : '';
    const bgColor = getColorForTech(tech.name);

    return (
      <div
        key={`${keyPrefix}${tech.name}-${index}`}
        className="flex flex-col items-center flex-shrink-0 px-3"
      >
        <div className={`w-16 h-16 sm:w-20 sm:h-20 ${bgColor} rounded-xl flex items-center justify-center mb-2 border border-border/30 transition-transform hover:scale-105`}>
          {imageStatus[tech.name] !== false ? (
            <img
              src={tech.imageSrc}
              alt={tech.alt}
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
              onError={() => handleImageError(tech.name)}
              onLoad={() => handleImageLoad(tech.name)}
              loading="lazy"
            />
          ) : (
            <span className="text-2xl">{getIconForTech(tech.name)}</span>
          )}
        </div>
        <span className="text-xs text-muted-foreground font-medium">{tech.name}</span>
      </div>
    );
  };

  return (
    <motion.div
      className="bg-card rounded-xl border border-border/50 p-5 sm:p-6 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 className="font-semibold">Development Tools</h3>
        </div>
        <span className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-full">
          Tech Stack
        </span>
      </div>

      <div className="relative">
        {/* Gradient fade on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none"></div>

        {/* Scrolling container */}
        <div className="overflow-hidden">
          <div className="flex animate-scroll hover:pause-animation">
            {technologies.map((tech, index) => renderTechItem(tech, index))}
            {technologies.map((tech, index) => renderTechItem(tech, index, true))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TechScroll;
