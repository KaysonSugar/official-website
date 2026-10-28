<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'

interface Props {
  title: string
  desc: string
  /** 进场延迟毫秒数：由父组件按下标传入，实现多张卡片依次浮现的错峰效果 */
  delay?: number
}

const props = defineProps<Props>()

// 滚动进场：卡片进入视口后淡入上移；用户开启减弱动效时直接显示
const cardEl = useTemplateRef<HTMLLIElement>('card')
const visible = useReveal(cardEl)
</script>

<template>
  <!-- 能力卡片：rounded-2xl 圆角 1rem；border border-brand-100 浅蓝描边；bg-white 白底；
       p-6 手机内边距 1.5rem，sm:p-8 平板及以上 2rem；
       transition-all duration-700 ease-out 进场过渡；hover:shadow-md 悬停淡入阴影作为微交互；
       opacity-0 + translate-y-6 为进场前状态（下方 2.5rem 处上移淡入），visible 后归位 -->
  <li
    ref="card"
    class="rounded-2xl border border-brand-100 bg-white p-6 transition-all duration-700 ease-out hover:shadow-md sm:p-8"
    :class="visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
    :style="{ transitionDelay: `${props.delay ?? 0}ms` }"
  >
    <!-- 卡片标题：text-base 手机 1rem，sm:text-lg 1.125rem；font-semibold 半粗；text-ink-900 主文字色 -->
    <h3 class="text-base font-semibold text-ink-900 sm:text-lg">{{ props.title }}</h3>
    <!-- 卡片描述：mt-2 手机上边距 0.5rem（sm:mt-3 为 0.75rem）；text-sm 小字号 0.875rem；
         leading-relaxed 宽松行高提升窄屏下的可读性 -->
    <p class="mt-2 text-sm leading-relaxed text-ink-600 sm:mt-3">{{ props.desc }}</p>
  </li>
</template>
