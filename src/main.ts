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
 * 刷新完仍停在页面中间。官网是长滚动结构，刷新应当重新从首屏开始。
 *
 * ⚠️ 真正"关闭自动恢复"的动作已下沉到 index.html 的 <head> 同步脚本：
 *    本文件是 type="module"（等效 defer），执行时浏览器早就恢复过滚动位置了，
 *    在这里才改成 manual 属于亡羊补牢。这里保留一份只为兜底 ——
 *    入口被别的宿主内联、或 head 里的脚本被构建工具裁掉时仍能生效。
 */
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

/**
 * 挂载前再把滚动位置归零一次
 *
 * 即便浏览器已经恢复了上次位置（旧浏览器 / 脚本被裁剪），也要在内容渲染前拉回首屏，
 * 保证用户看不到"先出现在中间、再弹回顶部"的过程。
 *
 * · behavior 必须显式写 'instant'：style.css 里有 html { scroll-behavior: smooth }，
 *   不指定的话会变成从页面中段一路滑回首屏的动画，比闪烁更怪；
 * · 带 hash 的地址（/about#contact）不能归零，要让浏览器按锚点定位；
 * · 具体落点仍由 router 的 scrollBehavior 决定，这里只处理"首次进入"的兜底。
 */
if (!window.location.hash) {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
}

/**
 * 等路由就绪后再挂载
 *
 * 这一步是消除刷新闪烁的关键。若直接 mount，Vue 会先把 App 的骨架渲染出来
 * （顶栏 + 空的 RouterView + 页脚），而首屏组件是懒加载的、此时还没下载完 ——
 * 于是页面先变成「顶栏压着页脚」的压缩态，页脚紧贴在导航栏下面一闪而过，
 * 等内容到了才被推开。这就是刷新时看到"底部栏文字穿透"的真正来源。
 *
 * router.isReady() 会等初始导航完成（含懒加载组件解析完毕）才 resolve，
 * 此时 mount 出来的第一帧就是完整页面，中间态被 index.html 的 #boot 加载环占住。
 */
const app = createApp(App).use(router)

router
  .isReady()
  // isReady 理论上不会 reject；万一初始导航出错，也照样挂载，
  // 让用户看到可用的导航与页脚，而不是永远卡在加载环上
  .catch(() => undefined)
  .then(() => app.mount('#app'))
