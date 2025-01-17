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
    host: "0.0.0.0",
    port: 5173,
  },
  watch: {
    usePolling: true,
  },
});
