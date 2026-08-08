import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      output: {
        // Split the heavy third-party libraries out of the main chunk so a
        // first-time visitor is not downloading Firebase, the Lottie renderer
        // and SweetAlert before the homepage can paint. They cache
        // independently of application code too, so a deploy does not
        // invalidate them.
        advancedChunks: {
          groups: [
            { name: 'firebase', test: /node_modules[\\/]@?firebase/ },
            { name: 'lottie', test: /node_modules[\\/](lottie-web|lottie-react)/ },
            { name: 'vendor-ui', test: /node_modules[\\/](sweetalert2|aos|react-icons)/ },
            { name: 'react-vendor', test: /node_modules[\\/](react|react-dom|react-router)[\\/]/ },
          ],
        },
      },
    },
  },
})
