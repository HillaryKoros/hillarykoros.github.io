import React from 'react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon }) => {
  return (
    <motion.div 
      className="bg-card dark:bg-card rounded-xl shadow-md p-4 sm:p-6 transition-all h-full"
      whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="w-12 h-12 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center flex-shrink-0 text-xl shadow-sm">
          {icon}
        </div>
        <div>
          <h4 className="font-medium mb-2 text-primary">{title}</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
