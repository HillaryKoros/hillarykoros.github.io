// This script monitors resource loading performance
console.log('Loading check script running...');

window.addEventListener('DOMContentLoaded', function() {
  // Calculate performance metrics
  const resources = performance.getEntriesByType('resource');
  
  function averageLoadTime(resources) {
    if (resources.length === 0) return 0;
    
    const total = resources.reduce((sum, resource) => sum + resource.duration, 0);
    return total / resources.length;
  }
  
  const jsResources = resources.filter(r => r.name.endsWith('.js'));
  const cssResources = resources.filter(r => r.name.endsWith('.css'));
  const imageResources = resources.filter(r => 
    r.name.endsWith('.png') || 
    r.name.endsWith('.jpg') || 
    r.name.endsWith('.jpeg') || 
    r.name.endsWith('.gif') || 
    r.name.endsWith('.svg')
  );
  
  const metrics = {
    totalResources: resources.length,
    jsFiles: jsResources.length,
    cssFiles: cssResources.length,
    imageFiles: imageResources.length,
    avgLoadTime: averageLoadTime(resources).toFixed(2) + 'ms',
    avgJsLoadTime: averageLoadTime(jsResources).toFixed(2) + 'ms',
    avgCssLoadTime: averageLoadTime(cssResources).toFixed(2) + 'ms',
    avgImageLoadTime: averageLoadTime(imageResources).toFixed(2) + 'ms',
    totalLoadTime: performance.now().toFixed(2) + 'ms'
  };
  
  console.table(metrics);
  
  // Update the UI if the element exists
  const result = document.getElementById('loading-test-result');
  if (result) {
    result.innerHTML = `
      <h3>Resource Loading Performance:</h3>
      <ul>
        <li>Total resources: ${metrics.totalResources}</li>
        <li>JS files: ${metrics.jsFiles}</li>
        <li>CSS files: ${metrics.cssFiles}</li>
        <li>Image files: ${metrics.imageFiles}</li>
        <li>Average load time: ${metrics.avgLoadTime}</li>
        <li>Total load time: ${metrics.totalLoadTime}</li>
      </ul>
    `;
  }
});
