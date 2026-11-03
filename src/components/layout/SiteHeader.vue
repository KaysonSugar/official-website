<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BrandLogo from '@/components/brand/BrandLogo.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import DesktopNav from '@/components/layout/DesktopNav.vue'
import MobileMenu from '@/components/layout/MobileMenu.vue'
import { siteConfig } from '@/config/site'

/**
 * 顶部导航（对应原型 01 首页的顶部条）
 *
 * 这里只留壳：三段式布局（品牌 / 主导航 / 电话 + 预约演示）+ 滚动两态背景。
 * 桌面导航与移动菜单的展开逻辑拆在 DesktopNav.vue / MobileMenu.vue，
 * 汉堡开关状态在这边持有，因为按钮和菜单分属两处。
 */
const scrolled = ref(false)
const menuOpen = ref(false)

const route = useRoute()

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

// 切页后收起移动菜单（桌面下拉的归位在 DesktopNav 自己的 watch 里）
watch(
  () => route.path,
  () => closeMenu(),
)

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
  <!-- 顶栏：fixed 固定在顶部，高度 h-16 / lg:h-[84px]（画板 1440×84）。
       背景两态：顶部 bg-white/95 + backdrop-blur 透出首屏渐变，滚动后 bg-white 实心。
       transition-[...] 只过渡背景/阴影/描边，避免整块重绘 -->
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
      <!-- 左侧：品牌标识（图形 mark + 中英文），BrandLogo 自带回首页跳转 -->
      <BrandLogo :name="siteConfig.brand.name" :name-en="siteConfig.brand.nameEn" />

      <!-- 中间：桌面主导航，≥1024px 显示，悬停下拉逻辑在 DesktopNav 里 -->
      <DesktopNav />

      <!-- 右侧：电话 + 主按钮 + 移动端汉堡 -->
      <div class="flex shrink-0 items-center gap-3 lg:gap-6">
        <!-- 电话号码：md:block ≥768px 显示，与移动端菜单互补，避免同屏出现两个入口 -->
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

    <!-- 移动端下拉菜单：开关状态在壳上，菜单本体与高亮逻辑在 MobileMenu 里 -->
    <MobileMenu :open="menuOpen" @close="closeMenu" />
  </header>
</template>
