/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 路由表
 */
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PlatformView from '@/views/PlatformView.vue'
import ProductChemicalView from '@/views/products/ProductChemicalView.vue'
import ProductLogisticsView from '@/views/products/ProductLogisticsView.vue'
import ProductDriverView from '@/views/products/ProductDriverView.vue'
import SupportView from '@/views/SupportView.vue'
import AboutView from '@/views/AboutView.vue'
import { siteConfig } from '@/config/site'

/**
 * 路由表：URL 层级与导航层级一致
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/platform',
      name: 'platform',
      component: PlatformView,
      meta: { title: '平台架构' },
    },
    {
      path: '/products',
      name: 'products',
      redirect: { name: 'products-chemical' },
    },
    {
      path: '/products/chemical',
      name: 'products-chemical',
      component: ProductChemicalView,
      meta: { title: '化工生产' },
    },
    {
      path: '/products/logistics',
      name: 'products-logistics',
      component: ProductLogisticsView,
      meta: { title: '物流调度' },
    },
    {
      path: '/products/driver',
      name: 'products-driver',
      component: ProductDriverView,
      meta: { title: '司机作业' },
    },
    {
      path: '/solutions',
      name: 'solutions',
      component: SupportView,
      meta: { title: '服务支持' },
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: { title: '关于我们' },
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],

  /**
   * 切页落点：前进/后退还原上次位置，带锚点定位到目标元素，其余回到顶部。
   * behavior 必须写 instant，否则会被 style.css 的 smooth 接管成滑行。
   */
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 84, behavior: 'smooth' }
    return { top: 0, behavior: 'instant' }
  },
})

/** 按路由切换浏览器标题，统一「页面名 - 品牌名」格式 */
router.afterEach((to) => {
  const pageTitle = to.meta.title as string | undefined
  document.title = pageTitle
    ? `${pageTitle} - ${siteConfig.brand.name}`
    : `${siteConfig.brand.name} - 企业级解决方案与服务`
})

export default router
