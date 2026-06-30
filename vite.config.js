import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "https://github.com/hitu02-creater/Budget_Web-Application/" /**/,
  build: {
    chunkSizeWarningLimit: 2000, // 1000 KB
  },
});
