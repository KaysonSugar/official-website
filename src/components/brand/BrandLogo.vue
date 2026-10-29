<script setup lang="ts">
import { RouterLink } from 'vue-router'
import logoMark from '@/assets/logo.webp'

/**
 * 品牌标识：图形 mark + 中文名 + 英文名，对应原型图左上角的横向组合
 *
 * 为什么用「图片 + HTML 文字」而不是整张 logo-text.webp：
 * 1. 原型是横向排列，整图是竖排组合，缩放后中文会小到看不清
 * 2. 文字用 HTML 渲染，深色背景可换色、可换字号，且对 SEO 更友好
 * 完整组合标 logo-text.webp 留给页脚等需要整体呈现的位置使用。
 */
interface Props {
  /** 中文品牌名 */
  name: string
  /** 英文品牌名，显示为小字 + 宽字距 */
  nameEn: string
  /** 尺寸档位：md 用于桌面导航，sm 用于移动端菜单顶部 */
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<Props>(), { size: 'md' })
</script>

<template>
  <!-- 整体：flex 横向排列；items-center 垂直居中；
       gap-2 图形与文字间距 0.5rem，lg:gap-4 桌面 1rem（原型实测图形右边缘到中文左边缘 16px）；
       RouterLink to="/" 走前端路由回首页，不会整页刷新 -->
  <RouterLink
    to="/"
    class="flex shrink-0 items-center gap-2 lg:gap-4"
    :aria-label="`${props.name} 首页`"
  >
    <!-- 图形 mark：shrink-0 防止在窄屏被压缩变形；object-contain 保持原始比例（259×260 近似正方形）；
         桌面 h-9 w-9 = 36px（设计稿标定 logo 尺寸 36×36），移动端 h-7 w-7 = 28px 收敛体积 -->
    <img
      :src="logoMark"
      :alt="props.name"
      class="shrink-0 object-contain"
      :class="props.size === 'md' ? 'h-7 w-7 lg:h-9 lg:w-9' : 'h-6 w-6'"
      decoding="async"
    />
    <!-- 中英文上下堆叠：flex-col 纵向排列；items-start 让两行各自按内容宽度收缩，
         不被父级拉满——否则测量出来的宽度是父级宽度，看不出文字真实尺寸 -->
    <span class="flex flex-col items-start">
      <!-- 中文名：font-bold 加粗；不加字距（tracking-normal 由默认值提供），
           19px × 5 个汉字 = 95px，与设计稿标的「宽 95、高 28」一致；
           leading-[28px] 是设计稿标定行高 -->
      <span
        class="font-bold text-ink-900"
        :class="props.size === 'md' ? 'text-base lg:text-[19px] lg:leading-[28px]' : 'text-sm'"
        >{{ props.name }}</span
      >
      <!-- 英文名：8px + 0.135em 字距，15 个字母总宽 95px，与上方 5 个中文齐宽。
           mt-1 补 4px，避免紧贴中文显得拥挤 -->
      <span
        class="mt-1 font-medium leading-none tracking-[0.135em] text-ink-400"
        :class="props.size === 'md' ? 'text-[8px]' : 'text-[8px]'"
        >{{ props.nameEn }}</span
      >
    </span>
  </RouterLink>
</template>
