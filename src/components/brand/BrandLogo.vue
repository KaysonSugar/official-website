<script setup lang="ts">
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
       gap-2 图形与文字间距 0.5rem，lg:gap-4 桌面 1rem（原型实测图形右边缘到中文左边缘 16px） -->
  <a
    href="#home"
    class="flex shrink-0 items-center gap-2 lg:gap-4"
    :aria-label="`${props.name} 首页`"
  >
    <!-- 图形 mark：shrink-0 防止在窄屏被压缩变形；object-contain 保持原始比例（259×260 近似正方形）；
         h-7 w-7 尺寸 1.75rem(28px) —— 原型稿里图形约 27×26px，与 20px 中文名约为 1.35 倍关系 -->
    <img
      :src="logoMark"
      :alt="props.name"
      class="shrink-0 object-contain"
      :class="props.size === 'md' ? 'h-7 w-7' : 'h-6 w-6'"
      decoding="async"
    />
    <!-- 中英文上下堆叠：flex-col 纵向排列；leading-none 去掉行高避免上下留白过大 -->
    <span class="flex flex-col">
      <!-- 中文名：font-bold 加粗；tracking-tight 收紧字距让标识更紧凑；
           text-xl 桌面 1.25rem(20px)，与原型中文名实测高度一致 -->
      <span
        class="font-bold leading-none tracking-tight text-ink-900"
        :class="props.size === 'md' ? 'text-base lg:text-xl' : 'text-sm'"
        >{{ props.name }}</span
      >
      <!-- 英文名：lg:text-[9px] 极小号 + lg:tracking-[0.1em] 宽字距，
           让 15 个字母整体宽度（约 95px）与上方 5 个中文（约 100px）基本齐平，形成方块感；
           text-ink-400 弱化色；mt-1 与中文留 0.25rem 间隙 -->
      <span
        class="mt-1 font-medium leading-none tracking-[0.16em] text-ink-400 lg:tracking-[0.1em]"
        :class="props.size === 'md' ? 'text-[8px] lg:text-[9px]' : 'text-[8px]'"
        >{{ props.nameEn }}</span
      >
    </span>
  </a>
</template>
