import React from 'react';
import { useTheme } from '../lib/themeContext';
import { motion } from 'framer-motion';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.div 
      className="fixed top-5 right-5 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative group">
        <motion.button 
          className={`rounded-full p-3 ${theme === 'light' ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-black'} shadow-lg transition-all duration-300 hover:scale-110`}
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {theme === 'light' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </motion.button>
        
        {/* Enhanced Tooltip with icon and visual guidance */}
        <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 right-full mr-2 top-1/2 transform -translate-y-1/2 whitespace-nowrap text-xs px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 shadow-sm border border-blue-100 dark:border-blue-900/30 pointer-events-none flex items-center">
          <span className="mr-1">
            {theme === 'light' ? 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg> : 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            }
          </span>
          Switch to {theme === 'light' ? 'dark' : 'light'} mode
          <div className="absolute top-1/2 right-0 transform translate-x-1 -translate-y-1/2 border-4 border-transparent border-l-neutral-100 dark:border-l-neutral-800"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default ThemeToggle;
