<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'

/**
 * 区块外壳：锚点 id + 上下留白 + 标题区 + 插槽内容 + 滚动进场。
 * 后面补首页那些区块时都套它，间距和标题字号就不会各写一套。
 */
interface Props {
  /** 锚点 id，页内跳转和分享定位用 */
  id: string
  /** 区块主标题 */
  heading: string
  /** 标题下的一句话，不传就不渲染 */
  desc?: string
  /** 白底 / 浅灰底，相邻区块交替用，出层次 */
  tone?: 'white' | 'muted'
  /** 内容宽度：wide 1280 适合卡片栅格，narrow 768 适合纯文字 */
  width?: 'wide' | 'narrow'
}

const props = withDefaults(defineProps<Props>(), {
  desc: '',
  tone: 'white',
  width: 'wide',
})

// section 根节点交给 useReveal 观察是否进视口
const rootEl = useTemplateRef<HTMLElement>('root')
const visible = useReveal(rootEl)

const sectionClass = computed(() => [
  // 锚点跳转时留出顶栏高度（手机 4rem、桌面 84px），和顶栏高度、main 的上内边距三处要一致
  'scroll-mt-16 lg:scroll-mt-[84px]',
  // 上下留白：手机 3.5rem、≥640 5rem、≥1024 6rem
  'py-14 sm:py-20 lg:py-24',
  // 进场过渡 700ms 缓出
  'transition-all duration-700 ease-out',
  props.tone === 'muted' ? 'bg-ink-50' : 'bg-white',
])
</script>

<template>
  <section
    :id="props.id"
    ref="root"
    :class="[
      sectionClass,
      // 进视口前下移 1.5rem 且透明，进来后归位
      visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
    ]"
  >
    <!-- 内容容器：和顶栏同一条基准线（1440 下左右 80px）；narrow 再收一层 max-w-3xl(48rem) -->
    <div class="container-page" :class="props.width === 'narrow' ? 'max-w-3xl' : ''">
      <!-- 标题组居中，和左右对称的留白形成中轴 -->
      <div class="text-center">
        <!-- 主标题：24 / 30 / 36 逐级放大，bold + 收紧字距 -->
        <h2 class="text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl lg:text-4xl">
          {{ props.heading }}
        </h2>
        <!-- 描述：max-w-2xl 控制每行字数，别铺满整行；mt-3 手机 0.75rem、≥640 1rem -->
        <p
          v-if="props.desc"
          class="mx-auto mt-3 max-w-2xl text-sm text-ink-600 sm:mt-4 sm:text-base"
        >
          {{ props.desc }}
        </p>
      </div>

      <!-- 各区块自己的内容 -->
      <slot />
    </div>
  </section>
</template>
