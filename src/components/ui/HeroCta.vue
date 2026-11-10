<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.10
 * @Name: 首屏主按钮
-->
<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import { useLeadForm } from '@/composables/useLeadForm'

/** 全站首屏主按钮：点开预约弹层，样式与首页首屏那颗一致 */
interface Props {
  /** 按钮文字 */
  label: string
}

const props = defineProps<Props>()

const { openLeadForm } = useLeadForm()
</script>

<template>
  <!-- 按钮：lg 下高 50px、宽 360px，手机满宽 -->
  <BaseButton
    size="lg"
    class="hero-cta w-full sm:w-auto lg:h-[50px] lg:w-[360px]"
    @click="openLeadForm"
  >
    <span class="hero-cta-ring" aria-hidden="true">
      <span class="hero-cta-comet" />
    </span>
    {{ props.label }}
  </BaseButton>
</template>

<style scoped>
.hero-cta {
  position: relative;
}

.hero-cta::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow:
    0 0 0 5px rgba(255, 255, 255, 0.55),
    0 16px 40px -8px rgba(233, 97, 31, 0.6);
  opacity: 0;
  transition: opacity 260ms ease;
  pointer-events: none;
}

.hero-cta:hover::after {
  animation: hero-cta-glow 1.4s ease-in-out infinite alternate;
}

@keyframes hero-cta-glow {
  from {
    opacity: 0.12;
  }
  to {
    opacity: 1;
  }
}

.hero-cta-ring {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 2px;
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  mask-composite: exclude;
  overflow: hidden;
  pointer-events: none;
}

.hero-cta-comet {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 440px;
  height: 440px;
  margin: -220px 0 0 -220px;
  background: conic-gradient(
    transparent 0turn,
    transparent 0.62turn,
    rgba(255, 236, 214, 0.25) 0.82turn,
    rgba(255, 255, 255, 0.8) 0.955turn,
    #fff 0.995turn,
    transparent 1turn
  );
  animation: hero-meteor 4.2s linear infinite;
}

@keyframes hero-meteor {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-cta-comet,
  .hero-cta::after {
    animation: none;
  }

  .hero-cta:hover::after {
    opacity: 0.75;
  }
}
</style>
