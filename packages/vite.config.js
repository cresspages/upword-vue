import { defineConfig } from 'vite'
export default defineConfig({
  build: {
    lib: {
      //入库文件
      entry: "./index.ts",
      //名字
      name: "upword-vue",
      outDir: "dist"
    }
  },
  //如果没有外部依赖可以去掉
  rollupOptions: {
    // 确保外部化处理那些你不想打包进库的依赖
    external: ['vue'],
    output: {
      // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
      globals: {
        vue: 'Vue',
      },
    },
  },
})