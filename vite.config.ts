import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import $ from "jquery";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
