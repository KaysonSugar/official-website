<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.04
 * @Name: 首页第十屏：降本增效
-->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { siteConfig } from '@/config/site'

/**
 * 第十屏：降本增效（原型 S9）。
 * 暖白渐变底：上排四张违规风险卡（黑标题 + 橙红处罚行 + 灰防控行），
 * 下排一张宽卡装四列收益（顶部小色条，前两绿后两橙）。
 * 颜色从原型采的：处罚 #d24c0f、绿条 #36ad85、橙条 #f58546。
 */
const { costEfficiency } = siteConfig

// 和前几屏同一套：IntersectionObserver 滚进来才播入场
const root = ref<HTMLElement>()

onMounted(() => {
  const el = root.value
  if (!el) return
  if (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    !('IntersectionObserver' in window)
  ) {
    el.classList.add('in')
    return
  }
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        el.classList.add('in')
        io.disconnect()
      }
    },
    { threshold: 0.15 },
  )
  io.observe(el)
})
</script>

<template>
  <section ref="root" class="cost-bg relative pb-[96px] pt-[100px]">
    <div class="container-page">
      <!-- 眉题：跟前几屏同款，11px 橙色宽字距 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ costEfficiency.eyebrow }}
      </p>

      <!-- 板块标题：32px 加粗 -->
      <h2
        class="reveal mt-[44px] text-[32px] font-bold leading-[42px] text-ink-900"
        style="--d: 80ms"
      >
        {{ costEfficiency.title }}
      </h2>

      <!-- 一行说明：14px 弱化灰 -->
      <p class="reveal mt-[24px] text-[14px] leading-[24px] text-ink-600" style="--d: 160ms">
        {{ costEfficiency.desc }}
      </p>

      <!-- 四张违规风险卡：暖调细边框白卡。窄屏两列、手机单列 -->
      <div class="mt-[36px] grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="(risk, i) in costEfficiency.risks"
          :key="risk.title"
          class="reveal card-lift rounded-[12px] border border-[#eee3da] bg-white p-[24px]"
          :style="{ '--d': `${240 + i * 70}ms` }"
        >
          <h3 class="text-[16px] font-bold leading-[24px] text-ink-900">{{ risk.title }}</h3>
          <!-- 处罚行：深橙红，原型最饱和像素采的 #d24c0f -->
          <p class="mt-[10px] text-[13px] font-semibold leading-[20px] text-[#d24c0f]">
            {{ risk.penalty }}
          </p>
          <p class="mt-[8px] text-[12px] leading-[20px] text-ink-600">{{ risk.guard }}</p>
        </article>
      </div>

      <!-- 收益宽卡：一张白卡里四列，顶部小色条前两列绿后两列橙 -->
      <div
        class="reveal mt-[24px] rounded-[12px] border border-[#eee3da] bg-white px-[32px] py-[36px]"
        style="--d: 560ms"
      >
        <div class="grid grid-cols-1 gap-[32px] sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="gain in costEfficiency.gains" :key="gain.title">
            <!-- 小色条：24×4 圆角，绿 #36ad85 / 橙 #f58546 -->
            <span
              class="block h-[4px] w-[24px] rounded-full"
              :class="gain.tone === 'green' ? 'bg-[#36ad85]' : 'bg-[#f58546]'"
            />
            <h3 class="mt-[16px] text-[15px] font-bold leading-[22px] text-ink-900">
              {{ gain.title }}
            </h3>
            <p class="mt-[8px] text-[13px] leading-[22px] text-ink-600">{{ gain.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 暖白渐变底：原型四角采色，顶部偏奶油 #fff7f0，向下渐到近白 */
.cost-bg {
  background: linear-gradient(180deg, #fff7f0 0%, #fff9f2 55%, #fffcf9 100%);
}

/* 入场跟前几屏同一套：.in 触发一次性动画，延迟走行内 --d */
.reveal {
  opacity: 0;
}

.in .reveal {
  opacity: 1;
  animation: cost-rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) backwards;
  animation-delay: var(--d, 0ms);
}

@keyframes cost-rise {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
  }

  .in .reveal {
    animation: none;
  }
}
</style>
