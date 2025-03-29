// This file is a MIME type test
// Content-Type: application/javascript

console.log('MIME type test loaded successfully');

// Create a visible indicator that this script loaded
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Create success message
    const message = document.createElement('div');
    message.style.position = 'fixed';
    message.style.top = '10px';
    message.style.right = '10px';
    message.style.padding = '10px 15px';
    message.style.background = '#4ade80';
    message.style.color = 'white';
    message.style.borderRadius = '4px';
    message.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    message.style.zIndex = '9999';
    message.style.fontFamily = 'system-ui, -apple-system, sans-serif';
    message.textContent = 'JavaScript MIME test: SUCCESS';
    
    // Add to document
    document.body.appendChild(message);
    
    // Remove after 5 seconds
    setTimeout(() => {
      message.style.transition = 'opacity 0.5s ease-out';
      message.style.opacity = '0';
      setTimeout(() => message.remove(), 500);
    }, 5000);
  } catch(e) {
    console.error('Error in MIME test script:', e);
  }
});