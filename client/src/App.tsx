import { useState, useEffect, useSyncExternalStore } from "react";
import { Toaster } from "@/components/ui/toaster";
import Sidebar from "./components/Sidebar";
import Navigation from "./components/Navigation";
import ParticleNetwork from "./components/ParticleNetwork";
import PortfolioFooter from "./components/PortfolioFooter";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ContactPage from "./pages/ContactPage";
import { motion } from "framer-motion";

// Subscribe to the global `theme-change` event Navigation fires, so the
// particle backdrop can recolour itself live when the user toggles.
const subscribeTheme = (cb: () => void) => {
  window.addEventListener('theme-change', cb);
  return () => window.removeEventListener('theme-change', cb);
};
const getTheme = () => (document.documentElement.classList.contains('dark') ? 'dark' : 'light');

function App() {
  const [activePage, setActivePage] = useState("about");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useSyncExternalStore(subscribeTheme, getTheme, getTheme);
  // Light theme: clean medium blue — matches the brand navy and pops on the warm-grey canvas
  const particleColor = theme === 'dark' ? 'rgb(220, 130, 15)' : 'rgb(37, 99, 180)';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigation = (page: string) => {
    setActivePage(page);
    setSelectedProjectId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToProjects = () => {
    setSelectedProjectId(null);
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

  const renderPage = () => {
    if (activePage === "projects" && selectedProjectId) {
      return (
        <ProjectDetailPage
          projectId={selectedProjectId}
          onBack={handleBackToProjects}
        />
      );
    }

    switch (activePage) {
      case "about":
        return <AboutPage />;
      case "projects":
        return <ProjectsPage onViewProject={handleViewProject} />;
      case "contact":
        return <ContactPage />;
      default:
        return <AboutPage />;
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Page-wide constellation backdrop — colour swaps with theme */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <ParticleNetwork
          key={theme}
          density={65}
          linkDistance={140}
          color={particleColor}
          className="absolute inset-0 w-full h-full opacity-100"
        />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10 xl:px-20 py-6 lg:py-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content — fills available width; column so footer pins to bottom */}
          <main className="flex-1 min-w-0 flex flex-col min-h-[calc(100vh-5rem)]">
            <Navigation activePage={activePage} onNavigate={handleNavigation} />

            <motion.div
              key={`${activePage}-${selectedProjectId || 'list'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex-1"
            >
              {renderPage()}
            </motion.div>

            <PortfolioFooter />
          </main>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
