import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    preact(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/static")],
      symbolId: "icon-[dir]-[name]",
      inject: "body-last",
      customDomId: "__svg__icons__dom__",
    }),
  ],
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
