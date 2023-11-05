import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"; 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // ↓路径别名
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
  server: {
    host: '0.0.0.0'
  },
  build: {
    lib: {
      entry: 'packages/index.ts',
      name: 'upwordVue', // 暴露的全局变量
      fileName: 'upword-vue', // 输出的包文件名，默认package.json的name
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
