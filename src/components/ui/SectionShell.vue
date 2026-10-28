<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'

/**
 * 区块外壳（统一容器）
 *
 * 全站每个内容区块的骨架都一样：锚点 id + 垂直留白 + 标题区 + 内容区 + 滚动进场动效。
 * 抽成一个组件后，各 *Section.vue 只关心自己放什么内容，不再重复写容器类名，
 * 也保证「所有区块的间距、标题字号、进场节奏」始终一致。
 *
 * 当前首页按原型铺 16 个区块、内页补正文时，统一用它包一层，不要各写各的 section。
 */
interface Props {
  /** 区块锚点 id，用于页内跳转（如 /products#flow）与分享链接定位 */
  id: string
  /** 区块主标题 */
  heading: string
  /** 标题下的一句话说明，不传则不渲染 */
  desc?: string
  /** 背景：white 白底 / muted 浅灰底，相邻区块交替使用以形成层次 */
  tone?: 'white' | 'muted'
  /** 内容宽度：wide 1280px（卡片栅格）/ narrow 768px（纯文字段落） */
  width?: 'wide' | 'narrow'
}

const props = withDefaults(defineProps<Props>(), {
  desc: '',
  tone: 'white',
  width: 'wide',
})

// 取 section 根节点交给 useReveal 做进场观察
const rootEl = useTemplateRef<HTMLElement>('root')
const visible = useReveal(rootEl)

const sectionClass = computed(() => [
  // scroll-mt-16 / lg:scroll-mt-[84px] 锚点跳转时预留顶栏高度（4rem / 84px），
  // 与 App.vue 中 main 的 pt-*、SiteHeader 的 h-* 三处保持一致，避免标题被固定导航遮住
  'scroll-mt-16 lg:scroll-mt-[84px]',
  // py-14 手机上下内边距 3.5rem，sm:py-20 为 5rem，lg:py-24 为 6rem
  'py-14 sm:py-20 lg:py-24',
  // transition-all duration-700 ease-out：进场过渡 700ms，缓出曲线，观感不生硬
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
      // 进入视口后归位；未进入时下移 6（1.5rem）并透明，避免首屏一次性全部出现
      visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
    ]"
  >
    <!-- 内容容器：container-page 与顶栏共用同一条左右基准线（见 style.css，1440px 下左右 80px）；
         narrow 档再叠 max-w-3xl(48rem) 收紧纯文字段落，工具类优先级高于 container-page 可直接覆盖 -->
    <div class="container-page" :class="props.width === 'narrow' ? 'max-w-3xl' : ''">
      <!-- 标题组：text-center 居中，与左右对称的区块留白形成稳定视觉中轴 -->
      <div class="text-center">
        <!-- 主标题：text-2xl 手机 1.5rem，sm:text-3xl 1.875rem，lg:text-4xl 2.25rem；
             font-bold 加粗；tracking-tight 收紧字距；text-ink-900 主文字色 -->
        <h2 class="text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl lg:text-4xl">
          {{ props.heading }}
        </h2>
        <!-- 描述：mx-auto + max-w-2xl 限制每行字数，避免长句横向铺满难读；
             mt-3 手机上边距 0.75rem（sm:mt-4 为 1rem）；text-ink-600 次级文字色 -->
        <p
          v-if="props.desc"
          class="mx-auto mt-3 max-w-2xl text-sm text-ink-600 sm:mt-4 sm:text-base"
        >
          {{ props.desc }}
        </p>
      </div>

      <!-- 业务内容：由各 Section 组件通过默认插槽注入 -->
      <slot />
    </div>
  </section>
</template>
