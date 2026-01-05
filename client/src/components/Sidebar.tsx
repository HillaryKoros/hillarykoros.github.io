import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateAge, animateValue, getRandomChars } from '../lib/utils';

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [age, setAge] = useState(0);
  const [motto, setMotto] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const titleChangeInterval = useRef<NodeJS.Timeout | null>(null);

  const professionalTitles = [
    "Geospatial Developer",
    "GIS & Remote Sensing",
    "AI/ML Engineer",
    "Data Scientist",
    "Systems Architect"
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const currentAge = calculateAge('1996-08-16');

    setTimeout(() => {
      animateValue(0, currentAge, 1000, (value) => {
        setAge(value);
      });
    }, 500);

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

    titleChangeInterval.current = setInterval(() => {
      setCurrentTitleIndex(prevIndex => (prevIndex + 1) % professionalTitles.length);
    }, 3000);

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
      className={`lg:w-[320px] lg:flex-shrink-0 lg:sticky lg:top-8 lg:self-start transition-all duration-300 ease-in-out ${isMobile ? 'mb-6' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="bg-card rounded-3xl shadow-lg border-2 border-border p-6 sm:p-8">
        {/* Profile Section */}
        <div className={`flex ${isMobile ? 'flex-row items-center' : 'flex-col items-center'}`}>
          <motion.div
            className={`${isMobile ? 'w-24 h-24 mr-5' : 'w-36 h-36 mb-5'} rounded-full overflow-hidden border-4 border-primary/20 shadow-lg`}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="/assets/avatar.jpg"
              alt="Hillary Koros"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className={`${isMobile ? 'text-left' : 'text-center w-full'}`}>
            <h1 className="text-3xl font-extrabold text-foreground mb-2">Hillary Koros</h1>

            <div className="h-8 mb-5 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentTitleIndex}
                  className="text-lg text-primary font-semibold"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {professionalTitles[currentTitleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            <motion.button
              className="bg-foreground text-background text-lg font-bold py-4 px-8 rounded-xl mb-5 hover:opacity-90 transition-all shadow-lg"
              onClick={() => window.open("https://drive.google.com/file/d/191QzSUJbrNyoMm7ISvMVnwlzWGD0av1P/view", "_blank")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {motto}
            </motion.button>

            <div className="flex items-center justify-center gap-5">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500"></span>
                </span>
                <span className="text-base font-medium text-muted-foreground">Available</span>
              </div>
              <div className="flex gap-3">
                <motion.a
                  href="mailto:koroshillary12@gmail.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ scale: 1.2 }}
                  aria-label="Email"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </motion.a>
                <motion.a
                  href="https://wa.me/254719588603"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ scale: 1.2 }}
                  aria-label="WhatsApp"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                  </svg>
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        <motion.button
          className="w-full flex items-center justify-center py-4 mt-6 text-base font-bold text-muted-foreground bg-secondary/50 rounded-xl hover:bg-secondary transition-colors"
          onClick={toggleSidebar}
          whileTap={{ scale: 0.98 }}
        >
          <span>{isExpanded ? 'Less Info' : 'More Info'}</span>
          <svg
            className={`h-5 w-5 ml-2 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
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
              className="mt-8 pt-8 border-t-2 border-border"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-secondary">
                    <svg className="h-7 w-7 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-base text-muted-foreground">Age</p>
                    <p className="text-xl font-bold">{age} years old</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-secondary">
                    <svg className="h-7 w-7 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-base text-muted-foreground">Location</p>
                    <address className="text-xl font-bold not-italic">Nairobi, Kenya</address>
                  </div>
                </div>

                <div className="pt-6 flex justify-center gap-4">
                  {[
                    { href: "https://wa.me/254719588603", label: "WhatsApp", icon: "M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" },
                    { href: "https://www.linkedin.com/in/hillarykoros", label: "LinkedIn", icon: "M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" },
                    { href: "https://github.com/HillaryKoros", label: "GitHub", icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" },
                    { href: "https://www.youtube.com/channel/UCBAQumFhQFt8Ty0bus5rSNg", label: "YouTube", icon: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="w-14 h-14 flex items-center justify-center rounded-xl bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                      aria-label={social.label}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d={social.icon} />
                      </svg>
                    </motion.a>
                  ))}
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
