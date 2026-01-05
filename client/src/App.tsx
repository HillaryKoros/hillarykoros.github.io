import { useState, useEffect } from "react";
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
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigation = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="text-2xl font-semibold text-foreground mb-2">Hillary Koros</div>
          <div className="w-8 h-1 bg-primary rounded-full mx-auto" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-20 py-6 lg:py-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <Navigation activePage={activePage} onNavigate={handleNavigation} />

            <motion.div
              key={activePage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {activePage === "about" && <AboutPage />}
              {activePage === "projects" && <ProjectsPage />}
              {activePage === "contact" && <ContactPage />}
            </motion.div>

            <footer className="mt-16 pt-8 border-t-2 border-border text-center">
              <p className="text-base text-muted-foreground">© {new Date().getFullYear()} Hillary Koros. All rights reserved.</p>
            </footer>
          </main>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
