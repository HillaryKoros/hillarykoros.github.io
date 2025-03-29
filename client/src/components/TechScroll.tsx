import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Technology {
  name: string;
  imageSrc: string;
  alt: string;
}

interface TechScrollProps {
  technologies: Technology[];
}

const TechScroll: React.FC<TechScrollProps> = ({ technologies }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Check if image URL is valid or has loading issues
  const [imageStatus, setImageStatus] = useState<Record<string, boolean>>({});
  
  // Handle image load error
  const handleImageError = (techName: string) => {
    setImageStatus(prev => ({
      ...prev,
      [techName]: false
    }));
  };
  
  // Handle image load success
  const handleImageLoad = (techName: string) => {
    setImageStatus(prev => ({
      ...prev,
      [techName]: true
    }));
  };
  
  // Determine if an image is an SVG (for better styling)
  const isSvgImage = (path: string): boolean => {
    return path.toLowerCase().endsWith('.svg');
  };
  
  useEffect(() => {
    // Create intersection observer to check if component is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (scrollContainerRef.current) {
      observer.observe(scrollContainerRef.current);
    }
    
    // Cleanup
    return () => {
      if (scrollContainerRef.current) {
        observer.unobserve(scrollContainerRef.current);
      }
    };
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1 
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20
      } 
    }
  };
  
  // Get color for tech item
  const getColorForTech = (techName: string): string => {
    const techLower = techName.toLowerCase();
    
    if (techLower.includes('arcgis')) return 'rgba(0, 122, 194, 0.3)';
    if (techLower.includes('qgis')) return 'rgba(40, 172, 145, 0.3)';
    if (techLower === 'r') return 'rgba(28, 119, 174, 0.3)';
    if (techLower.includes('python')) return 'rgba(55, 118, 171, 0.3)';
    if (techLower.includes('javascript')) return 'rgba(247, 223, 30, 0.3)';
    if (techLower.includes('typescript')) return 'rgba(49, 120, 198, 0.3)';
    if (techLower.includes('react')) return 'rgba(97, 218, 251, 0.3)';
    if (techLower.includes('node')) return 'rgba(104, 160, 99, 0.3)';
    if (techLower.includes('mongodb')) return 'rgba(77, 179, 61, 0.3)';
    if (techLower.includes('postgre') || techLower.includes('sql')) return 'rgba(51, 103, 145, 0.3)';
    
    return 'rgba(100, 100, 100, 0.2)'; // Default
  };
  
  // Get icon for fallback
  const getIconForTech = (techName: string) => {
    // Return appropriate icon based on tech name
    const techLower = techName.toLowerCase();
    
    if (techLower.includes('arcgis')) return '🗺️';
    if (techLower.includes('qgis')) return '🌐';
    if (techLower === 'r') return 'R';
    if (techLower.includes('python')) return '🐍';
    if (techLower.includes('gdal')) return '📊';
    if (techLower.includes('adobe')) return '🎨';
    if (techLower.includes('post') || techLower.includes('sql')) return '🛢️';
    if (techLower.includes('linux')) return '🐧';
    if (techLower.includes('gis')) return '🌎';
    if (techLower.includes('react')) return '⚛️';
    if (techLower.includes('script')) return '📜';
    if (techLower.includes('tensor')) return '🧠';
    if (techLower.includes('mongo')) return '📄';
    if (techLower.includes('node')) return '📦';
    if (techLower.includes('git')) return '📂';
    if (techLower.includes('map')) return '📍';
    if (techLower.includes('carto')) return '🗺️';
    if (techLower.includes('css')) return 'CSS';
    if (techLower.includes('html')) return 'HTML';
    if (techLower.includes('docker')) return '🐳';
    
    return '🛠️'; // Default tool icon
  };
  
  // Render a single tech item
  const renderTechItem = (tech: Technology, index: number, isSecondCopy: boolean = false) => {
    const keyPrefix = isSecondCopy ? 'second-' : '';
    const isSvg = isSvgImage(tech.imageSrc);
    const bgColor = getColorForTech(tech.name);
    
    return (
      <motion.div 
        key={`${tech.name}-${keyPrefix}${index}`}
        className="flex flex-col items-center justify-center p-2 technologies-item"
        style={{ "--animation-delay": `${index * 0.5}` } as React.CSSProperties}
        whileHover={{ scale: 1.05 }}
      >
        <div
          className="w-20 h-20 md:w-24 md:h-24 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3 overflow-hidden shadow-md border border-border/40 hover:border-primary/50 transition-all group"
          style={{ backgroundColor: bgColor }}
        >
          {/* First try to load image */}
          {imageStatus[tech.name] !== false && (
            <img 
              src={tech.imageSrc} 
              alt={tech.alt} 
              className={`${isSvg ? 'w-[60%] h-[60%]' : 'max-w-[80%] max-h-[80%]'} object-contain group-hover:scale-110 transition-transform duration-300`}
              onError={() => handleImageError(tech.name)}
              onLoad={() => handleImageLoad(tech.name)}
              loading="lazy"
            />
          )}
          
          {/* Fallback for failed images */}
          {imageStatus[tech.name] === false && (
            <div className="w-16 h-16 flex items-center justify-center text-2xl bg-primary/10 rounded-full">
              {getIconForTech(tech.name)}
            </div>
          )}
        </div>
        <div 
          className="tech-badge text-xs font-medium px-3 py-1 rounded-full bg-secondary/30 text-secondary-foreground backdrop-blur-sm"
        >
          {tech.name}
        </div>
      </motion.div>
    );
  };
  
  return (
    <motion.div 
      ref={scrollContainerRef}
      className="technologies my-8 p-6 border border-border/50 rounded-xl shadow-lg bg-card/90 backdrop-blur-sm"
      id="tech-skills"
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.div 
        className="flex justify-between items-center mb-6"
        variants={itemVariants}
      >
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 7-5 5-5-5"/>
              <path d="m15 12-5 5-5-5"/>
            </svg>
          </div>
          <h3 className="text-xl lg:text-2xl font-semibold">Development Tools</h3>
        </div>
        
        <motion.div
          className="text-xs px-3 py-1 rounded-full bg-secondary/30 text-secondary-foreground backdrop-blur-sm"
          whileHover={{ scale: 1.05 }}
        >
          <span className="hidden sm:inline">Interactive</span> Tech Gallery
        </motion.div>
      </motion.div>
      
      <div className="overflow-hidden w-full py-4">
        <div className="flex items-center tech-scroll-container">
          {/* First copy of the tech list for seamless loop */}
          <div className="tech-scroll flex flex-nowrap gap-4 min-w-max">
            {technologies.map((tech, index) => renderTechItem(tech, index))}
          </div>
          
          {/* Second copy of the tech list for seamless looping */}
          <div className="tech-scroll flex flex-nowrap gap-4 min-w-max">
            {technologies.map((tech, index) => renderTechItem(tech, index, true))}
          </div>
        </div>
      </div>
      
      {/* Controls for mobile - Optional pause/play buttons */}
      <div className="mt-4 flex justify-center md:hidden">
        <motion.button
          className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary-foreground backdrop-blur-sm"
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsHovered(!isHovered)}
        >
          {isHovered ? 'Resume Scrolling' : 'Pause Scrolling'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TechScroll;
