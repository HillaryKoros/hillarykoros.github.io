import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, 'docs');

import { allRoutes, canonicalUrl, documentTitle } from './client/src/data/routes';

/**
 * Pre-render one real HTML file per route.
 *
 * GitHub Pages has no server-side rewrite. The usual workaround is to publish
 * index.html as 404.html so unknown paths still boot the app — that works for
 * a visitor, but Pages serves it with a 404 status, so every page except the
 * home page is uncrawlable and every one of them carries the home page's
 * title and canonical URL. Measured on the live site: / returned 200 while
 * /work, /writing, /contact and all eight project pages returned 404.
 *
 * Writing docs/work/index.html and friends makes each route a real 200 with
 * its own title, description and canonical baked into the markup, so the tags
 * `useSeo` sets at runtime are the same ones a crawler sees without running
 * any JavaScript. 404.html stays as the fallback for genuinely unknown paths.
 */
function prerenderRoutes(): Plugin {
  const esc = (v: string) =>
    v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

  return {
    name: 'prerender-routes',
    apply: 'build',
    closeBundle() {
      const shell = readFileSync(path.join(outDir, 'index.html'), 'utf8');

      for (const route of allRoutes) {
        const title = esc(documentTitle(route));
        const description = esc(route.description);
        const canonical = canonicalUrl(route.path);

        const html = shell
          .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
          .replace(/(<meta name="description" content=")[\s\S]*?(")/, `$1${description}$2`)
          .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${canonical}$2`)
          .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${canonical}$2`)
          .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`)
          .replace(/(<meta property="og:description" content=")[\s\S]*?(")/, `$1${description}$2`)
          .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${title}$2`)
          .replace(/(<meta name="twitter:description" content=")[\s\S]*?(")/, `$1${description}$2`);

        const dir = route.path === '/' ? outDir : path.join(outDir, route.path);
        mkdirSync(dir, { recursive: true });
        writeFileSync(path.join(dir, 'index.html'), html);
      }

      // Fallback for paths that match no route at all.
      copyFileSync(path.join(outDir, 'index.html'), path.join(outDir, '404.html'));
      writeFileSync(path.join(outDir, '.nojekyll'), '');

      console.log(`\n  pre-rendered ${allRoutes.length} routes\n`);
    },
  };
}

export default defineConfig({
  plugins: [react(), prerenderRoutes()],
  base: '/',
  resolve: {
    alias: { '@': path.resolve(__dirname, 'client', 'src') },
  },
  root: path.resolve(__dirname, 'client'),
  server: { host: true },
  build: {
    outDir,
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        // Split the two libraries that dominate the bundle so the shell can
        // paint before the animation runtime has finished parsing.
        manualChunks(id) {
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/motion-dom')) {
            return 'motion';
          }
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) {
            return 'react';
          }
          return undefined;
        },
      },
    },
  },
});
