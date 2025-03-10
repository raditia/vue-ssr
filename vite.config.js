import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [vue()],
  ssr: {},
  legacy: {
    buildSsrCjsExternalHeuristics: true
  },
  build: {
    outDir: 'dist/client',
    ssrManifest: true,
    assetsDir: 'static',
    sourcemap: true,
    modulePreload: false,
    cssCodeSplit: false,
    ssrEmitAssets: true,
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name].[hash].js',
        entryFileNames: chunkInfo => {
          if (chunkInfo.name === 'entry-server') {
            return 'static/js/[name].js'
          }
          return 'static/[name].js'
        },
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
            return 'static/img/[name].[hash][extname]'
          }
          if (/\.css$/.test(name ?? '')) {
            if (name === 'style.css') return 'static/index[extname]'
            // if(name === 'index.css') return 'static/index[extname]'
            return 'static/[name].[hash][extname]'
          }
          if (/\.(ttf|woff2)$/.test(name ?? '')) {
            return 'static/fonts/[name]-[hash][extname]'
          }
          // default value
          // ref: https://rollupjs.org/guide/en/#outputassetfilenames
          return 'static/[name].[hash][extname]'
        }
      }
    }
  }
})
