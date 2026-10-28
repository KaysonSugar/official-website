import { createRouter, createWebHistory } from 'vue-router'
import { siteConfig } from '@/config/site'

/**
 * 路由表
 *
 * 5 个导航项 = 5 个独立页面（依据原型：首页是一张 1440×10600 的长画板，
 * 另外 4 张画板分别是「生产与经营管理 / 调度与合规 / 接单与作业 / 按角色区分的解决方案」），
 * 所以采用「点击切换页面 + 每页内部滚动」，而不是单页锚点。
 *
 * 首页同步加载（首屏必经），其余页面懒加载：拆成独立 chunk，
 * 首屏只下载首页代码，切页时再取对应分包。
 */
const router = createRouter({
  // createWebHistory(import.meta.env.BASE_URL)：HTML5 History 模式，地址栏是干净的 /production
  // 而不是 /#/production。部署时需要服务端把所有路径回退到 index.html（见 README「路由」一节）
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // 首页不设 meta.title：标题回落到 afterEach 里的品牌标语，避免出现「首页 - 威易达化工」这种无信息量的标题
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/production',
      name: 'production',
      component: () => import('@/views/ProductionView.vue'),
      meta: { title: '生产管理' },
    },
    {
      path: '/dispatch',
      name: 'dispatch',
      component: () => import('@/views/DispatchView.vue'),
      meta: { title: '调度合规' },
    },
    {
      path: '/driver',
      name: 'driver',
      component: () => import('@/views/DriverView.vue'),
      meta: { title: '接单作业' },
    },
    {
      path: '/solutions',
      name: 'solutions',
      component: () => import('@/views/SolutionsView.vue'),
      meta: { title: '解决方案' },
    },
    // 兜底：非法路径回首页，避免出现空白页
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],

  /**
   * 切页落点
   *
   * · 浏览器前进/后退 → 还原上次位置
   * · 带锚点（/production#xxx）→ 定位到目标元素，并预留桌面顶栏 84px
   * · 其余 → 回到页面顶部
   *
   * behavior 必须显式写 instant：style.css 里有 html { scroll-behavior: smooth }，
   * 不指定的话从页底切到新页面会先"滑行"一段再回到顶部，观感很怪。
   */
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 84, behavior: 'smooth' }
    return { top: 0, behavior: 'instant' }
  },
})

/**
 * 按路由切换浏览器标题
 *
 * 每个页面有独立 title 是切页式官网的前提之一（也便于被搜索引擎单独收录）。
 * 内页格式为「页面名 - 品牌名」；首页回落到品牌名 + 定位语，与 index.html 里的静态 title 保持一致，
 * 避免首页加载完成后标题突然跳变。
 */
router.afterEach((to) => {
  const pageTitle = to.meta.title as string | undefined
  document.title = pageTitle
    ? `${pageTitle} - ${siteConfig.brand.name}`
    : `${siteConfig.brand.name}｜企业级解决方案与服务`
})

export default router
