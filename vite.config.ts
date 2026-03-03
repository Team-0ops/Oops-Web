import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [tailwindcss(), svgr()],
  server: {
    proxy: {
      "/api": {
        target: "http://3.38.162.157:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
