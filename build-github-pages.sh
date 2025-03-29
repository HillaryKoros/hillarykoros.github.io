#!/bin/bash

# Script to build the React application for GitHub Pages deployment
echo "Building React application for GitHub Pages deployment..."

# Create the docs directory if it doesn't exist
mkdir -p docs

# Ensure .nojekyll file exists to prevent GitHub from ignoring files that begin with underscores
touch docs/.nojekyll

# Run the build command using the GitHub Pages specific config
echo "Running Vite build..."
npx vite build --config vite.config.github.ts

# Add diagnostic tools for MIME type testing
echo "Adding diagnostic tools..."
cp public/mime-test.js docs/
cp public/loading-check.js docs/
cp public/redirect-404.js docs/

# Copy the optimized script.js to docs for use in the live site
echo "Copying optimized script.js..."
cp attached_assets/script.js docs/

# Verify build output
echo "Verifying built files..."
if [ -f "docs/index.html" ]; then
  echo "✅ Build successful! Generated docs/index.html"
  
  # Count JS files
  JS_COUNT=$(find docs -name "*.js" | wc -l)
  echo "✅ Generated $JS_COUNT JavaScript files"
  
  # Count CSS files
  CSS_COUNT=$(find docs -name "*.css" | wc -l)
  echo "✅ Generated $CSS_COUNT CSS files"
else
  echo "❌ Build failed! docs/index.html not found"
  exit 1
fi

echo "✅ GitHub Pages build complete"
echo "You can deploy this by pushing the 'docs' folder to your GitHub repository"

# Create the .nojekyll file (important for GitHub Pages)
touch docs/.nojekyll
echo ".nojekyll file created."

# Create .htaccess file for MIME type configuration
echo "Creating .htaccess file..."
cat > docs/.htaccess << 'EOL'
# Ensure proper MIME types for JavaScript and CSS files
AddType application/javascript .js
AddType text/css .css

# Handle SPA routing
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
EOL
echo ".htaccess file created."

# Create web.config file for IIS servers
echo "Creating web.config file..."
cat > docs/web.config << 'EOL'
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <staticContent>
      <remove fileExtension=".js" />
      <mimeMap fileExtension=".js" mimeType="application/javascript" />
    </staticContent>
    <rewrite>
      <rules>
        <rule name="SPA Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
EOL
echo "web.config file created."

# Create diagnostic scripts
echo "Creating diagnostic scripts..."

# Create mime-test.js
cat > docs/mime-test.js << 'EOL'
// This script tests if JavaScript files are being served with the correct MIME type
console.log('MIME test script loaded successfully!');

function testMimeType() {
  const result = document.getElementById('mime-test-result');
  if (result) {
    result.innerHTML = 'JavaScript MIME type is working correctly!';
    result.style.color = 'green';
  }
}

// Run the test when the script loads
window.addEventListener('DOMContentLoaded', function() {
  testMimeType();
});
EOL

# Create redirect-404.js
cat > docs/redirect-404.js << 'EOL'
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
EOL

# Create loading-check.js
cat > docs/loading-check.js << 'EOL'
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
EOL

# Create a fallback.html for backup
echo "Creating fallback.html..."
cat > docs/fallback.html << 'EOL'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio Fallback Page</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    header {
      text-align: center;
      margin-bottom: 40px;
    }
    h1 {
      color: #2c3e50;
    }
    section {
      margin-bottom: 30px;
    }
    h2 {
      color: #3498db;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
    }
    .contact {
      background-color: #f8f9fa;
      padding: 20px;
      border-radius: 5px;
    }
    .button {
      display: inline-block;
      background-color: #3498db;
      color: white;
      padding: 10px 15px;
      text-decoration: none;
      border-radius: 4px;
      margin-top: 10px;
    }
    .diagnostic {
      background-color: #f0f0f0;
      padding: 15px;
      border-radius: 5px;
      margin-top: 40px;
    }
    .test-result {
      margin-top: 10px;
      padding: 10px;
      background-color: #e8e8e8;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <header>
    <h1>Portfolio - Fallback Page</h1>
    <p>If you're seeing this page, the main application might be experiencing issues.</p>
  </header>

  <section>
    <h2>About Me</h2>
    <p>I am a GIS and mapping specialist with expertise in PostgreSQL spatial databases, QGIS, and ArcGIS. My work focuses on creating meaningful visualizations and analyses from spatial data.</p>
  </section>

  <section>
    <h2>Projects</h2>
    <p>My portfolio includes various GIS and mapping projects, interactive data visualizations, and spatial database implementations.</p>
  </section>

  <section class="contact">
    <h2>Contact</h2>
    <p>Feel free to reach out if you'd like to discuss a project or opportunity.</p>
    <p>Email: koroshillary12@gmail.com</p>
    <a href="mailto:koroshillary12@gmail.com" class="button">Contact Me</a>
  </section>

  <section class="diagnostic">
    <h2>Diagnostic Information</h2>
    <p>The following tests can help diagnose why the main application isn't loading:</p>
    
    <h3>MIME Type Test</h3>
    <div id="mime-test-result" class="test-result">Running test...</div>
    
    <h3>Routing Test</h3>
    <div id="routing-test-result" class="test-result">Running test...</div>
    
    <h3>Loading Performance</h3>
    <div id="loading-test-result" class="test-result">Running test...</div>
  </section>

  <script src="mime-test.js"></script>
  <script src="redirect-404.js"></script>
  <script src="loading-check.js"></script>
</body>
</html>
EOL

echo "Build completed successfully! Your site is ready in the 'docs' folder."
echo "To deploy to GitHub Pages:"
echo "1. Push the entire repository to GitHub"
echo "2. Go to repository Settings > Pages"
echo "3. Select the 'main' branch and '/docs' folder"
echo "4. Click Save"