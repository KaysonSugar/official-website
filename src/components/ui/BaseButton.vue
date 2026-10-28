<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

/**
 * 通用按钮
 *
 * 原型图里只有一种主按钮：品牌橙底 + 白字 + 小圆角。
 * 另外预留 outline / ghost 两种次要态，供后续模块使用，避免各处重复写类名。
 *
 * 两种跳转方式：
 *   · to   —— 站内路由，渲染成 <RouterLink>，切页不刷新浏览器
 *   · href —— 站外链接或 tel: / mailto:，渲染成普通 <a>
 * 两者只能传一个，都不传时渲染成不可点的占位（仍保留交互样式，供设计稿比对用）。
 */
interface Props {
  /** 站内路由路径，如 /production；传了它就用 RouterLink */
  to?: string
  /** 站外链接、锚点或 tel: 协议 */
  href?: string
  /** 视觉变体：primary 主行动；outline 次要；ghost 纯文字；light 深底/橙底上的反白按钮 */
  variant?: 'primary' | 'outline' | 'ghost' | 'light'
  /** 尺寸：sm 用于导航栏，md 用于正文区块，lg 用于首屏 */
  size?: 'sm' | 'md' | 'lg'
  /** 占满父容器宽度，移动端菜单里使用 */
  block?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  to: '',
  href: '',
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
  // 反白按钮：白底 + 深橙字，专供橙色 CTA 横幅（primary 在橙底上会与背景糊在一起）；
  // 用 brand-700 而非 brand-500 是为了在白底上拿到 4.17:1 的对比度，纯品牌橙只有 2.6:1
  light:
    'bg-white text-brand-700 shadow-sm shadow-ink-900/10 hover:bg-brand-50 focus-visible:outline-white',
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

// 有 to 走路由、否则走原生 a 标签
const isRoute = computed(() => props.to !== '')
</script>

<template>
  <!-- 标签按 isRoute 动态切换：RouterLink 会用 history.pushState 切页，不会整页刷新 -->
  <component
    :is="isRoute ? RouterLink : 'a'"
    v-bind="isRoute ? { to: props.to } : { href: props.href }"
    :class="classes"
  >
    <!-- 默认插槽：按钮文字由调用方决定，便于文案改动不涉及本组件 -->
    <slot />
  </component>
</template>
