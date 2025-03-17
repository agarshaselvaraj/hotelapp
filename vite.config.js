
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // Increase limit or optimize code splitting
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"; // Moves dependencies to a separate chunk
          }
        },
      },
    },
  },
});
