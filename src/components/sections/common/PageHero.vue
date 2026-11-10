<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 内页首屏
-->
<script setup lang="ts">
import { computed, useSlots } from 'vue'
import HeroCta from '@/components/ui/HeroCta.vue'
import { siteConfig } from '@/config/site'

/** 内页首屏：小标签 + 大标题 + 一句话 + 主按钮，右侧插槽放各页示意图 */
interface Props {
  /** 标题上方的小标签 */
  eyebrow: string
  /** 页面主标题 */
  title: string
  /** 标题下的一句话 */
  desc: string
  /** 对齐方式，不传左对齐 */
  align?: 'left' | 'center'
  /** 按钮文案覆盖，不传用全站默认 */
  ctaLabel?: string
  /** 按钮下的服务方式胶囊，不传就不渲染 */
  features?: string[]
}

// 空串和空数组都当没传，渲染时回落到全站默认值
const props = withDefaults(defineProps<Props>(), {
  align: 'left',
  ctaLabel: '',
  features: () => [],
})

const slots = useSlots()
const hasAside = computed(() => Boolean(slots.default))
const isCenter = computed(() => props.align === 'center')
</script>

<template>
  <!-- 首屏：浅橙到白渐变底，relative 给光斑定位，overflow-hidden 裁掉探出角 -->
  <section class="relative overflow-hidden bg-gradient-to-b from-brand-50 via-brand-50/40 to-white">
    <!-- 右上橙光斑：288px / sm 384px，各探出 96px，blur 糊开并压到文字下 -->
    <div
      class="pointer-events-none absolute -right-[96px] -top-[96px] -z-10 h-[288px] w-[288px] rounded-full bg-brand-200/40 blur-3xl sm:h-[384px] sm:w-[384px]"
      aria-hidden="true"
    />

    <!-- 内容容器：和顶栏同一条基准线，上下留白 56 / 64 / 80px -->
    <div
      class="container-page py-[56px] sm:py-[64px] lg:py-[80px]"
      :class="isCenter ? 'text-center' : ''"
    >
      <!-- 左对齐且有插槽时两栏：左 3 右 2，列距 48px -->
      <div
        :class="hasAside && !isCenter ? 'grid items-center gap-[48px] lg:grid-cols-[3fr_2fr]' : ''"
      >
        <!-- 居中版限宽 768px，左对齐版限宽 576px -->
        <div :class="isCenter ? 'mx-auto max-w-3xl' : 'max-w-xl'">
          <!-- 小标签：12px 品牌橙，字距 0.18em -->
          <p class="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-500">
            {{ props.eyebrow }}
          </p>

          <!-- 主标题：30 / 36 / 44px，与标签间距 16px -->
          <h1
            class="mt-[16px] text-[30px] font-bold leading-tight tracking-tight text-ink-900 sm:text-[36px] lg:text-[44px]"
          >
            {{ props.title }}
          </h1>

          <!-- 说明：16 / 18px，与标题间距 20px -->
          <p class="mt-[20px] text-[16px] leading-relaxed text-ink-600 lg:text-[18px]">
            {{ props.desc }}
          </p>

          <!-- 主按钮：与说明间距 32px，点击唤起全站预约弹层 -->
          <div class="mt-[32px]">
            <HeroCta :label="props.ctaLabel || siteConfig.contact.ctaLabel" />
          </div>

          <!-- 服务方式胶囊：与按钮间距 36px，胶囊间距 10px，hover 走全局 .feature-pill -->
          <ul v-if="props.features.length" class="mt-[36px] flex flex-wrap gap-[10px]">
            <li
              v-for="feature in props.features"
              :key="feature"
              class="feature-pill flex items-center gap-[8px] rounded-full border border-ink-100 bg-white/80 py-[7px] pl-[12px] pr-[14px] text-[14px] font-medium text-ink-700"
            >
              <!-- 6px 橙点 -->
              <span class="h-[6px] w-[6px] shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
              {{ feature }}
            </li>
          </ul>
        </div>

        <!-- 右侧示意图插槽 -->
        <div v-if="hasAside && !isCenter">
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>
