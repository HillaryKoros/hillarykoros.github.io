import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";

// GitHub Pages-specific build configuration
export default defineConfig({
  plugins: [react(), themePlugin()],
  // For username.github.io repos, base should be "/"
  base: "./", // Using relative paths for better compatibility
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "docs"),
    emptyOutDir: true,
    sourcemap: false,
  },
});