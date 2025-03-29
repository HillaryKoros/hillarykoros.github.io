import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import Sidebar from "./components/Sidebar";
import Navigation from "./components/Navigation";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
import { motion } from "framer-motion";

function App() {
  const [activePage, setActivePage] = useState("about");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {    
    // Simulate loading for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleNavigation = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-background text-foreground flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-display font-semibold mb-4 text-gradient"
          >
            Hillary Koros
          </motion.div>
          <motion.div 
            className="w-24 h-1 bg-accent rounded-full mb-8"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatType: "loop" 
            }}
          >
            <div className="w-3 h-3 rounded-full bg-accent" />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="font-display bg-background text-foreground transition-colors duration-300">
        {/* Theme Toggle - now in the Navigation component */}
        
        <div className="container mx-auto px-2 sm:px-4 py-4 md:py-8 lg:py-12 flex flex-col lg:flex-row gap-4 md:gap-8 max-w-[1400px]">
          <Sidebar />
          
          <main className="flex-1 w-full overflow-x-hidden">
            <Navigation activePage={activePage} onNavigate={handleNavigation} />
            
            <motion.div
              className="relative min-h-[70vh]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {activePage === "about" && <AboutPage />}
              {activePage === "projects" && <ProjectsPage />}
              {activePage === "contact" && <ContactPage />}
            </motion.div>
            
            <footer className="mt-16 py-6 border-t border-neutral-200 dark:border-neutral-800 text-center text-sm text-neutral-600 dark:text-neutral-400">
              <p>
                © {new Date().getFullYear()} Hillary Koros. All rights reserved.
                <motion.span 
                  className="inline-block ml-2"
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 5 }}
                >
                  ❤️
                </motion.span>
              </p>
            </footer>
          </main>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
