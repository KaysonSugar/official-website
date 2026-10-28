<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import BrandLogo from '@/components/brand/BrandLogo.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useActiveSection } from '@/composables/useActiveSection'
import { siteConfig } from '@/config/site'

/**
 * 顶部导航（对应原型图 01 首页 的顶部条）
 *
 * 三段式布局：左侧品牌标识 / 中间主导航 / 右侧电话 + 预约演示按钮。
 * 断点策略：≥1024px 显示完整导航；<1024px 收进汉堡菜单（5 个导航项 + 电话 + 按钮
 * 在 768~1023px 宽度下会互相挤压，所以不降到 md 断点）。
 */
const scrolled = ref(false)
const menuOpen = ref(false)

// 当前浏览区块，用于给导航项加高亮（对应原型里"首页"的加粗黑色态）
const active = useActiveSection(siteConfig.navItems.map((item) => item.href))

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
       h-16 手机/平板 4rem，lg:h-20 桌面 5rem；border-b 底部分隔线；
       bg-white/95 + backdrop-blur 九成透明白底 + 毛玻璃，滚动时内容不会糊成一片；
       transition-shadow 只为阴影加过渡，避免切换时整块重绘 -->
  <header
    class="fixed inset-x-0 top-0 z-50 h-16 border-b border-ink-100 bg-white/95 backdrop-blur transition-shadow duration-300 lg:h-20"
    :class="scrolled ? 'shadow-[0_2px_16px_rgba(0,0,0,0.06)]' : ''"
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
             当前项 font-semibold + text-ink-900（黑粗），其余 text-ink-600 且悬停变品牌橙 -->
        <a
          v-for="item in siteConfig.navItems"
          :key="item.href"
          :href="item.href"
          class="relative py-2 text-[15px] transition-colors duration-200"
          :class="
            active === item.href
              ? 'font-semibold text-ink-900'
              : 'text-ink-600 hover:text-brand-500'
          "
          :aria-current="active === item.href ? 'true' : undefined"
          >{{ item.label }}</a
        >
      </nav>

      <!-- 右侧：电话 + 主按钮 + 移动端汉堡 -->
      <div class="flex shrink-0 items-center gap-3 lg:gap-6">
        <!-- 电话号码：hidden 手机隐藏，md:block ≥768px 显示；font-medium 中粗让数字更清晰；
             lg:text-[15px] 桌面 15px —— 按原型实测「400-828-1988」整体宽约 99px 标定；
             hover:text-brand-500 悬停变品牌橙，提示可点击拨号 -->
        <a
          :href="siteConfig.contact.phoneHref"
          class="hidden font-medium text-ink-900 transition-colors duration-200 hover:text-brand-500 md:block lg:text-[15px]"
          >{{ siteConfig.contact.phone }}</a
        >

        <!-- 主按钮「预约演示」：外层 div 负责断点显隐（<640px 隐藏），
             不能把 hidden 直接写在 BaseButton 上——组件内部基础类含 inline-flex，
             同属 display 属性且无媒体查询，会把 hidden 覆盖掉（实测 375px 下按钮仍显示） -->
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
             当前项加粗为品牌橙，与桌面端高亮逻辑一致 -->
        <a
          v-for="item in siteConfig.navItems"
          :key="item.href"
          :href="item.href"
          class="block border-b border-ink-100 py-3 text-base transition-colors duration-200 last:border-b-0"
          :class="
            active === item.href
              ? 'font-semibold text-brand-500'
              : 'text-ink-700 hover:text-brand-500'
          "
          @click="closeMenu"
          >{{ item.label }}</a
        >

        <!-- 菜单底部行动区：mt-5 与导航列表拉开 1.25rem；flex-col 纵向排列；gap-3 间距 0.75rem -->
        <div class="mt-5 flex flex-col gap-3">
          <!-- 电话做成描边按钮，与右侧主按钮区分主次 -->
          <BaseButton :href="siteConfig.contact.phoneHref" variant="outline" block>
            {{ siteConfig.contact.phone }}
          </BaseButton>
          <!-- 主行动按钮：block 占满整行，便于单手点击 -->
          <BaseButton :href="siteConfig.contact.ctaHref" block @click="closeMenu">
            {{ siteConfig.contact.ctaLabel }}
          </BaseButton>
        </div>
      </div>
    </nav>
  </header>
</template>
