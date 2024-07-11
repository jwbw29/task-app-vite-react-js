import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react({ jsxRuntime: "automatic" })],
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@lib/utils": path.resolve(__dirname, "./src/lib/utils"),
      "@": path.resolve(__dirname, "./src"), // Optional: alias for general imports from the src directory
    },
  },
});
