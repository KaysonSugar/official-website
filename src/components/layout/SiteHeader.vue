<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 顶部导航外壳
-->
<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BrandLogo from '@/components/brand/BrandLogo.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import DesktopNav from '@/components/layout/DesktopNav.vue'
import MobileMenu from '@/components/layout/MobileMenu.vue'
import { siteConfig } from '@/config/site'

/**
 * 顶栏。这边只留壳：品牌 / 主导航 / 电话 + 按钮三段，加滚动前后的两种背景。
 * 桌面下拉在 DesktopNav，移动菜单在 MobileMenu；
 * 汉堡的状态只能放这儿——按钮和菜单不在一个组件里。
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

// 菜单开着时锁住页面滚动，不然背景跟着滑
watch(menuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

// 切页后收起菜单（桌面下拉归位在 DesktopNav 自己的 watch 里）
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
  // 菜单开着的时候离开页面，得把 overflow 还原，否则 body 一直是锁死状态
  document.body.style.overflow = ''
})
</script>

<template>
  <!-- 顶栏：fixed 固定，手机 64、桌面 84（画板 1440×84）；
       两种背景——顶部时白 95% + 模糊，滚过 8px 变实心白加投影。
       transition 只列背景/描边/阴影，别写 transition-all，不然整块重绘 -->
  <header
    class="nav-in fixed inset-x-0 top-0 z-50 h-16 border-b transition-[background-color,border-color,box-shadow] duration-300 lg:h-[84px]"
    :class="
      scrolled
        ? 'border-ink-100 bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)]'
        : 'border-transparent bg-white/95 backdrop-blur'
    "
  >
    <!-- 容器：跟首屏、各区块同一条左右基线（1440 下各 80px）；flex 三段分布，垂直居中 -->
    <div class="container-page flex h-full items-center justify-between gap-4">
      <!-- 左：品牌标识，组件内部自带回首页的跳转 -->
      <BrandLogo :name="siteConfig.brand.name" :name-en="siteConfig.brand.nameEn" />

      <!-- 中：桌面导航，≥1024 才出来 -->
      <DesktopNav />

      <!-- 右：电话 + 主按钮 + 汉堡 -->
      <div class="flex shrink-0 items-center gap-3 lg:gap-6">
        <!-- 电话：≥768 显示，768 以下交给菜单，同屏只留一个入口 -->
        <a
          :href="siteConfig.contact.phoneHref"
          class="hidden font-medium text-ink-900 transition-colors duration-200 hover:text-brand-500 md:block lg:text-[14px]"
          >{{ siteConfig.contact.phone }}</a
        >

        <!-- 主按钮：外面包一层 div 控显隐。<640 隐藏写在 div 上，
             不能直接写 BaseButton —— 它自带 inline-flex，同属 display 会被盖掉（375 下实测按钮还露着） -->
        <div class="hidden sm:block">
          <BaseButton :href="siteConfig.contact.ctaHref" size="md">
            {{ siteConfig.contact.ctaLabel }}
          </BaseButton>
        </div>

        <!-- 汉堡：≥1024 隐藏；40×40 是手点击的最小尺寸，hover 给个浅灰底 -->
        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-lg text-ink-900 transition-colors hover:bg-ink-50 lg:hidden"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          aria-label="切换导航菜单"
          @click="menuOpen = !menuOpen"
        >
          <!-- 三根线的定位盒子：16 高、20 宽 -->
          <span class="relative block h-4 w-5">
            <!-- 上线：贴顶，展开时下移 7px 转 45° -->
            <span
              class="absolute inset-x-0 top-0 h-0.5 bg-current transition-transform duration-300"
              :class="menuOpen ? 'translate-y-[7px] rotate-45' : ''"
            />
            <!-- 中线：往下 7px 居中，展开时淡出 -->
            <span
              class="absolute inset-x-0 top-[7px] h-0.5 bg-current transition-opacity duration-300"
              :class="menuOpen ? 'opacity-0' : ''"
            />
            <!-- 下线：贴底，上移 7px 反向转 45°，和上线拼成 × -->
            <span
              class="absolute inset-x-0 bottom-0 h-0.5 bg-current transition-transform duration-300"
              :class="menuOpen ? '-translate-y-[7px] -rotate-45' : ''"
            />
          </span>
        </button>
      </div>
    </div>

    <!-- 移动端菜单：开关状态在壳上，内容和高亮在 MobileMenu 里 -->
    <MobileMenu :open="menuOpen" @close="closeMenu" />
  </header>
</template>

<style scoped>
/* 入场：整条顶栏从上滑落 16px 淡入。曲线和时长对齐首屏那套，
   不加 delay——顶栏要先落定，首屏内容 150ms 后再进场 */
.nav-in {
  animation: nav-drop 0.5s cubic-bezier(0.22, 1, 0.36, 1) backwards;
}

@keyframes nav-drop {
  from {
    opacity: 0;
    transform: translateY(-16px);
  }
}
</style>
