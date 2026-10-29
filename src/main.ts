// 应用入口：创建 Vue 实例、挂载路由并渲染到 index.html 中的 #app 节点
import { createApp } from 'vue'
// 全局样式：内含 Tailwind 入口（@import "tailwindcss"）、设计 token 与基础样式，必须在此引入
import './style.css'
import App from './App.vue'
import router from './router'

// 关闭浏览器的自动滚动恢复，刷新后回到页面顶部。
// 主逻辑已下沉到 index.html 的 <head> 同步脚本，这里只做兜底。
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

// 渲染前把滚动位置归零。
// behavior 必须写 instant：style.css 里有 html { scroll-behavior: smooth }，
// 不指定会变成从页面中段滑回首屏的动画。
if (!window.location.hash) {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
}

const app = createApp(App).use(router)

// 等初始导航完成再挂载，首帧就是完整页面
router
  .isReady()
  // isReady 理论上不会 reject；万一初始导航出错也照样挂载，避免页面一直空白
  .catch(() => undefined)
  .then(() => app.mount('#app'))
