import { defineConfig } from 'vite'
// Vue 单文件组件支持插件
import vue from '@vitejs/plugin-vue'
// Tailwind CSS v4 官方 Vite 插件（v4 无需 tailwind.config.js，样式入口在 src/style.css）
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      // 路径别名：@ 指向 src 目录，组件中统一写 '@/components/xxx.vue'
      // 注意：此处与 tsconfig.app.json 的 paths 必须保持一致，否则类型检查会报错
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    // 启动开发服务器时自动打开浏览器
    open: true,
  },
  build: {
    // 生产构建输出目录，静态托管时指向 dist 即可
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
