<script setup lang="ts">
import { computed, useSlots } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { siteConfig } from '@/config/site'

/**
 * 内页首屏：小标签 + 大标题 + 一句话 + 主按钮。
 * 生产/物流/司机三页左对齐（右边配卡片），服务支持页居中，
 * 对齐方式从 site.ts 的 align 读，组件里不写死。
 * 右侧卡片区是默认插槽，还没设计稿的页面先空着。
 */
interface Props {
  /** 标题上方的小标签 */
  eyebrow: string
  /** 页面主标题 */
  title: string
  /** 标题下的一句话 */
  desc: string
  /** 左对齐 / 居中 */
  align?: 'left' | 'center'
}

const props = withDefaults(defineProps<Props>(), { align: 'left' })

const slots = useSlots()
// 没给插槽就不留右侧占位，免得左对齐版式里多出一块空
const hasAside = computed(() => Boolean(slots.default))
const isCenter = computed(() => props.align === 'center')
</script>

<template>
  <!-- 首屏：relative 给光斑定位，overflow-hidden 裁掉溢出的色块；
       底是浅橙到白的纵向渐变，和首页首屏同一套，切页不断层 -->
  <section class="relative overflow-hidden bg-gradient-to-b from-brand-50 via-brand-50/40 to-white">
    <!-- 右上橙光斑：手机 288、≥640 384，blur-3xl 糊开；-z-10 压到文字下面，不挡点击 -->
    <div
      class="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl sm:h-96 sm:w-96"
      aria-hidden="true"
    />

    <!-- 内容容器：和顶栏同一条基准线；上下留白 手机 56 / ≥640 64 / ≥1024 80 -->
    <div class="container-page py-14 sm:py-16 lg:py-20" :class="isCenter ? 'text-center' : ''">
      <!-- 左对齐且有插槽时走两栏，否则单栏 -->
      <div :class="hasAside && !isCenter ? 'grid items-center gap-12 lg:grid-cols-2' : ''">
        <div :class="isCenter ? 'mx-auto max-w-3xl' : 'max-w-xl'">
          <!-- 小标签：12px、品牌橙、0.18em 宽字距 -->
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-brand-500">
            {{ props.eyebrow }}
          </p>

          <!-- 主标题：手机 30、≥640 36、桌面 44（按画板量级），行高收紧 -->
          <h1
            class="mt-4 text-3xl font-bold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-[44px]"
          >
            {{ props.title }}
          </h1>

          <!-- 说明：和标题隔 1.25rem，次级灰，行高 1.625 -->
          <p class="mt-5 text-base leading-relaxed text-ink-600 lg:text-lg">
            {{ props.desc }}
          </p>

          <!-- 主按钮：和顶栏「预约演示」同一个入口 -->
          <div class="mt-8">
            <BaseButton :href="siteConfig.contact.ctaHref" size="lg">
              {{ siteConfig.contact.ctaLabel }}
            </BaseButton>
          </div>
        </div>

        <!-- 右侧示意图，由各页面塞进来 -->
        <div v-if="hasAside && !isCenter">
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>
