import { defineConfig } from 'vite'
// Vue 单文件组件支持
import vue from '@vitejs/plugin-vue'
// Tailwind v4 的 Vite 插件，v4 不需要 tailwind.config.js，入口在 src/style.css
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      // @ 指向 src，改了要和 tsconfig.app.json 的 paths 同步，否则类型检查报错
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    // 启动开发服务器自动开浏览器
    open: true,
    proxy: {
      // 开发态把 /producer 转给后端网关，线上由 nginx 做同样的事；secure:false 放行自签证书
      '/producer': {
        target: 'https://dev.weihuayunshu.com:8443',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    // 静态托管时把根目录指向 dist 即可
    outDir: 'dist',
    assetsDir: 'assets',
    // 图标转 webp 后只有 1~3KB，默认内联进 JS 会白涨 26KB，关掉让它们单独走缓存
    assetsInlineLimit: 0,
  },
})
