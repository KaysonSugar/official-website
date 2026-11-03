<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 品牌标识
-->
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import logoMark from '@/assets/brand/logo.webp'

interface Props {
  /** 中文品牌名 */
  name: string
  /** 英文品牌名，小字 + 宽字距 */
  nameEn: string
  /** md 用于桌面导航，sm 用于移动端菜单 */
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<Props>(), { size: 'md' })
</script>

<template>
  <!-- 整体：flex 横排、items-center 垂直居中；gap-2 间距 0.5rem，lg:gap-4 桌面 1rem（稿子 16） -->
  <RouterLink
    to="/"
    class="flex shrink-0 items-center gap-2 lg:gap-4"
    :aria-label="`${props.name} 首页`"
  >
    <!-- 图形：shrink-0 防止窄屏被压扁；桌面 36×36（稿子标的尺寸），移动端 28×28 -->
    <img
      :src="logoMark"
      :alt="props.name"
      class="shrink-0 object-contain"
      :class="props.size === 'md' ? 'h-7 w-7 lg:h-9 lg:w-9' : 'h-6 w-6'"
      decoding="async"
    />
    <!-- 中英文上下排；items-start 让两行各自收窄，否则量出来是父级宽度 -->
    <span class="flex flex-col items-start">
      <!-- 中文：加粗；桌面 19px / 行高 28（稿子标的宽 95、高 28） -->
      <span
        class="font-bold text-ink-900"
        :class="props.size === 'md' ? 'text-base lg:text-[19px] lg:leading-[28px]' : 'text-sm'"
        >{{ props.name }}</span
      >
      <!-- 英文：8px + 0.135em 字距，正好和上面五个汉字同宽；mt-1 留 4px 缝隙 -->
      <span
        class="mt-1 font-medium leading-none tracking-[0.135em] text-ink-400"
        :class="props.size === 'md' ? 'text-[8px]' : 'text-[8px]'"
        >{{ props.nameEn }}</span
      >
    </span>
  </RouterLink>
</template>
