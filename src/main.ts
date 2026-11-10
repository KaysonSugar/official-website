/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 应用入口
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

// 关掉浏览器自带的滚动恢复，刷新后回顶部
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

// 首帧前把滚动归零，必须 instant，否则会被 smooth 滑回首屏
if (!window.location.hash) {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
}

const app = createApp(App).use(router)

// 等初始导航完成再挂载，首帧就是完整页面
router
  .isReady()
  .catch(() => undefined)
  .then(() => app.mount('#app'))
