import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@Shared": resolve(__dirname, "../Shared"),
    },
    extensions: [".ts", ".tsx", "json", ".js"],
  },

  server: {
    port: 3000,
    open: true,
    cors: true,
  }
});
