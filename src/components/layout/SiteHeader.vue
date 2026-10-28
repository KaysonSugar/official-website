<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import BrandLogo from '@/components/brand/BrandLogo.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { siteConfig } from '@/config/site'

/**
 * 顶部导航（对应原型图 01 首页 的顶部条）
 *
 * 三段式布局：左侧品牌标识 / 中间主导航 / 右侧电话 + 预约演示按钮。
 * 断点策略：≥1024px 显示完整导航；<1024px 收进汉堡菜单（5 个导航项 + 电话 + 按钮
 * 在 768~1023px 宽度下会互相挤压，所以不降到 md 断点）。
 *
 * 高亮逻辑：5 个导航项各对应一个独立路由，所以直接比对当前路由 path，
 * 不再需要滚动监听反查区块（原 useActiveSection 已移除）。
 */
const scrolled = ref(false)
const menuOpen = ref(false)
const route = useRoute()

// 当前路由，用于给导航项加高亮（对应原型里"首页"的加粗黑色态）
const activePath = computed(() => route.path)

const onScroll = () => {
  scrolled.value = window.scrollY > 8
}

const closeMenu = () => {
  menuOpen.value = false
}

// 移动端菜单展开时锁定页面滚动，避免背景跟着滑动
watch(menuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  // 组件卸载时恢复滚动，防止菜单打开状态下离开页面导致 body 一直锁死
  document.body.style.overflow = ''
})
</script>

