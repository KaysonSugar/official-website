<script setup lang="ts">
import { computed } from 'vue'

/**
 * 通用按钮（渲染为 <a>，因为官网上的按钮都是跳转，不是提交表单）
 *
 * 原型图里只有一种主按钮：品牌橙底 + 白字 + 小圆角。
 * 另外预留 outline / ghost 两种次要态，供后续模块使用，避免各处重复写类名。
 */
interface Props {
  /** 跳转地址，支持锚点（#contact）或 tel: / https: 协议 */
  href: string
  /** 视觉变体：primary 主行动；outline 次要；ghost 纯文字 */
  variant?: 'primary' | 'outline' | 'ghost'
  /** 尺寸：sm 用于导航栏，md 用于正文区块，lg 用于首屏 */
  size?: 'sm' | 'md' | 'lg'
  /** 占满父容器宽度，移动端菜单里使用 */
  block?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  block: false,
})

// 变体样式：主按钮用品牌橙，悬停加深一级；focus-visible 只在键盘操作时显示焦点环
const variantClass: Record<NonNullable<Props['variant']>, string> = {
  primary:
    'bg-brand-500 text-white shadow-sm shadow-brand-500/30 hover:bg-brand-600 focus-visible:outline-brand-500',
  outline:
    'border border-ink-200 text-ink-900 hover:border-brand-500 hover:text-brand-500 focus-visible:outline-brand-500',
  ghost: 'text-ink-700 hover:text-brand-500 focus-visible:outline-brand-500',
}

// 尺寸样式：sm 导航栏小号用，md 区块用，lg 首屏用
// md 在 ≥1024px 下按原型稿实测标定：字号 16px、左右内边距 20px、上下 10px
// → 成品约 104×44px，与原型「预约演示」按钮的 103×44 基本一致
// 注意：这里不要写 display 类（inline-flex 已在基础类里），
// 否则外部用 hidden / md:block 控制显示时会与 inline-flex 冲突（同属 display，后者可能覆盖前者）
const sizeClass: Record<NonNullable<Props['size']>, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm lg:px-5 lg:py-2.5 lg:text-base',
  lg: 'px-6 py-3 text-base lg:px-8 lg:py-3.5 lg:text-lg',
}

const classes = computed(() => [
  // 基础：inline-flex 行内弹性盒（不撑满一行）；items/justify-center 文字居中；
  // rounded-lg 圆角 0.5rem；font-medium 中等字重；transition-colors 颜色过渡 200ms
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200',
  // 无障碍：键盘聚焦时显示 2px 品牌色描边，鼠标点击不显示
  'focus-visible:outline-2 focus-visible:outline-offset-2',
  variantClass[props.variant],
  sizeClass[props.size],
  props.block ? 'w-full' : '',
])
</script>

<template>
  <a :href="props.href" :class="classes">
    <!-- 默认插槽：按钮文字由调用方决定，便于文案改动不涉及本组件 -->
    <slot />
  </a>
</template>
