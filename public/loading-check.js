// This script will help diagnose MIME type issues on GitHub Pages
(function() {
  console.log('Loading verification script initiated');
  
  // Check if any script failed to load
  document.addEventListener('DOMContentLoaded', function() {
    try {
      // Report any errors with scripts
      const scripts = document.getElementsByTagName('script');
      console.log('Loaded scripts:', scripts.length);
      
      // Set a timeout to check if the app rendered
      setTimeout(function() {
        const appContent = document.querySelector('main');
        if (!appContent || appContent.children.length === 0) {
          console.error('Application did not fully load or render');
          
          // Add a simple recovery button
          const root = document.getElementById('root');
          if (root) {
            const errorMsg = document.createElement('div');
            errorMsg.innerHTML = 'The application is taking longer than expected to load.';
            errorMsg.style.textAlign = 'center';
            errorMsg.style.marginTop = '20px';
            errorMsg.style.color = '#dc2626';
            
            const errorDetails = document.createElement('div');
            errorDetails.innerHTML = 'This might be due to MIME type issues with JavaScript files.';
            errorDetails.style.marginTop = '10px';
            errorDetails.style.fontSize = '14px';
            
            const recoveryBtn = document.createElement('button');
            recoveryBtn.innerText = 'Try Reloading';
            recoveryBtn.style.padding = '10px 20px';
            recoveryBtn.style.margin = '20px auto';
            recoveryBtn.style.display = 'block';
            recoveryBtn.style.backgroundColor = '#3b82f6';
            recoveryBtn.style.color = 'white';
            recoveryBtn.style.border = 'none';
            recoveryBtn.style.borderRadius = '4px';
            recoveryBtn.style.cursor = 'pointer';
            recoveryBtn.onclick = function() { window.location.reload(); };
            
            // Only add if these elements don't already exist
            if (!document.getElementById('error-message') || !document.getElementById('retry-button')) {
              const loadingScreen = document.querySelector('.loading-screen');
              if (loadingScreen) {
                loadingScreen.appendChild(errorMsg);
                loadingScreen.appendChild(errorDetails);
                loadingScreen.appendChild(recoveryBtn);
              } else {
                root.appendChild(errorMsg);
                root.appendChild(errorDetails);
                root.appendChild(recoveryBtn);
              }
            }
          }
        } else {
          console.log('Application appears to have loaded successfully');
        }
      }, 5000);
      
      // Check for JavaScript file MIME type errors
      const scriptElements = Array.from(scripts);
      scriptElements.forEach(script => {
        if (script.src) {
          fetch(script.src)
            .then(response => {
              const contentType = response.headers.get('Content-Type');
              console.log(`Script ${script.src} has Content-Type: ${contentType}`);
              
              if (contentType && !contentType.includes('javascript')) {
                console.error(`Wrong MIME type for ${script.src}: ${contentType}`);
              }
            })
            .catch(error => {
              console.error(`Failed to check MIME type for ${script.src}:`, error);
            });
        }
      });
    } catch (e) {
      console.error('Error in load verification:', e);
    }
  });
})();