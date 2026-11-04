<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.04
 * @Name: 首页第八屏：运输协同
-->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { siteConfig } from '@/config/site'
import collabImg from '@/assets/home/images/collab-flow.webp'

/**
 * 第八屏：运输协同（原型 08）。
 * 环形闭环图直接用设计导出的整图（collab-flow.png，文字都在图里），
 * 组件只负责标题区和面板的背景色晕。
 */
const { collab } = siteConfig

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
  <section ref="root" class="bg-white pb-[80px] pt-[100px]">
    <div class="container-page">
      <!-- 眉题：跟前几屏同款，11px 橙色宽字距 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ collab.eyebrow }}
      </p>

      <!-- 板块标题：32px 加粗 -->
      <h2
        class="reveal mt-[24px] text-[32px] font-bold leading-[42px] text-ink-900"
        style="--d: 80ms"
      >
        {{ collab.title }}
      </h2>

      <!-- 两行说明：14px 弱化灰 -->
      <p class="reveal mt-[32px] max-w-[880px] text-[14px] leading-[24px] text-ink-600" style="--d: 160ms">
        {{ collab.desc }}
      </p>

      <!-- 闭环图面板：整图铺在色晕底上。
           色晕按原型逐点采样定的：左绿右橙都很淡（峰值约 #f0f9f4 / #fbf7f2），
           峰不在边缘——左绿在 27% 宽、右橙在 73% 宽处，两端渐隐成中性白 -->
      <div
        class="collab-bg reveal relative mt-[36px] overflow-hidden rounded-[16px] border border-ink-100 p-[16px] sm:p-[28px]"
        style="--d: 240ms"
      >
        <!-- 整图 4848×2336（约 2.08:1），随面板宽度缩放；窄屏横向滚动保文字可读 -->
        <div class="overflow-x-auto">
          <img
            :src="collabImg"
            alt="运输协同闭环流程图：化工企业、威易达化工、威易达物流、威易达司机四方围绕全链路数据闭环流转"
            class="mx-auto block w-full min-w-[980px] max-w-[1240px]"
            draggable="false"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 面板底色：近白打底，两团径向色晕按原型峰值色 #f0f9f4（绿）/ #fbf7f2（暖）取值 */
.collab-bg {
  background:
    radial-gradient(38% 56% at 27% 52%, rgba(226, 244, 235, 0.55) 0%, rgba(226, 244, 235, 0) 100%),
    radial-gradient(32% 50% at 73% 46%, rgba(250, 238, 224, 0.45) 0%, rgba(250, 238, 224, 0) 100%),
    #fdfefd;
}

/* 入场跟前几屏同一套：.in 触发一次性动画，延迟走行内 --d */
.reveal {
  opacity: 0;
}

.in .reveal {
  opacity: 1;
  animation: collab-rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) backwards;
  animation-delay: var(--d, 0ms);
}

@keyframes collab-rise {
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
