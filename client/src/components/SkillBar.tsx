import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SkillBarProps {
  name: string;
  percentage: number;
  label?: string;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, percentage, label }) => {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  useEffect(() => {
    if (isInView) {
      // Delay to ensure animation is visible
      const timer = setTimeout(() => {
        setWidth(percentage);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, percentage]);

  return (
    <motion.div 
      className="mb-4" 
      ref={ref} 
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between mb-2 gap-1">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-xs sm:text-sm text-primary font-medium">{label || `${percentage}%`}</span>
      </div>
      <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden shadow-inner">
        <motion.div 
          className="h-full bg-primary/80 dark:bg-primary/80 rounded-full relative"
          style={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.span 
            className="absolute top-0 right-0 h-full w-1 bg-white/30 dark:bg-white/10"
            animate={{ 
              x: [0, 8, 0],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SkillBar;
