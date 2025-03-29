#!/bin/bash

# Simple script for GitHub Pages deployment
echo "Creating a simple GitHub Pages deployment..."

# Create the docs directory if it doesn't exist
mkdir -p docs

# Copy the simple portfolio HTML file to the docs directory
cp public/simple-portfolio.html docs/index.html
echo "Copied simple portfolio to docs/index.html"

# Create the .nojekyll file (important for GitHub Pages)
touch docs/.nojekyll
echo ".nojekyll file created"

# Create a simple README file in the docs directory
cat > docs/README.md << 'EOL'
# Hillary Koros - GIS & Mapping Portfolio

This is a simple portfolio website showcasing GIS and mapping projects.
EOL
echo "README.md created"

# Copy any images from attached_assets to docs
mkdir -p docs/images
cp attached_assets/*.png docs/images/ 2>/dev/null || true
cp attached_assets/*.jpg docs/images/ 2>/dev/null || true
echo "Images copied to docs/images/ folder"

# Create a simple MIME type test file
cat > docs/mime-test.js << 'EOL'
// This script tests if JavaScript files are being served with the correct MIME type
console.log('MIME test script loaded successfully!');
EOL
echo "mime-test.js created"

# Print success message
echo ""
echo "✅ Deployment files created successfully in the 'docs' folder!"
echo ""
echo "To deploy to GitHub Pages:"
echo "1. Push this repository to GitHub"
echo "2. Go to repository Settings > Pages"
echo "3. Select the 'main' branch and '/docs' folder"
echo "4. Click Save"
echo ""
echo "Your site will be available at: https://YOUR-USERNAME.github.io/YOUR-REPO"