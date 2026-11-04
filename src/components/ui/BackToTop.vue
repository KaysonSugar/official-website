<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.04
 * @Name: 回到顶部按钮
-->
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * 回到顶部：滚动超过阈值浮出，点击平滑回顶。挂在 App.vue，全站共用。
 */
const props = defineProps<{
  /** 显示阈值：滚动距离超过这个 px 才出现 */
  visibilityHeight?: number
}>()

const visible = ref(false)

// 滚动监听只注册一次，回调里读 scrollY 切 visible，passive 不阻塞滚动
const onScroll = () => {
  visible.value = window.scrollY >= (props.visibilityHeight ?? 120)
}

onMounted(() => {
  onScroll() // 带着滚动位置刷新时（比如锚点跳回来），进来就对齐一次状态
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <!-- 淡入 + 上浮 8px；按钮用 button 保证键盘可达 -->
  <Transition name="btt">
    <button
      v-show="visible"
      type="button"
      aria-label="回到顶部"
      class="fixed bottom-[60px] right-[32px] z-[1000] flex h-[44px] w-[44px] items-center justify-center rounded-full border border-ink-100 bg-white text-ink-600 shadow-[0_10px_28px_-10px_rgba(26,26,26,0.25)] transition-colors duration-200 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-500"
      @click="scrollToTop"
    >
      <!-- 箭头：一根 2px 圆头折线，跟首屏卖点胶囊的对勾同一笔法 -->
      <svg class="h-[16px] w-[16px]" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M3.5 10 8 5.5 12.5 10"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
/* 显隐过渡只动 opacity/transform；reduced-motion 下直接切，不做动画 */
.btt-enter-active,
.btt-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.btt-enter-from,
.btt-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (prefers-reduced-motion: reduce) {
  .btt-enter-active,
  .btt-leave-active {
    transition: none;
  }
}
</style>
