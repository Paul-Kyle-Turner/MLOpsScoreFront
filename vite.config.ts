import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  plugins: [react(), tailwindcss(), mkcert()],
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress "use client" directive warnings from react-bootstrap
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE' &&
          warning.message.includes('use client')) {
          return
        }
        warn(warning)
      }
    }
  }
})