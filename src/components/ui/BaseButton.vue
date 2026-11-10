<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 通用按钮
-->
<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

interface Props {
  /** 站内路径，比如 /production；传了就用 RouterLink */
  to?: string
  /** 站外链接、锚点或 tel: */
  href?: string
  /** primary 主行动，outline 次要，ghost 纯文字，light 用在深底/橙底上 */
  variant?: 'primary' | 'outline' | 'ghost' | 'light'
  /** sm 顶栏用，md 正文用，lg 首屏用 */
  size?: 'sm' | 'md' | 'lg'
  /** 撑满父容器，移动端菜单里用 */
  block?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  to: '',
  href: '',
  variant: 'primary',
  size: 'md',
  block: false,
})

// 主按钮的阴影跟首屏看板同一个色系（rgba(26,26,26,.28) 的中性柔影），
// 看板那套 0 28px 70px -24px 直接搬过来会脱节，按按钮尺寸缩了一半
const variantClass: Record<NonNullable<Props['variant']>, string> = {
  primary:
    'bg-brand-500 text-white shadow-[0_10px_30px_-12px_rgba(26,26,26,0.28)] hover:bg-brand-600 focus-visible:outline-brand-500',
  outline:
    'border border-ink-200 text-ink-900 hover:border-brand-500 hover:text-brand-500 focus-visible:outline-brand-500',
  ghost: 'text-ink-700 hover:text-brand-500 focus-visible:outline-brand-500',
  // 反白按钮，专给橙色横幅用（primary 放橙底上会糊在一起）。
  // 字用 brand-700 不用 brand-500，纯品牌橙在白底上只有 2.6:1
  light:
    'bg-white text-brand-700 shadow-sm shadow-ink-900/10 hover:bg-brand-50 focus-visible:outline-white',
}

// md 是按原型「预约演示」量出来的：16px 字、左右 20、上下 10，成品约 104×44
// 这里不要写 display 类，inline-flex 已经在基础类里了，
// 外面用 hidden / md:block 控显隐时会被它盖掉
const sizeClass: Record<NonNullable<Props['size']>, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm lg:px-5 lg:py-2.5 lg:text-base',
  lg: 'px-6 py-3 text-base lg:px-8 lg:py-3.5 lg:text-lg',
}

const classes = computed(() => [
  // 基础：行内 flex 居中、圆角 0.5rem、中等字重，颜色过渡 200ms
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200',
  // 键盘聚焦才显示 2px 焦点环，鼠标点不显示
  'focus-visible:outline-2 focus-visible:outline-offset-2',
  variantClass[props.variant],
  sizeClass[props.size],
  props.block ? 'w-full' : '',
])

// 有 to 走路由，有 href 走原生 a，都没有就渲染 button（给「点开弹层」这类纯交互按钮用）
const tag = computed(() => (props.to ? RouterLink : props.href ? 'a' : 'button'))

const linkAttrs = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) return { href: props.href }
  return { type: 'button' as const }
})
</script>

<template>
  <!-- 按 tag 切标签：RouterLink 走 pushState，a 给外链/tel，button 给弹层触发 -->
  <component :is="tag" v-bind="linkAttrs" :class="classes">
    <!-- 文字由调用方给，改文案不用动这里 -->
    <slot />
  </component>
</template>