<template>
  <!-- 顶栏：fixed 固定在顶部；inset-x-0 横向铺满；z-50 层级高于所有内容；
       高度按原型标定：h-16 手机/平板 4rem(64px)，lg:h-[84px] 桌面 84px（画板 1440×84）；
       border-b 底部分隔线。
       背景分两态（见下方 :class）：
         · 页面在顶部时 —— bg-white/95 + backdrop-blur，白底微微透出首屏浅橙渐变，与首屏连成一体；
         · 已滚动时 —— bg-white 纯实心，滚动上来的内容被 100% 遮住，不会出现"文字从导航栏里透出来"的错觉。
       两态都用 duration-300 过渡，切到实心时不会突兀。
       transition-[...] 只对背景/阴影/描边过渡，避免整块重绘 -->
  <header
    class="fixed inset-x-0 top-0 z-50 h-16 border-b transition-[background-color,border-color,box-shadow] duration-300 lg:h-[84px]"
    :class="
      scrolled
        ? 'border-ink-100 bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)]'
        : 'border-transparent bg-white/95 backdrop-blur'
    "
  >
    <!-- 导航容器：container-page 是全局内容容器（见 style.css），
         1440px 下左右各留 80px —— 与原型稿中 logo、首屏标题的基准线一致；
         flex + items-center 垂直居中 + justify-between 三段分布 -->
    <div class="container-page flex h-full items-center justify-between gap-4">
      <!-- 左侧：品牌标识（图形 mark + 中英文），点击回首页 -->
      <BrandLogo :name="siteConfig.brand.name" :name-en="siteConfig.brand.nameEn" />

      <!-- 中间：主导航，hidden 默认隐藏，lg:flex 在 ≥1024px 横向显示；
           gap-8 项间距 2rem，xl:gap-10 在 ≥1280px 放宽到 2.5rem -->
      <nav class="hidden items-center gap-8 lg:flex xl:gap-10" aria-label="主导航">
        <!-- 导航项：text-[15px] 微调字号贴合原型；relative 为下划线定位；
             当前项 font-semibold + text-ink-900（黑粗），其余 text-ink-600 且悬停变品牌橙；
             RouterLink 走前端路由切页，不整页刷新 -->
        <RouterLink
          v-for="item in siteConfig.navItems"
          :key="item.to"
          :to="item.to"
          class="relative py-2 text-[15px] transition-colors duration-200"
          :class="
            activePath === item.to
              ? 'font-semibold text-ink-900'
              : 'text-ink-600 hover:text-brand-500'
          "
          :aria-current="activePath === item.to ? 'page' : undefined"
          >{{ item.label }}</RouterLink
        >
      </nav>

      <!-- 右侧：电话 + 主按钮 + 移动端汉堡 -->
      <div class="flex shrink-0 items-center gap-3 lg:gap-6">
        <!-- 电话号码：hidden 手机隐藏，md:block ≥768px 显示；font-medium 中粗让数字更清晰；
             lg:text-[14px] 桌面 14px（设计稿标定）；
             与右侧「预约演示」间距由外层容器的 lg:gap-6 = 24px 提供（设计稿标定 24px）；
             hover:text-brand-500 悬停变品牌橙，提示可点击拨号。
             与移动端菜单互补：这里 ≥768 显示，菜单里就只在 <768 补一份，避免同屏出现两个相同入口 -->
        <a
          :href="siteConfig.contact.phoneHref"
          class="hidden font-medium text-ink-900 transition-colors duration-200 hover:text-brand-500 md:block lg:text-[14px]"
          >{{ siteConfig.contact.phone }}</a
        >

        <!-- 主按钮「预约演示」：外层 div 负责断点显隐（<640px 隐藏），
             不能把 hidden 直接写在 BaseButton 上——组件内部基础类含 inline-flex，
             同属 display 属性且无媒体查询，会把 hidden 覆盖掉（实测 375px 下按钮仍显示）。
             同样与菜单互补：这里 ≥640 显示，菜单里就只在 <640 补一份 -->
        <div class="hidden sm:block">
          <BaseButton :href="siteConfig.contact.ctaHref" size="md">
            {{ siteConfig.contact.ctaLabel }}
          </BaseButton>
        </div>

        <!-- 汉堡按钮：lg:hidden 仅 <1024px 显示；h-10 w-10 触控区 2.5rem 满足移动端最小点击尺寸；
             rounded-lg 圆角；hover:bg-ink-50 悬停浅灰底 -->
        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-lg text-ink-900 transition-colors hover:bg-ink-50 lg:hidden"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          aria-label="切换导航菜单"
          @click="menuOpen = !menuOpen"
        >
          <!-- 图标容器：relative 作为三条线的定位基准；block h-4 w-5 尺寸 1rem × 1.25rem -->
          <span class="relative block h-4 w-5">
            <!-- 顶线：absolute inset-x-0 top-0 横向撑满贴顶；h-0.5 线粗 2px；bg-current 跟随父级文字色；
                 展开时下移 7px 并旋转 45°，与底线组成 × -->
            <span
              class="absolute inset-x-0 top-0 h-0.5 bg-current transition-transform duration-300"
              :class="menuOpen ? 'translate-y-[7px] rotate-45' : ''"
            />
            <!-- 中线：top-[7px] 垂直居中；展开时淡出 -->
            <span
              class="absolute inset-x-0 top-[7px] h-0.5 bg-current transition-opacity duration-300"
              :class="menuOpen ? 'opacity-0' : ''"
            />
            <!-- 底线：bottom-0 贴底；展开时上移 7px 并反向旋转 45° -->
            <span
              class="absolute inset-x-0 bottom-0 h-0.5 bg-current transition-transform duration-300"
              :class="menuOpen ? '-translate-y-[7px] -rotate-45' : ''"
            />
          </span>
        </button>
      </div>
    </div>

    <!-- 移动端下拉菜单：v-show 切换 display（保留 DOM，切换无重排卡顿）；
         absolute top-full 紧贴顶栏下沿；inset-x-0 横向铺满；lg:hidden 桌面不显示；
         bg-white 纯白底遮住下方内容；pf-4/pt-2 内边距；max-h-[calc(100vh-4rem)] + overflow-y-auto 防超长 -->
    <nav
      v-show="menuOpen"
      id="mobile-menu"
      class="absolute inset-x-0 top-full max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-ink-100 bg-white pb-6 pt-2 shadow-lg lg:hidden"
      aria-label="移动端导航"
    >
      <!-- 内容同样套 container-page，保证手机端菜单项与 logo 左边缘对齐 -->
      <div class="container-page">
        <!-- 菜单项：block 独占一行；py-3 上下内边距 0.75rem 保证触控高度；border-b 用细线分隔
             当前项加粗为品牌橙，与桌面端高亮逻辑一致；点击后同时收起菜单 -->
        <RouterLink
          v-for="item in siteConfig.navItems"
          :key="item.to"
          :to="item.to"
          class="block border-b border-ink-100 py-3 text-base transition-colors duration-200 last:border-b-0"
          :class="
            activePath === item.to
              ? 'font-semibold text-brand-500'
              : 'text-ink-700 hover:text-brand-500'
          "
          @click="closeMenu"
          >{{ item.label }}</RouterLink
        >

        <!-- 菜单底部行动区：与顶栏右侧严格互补，同一个入口全局只出现一份 ——
             · 电话：顶栏 md(≥768) 起常驻，所以菜单里只在 <768 补充 → 整个动作区 md:hidden
             · 预约演示：顶栏 sm(≥640) 起常驻，所以菜单里只在 <640 补充 → 按钮外面套 sm:hidden
             结果：≥768 顶栏已有「电话 + 预约演示」，展开菜单不会出现第二份；
                   640~767 顶栏只剩「预约演示」，菜单补电话；
                   <640 顶栏只剩 logo + 汉堡，菜单补电话 + 预约演示。
             md:hidden 能覆盖 flex：媒体查询里的 display:none 后置，优先级高于无媒体查询的 flex -->
        <div class="mt-5 flex flex-col gap-3 md:hidden">
          <!-- 电话做成描边按钮，与顶栏主按钮区分主次 -->
          <BaseButton :href="siteConfig.contact.phoneHref" variant="outline" block>
            {{ siteConfig.contact.phone }}
          </BaseButton>
          <!-- 主行动按钮：外层 div 负责断点显隐（<640 才出现在菜单里）。
               注意不能把 sm:hidden 直接写在 BaseButton 上 —— 组件基础类含 inline-flex，
               同属 display 属性且无媒体查询，会把 hidden 覆盖掉 -->
          <div class="sm:hidden">
            <BaseButton :href="siteConfig.contact.ctaHref" block @click="closeMenu">
              {{ siteConfig.contact.ctaLabel }}
            </BaseButton>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
