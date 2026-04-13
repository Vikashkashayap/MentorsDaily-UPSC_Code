import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
    'process.env': {},
  },
  resolve: {
    // draft-js / react-draft-wysiwyg must share the same React instance as the app
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: ['react-draft-wysiwyg', 'draft-js'],
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
    modulePreload: {
      polyfill: false,
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Keep draft-js + wysiwyg in the same chunk as React. Splitting them into
            // vendor-editor creates a circular chunk graph (react chunk ↔ editor chunk)
            // and runtime "Cannot set properties of undefined (setting 'Children')".
            if (
              id.includes('react-dom') ||
              id.includes('/react/') ||
              id.includes('draft-js') ||
              id.includes('react-draft-wysiwyg')
            ) {
              return 'vendor-react';
            }
            if (id.includes('react-router')) return 'vendor-router';
            if (id.includes('lucide-react')) return 'vendor-icons';
          }
          return undefined;
        },
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
