// 应用入口：创建 Vue 实例、挂载路由并渲染到 index.html 中的 #app 节点
import { createApp } from 'vue'
// 全局样式：内含 Tailwind 入口（@import "tailwindcss"）、设计 token 与基础样式，必须在此引入
import './style.css'
import App from './App.vue'
import router from './router'

/**
 * 刷新后回到页面顶部
 *
 * 浏览器默认 history.scrollRestoration = 'auto'：按 F5 会"记住"上次的滚动位置，
 * 刷新完仍停在页面中间。官网是长滚动结构，刷新应当重新从首屏开始，否则
 * 用户会以为页面没加载完 / 内容缺失。
 *
 * 改为 manual 后由我们接管落点：具体落点交给 router 的 scrollBehavior 决定
 * （切页回顶部、带锚点定位、前进后退还原）。位置放在 mount 之前，
 * 让滚动状态在任何内容渲染前就被归零，避免闪一下中间内容。
 */
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

// use(router) 必须在 mount 之前调用，否则首次渲染拿不到当前路由
createApp(App).use(router).mount('#app')
