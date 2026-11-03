<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 首页第四屏：平台功能结构
-->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { siteConfig } from '@/config/site'

/**
 * 第四屏：平台功能结构（原型 04）。
 * 暗色分层架构图，纯文字没图标：左边层名一列，右边每层一排块。
 * 业务层那排是四张棕色模块卡（模块名 + 能力清单），其余层是等高文字块。
 */
const { architecture } = siteConfig

// 和第二、三屏同一套：IntersectionObserver 滚进来才播入场
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
  <section ref="root" class="arch-bg pb-[80px] pt-[136px]">
    <div class="container-page">
      <!-- 眉题：跟前三屏同款，11px 橙色宽字距 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ architecture.eyebrow }}
      </p>

      <!-- 板块标题：32px 加粗，暗底上用白字 -->
      <h2
        class="reveal mt-[20px] text-[32px] font-bold leading-[42px] text-white"
        style="--d: 80ms"
      >
        {{ architecture.title }}
      </h2>

      <!-- 一行说明：原型里离标题远、贴着架构图，14px 灰绿 -->
      <p
        class="reveal mt-[72px] text-[14px] leading-[22px] text-[#9db4a8]"
        style="--d: 160ms"
      >
        {{ architecture.desc }}
      </p>

      <!-- 六层架构：左列层名 64px + 右侧块区；行距 14，一行一层依次浮上来 -->
      <div class="mt-[36px] flex flex-col gap-[14px]">
        <div
          v-for="(layer, i) in architecture.layers"
          :key="layer.label"
          class="reveal flex flex-col gap-[8px] sm:flex-row sm:items-center sm:gap-[24px]"
          :style="{ '--d': `${240 + i * 80}ms` }"
        >
          <!-- 层名：12px 灰绿，窄屏时整行占一行 -->
          <span
            class="shrink-0 text-[12px] leading-[18px] text-night-400 sm:w-[64px]"
          >{{ layer.label }}</span>

          <!-- 普通层：等宽文字块，块数即列数（--cols 交给 scoped 样式做响应式）；
               资源服务层 5 块太挤，文字降到 13px -->
          <div
            v-if="layer.blocks"
            class="layer-grid flex-1"
            :style="{ '--cols': layer.blocks.length }"
          >
            <div
              v-for="block in layer.blocks"
              :key="block"
              class="flex h-[38px] items-center justify-center rounded-[8px] bg-night-800 text-center text-[14px] leading-[20px] text-white"
              :class="layer.blocks!.length >= 5 ? 'px-[8px] text-[13px]' : ''"
            >
              {{ block }}
            </div>
          </div>

          <!-- 业务层：四张棕卡，模块名白粗体，能力清单小字浅棕 -->
          <div v-else-if="layer.modules" class="layer-grid flex-1" :style="{ '--cols': 4 }">
            <div
              v-for="mod in layer.modules"
              :key="mod.title"
              class="rounded-[10px] border border-[#7d5530] bg-[#5b391d] p-[12px]"
            >
              <h3 class="text-[15px] font-bold leading-[22px] text-white">{{ mod.title }}</h3>
              <p class="mt-[4px] text-[11px] leading-[16px] text-[#d9bd97]">（{{ mod.desc }}）</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部提示条：比架构图低一截，绿点开头，窄屏自动加高 -->
      <div
        class="reveal mt-[80px] flex items-center gap-[12px] rounded-[10px] bg-[#162c23] px-[20px] py-[14px] lg:h-[48px] lg:py-0"
        style="--d: 760ms"
      >
        <span class="h-[6px] w-[6px] shrink-0 rounded-full bg-[#57d193]" aria-hidden="true" />
        <p class="text-[13px] leading-[22px] text-[#a9c0b4]">{{ architecture.note }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 暗底：夜色绿打底，上方压一层很淡的径向光斑（原型顶部那片微亮），
   光斑用半透明色才能跟底色融在一起 */
.arch-bg {
  background:
    radial-gradient(52% 42% at 60% 8%, rgba(38, 78, 61, 0.5) 0%, rgba(38, 78, 61, 0) 70%),
    #0f211b;
}

/* 每层块区的列数：窄屏先叠一列，sm 起按 --cols 等分（块数不同不能写死类名） */
.layer-grid {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .layer-grid {
    grid-template-columns: repeat(var(--cols, 1), minmax(0, 1fr));
  }
}

/* 入场跟前三屏同一套：.in 触发一次性动画，延迟走行内 --d */
.reveal {
  opacity: 0;
}

.in .reveal {
  opacity: 1;
  animation: arch-rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) backwards;
  animation-delay: var(--d, 0ms);
}

@keyframes arch-rise {
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
