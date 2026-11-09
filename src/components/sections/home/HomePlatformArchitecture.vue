<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 首页第四屏：平台功能结构
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'
import glowImg from '@/assets/home/images/glow.webp'

const { architecture } = siteConfig

const root = useTemplateRef<HTMLElement>('root')
// 通电动画的触发点单独挂在架构图上：section 太高，挂在根上会在标题刚探头时就开播，
// 等用户滚到能看见架构图早就播完了。露出 35% 才点亮，滚到哪播到哪
const layers = useTemplateRef<HTMLElement>('layers')
useReveal(root)
useReveal(layers, 0.35)
</script>

<template>
  <!-- 区块：arch-bg 暗绿底（写在末尾 style）；relative + overflow-hidden 裁掉探出的光斑；
       pt-[136px] 上留白 136px、pb-[64px] 下留白 64px -->
  <section ref="root" class="arch-bg relative overflow-hidden pb-[64px] pt-[136px]">
    <!-- 背景光斑：absolute -top-[230px] right-[-130px] 探出右上角、w-[900px]；
         mix-blend-screen 吃掉素材黑底、blur-[50px] 揉开硬边、opacity-80；
         arch-glow 类挂 20s 漂移动画，视口外暂停（见末尾 style） -->
    <img
      loading="lazy"
      decoding="async"
      :src="glowImg"
      alt=""
      aria-hidden="true"
      class="arch-glow pointer-events-none absolute -top-[230px] right-[-130px] w-[900px] select-none opacity-80 mix-blend-screen blur-[50px]"
    />

    <div class="container-page relative">
      <!-- 眉题：reveal 走入场；11px/16px 加粗、字距 0.05em（sm 起 0.2em）、brand-500 橙 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ architecture.eyebrow }}
      </p>

      <!-- 标题：mt-[20px] 与眉题间距 20px；32px/42px 加粗、暗底上用 text-white -->
      <h2
        class="reveal mt-[20px] text-[32px] font-bold leading-[42px] text-white"
        style="--d: 80ms"
      >
        {{ architecture.title }}
      </h2>

      <!-- 说明：mt-[72px] 与标题间距 72px；14px/22px、#9db4a8 灰绿 -->
      <p class="reveal mt-[72px] text-[14px] leading-[22px] text-[#9db4a8]" style="--d: 160ms">
        {{ architecture.desc }}
      </p>

      <!-- 六层架构：mt-[36px] 与说明间距 36px；flex-col gap-[14px] 行距 14px；
           通电入场由本块自己的 .in 触发（层名先亮，块从左到右逐个点亮） -->
      <div ref="layers" class="arch-layers mt-[36px] flex flex-col gap-[14px]">
        <div
          v-for="(layer, i) in architecture.layers"
          :key="layer.label"
          class="flex flex-col gap-[8px] sm:flex-row sm:items-center sm:gap-[24px]"
        >
          <!-- 层名：12px/18px、shrink-0 不被压缩、sm:w-[64px] 定宽；
               业务层 highlight 时换 #d9bd97 浅棕，其余层 night-400 灰绿；
               arch-name 先亮层名（--d = 240 + 层序 × 80ms） -->
          <span
            class="arch-name shrink-0 text-[12px] leading-[18px] sm:w-[64px]"
            :class="layer.highlight ? 'text-[#d9bd97]' : 'text-night-400'"
            :style="{ '--d': `${240 + i * 80}ms` }"
            >{{ layer.label }}</span
          >

          <!-- 块区：flex-1 占满层名右侧；列数走 --cols 变量（sm 起生效，见末尾 style）；
               块数 ≥5 时文字降到 13px；arch-on 通电点亮：层名亮后 140ms 起、每块 +55ms -->
          <div
            v-if="layer.blocks"
            class="layer-grid flex-1"
            :style="{ '--cols': layer.blocks.length }"
          >
            <div
              v-for="(block, bi) in layer.blocks"
              :key="block"
              class="arch-on flex h-[44px] items-center justify-center rounded-[8px] bg-night-800 text-center text-[14px] leading-[20px] text-white"
              :class="layer.blocks!.length >= 5 ? 'px-[8px] text-[13px]' : ''"
              :style="{ '--d': `${240 + i * 80 + 140 + bi * 55}ms` }"
            >
              {{ block }}
            </div>
          </div>

          <!-- 业务层：与普通层同构，只是块换成棕卡；
               --cols 固定 4，四张卡也是 arch-on 逐张点亮（每张 +70ms） -->
          <div v-else-if="layer.modules" class="layer-grid flex-1" :style="{ '--cols': 4 }">
            <!-- 模块卡：rounded-[10px] 圆角、border #7d5530 + bg #5b391d 棕系；
                 px-[12px] 左右、pt-[12px] 上、pb-[38px] 下留白；
                 card-lift-dark 给 hover 投影浮现，描边亮起写在末尾 style -->
            <div
              v-for="(mod, mi) in layer.modules"
              :key="mod.title"
              class="arch-on arch-module card-lift card-lift-dark rounded-[10px] border border-[#7d5530] bg-[#5b391d] px-[12px] pb-[38px] pt-[12px]"
              :style="{ '--d': `${240 + i * 80 + 140 + mi * 70}ms` }"
            >
              <h3 class="text-[15px] font-bold leading-[22px] text-white">{{ mod.title }}</h3>
              <p class="mt-[4px] text-[11px] leading-[16px] text-[#d9bd97]">（{{ mod.desc }}）</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 提示条：mt-[80px] 与架构图间距 80px；flex 垂直居中、gap-[12px]；
           px-[20px] py-[14px]，lg 下改 h-[48px] 定高 + py-0；bg #162c23、圆角 10px；
           arch-note 跟随架构图的 .in 一起入场（紧邻兄弟选择器） -->
      <div
        class="arch-note mt-[80px] flex items-center gap-[12px] rounded-[10px] bg-[#162c23] px-[20px] py-[14px] lg:h-[48px] lg:py-0"
        style="--d: 760ms"
      >
        <!-- 绿点：6×6 圆点，shrink-0 不被文字挤压，#57d193 绿 -->
        <span class="h-[6px] w-[6px] shrink-0 rounded-full bg-[#57d193]" aria-hidden="true" />
        <!-- 提示文字：13px/22px、#a9c0b4 灰绿 -->
        <p class="text-[13px] leading-[22px] text-[#a9c0b4]">{{ architecture.note }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.arch-bg {
  background: #0f211b;
}

.arch-name,
.arch-on,
.arch-note {
  opacity: 0;
}

/* 通电入场只认架构图自己的 .in：露出 35% 才开播，不会提前在视口外播完 */
.arch-layers.in .arch-name,
.arch-layers.in .arch-on,
.arch-layers.in + .arch-note {
  opacity: 1;
  animation: arch-power 0.45s cubic-bezier(0.22, 1, 0.36, 1) backwards;
  animation-delay: var(--d, 0ms);
}

@keyframes arch-power {
  from {
    opacity: 0;
    transform: scale(0.94);
  }
}

.arch-module {
  transition: border-color 260ms ease;
}

.arch-module:hover {
  border-color: #b8823f;
}

@media (prefers-reduced-motion: reduce) {
  .arch-name,
  .arch-on,
  .arch-note,
  .arch-layers.in .arch-name,
  .arch-layers.in .arch-on,
  .arch-layers.in + .arch-note {
    opacity: 1;
    animation: none;
  }
}

.arch-glow {
  animation: arch-drift 20s ease-in-out infinite alternate;
  animation-play-state: paused;
}

@keyframes arch-drift {
  to {
    transform: translate(-40px, 24px) scale(1.05);
  }
}

.in .arch-glow {
  animation-play-state: running;
}

@media (prefers-reduced-motion: reduce) {
  .arch-glow {
    animation: none;
  }
}

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
</style>
