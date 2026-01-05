import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

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
      const timer = setTimeout(() => {
        setWidth(percentage);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isInView, percentage]);

  return (
    <div className="space-y-1.5" ref={ref}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className="text-xs font-medium text-primary">{label || `${percentage}%`}</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

export default SkillBar;
