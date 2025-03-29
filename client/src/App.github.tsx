import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'wouter';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import { useTheme } from './lib/themeContext';
import { useIsMobile } from './hooks/use-mobile';
import NotFound from './pages/not-found';

function App() {
  const [activePage, setActivePage] = useState('about');
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading resources for GitHub Pages deployment
    const timer = setTimeout(() => {
      setIsLoading(false);
      console.log('App loaded successfully');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Function to handle navigation and update active state
  const handleNavigate = (page: string) => {
    setActivePage(page);
    window.scrollTo(0, 0);
  };

  // Show loading screen while initializing
  if (isLoading) {
    return (
      <div className={`flex h-screen items-center justify-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Hillary Koros</h1>
          <p className="text-xl mb-6">GIS & Mapping Specialist</p>
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {isMobile ? (
        <Navigation activePage={activePage} onNavigate={handleNavigate} />
      ) : (
        <Sidebar activePage={activePage} onNavigate={handleNavigate} />
      )}

      <main className={`${isMobile ? 'pt-16' : 'md:ml-64'} min-h-screen`}>
        <Switch>
          <Route path="/" component={() => <AboutPage />} />
          <Route path="/projects" component={() => <ProjectsPage />} />
          <Route path="/contact" component={() => <ContactPage />} />
          <Route component={NotFound} />
        </Switch>
      </main>

      {/* GitHub Pages detection message - only shown in development */}
      {import.meta.env.DEV && (
        <div className="fixed bottom-2 right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded opacity-75">
          GitHub Pages Build
        </div>
      )}
    </div>
  );
}

export default App;