# Hillary Koros - GIS & Mapping Portfolio

A dynamic React portfolio website showcasing GIS and mapping projects with interactive features.

![Portfolio Preview](attached_assets/Screenshot%20From%202025-03-27%2022-01-51_1743102126777.png)

## Overview

This portfolio is built with modern web technologies:

- React for UI components
- Vite for fast building and development
- TypeScript for type safety
- Tailwind CSS for styling
- GitHub Pages for deployment

The portfolio highlights expertise in GIS and mapping technologies, including PostgreSQL spatial databases, QGIS, and ArcGIS.

## Quick Start for GitHub Pages Deployment

1. Clone or download this project
2. Install dependencies:

```bash
npm install
```

3. Run the GitHub Pages build script:

```bash
chmod +x build-github-pages.sh
./build-github-pages.sh
```

4. The `docs/` folder will contain your deployable website

## GitHub Pages Setup

1. Push your code to GitHub:

```bash
git init
git add .
git commit -m "Deploy portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

2. Go to your GitHub repository settings
3. Navigate to the Pages section
4. Select the `main` branch and `/docs` folder
5. Click Save

Your site will be available at: `https://YOUR-USERNAME.github.io/YOUR-REPO`

## Features

- Interactive project showcase with filtering
- Responsive design for all devices
- Dark/light theme toggle
- Animated UI elements with smooth transitions
- Contact form with email integration
- Detailed project descriptions and technologies
- Skills visualization with progress bars
- Automatic deployment to GitHub Pages

## Local Development

Run the development server:

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to view the site.

## Troubleshooting MIME Type Issues

If you encounter MIME type errors in the browser console:

1. Ensure the `.nojekyll` file exists in the docs folder
2. Use the diagnostic tools:
   - `docs/mime-test.js` - Tests if JavaScript files load correctly
   - `docs/loading-check.js` - Monitors resource loading performance
   - `docs/redirect-404.js` - Helps with SPA routing on GitHub Pages
3. Check browser console for specific error messages

For detailed troubleshooting instructions, see [DEPLOY.md](DEPLOY.md).

## Project Structure

- `client/` - Frontend React application
  - `src/components/` - UI components
  - `src/pages/` - Page components
  - `src/data/` - Content data
  - `src/hooks/` - Custom React hooks
  - `src/lib/` - Utility functions
- `public/` - Static assets
- `attached_assets/` - Images and media files
- `docs/` - Build output for GitHub Pages deployment
- `build-github-pages.sh` - GitHub Pages deployment script
- `DEPLOY.md` - Detailed deployment instructions

## Customization

To update content:

1. Modify data files in `client/src/data/` directory
2. Update profile information in `client/src/pages/AboutPage.tsx`
3. Add project details in `client/src/data/projects.ts`
4. Change skills in `client/src/data/skills.ts`
5. Rebuild using the GitHub Pages script

## Resources

- [Full Deployment Guide](DEPLOY.md)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)