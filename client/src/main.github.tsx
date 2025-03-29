import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.github';
import './index.css';
import { ThemeProvider } from './lib/themeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client for GitHub Pages (without API connections)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

// Additional diagnostics for GitHub Pages deployment
console.log('GitHub Pages version loading');

// Add a global error handler specifically for GitHub Pages
window.addEventListener('error', (event) => {
  console.error('Uncaught error:', event.error);
  
  // Create error notification element if not in production
  if (import.meta.env.DEV) {
    const errorElement = document.createElement('div');
    errorElement.style.position = 'fixed';
    errorElement.style.top = '10px';
    errorElement.style.right = '10px';
    errorElement.style.backgroundColor = '#f44336';
    errorElement.style.color = 'white';
    errorElement.style.padding = '10px';
    errorElement.style.borderRadius = '4px';
    errorElement.style.zIndex = '9999';
    errorElement.textContent = `Error: ${event.error?.message || 'Unknown error'}`;
    document.body.appendChild(errorElement);
    
    // Remove after 5 seconds
    setTimeout(() => {
      errorElement.remove();
    }, 5000);
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
);