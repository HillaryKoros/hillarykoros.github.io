import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ContactItemProps {
  title: string;
  subtitle: string;
  value: string;
  icon: string;
  actionButton?: {
    text: string;
    onClick: () => void;
  };
  socialLinks?: Array<{
    url: string;
    icon: string;
    label: string;
  }>;
}

const ContactInfo: React.FC<ContactItemProps> = ({ 
  title, 
  subtitle, 
  value, 
  icon, 
  actionButton,
  socialLinks
}) => {
  const [buttonText, setButtonText] = useState(actionButton?.text || '');
  
  const handleAction = () => {
    if (actionButton?.onClick) {
      actionButton.onClick();
      setButtonText('Copied!');
      setTimeout(() => {
        setButtonText(actionButton.text);
      }, 2000);
    }
  };

  return (
    <motion.div 
      className="bg-card dark:bg-card rounded-xl shadow-md p-6 flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="w-16 h-16 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center mb-5 text-2xl shadow-md">
        {icon}
      </div>
      
      <h3 className="font-medium mb-2">{title}</h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{subtitle}</p>
      
      {socialLinks ? (
        <div className="flex space-x-4">
          {socialLinks.map((link, index) => (
            <motion.a 
              key={index}
              href={link.url} 
              className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
              aria-label={link.label}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {link.icon}
            </motion.a>
          ))}
        </div>
      ) : (
        <>
          <p className="text-sm font-medium">{value}</p>
          {actionButton && (
            <motion.button 
              className="mt-3 text-xs py-1 px-3 bg-neutral-200 dark:bg-neutral-800 rounded-full hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
              onClick={handleAction}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {buttonText}
            </motion.button>
          )}
        </>
      )}
    </motion.div>
  );
};

export default ContactInfo;
