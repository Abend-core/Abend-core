import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import config from 'config'

const port = config.get("client.port")

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    port: port,
  },
  hmr: {
    protocol: "ws",
    host: "host.docker.internal",
    port: port,
  },
  watch: {
    usePolling: true, // C'est déjà configuré, assure-toi que cette option est activée
    interval: 1000, // Vérifie les fichiers toutes les 1000ms
    binaryInterval: 3000,
  },
});
