import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface NavigationProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activePage, onNavigate }) => {
  const navItems = [
    { name: 'About', key: 'about', icon: '👤' },
    { name: 'Projects', key: 'projects', icon: '🛠️' },
    { name: 'Contact', key: 'contact', icon: '✉️' }
  ];

  // Theme toggle functionality
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showThemeHelper, setShowThemeHelper] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Initialize theme from localStorage on component mount
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    
    // Check if it's the user's first visit to show theme helper
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    if (!hasVisitedBefore) {
      setShowThemeHelper(true);
      // Set visited flag after 5 seconds and hide the helper
      setTimeout(() => {
        localStorage.setItem('hasVisitedBefore', 'true');
        setShowThemeHelper(false);
      }, 5000);
    }
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      return newTheme;
    });
  };

  return (
    <motion.nav 
      className="mb-8 sticky top-0 z-10 glass-effect shadow-subtle dark:shadow-subtle-dark py-4 rounded-xl mx-1"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex justify-between items-center px-4">
        <ul className="flex space-x-6 md:space-x-10">
          {navItems.map((item, index) => (
            <motion.li 
              key={item.key}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <motion.button 
                className={`nav-link text-sm md:text-base font-medium py-2 flex items-center ${activePage === item.key ? 'active text-primary font-semibold' : 'hover:text-primary'}`}
                onClick={() => onNavigate(item.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="hidden md:inline-block mr-2">{item.icon}</span>
                {item.name}
                {activePage === item.key && (
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 bg-primary rounded-full"
                    layoutId="underline"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            </motion.li>
          ))}
        </ul>
        
        <div className="flex items-center gap-4">
          {/* Professional Theme Toggle with Tooltip and First-time Helper */}
          <div className="relative group">
            <motion.button
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent ${
                theme === 'light' 
                  ? 'bg-neutral-700' 
                  : 'bg-neutral-300'
              } transition-colors duration-200 ease-in-out focus:outline-none ${showThemeHelper ? 'ring-2 ring-blue-400 dark:ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-neutral-900' : ''}`}
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="sr-only">Toggle dark mode</span>
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out ${
                  theme === 'dark'
                    ? 'translate-x-5 bg-neutral-100' 
                    : 'translate-x-0 bg-neutral-900'
                }`}
              />
            </motion.button>
            
            {/* Enhanced Tooltip with icon */}
            <div className={`absolute ${showThemeHelper ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-200 bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 whitespace-nowrap text-xs px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 shadow-sm border border-blue-100 dark:border-blue-900/30 pointer-events-none flex items-center z-10`}>
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
              Switch to {theme === 'light' ? 'dark' : 'light'} theme
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-neutral-100 dark:border-t-neutral-800"></div>
            </div>
            
            {/* Animated helper for first-time users */}
            {showThemeHelper && (
              <motion.div 
                className="absolute -right-3 top-full mt-1 flex flex-col items-center"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <svg className="w-5 h-5 text-blue-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <p className="text-xs font-medium text-blue-500 mt-1">Try me!</p>
              </motion.div>
            )}
          </div>
          
          <motion.div 
            className="hidden md:flex items-center text-sm font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="relative group" ref={menuRef}>
              <span 
                className="bg-gradient-to-r from-blue-500/80 to-purple-500/80 dark:from-blue-400/70 dark:to-purple-400/70 text-white px-2.5 py-0.5 rounded-full text-xs font-medium animate-pulse-slow cursor-pointer hover:shadow-md hover:from-blue-500/90 hover:to-purple-500/90 dark:hover:from-blue-400/90 dark:hover:to-purple-400/90 transition-all duration-500"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                Open for Consulting
              </span>
              <div 
                className={`${menuOpen ? 'block' : 'hidden'} absolute right-0 mt-2 w-40 backdrop-blur-sm bg-white/95 dark:bg-neutral-900/95 shadow-lg rounded-md overflow-hidden z-20 border border-blue-200 dark:border-blue-500/20`}
              >
                <a 
                  href="mailto:koroshillary12@gmail.com" 
                  className="block px-3 py-2 text-xs text-neutral-700 dark:text-neutral-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center transition-colors duration-200"
                >
                  <span className="mr-2 bg-blue-100 dark:bg-blue-800/30 p-1 rounded-full">📧</span> Email me
                </a>
                <a 
                  href="https://wa.me/+2547123456789" 
                  className="block px-3 py-2 text-xs text-neutral-700 dark:text-neutral-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center transition-colors duration-200"
                >
                  <span className="mr-2 bg-blue-100 dark:bg-blue-800/30 p-1 rounded-full">💬</span> WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
