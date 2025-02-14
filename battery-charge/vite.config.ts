import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  base: './',
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 8080
  },
  resolve: {
    // 路径别名
    alias: {
      '@': resolve(import.meta.dirname, './src')
    }
  },
  build: {
    sourcemap: false,
    ssrManifest: false,
    manifest: false
  }
})
