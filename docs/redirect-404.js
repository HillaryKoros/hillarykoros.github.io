// This script checks for routing and redirect issues
console.log('Redirect/404 test script loaded successfully!');

function diagnoseEnvironment() {
  // Get current URL info
  const url = window.location.href;
  const path = window.location.pathname;
  const host = window.location.host;
  
  // Output to console
  console.log('Current URL:', url);
  console.log('Path:', path);
  console.log('Host:', host);
  
  // Check if we're in a GitHub Pages environment
  const isGitHubPages = host.includes('github.io');
  console.log('Is GitHub Pages:', isGitHubPages);
  
  // Check for 404 page indicators in the DOM
  const is404 = 
    document.title.includes('404') || 
    document.body.innerHTML.includes('404') ||
    document.body.innerHTML.includes('Page not found');
  
  console.log('Shows 404 indicators:', is404);
  
  // Update the UI if the element exists
  const result = document.getElementById('routing-test-result');
  if (result) {
    if (is404) {
      result.innerHTML = 'Routing issue detected. This page is being served as a 404.';
      result.style.color = 'red';
    } else {
      result.innerHTML = 'Routing appears to be working correctly!';
      result.style.color = 'green';
    }
  }
}

// Run the test when the script loads
window.addEventListener('DOMContentLoaded', function() {
  diagnoseEnvironment();
});
