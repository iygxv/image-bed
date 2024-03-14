import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), 
    },
  },
  server: {
    // 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0" 也可设置成你的ip地址
    host: '0.0.0.0',
    open: true,
    https: false,
    cors: true,
    proxy: {
      '/api': {
        // target: 'http://127.0.0.1:3000',
        target: 'http://43.139.47.204:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: 'imageBed',
    assetsDir: 'imageBed/assets'
  }
})
