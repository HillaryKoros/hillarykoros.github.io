import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import Sidebar from "./components/Sidebar";
import Navigation from "./components/Navigation";
import AnimatedBackground from "./components/AnimatedBackground";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ContactPage from "./pages/ContactPage";
import { motion } from "framer-motion";

function App() {
  const [activePage, setActivePage] = useState("about");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      <AnimatedBackground />
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10 xl:px-20 py-6 lg:py-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <Navigation activePage={activePage} onNavigate={handleNavigation} />

            <motion.div
              key={`${activePage}-${selectedProjectId || 'list'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {renderPage()}
            </motion.div>

            <footer className="mt-16 pt-8 border-t border-border">
              <div className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  This site is under constant maintenance and may sometimes become unresponsive.
                </p>
                <p className="text-base text-muted-foreground">
                  © {new Date().getFullYear()} Hillary Koros. All rights reserved.
                </p>
              </div>
            </footer>
          </main>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
