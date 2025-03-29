# React Portfolio GitHub Pages Deployment Guide

This guide provides comprehensive instructions for deploying your React Vite portfolio application to GitHub Pages.

## Overview

This deployment process uses a special GitHub Pages build configuration to ensure your React application works correctly when deployed. The build script generates all necessary files in the `docs/` folder with proper configuration for GitHub Pages hosting.

## Quick Setup

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build for GitHub Pages:
   ```bash
   # Makes the script executable first
   chmod +x build-github-pages.sh
   
   # Run the build script
   ./build-github-pages.sh
   ```
4. The `docs/` folder now contains your deployable website

## GitHub Pages Setup

### If you're using a personal repository (username.github.io)

1. Create a repository named exactly `yourusername.github.io`
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio deployment"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
   git push -u origin main
   ```
3. In repository settings:
   - Go to Settings → Pages
   - Set Source to "Deploy from a branch"
   - Select "main" branch and "/" (root) folder
   - Click Save

Your site will be available at: `https://YOUR-USERNAME.github.io`

### If you're using a project repository

1. Create a repository with any name
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio deployment"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```
3. In repository settings:
   - Go to Settings → Pages
   - Set Source to "Deploy from a branch"
   - Select "main" branch and "/docs" folder
   - Click Save

Your site will be available at: `https://YOUR-USERNAME.github.io/YOUR-REPO`

## Troubleshooting MIME Type Errors

If you encounter MIME type errors where JavaScript files are loaded with incorrect content types:

### Key Files for Diagnostics

1. `docs/mime-test.js` - Tests if JavaScript files load correctly
2. `docs/loading-check.js` - Monitors resource loading performance
3. `docs/redirect-404.js` - Helps with SPA routing on GitHub Pages
4. `docs/fallback.html` - Provides a backup if the main app fails to load
5. `docs/script.js` - Optimized script with improved scrolling performance

### Common Solutions

1. Ensure `.nojekyll` file exists in the docs folder (prevents GitHub Pages from ignoring files that begin with underscores)
2. Check that paths in your application are relative (start with `./` not `/`)
3. Verify that the `base` path in `vite.config.github.ts` is set correctly:
   - For username.github.io repos: `base: './`
   - For project repos: `base: './'` or `base: '/your-repo-name/'`
4. If all else fails, open `docs/fallback.html` directly to diagnose the issue

### Additional Suggestions

1. Clear browser cache after deploying
2. Try different browsers to isolate browser-specific issues
3. Check browser console for specific error messages
4. Ensure your custom domain configuration is correct if you're using one

### Fixing Scrolling Issues

If you encounter scrolling issues on the live site:

1. The optimized `script.js` included in the build has improved:
   - Smoother auto-scrolling for tech skills section
   - Better performance for animations triggered by scrolling
   - Proper cleanup of animation intervals and observers
   - Error prevention with null checks for DOM elements
   
2. Common scrolling problems and solutions:
   - If scrolling freezes the page: Reduce animation complexity
   - If animations don't trigger: Check element visibility conditions
   - If performance is slow: Ensure animations use requestAnimationFrame or are throttled

## Updating Your Deployed Site

1. Make changes to your code
2. Run the build script again:
   ```bash
   ./build-github-pages.sh
   ```
3. Commit and push changes:
   ```bash
   git add .
   git commit -m "Update portfolio site"
   git push
   ```
4. Wait a few minutes for GitHub Pages to rebuild your site

## Checking Build Results

After running the build script, you should see:
- The `docs/` folder populated with HTML, CSS, and JavaScript files
- A `docs/.nojekyll` file
- A `docs/index.html` file
- Several JavaScript and CSS files in `docs/assets/`

## Additional Resources

1. [GitHub Pages Documentation](https://docs.github.com/en/pages)
2. [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
3. [React Router and GitHub Pages](https://create-react-app.dev/docs/deployment/#notes-on-client-side-routing)