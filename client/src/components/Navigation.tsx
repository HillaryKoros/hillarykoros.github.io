import React, { useEffect, useState } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface NavigationProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activePage, onNavigate }) => {
  const navItems = [
    { name: 'About',    key: 'about'    },
    { name: 'Projects', key: 'projects' },
    { name: 'Contact',  key: 'contact'  }
  ];

  const [theme, setTheme] = useState<'light' | 'dark'>(
    () => document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try { localStorage.setItem('theme', theme); } catch { /* ignore */ }
    window.dispatchEvent(new CustomEvent('theme-change', { detail: theme }));
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  return (
    <motion.nav
      className="mb-8 sticky top-0 z-30
                 bg-background/70 supports-[backdrop-filter]:bg-background/55
                 backdrop-blur-md backdrop-saturate-150
                 border-b border-border/60
                 py-3"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex justify-between items-center gap-4">
        {/* Page tabs with morphing pill indicator */}
        <LayoutGroup id="nav-pill">
          <ul className="relative flex gap-1 p-1 rounded-xl bg-secondary/40 border border-border/40">
            {navItems.map((item) => {
              const isActive = activePage === item.key;
              return (
                <li key={item.key}>
                  <button
                    onClick={() => onNavigate(item.key)}
                    className={`relative px-4 py-1.5 text-sm font-semibold rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {/* The sliding pill — single element shared across tabs */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary via-primary to-primary/80 shadow-md shadow-primary/30 ring-1 ring-primary/30"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </LayoutGroup>

        <div className="flex items-center gap-2">
          {/* Theme toggle — sun/moon */}
          <motion.button
            onClick={toggleTheme}
            whileTap={{ scale: 0.92, rotate: -8 }}
            whileHover={{ y: -1 }}
            className="relative w-9 h-9 flex items-center justify-center rounded-lg
                       bg-secondary/40 border border-border/40
                       text-muted-foreground hover:text-foreground
                       hover:border-amber-500/40 hover:bg-amber-500/10
                       transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <motion.span
              key={theme}
              initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex"
            >
              {theme === 'dark'
                ? <Sun  className="w-4 h-4" strokeWidth={2.2} />
                : <Moon className="w-4 h-4" strokeWidth={2.2} />}
            </motion.span>
          </motion.button>

          {/* Availability badge — glass pill */}
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1
                          text-base font-mono font-bold uppercase tracking-[0.14em]
                          text-emerald-700 dark:text-emerald-400
                          bg-emerald-500/10 border border-emerald-500/30 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Available
          </span>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
