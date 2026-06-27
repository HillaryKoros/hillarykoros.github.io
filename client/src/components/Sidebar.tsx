import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Mail, MessageCircle, ExternalLink, ChevronDown } from 'lucide-react';
import { FaGithub, FaLinkedin, FaYoutube, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';
import { humanLanguages } from '../data/skills';

const Sidebar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const titleChangeInterval = useRef<NodeJS.Timeout | null>(null);

  const professionalTitles = [
    'GIS Researcher & Engineer',
    'AI/ML for Hydroclimatic Forecasting',
    'Flood Hydroinformatics',
    'Earth Observation · Early Warning',
    'Cloud-Native & DevOps',
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    titleChangeInterval.current = setInterval(() => {
      setCurrentTitleIndex(i => (i + 1) % professionalTitles.length);
    }, 4500); // slower so it's actually readable

    return () => {
      if (titleChangeInterval.current) clearInterval(titleChangeInterval.current);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const socials = [
    { label: 'Email',    href: 'mailto:koroshillary12@gmail.com',          Icon: Mail,         hover: 'hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400'         },
    { label: 'WhatsApp', href: 'https://wa.me/254719588603',               Icon: FaWhatsapp,   hover: 'hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400' },
    { label: 'GitHub',   href: 'https://github.com/HillaryKoros',          Icon: FaGithub,     hover: 'hover:border-foreground/50 hover:bg-foreground/5 hover:text-foreground'                                  },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/hillarykoros',     Icon: FaLinkedin,   hover: 'hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400'              },
    { label: 'X',        href: 'https://x.com/Hill_Koros',                 Icon: FaXTwitter,   hover: 'hover:border-foreground/50 hover:bg-foreground/5 hover:text-foreground'                                  },
    { label: 'YouTube',  href: 'https://www.youtube.com/channel/UCBAQumFhQFt8Ty0bus5rSNg', Icon: FaYoutube, hover: 'hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400' },
  ];

  return (
    <motion.aside
      className={`lg:w-[320px] lg:flex-shrink-0 lg:sticky lg:top-8 lg:self-start ${isMobile ? 'mb-6' : ''}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="group relative overflow-hidden rounded-3xl border border-border/70
                   bg-card/70 supports-[backdrop-filter]:bg-card/50 backdrop-blur-md backdrop-saturate-150
                   shadow-lg p-6
                   transition-[border-color,box-shadow,background-color] duration-300
                   hover:border-border hover:bg-card/90 hover:shadow-xl"
      >
        {/* sweep accent across the top */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0
                     bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600
                     transition-transform duration-500 ease-out
                     group-hover:scale-x-100"
        />

        {/* Avatar + name */}
        <div className={`relative flex ${isMobile ? 'flex-row items-center' : 'flex-col items-center text-center'}`}>
          {/* Avatar — single-tone amber ring, more grown-up than the rainbow */}
          <motion.div
            className={`relative ${isMobile ? 'w-20 h-20 mr-4' : 'w-24 h-24 mb-4'}`}
            whileHover={{ scale: 1.04 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          >
            <div
              aria-hidden
              className="absolute -inset-0.5 rounded-full bg-amber-500/40 blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500"
            />
            <div className="relative rounded-full p-[2px] bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 shadow-md">
              <div className="rounded-full overflow-hidden bg-card">
                <img
                  src="/assets/avatar.jpg"
                  alt="Hillary Koros"
                  className="w-full h-full object-cover aspect-square"
                />
              </div>
            </div>
          </motion.div>

          <div className={`${isMobile ? 'text-left' : 'w-full'} min-w-0`}>
            <h1 className="text-xl font-bold text-foreground mb-1 tracking-tight">Hillary Koros</h1>

            <a
              href="https://www.icpac.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold uppercase tracking-[0.18em]
                         text-muted-foreground hover:text-foreground transition-colors
                         border-b border-transparent hover:border-border mb-3"
            >
              ICPAC · GIS Researcher
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>

            {/* Title carousel — slower so it can actually be read */}
            <div className="h-5 mb-3 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentTitleIndex}
                  className="text-[13px] font-medium text-primary text-center px-2 leading-tight truncate"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {professionalTitles[currentTitleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Combined status line: Available + Location */}
            <div className="flex items-center justify-center gap-2 flex-wrap mb-4">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Available
                </span>
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                <MapPin className="w-3 h-3" strokeWidth={2.4} />
                Nairobi, KE
              </span>
            </div>
          </div>
        </div>

        {/* Primary CTA — Quick message (Download CV lives in the Hero now) */}
        <a
          href="mailto:koroshillary12@gmail.com"
          className="flex items-center justify-center gap-2 w-full py-2.5
                     text-[12.5px] font-mono font-semibold rounded-lg
                     border border-border/70 bg-secondary/30 text-foreground
                     hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-700 dark:hover:text-amber-400
                     transition-colors duration-200"
        >
          <MessageCircle className="w-4 h-4" />
          Send a message
        </a>

        {/* More toggle (kept for Languages + Socials) */}
        <button
          onClick={() => setIsExpanded(p => !p)}
          className="w-full mt-4 flex items-center justify-center gap-1.5 py-1.5
                     text-[10px] font-mono font-bold uppercase tracking-[0.14em]
                     text-muted-foreground hover:text-foreground transition-colors"
        >
          {isExpanded ? 'Less' : 'More'}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} strokeWidth={2.5} />
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-3 mt-3 border-t border-border/40 space-y-4">
                {/* Languages */}
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] font-mono font-semibold text-muted-foreground mb-2">
                    Languages
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {humanLanguages.map(lang => (
                      <span
                        key={lang.code}
                        title={lang.label}
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md
                                   text-[11px] font-mono font-medium
                                   border border-border/50 bg-secondary/40 text-foreground/85"
                      >
                        <span className="text-amber-600 dark:text-amber-400 font-bold">{lang.code}</span>
                        <span className="text-muted-foreground">{lang.name}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Socials */}
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] font-mono font-semibold text-muted-foreground mb-2">
                    Around the web
                  </p>
                  <div className="grid grid-cols-6 gap-1.5">
                    {socials.map(s => {
                      const Icon = s.Icon;
                      return (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.label}
                          title={s.label}
                          className={`flex items-center justify-center h-9 rounded-lg
                                      bg-secondary/40 border border-border/40 text-muted-foreground
                                      transition-colors duration-200 ${s.hover}`}
                        >
                          <Icon className="w-4 h-4" />
                        </a>
                      );
                    })}
                  </div>
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
