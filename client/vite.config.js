import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    port: 5173,
  },
  hmr: {
    protocol: "ws",
    host: "host.docker.internal",
    port: 5173,
  },
  watch: {
    usePolling: true, // C'est déjà configuré, assure-toi que cette option est activée
    interval: 1000, // Vérifie les fichiers toutes les 1000ms
    binaryInterval: 3000,
  },
});
