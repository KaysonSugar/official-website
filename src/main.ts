// 应用入口：创建 Vue 实例并挂载到 index.html 中的 #app 节点
import { createApp } from 'vue'
// 全局样式：内含 Tailwind 入口（@import "tailwindcss"）、设计 token 与基础样式，必须在此引入
import './style.css'
import App from './App.vue'

/**
 * 刷新后回到页面顶部
 *
 * 浏览器默认 history.scrollRestoration = 'auto'：按 F5 会"记住"上次的滚动位置，
 * 刷新完仍停在页面中间。官网是单页长滚动结构，刷新应当重新从首屏开始，否则
 * 用户会以为页面没加载完 / 内容缺失。
 *
 * 改为 manual 后由我们接管落点：
 *   · URL 不带锚点 → 回到 (0, 0)
 *   · URL 带锚点（如 /#products）→ 不动，保留浏览器按 hash 的定位能力，
 *     顶栏让位由 style.css 的 scroll-padding-top 保证
 *
 * 必须显式传 behavior: 'instant'：style.css 里有 html { scroll-behavior: smooth }，
 * 少了这个参数，这一跳会变成"从页面中部一路平滑滚回首屏"的诡异动画。
 * 位置放在 mount 之前，让滚动状态在任何内容渲染前就被归零，避免闪一下中间内容。
 */
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

if (!window.location.hash) {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
}

// mount('#app') 对应 index.html 里的 <div id="app"></div>
createApp(App).mount('#app')
