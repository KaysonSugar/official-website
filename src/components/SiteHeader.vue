<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import type { NavItem } from '@/config/site'

interface Props {
  brand: string
  navItems: NavItem[]
}

const props = defineProps<Props>()

const scrolled = ref(false)
const menuOpen = ref(false)

const onScroll = () => {
  scrolled.value = window.scrollY > 8
}

const closeMenu = () => {
  menuOpen.value = false
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <!-- 顶部导航：fixed + inset-x-0 top-0 固定在页面顶部并横向铺满；z-50 保证层级高于页面内容；
       h-14 手机高度 3.5rem，sm:h-16 平板及以上 4rem（窄屏压缩高度给内容留空间）；
       transition-colors duration-300 背景色 300ms 平滑过渡；
       滚动后（scrolled）切换为：border-b 下描边 + bg-white/90 九成不透明白底 + backdrop-blur 毛玻璃 -->
  <header
    class="fixed inset-x-0 top-0 z-50 h-14 transition-colors duration-300 sm:h-16"
    :class="scrolled ? 'border-b border-brand-100 bg-white/90 backdrop-blur' : 'bg-transparent'"
  >
    <!-- 导航容器：mx-auto 居中；max-w-6xl 最大宽 72rem；flex 横向排列；h-full 占满导航高度；
         items-center 垂直居中；justify-between 左右两端对齐；
         px-4 手机左右内边距 1rem，sm:px-6 平板及以上 1.5rem（窄屏减少留白换取内容宽度） -->
    <div class="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6">
      <!-- 品牌标识：text-base 手机 1rem，sm:text-lg 1.125rem；font-bold 加粗；tracking-tight 收紧字距；
           transition-colors + hover:text-brand-600 悬停变为品牌蓝 -->
      <a
        class="text-base font-bold tracking-tight text-ink-900 transition-colors hover:text-brand-600 sm:text-lg"
        href="#home"
        @click="closeMenu"
        >{{ props.brand }}</a
      >

      <!-- 桌面端导航：hidden 手机隐藏，md:flex 屏幕 ≥768px 时横向显示；items-center 垂直居中；
           gap-8 项间距 2rem（该导航只在 ≥768px 显示，无需再分档） -->
      <nav class="hidden items-center gap-8 md:flex">
        <!-- 导航项：text-sm 小字号 0.875rem；text-ink-600 次级文字色；悬停变品牌蓝 -->
        <a
          v-for="item in props.navItems"
          :key="item.href"
          :href="item.href"
          class="text-sm text-ink-600 transition-colors hover:text-brand-600"
          >{{ item.label }}</a
        >
      </nav>

      <!-- 移动端菜单按钮：flex + items-center justify-center 图标居中；h-9 w-9 尺寸 2.25rem；
           rounded-md 圆角；hover:bg-brand-50 悬停浅蓝底；md:hidden 仅 <768px 显示 -->
      <button
        type="button"
        class="flex h-9 w-9 items-center justify-center rounded-md text-ink-600 transition-colors hover:bg-brand-50 hover:text-brand-600 md:hidden"
        :aria-expanded="menuOpen"
        aria-label="切换导航菜单"
        @click="menuOpen = !menuOpen"
      >
        <!-- 汉堡图标容器：relative 作为三条线的定位参照；block 块级；h-4 w-5 尺寸 1rem×1.25rem -->
        <span class="relative block h-4 w-5">
          <!-- 顶线：absolute inset-x-0 top-0 横向撑满贴顶；h-0.5 线粗 2px；bg-current 跟随父级文字色；
               展开时 translate-y-[7px] 下移 + rotate-45 旋转 45°，与底线组成 × -->
          <span
            class="absolute inset-x-0 top-0 h-0.5 bg-current transition-transform"
            :class="menuOpen ? 'translate-y-[7px] rotate-45' : ''"
          />
          <!-- 中线：top-[7px] 垂直居中；展开时 opacity-0 淡出隐藏 -->
          <span
            class="absolute inset-x-0 top-[7px] h-0.5 bg-current transition-opacity"
            :class="menuOpen ? 'opacity-0' : ''"
          />
          <!-- 底线：bottom-0 贴底；展开时 -translate-y-[7px] 上移 + -rotate-45 反向旋转 45° -->
          <span
            class="absolute inset-x-0 bottom-0 h-0.5 bg-current transition-transform"
            :class="menuOpen ? '-translate-y-[7px] -rotate-45' : ''"
          />
        </span>
      </button>
    </div>

    <!-- 移动端下拉菜单：v-show 由 menuOpen 控制显隐（保留 DOM，仅切换 display）；
         md:hidden 仅手机显示；border-b 下描边；bg-white 白底；
         px-4 左右内边距 1rem（sm:px-6 为 1.5rem）；pb-4 底部 1rem -->
    <nav v-show="menuOpen" class="border-b border-brand-100 bg-white px-4 pb-4 md:hidden sm:px-6">
      <!-- 移动端导航项：block 独占一行便于点击；py-2 上下内边距 0.5rem 增大触控区 -->
      <a
        v-for="item in props.navItems"
        :key="item.href"
        :href="item.href"
        class="block py-2 text-sm text-ink-600 transition-colors hover:text-brand-600"
        @click="closeMenu"
        >{{ item.label }}</a
      >
    </nav>
  </header>
</template>
