import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
    'process.env': {},
  },
  optimizeDeps: {
    include: ['react-draft-wysiwyg', 'draft-js'],
    esbuildOptions: {
      target: 'es2020',
    },
  },
  build: {
    // Optimize chunk splitting to reduce number of chunks
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks - separate large libraries
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'editor-vendor': ['react-draft-wysiwyg', 'draft-js', 'draftjs-to-html', 'html-to-draftjs'],
          'ui-vendor': ['framer-motion', 'lucide-react'],
          'chart-vendor': ['recharts'],
          'seo-vendor': ['react-helmet-async'],
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // Optimize image assets
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          return `assets/[ext]/[name]-[hash].[ext]`;
        },
      },
    },
    // Optimize build performance
    minify: 'esbuild',
    // Reduce sourcemap size for production
    sourcemap: false,
    // Optimize CSS
    cssCodeSplit: true,
    cssMinify: true,
    // Target modern browsers for smaller bundles
    target: ['es2015', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    // Compression
    reportCompressedSize: true,
  },
  server: {
    host: true, // 0.0.0.0
    port: 5173,
  },
  preview: {
    host: true, // 0.0.0.0
    port: Number(process.env.PORT) || 4173,
  },
  
})
