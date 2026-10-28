<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'

/**
 * 内容卡片：平台架构 / 产品矩阵 / 解决方案三个区块共用同一张卡片
 *
 * 结构：顶部橙色序号 + 标题 + 描述。
 * 用序号而不是图标，是因为原型尚未提供图标资源；后续接入图标时，
 * 只需把这里的序号换成一个 <img> 或 svg，不影响任何调用方。
 */
interface Props {
  /** 卡片标题 */
  title: string
  /** 卡片描述 */
  desc: string
  /** 序号（从 0 开始），显示时自动 +1 并补零 */
  index?: number
  /** 进场延迟毫秒数，用于同排卡片错峰出现 */
  delay?: number
}

const props = withDefaults(defineProps<Props>(), { index: 0, delay: 0 })

const itemEl = useTemplateRef<HTMLLIElement>('item')
const visible = useReveal(itemEl)
</script>

<template>
  <li
    ref="item"
    :style="{ transitionDelay: `${props.delay}ms` }"
    class="rounded-xl border border-ink-100 bg-white p-6 transition-all duration-700 ease-out hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-ink-900/5 sm:p-8"
    :class="visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
  >
    <!-- 序号：text-sm 小字；font-mono 等宽字体让 01/02/03 对齐；text-brand-500 品牌橙作为视觉锚点 -->
    <span class="font-mono text-sm font-medium text-brand-500">
      {{ String(props.index + 1).padStart(2, '0') }}
    </span>
    <!-- 标题：mt-3 与序号留 0.75rem；text-lg 1.125rem；font-semibold 半粗；text-ink-900 主文字色 -->
    <h3 class="mt-3 text-lg font-semibold text-ink-900">{{ props.title }}</h3>
    <!-- 描述：mt-2 上边距 0.5rem；text-sm 0.875rem；leading-relaxed 行高 1.625 提升小字可读性 -->
    <p class="mt-2 text-sm leading-relaxed text-ink-600">{{ props.desc }}</p>
  </li>
</template>
