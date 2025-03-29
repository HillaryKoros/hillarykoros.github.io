// GitHub Pages 404 Redirect Script
// This script is specifically designed to handle client-side routing in GitHub Pages
// It redirects 404s to the index.html file with the correct route information
// Script content type: application/javascript

(function() {
  console.log('404 redirect handler initialized');
  
  // Add diagnostic information
  function diagnoseEnvironment() {
    console.group('Environment Diagnostics');
    console.log('User Agent:', navigator.userAgent);
    console.log('URL:', window.location.href);
    console.log('Document Title:', document.title);
    console.log('Protocol:', window.location.protocol);
    console.log('Hostname:', window.location.hostname);
    console.log('Pathname:', window.location.pathname);
    console.log('Search:', window.location.search);
    console.log('Hash:', window.location.hash);
    console.log('is404Page flag:', window.is404Page);
    console.groupEnd();
  }
  
  try {
    diagnoseEnvironment();
    
    // Get the current path excluding the base
    var segmentCount = 0; // For user sites (username.github.io), no additional segments
    var l = window.location;
    
    // Only redirect if we're on a 404 page
    if (document.title.indexOf('404') !== -1 || window.is404Page === true) {
      // Store the full path in the URL fragment for later redirect
      var cleanPath = l.pathname
        .split('/')
        .slice(segmentCount + 1)
        .join('/')
        .replace(/&/g, '~and~');
      
      // Create the redirect URL: for GitHub Pages user site (username.github.io)
      var redirectTo = l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + segmentCount).join('/') + '/?/' +
        cleanPath +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash;
      
      console.log('Redirecting from 404 to:', redirectTo);
      
      // Display a brief message before redirecting
      if (document.body) {
        var redirectMsg = document.createElement('div');
        redirectMsg.style.position = 'fixed';
        redirectMsg.style.top = '0';
        redirectMsg.style.left = '0';
        redirectMsg.style.width = '100%';
        redirectMsg.style.padding = '10px';
        redirectMsg.style.backgroundColor = '#3b82f6';
        redirectMsg.style.color = 'white';
        redirectMsg.style.textAlign = 'center';
        redirectMsg.style.zIndex = '9999';
        redirectMsg.textContent = 'Redirecting to the correct route...';
        document.body.appendChild(redirectMsg);
      }
      
      // Delay redirect slightly to allow console logs to be visible
      setTimeout(function() {
        try {
          // Create a link element to test MIME handling
          var testLink = document.createElement('a');
          testLink.style.display = 'none';
          testLink.href = redirectTo;
          testLink.innerText = 'Test link for MIME handling';
          document.body.appendChild(testLink);
          
          // Perform the redirect
          window.location.replace(redirectTo);
        } catch (redirectError) {
          console.error('Redirect error:', redirectError);
          
          // Try hash-based fallback if normal redirect fails
          window.location.href = l.origin + '/#/' + cleanPath;
        }
      }, 250);
    } else {
      console.log('Not a 404 page - no redirect needed');
    }
  } catch (e) {
    console.error('Error in 404 redirect script:', e);
    
    // Last resort fallback - just go to homepage
    try {
      window.location.href = '/';
    } catch (fallbackError) {
      console.error('Even fallback redirect failed:', fallbackError);
    }
  }
})();