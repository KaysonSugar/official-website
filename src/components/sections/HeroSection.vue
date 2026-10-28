<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import { siteConfig } from '@/config/site'

/**
 * 首屏 Hero（原型 01 首页 的第一屏）
 *
 * 文案取自 config/site.ts，改稿不用动模板。
 * 背景用「浅橙到白」的纵向渐变，承接品牌色但不喧宾夺主。
 */
</script>

<template>
  <!-- 首屏：relative 为装饰光斑提供定位基准；overflow-hidden 裁掉溢出的光斑；
       bg-gradient-to-b 纵向渐变：brand-50 极浅橙 → 50% 处已过渡到 40% 透明度 → 底部纯白，
       这样暖色集中在上半屏、向下自然消失，不会在中段出现肉眼可见的横向色带 -->
  <section
    id="home"
    class="relative overflow-hidden bg-gradient-to-b from-brand-50 via-brand-50/40 to-white"
  >
    <!-- 装饰光斑：absolute 绝对定位在右上角；-z-10 压到内容下方（不遮挡按钮点击）；
         h-72 w-72 尺寸 18rem；rounded-full 正圆；bg-brand-200/40 四成透明度品牌橙；
         blur-3xl 大半径模糊，形成柔和的色块氛围 -->
    <div
      class="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl sm:h-96 sm:w-96"
      aria-hidden="true"
    />

    <!-- 内容容器：container-page 与顶栏同一条左右基准线（1440px 下左右各 80px，见 style.css）；
         text-center 文字居中；pt-16 顶部内边距 4rem（lg:pt-24 为 6rem）给固定顶栏之外再留呼吸空间；
         pb-20 / lg:pb-28 底部逐级加宽 -->
    <div class="container-page pb-20 pt-16 text-center sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24">
      <!-- 主标题：text-3xl 手机 1.875rem → sm:text-4xl → lg:text-5xl → xl:text-6xl 逐级放大；
           font-bold 加粗；tracking-tight 收紧字距；leading-tight 行高 1.25 防止大标题行间距过松；
           mx-auto + max-w-3xl（lg 下 4xl）限制换行位置，避免一行过长 -->
      <h1
        class="mx-auto max-w-3xl text-3xl font-bold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:max-w-4xl lg:text-5xl xl:text-6xl"
      >
        {{ siteConfig.hero.title }}
      </h1>

      <!-- 副标题：mx-auto + max-w-2xl 控制每行字数（约 30 字），保证可读性；
           mt-5 上边距 1.25rem（sm:mt-6 为 1.5rem）；text-base → lg:text-lg；
           text-ink-600 次级文字色；leading-relaxed 行高 1.625 -->
      <p class="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-600 sm:mt-6 lg:text-lg">
        {{ siteConfig.hero.tagline }}
      </p>

      <!-- 按钮组：mt-8 与副标拉开 2rem（sm:mt-10 为 2.5rem）；
           flex 横向排列 + justify-center 居中；flex-col 手机纵向堆叠（按钮更宽好点），sm:flex-row 平板起横排；
           gap-3 间距 0.75rem -->
      <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row">
        <BaseButton :href="siteConfig.contact.ctaHref" size="lg" class="w-full sm:w-auto">
          {{ siteConfig.hero.primaryCta }}
        </BaseButton>
        <BaseButton
          :href="siteConfig.navItems[1].href"
          variant="outline"
          size="lg"
          class="w-full sm:w-auto"
        >
          {{ siteConfig.hero.secondaryCta }}
        </BaseButton>
      </div>
    </div>
  </section>
</template>
