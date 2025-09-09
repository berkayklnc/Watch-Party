import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@helpers": path.resolve(__dirname, "src/helpers"),
      "@app": path.resolve(__dirname, "src/app"),
      "@routes": path.resolve(__dirname, "src/app/routes"),
    },
  },
});
