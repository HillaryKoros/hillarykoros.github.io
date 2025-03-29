import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateAge, animateValue, getRandomChars } from '../lib/utils';

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [age, setAge] = useState(0);
  const [motto, setMotto] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [isChangingTitle, setIsChangingTitle] = useState(false);
  const titleChangeInterval = useRef<NodeJS.Timeout | null>(null);
  
  // Professional titles that will animate
  const professionalTitles = [
    "Full Stack Geo-Developer",
    "AI & Data Scientist",
    "GIS Researcher"
  ];
  
  useEffect(() => {
    // Check if on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Calculate age
    const currentAge = calculateAge('1996-08-16');
    
    // Animate age counter
    setTimeout(() => {
      animateValue(0, currentAge, 1000, (value) => {
        setAge(value);
      });
    }, 500);
    
    // Animate motto text
    let count = 0;
    const maxCount = 10;
    const interval = setInterval(() => {
      if (count < maxCount) {
        setMotto(getRandomChars(10));
        count++;
      } else {
        setMotto("My Resume");
        clearInterval(interval);
      }
    }, 100);
    
    // Animate through professional titles
    titleChangeInterval.current = setInterval(() => {
      setIsChangingTitle(true);
      setTimeout(() => {
        setCurrentTitleIndex(prevIndex => (prevIndex + 1) % professionalTitles.length);
        setIsChangingTitle(false);
      }, 300); // Time for fade out effect
    }, 3000); // Change title every 3 seconds - ensures smooth flow between titles
    
    return () => {
      clearInterval(interval);
      if (titleChangeInterval.current) {
        clearInterval(titleChangeInterval.current);
      }
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const toggleSidebar = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <motion.aside 
      className={`lg:w-[300px] lg:sticky lg:top-16 lg:self-start transition-all duration-300 ease-in-out ${isMobile ? 'mb-6' : ''}`}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-card dark:bg-card rounded-2xl shadow-md p-4 sm:p-6 lg:p-8">
        {/* Profile Section */}
        <div className={`flex ${isMobile ? 'flex-row items-center justify-start' : 'flex-col items-center'} text-center`}>
          <motion.div 
            className={`${isMobile ? 'w-20 h-20 mr-4' : 'w-32 h-32 mb-4'} rounded-full overflow-hidden border-2 border-neutral-200 dark:border-neutral-700 shadow-md`}
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src="/assets/avatar.jpg"
              alt="Hillary Koros"
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <div className={`${isMobile ? 'text-left' : 'text-center w-full'}`}>
            <h1 className="text-xl font-semibold mb-1">Hillary Koros</h1>
            
            <div className="h-6 mb-2 overflow-hidden flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTitleIndex}
                  className="text-sm font-medium text-gradient-professional overflow-hidden"
                  initial={{ width: 0, opacity: 1 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <span className="whitespace-nowrap border-r-2 border-accent pr-1">
                    {professionalTitles[currentTitleIndex]}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <motion.div 
              className="inline-block bg-neutral-800 dark:bg-neutral-700 text-white text-xs py-1 px-3 rounded-full mb-2 cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => window.open("https://drive.google.com/file/d/191QzSUJbrNyoMm7ISvMVnwlzWGD0av1P/view", "_blank")}
              whileHover={{ scale: 1.05 }}
            >
              <span id="motto">{motto}</span>
            </motion.div>
            
            <motion.div
              className="flex items-center justify-center gap-2 mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="relative flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2">
                  <span className="absolute top-0 left-0 h-2 w-2 rounded-full bg-green-500 animate-ping opacity-75"></span>
                </div>
                <span className="text-xs font-medium">Available</span>
              </div>
              <div className="flex space-x-1">
                <motion.a 
                  href="mailto:koroshillary12@gmail.com" 
                  className="text-accent hover:text-neutral-900 dark:hover:text-neutral-100"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Email me"
                >
                  ✉️
                </motion.a>
                <motion.a 
                  href="https://wa.me/254719588603" 
                  className="text-accent hover:text-neutral-900 dark:hover:text-neutral-100"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="WhatsApp me"
                >
                  📱
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
        
        <motion.button 
          className="w-full flex items-center justify-center py-2 mt-2 text-sm bg-neutral-100 dark:bg-neutral-800 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-all hover:bg-neutral-200 dark:hover:bg-neutral-700"
          onClick={toggleSidebar}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>{isExpanded ? 'Less Info' : 'More Info'}</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-4 w-4 ml-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.button>
        
        {/* Expanded Info Section */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-neutral-200 dark:bg-neutral-800 shadow-sm"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </motion.div>
                  <div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Age</p>
                    <p className="text-sm font-medium">{age} years old</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-neutral-200 dark:bg-neutral-800 shadow-sm"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </motion.div>
                  <div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Location</p>
                    <address className="text-sm font-medium not-italic">Nairobi, Kenya</address>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-center gap-6">
                  <motion.a 
                    href="https://wa.me/254719588603" 
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-all hover:bg-neutral-300 dark:hover:bg-neutral-700" 
                    aria-label="WhatsApp"
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                  </motion.a>
                  
                  <motion.a 
                    href="https://www.linkedin.com/in/hillarykoros" 
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-all hover:bg-neutral-300 dark:hover:bg-neutral-700" 
                    aria-label="LinkedIn"
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                    </svg>
                  </motion.a>
                  
                  <motion.a 
                    href="https://github.com/HillaryKoros" 
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-all hover:bg-neutral-300 dark:hover:bg-neutral-700" 
                    aria-label="GitHub"
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </motion.a>
                  
                  <motion.a 
                    href="https://www.youtube.com/channel/UCBAQumFhQFt8Ty0bus5rSNg" 
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-all hover:bg-neutral-300 dark:hover:bg-neutral-700" 
                    aria-label="YouTube"
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
