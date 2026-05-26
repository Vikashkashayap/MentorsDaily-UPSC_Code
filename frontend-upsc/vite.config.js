import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
    'process.env': {},
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
  build: {
    minify: 'esbuild',
    sourcemap: false,
    cssCodeSplit: true,
    cssMinify: true,
    target: ['es2018', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    reportCompressedSize: true,
    chunkSizeWarningLimit: 600,
    modulePreload: {
      polyfill: false,
    },
    esbuild: {
      drop: ['console', 'debugger'],
      legalComments: 'none',
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined

          if (
            id.includes('recharts') ||
            id.includes('d3-') ||
            id.includes('victory-vendor')
          ) {
            return 'vendor-charts'
          }
          if (id.includes('framer-motion')) return 'vendor-motion'
          if (id.includes('axios')) return 'vendor-http'
          if (id.includes('react-router')) return 'vendor-router'
          if (id.includes('lucide-react')) return 'vendor-icons'
          if (id.includes('react-helmet-async')) return 'vendor-helmet'
          if (id.includes('date-fns')) return 'vendor-dates'

          if (
            id.includes('react-dom') ||
            id.includes('/react/')
          ) {
            return 'vendor-react'
          }

          return undefined
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`
          }
          return `assets/[ext]/[name]-[hash].[ext]`
        },
      },
    },
  },
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    host: true,
    port: Number(process.env.PORT) || 4173,
  },
})
