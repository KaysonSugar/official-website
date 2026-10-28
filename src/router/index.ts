import { createRouter, createWebHistory } from 'vue-router'
import { siteConfig } from '@/config/site'

/**
 * 路由表
 *
 * 站点是「点击切换页面 + 每页内部滚动」，不是锚点单页 —— 依据是原型画板本身：
 * `01 首页` 是一张 1440×约 10600 的长画板，另外 4 张画板分别是
 * 「威易达化工：生产与经营管理 / 威易达物流：调度与合规 / 威易达司机：接单与作业 /
 *  按角色区分的解决方案」，后三张是「产品矩阵」下的三条业务线。
 *
 * URL 层级刻意与导航层级对齐：
 *   /                     首页
 *   /platform             平台架构
 *   /products             产品矩阵（三条业务线的总览页）
 *   /products/chemical    化工生产
 *   /products/logistics   物流调度
 *   /products/driver      司机作业
 *   /solutions            解决方案
 *   /about                关于我们
 *
 * 各页面统一懒加载：每页拆成独立 chunk，首屏只下载首页代码，切页时再取对应分包。
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
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/platform',
      name: 'platform',
      component: () => import('@/views/PlatformView.vue'),
      meta: { title: '平台架构' },
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('@/views/ProductsView.vue'),
      meta: { title: '产品矩阵' },
    },
    {
      path: '/products/chemical',
      name: 'products-chemical',
      component: () => import('@/views/ProductChemicalView.vue'),
      meta: { title: '化工生产' },
    },
    {
      path: '/products/logistics',
      name: 'products-logistics',
      component: () => import('@/views/ProductLogisticsView.vue'),
      meta: { title: '物流调度' },
    },
    {
      path: '/products/driver',
      name: 'products-driver',
      component: () => import('@/views/ProductDriverView.vue'),
      meta: { title: '司机作业' },
    },
    {
      path: '/solutions',
      name: 'solutions',
      component: () => import('@/views/SolutionsView.vue'),
      meta: { title: '解决方案' },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
      meta: { title: '关于我们' },
    },
    // 兜底：非法路径回首页，避免出现空白页
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],

  /**
   * 切页落点
   *
   * · 浏览器前进/后退 → 还原上次位置
   * · 带锚点（/products/chemical#flow）→ 定位到目标元素，并预留桌面顶栏 84px
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
 * 全站统一用「页面名 - 品牌名」的短横线分隔（首页即为「品牌名 - 定位语」），
 * 不要混用全角竖线「｜」—— 两个不同分隔符出现在同一站点的标题里会显得随意。
 * 首页标题与 index.html 里的静态 title 保持一致，避免加载完成后标题突然跳变。
 */
router.afterEach((to) => {
  const pageTitle = to.meta.title as string | undefined
  document.title = pageTitle
    ? `${pageTitle} - ${siteConfig.brand.name}`
    : `${siteConfig.brand.name} - 企业级解决方案与服务`
})

export default router
