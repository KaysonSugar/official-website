import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PlatformView from '@/views/PlatformView.vue'
import ProductsView from '@/views/ProductsView.vue'
import ProductChemicalView from '@/views/ProductChemicalView.vue'
import ProductLogisticsView from '@/views/ProductLogisticsView.vue'
import ProductDriverView from '@/views/ProductDriverView.vue'
import SolutionsView from '@/views/SolutionsView.vue'
import AboutView from '@/views/AboutView.vue'
import { siteConfig } from '@/config/site'

/**
 * 路由表：URL 层级与导航层级一致
 *
 * 8 个页面全部同步引入 —— 单个页面只有几 KB，拆包换不来体积收益，
 * 反而让内页刷新多一次「才知道要请求哪个 chunk」的串行往返。
 */
const router = createRouter({
  // createWebHistory(import.meta.env.BASE_URL)：HTML5 History 模式，地址栏是干净的 /products/chemical
  // 而不是 /#/products/chemical。部署时需要服务端把所有路径回退到 index.html（见 README「路由约定」）
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // 首页不设 meta.title：标题回落到 afterEach 里的品牌标语，避免出现「首页 - 威易达化工」这种无信息量的标题
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
      component: ProductsView,
      meta: { title: '产品矩阵' },
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
      component: SolutionsView,
      meta: { title: '解决方案' },
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: { title: '关于我们' },
    },
    // 兜底：非法路径回首页，避免出现空白页
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
