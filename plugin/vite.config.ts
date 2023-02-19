import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [preact()],
  server: {
    host: "0.0.0.0",
    port: 8101,
    strictPort: true,
    open: false,
  },
  optimizeDeps: {
    include: ["classnames"],
  },
});
