import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "" /*/Budget_Web-Application/*/,
  build: {
    chunkSizeWarningLimit: 1000, // 1000 KB
  },
});
