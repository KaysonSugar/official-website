<script setup lang="ts">
import { computed, useSlots } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { siteConfig } from '@/config/site'

/**
 * 子页面首屏（4 个内页共用）
 *
 * 对应原型里除首页之外的 4 张画板：顶部都是「小标签 + 大标题 + 一句话说明 + 主按钮」，
 * 区别只在文字对齐方式——生产/物流/司机三页是左对齐（右侧配示意卡片），
 * 解决方案页是居中排版。对齐方式由 config/site.ts 里的 align 控制，组件不写死。
 *
 * 右侧卡片区留成默认插槽：具体每个页面的示意图还没从原型拆过来，
 * 后续按页面分别插入，不影响本组件的排版逻辑。
 */
interface Props {
  /** 主标题上方的小标签 */
  eyebrow: string
  /** 页面主标题 */
  title: string
  /** 标题下的一句话说明 */
  desc: string
  /** 文字对齐：left 左对齐 / center 居中 */
  align?: 'left' | 'center'
}

const props = withDefaults(defineProps<Props>(), { align: 'left' })

const slots = useSlots()
// 没传插槽时不渲染右侧占位列，避免左对齐版式里多出一块空白
const hasAside = computed(() => Boolean(slots.default))
const isCenter = computed(() => props.align === 'center')
</script>

<template>
  <!-- 首屏容器：relative 供装饰光斑定位；overflow-hidden 裁掉溢出的色块；
       bg-gradient-to-b 浅橙到白的纵向渐变，与首页 Hero 同一套底，切页时视觉不断层 -->
  <section class="relative overflow-hidden bg-gradient-to-b from-brand-50 via-brand-50/40 to-white">
    <!-- 装饰光斑：右上角柔和橙块，-z-10 压到内容下方不挡点击 -->
    <div
      class="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl sm:h-96 sm:w-96"
      aria-hidden="true"
    />

    <!-- 内容容器：container-page 与顶栏同一条左右基准线（1440px 下左右 80px）；
         pt-14 / lg:pt-20 顶部内边距，pb-16 / lg:pb-24 底部留白 -->
    <div class="container-page py-14 sm:py-16 lg:py-20" :class="isCenter ? 'text-center' : ''">
      <!-- 左对齐且有插槽时走两栏：文字在左、示意卡片在右；否则单栏 -->
      <div :class="hasAside && !isCenter ? 'grid items-center gap-12 lg:grid-cols-2' : ''">
        <div :class="isCenter ? 'mx-auto max-w-3xl' : 'max-w-xl'">
          <!-- 小标签：品牌橙 + 极小号 + 宽字距，作为版面上方的"眉标" -->
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-brand-500">
            {{ props.eyebrow }}
          </p>

          <!-- 主标题：手机 text-3xl，lg:text-[44px] 桌面按原型画板量级放大；
               leading-tight 收紧行高；tracking-tight 收紧字距 -->
          <h1
            class="mt-4 text-3xl font-bold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-[44px]"
          >
            {{ props.title }}
          </h1>

          <!-- 说明：mt-5 与标题拉开 1.25rem；text-ink-600 次级色；leading-relaxed 行高 1.625 -->
          <p class="mt-5 text-base leading-relaxed text-ink-600 lg:text-lg">
            {{ props.desc }}
          </p>

          <!-- 主按钮：与顶栏「预约演示」同一入口，直接拨号 -->
          <div class="mt-8">
            <BaseButton :href="siteConfig.contact.ctaHref" size="lg">
              {{ siteConfig.contact.ctaLabel }}
            </BaseButton>
          </div>
        </div>

        <!-- 右侧示意卡片区：由各页面自行插入，未插入时不占位 -->
        <div v-if="hasAside && !isCenter">
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>
