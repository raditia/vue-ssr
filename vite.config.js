import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  ssr: {
    external: ['vue', 'vue-router', '@gtm-support/vue-gtm']
  }
})
