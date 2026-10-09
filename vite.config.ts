import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { copyFileSync, writeFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, 'docs');

/**
 * GitHub Pages has no server-side rewrite, so a deep link like /work/lis-bomet
 * would 404. Pages does serve 404.html for unmatched paths, so we publish a
 * byte-identical copy of the built index.html under that name and let the
 * client router take over. `.nojekyll` stops Pages from eating /assets.
 */
function githubPagesSpaFallback(): Plugin {
  return {
    name: 'gh-pages-spa-fallback',
    apply: 'build',
    closeBundle() {
      copyFileSync(path.join(outDir, 'index.html'), path.join(outDir, '404.html'));
      writeFileSync(path.join(outDir, '.nojekyll'), '');
    },
  };
}

export default defineConfig({
  plugins: [react(), githubPagesSpaFallback()],
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
