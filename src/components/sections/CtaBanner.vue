<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import { siteConfig } from '@/config/site'

/**
 * 页面底部行动号召区（橙色横幅）
 *
 * 对应原型第 15 区块，八个页面共用 config/site.ts 里的 cta 文案。
 * 底色取 brand-700 而非主色 brand-500：白字在 brand-500 上对比度只有 2.6:1，正文发虚。
 */
</script>

<template>
  <!-- 外层白底：与上方内容区块留出干净的过渡带，不管上一块是白底还是浅灰底都不会撞色 -->
  <section class="bg-white py-14 sm:py-16 lg:py-20">
    <div class="container-page">
      <!-- 横幅本体：relative 供装饰圆定位；overflow-hidden 把溢出的圆裁成弧形边缘；
           rounded-3xl 大圆角；bg-brand-700 深橙底 -->
      <div
        class="relative overflow-hidden rounded-3xl bg-brand-700 px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16"
      >
        <!-- 装饰：两枚半透明白圆，只在右侧露出一段弧，给纯色块一点纵深，不抢文字 -->
        <div
          class="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/10"
          aria-hidden="true"
        />
        <div
          class="pointer-events-none absolute -bottom-28 right-24 h-52 w-52 rounded-full bg-white/10"
          aria-hidden="true"
        />

        <!-- 文案区：max-w-2xl 限制标题换行宽度，避免长句横贯整个横幅 -->
        <div class="relative max-w-2xl">
          <!-- 标题：白色；手机 text-2xl → sm:text-3xl → lg:text-4xl 逐级放大；
               leading-tight 收紧行高，多行标题不会散 -->
          <h2
            class="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl"
          >
            {{ siteConfig.cta.title }}
          </h2>

          <!-- 说明：直接用纯白不加透明度，任何降低不透明度的写法都会把这块的对比度拉回不合格 -->
          <p class="mt-3 text-sm leading-relaxed text-white sm:mt-4 sm:text-base">
            {{ siteConfig.cta.desc }}
          </p>

          <!-- 动作区：手机纵向堆叠、平板起横排；sm:items-center 让电话与按钮垂直居中对齐 -->
          <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <!-- 主按钮：白底深橙字（BaseButton 的 light 变体），在橙底上最高对比 -->
            <BaseButton
              :href="siteConfig.contact.ctaHref"
              variant="light"
              size="lg"
              class="w-full sm:w-auto"
            >
              {{ siteConfig.contact.ctaLabel }}
            </BaseButton>

            <!-- 电话：白描边 + 白字，与主按钮形成主次；hover 加一层白底 10% 反馈 -->
            <a
              :href="siteConfig.contact.phoneHref"
              class="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/40 px-6 py-3 text-base font-medium text-white transition-colors duration-200 hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto lg:px-8 lg:py-3.5 lg:text-lg"
            >
              <!-- 听筒图标：14×14 线性；stroke=currentColor 跟随文字白色 -->
              <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M14 11.2v1.6a1.1 1.1 0 0 1-1.2 1.1 10.9 10.9 0 0 1-4.7-1.7 10.7 10.7 0 0 1-3.3-3.3A10.9 10.9 0 0 1 3.1 4.2 1.1 1.1 0 0 1 4.2 3h1.6a1.1 1.1 0 0 1 1.1.9c.07.5.2.99.37 1.46a1.1 1.1 0 0 1-.25 1.16l-.68.68a8.8 8.8 0 0 0 3.3 3.3l.68-.68a1.1 1.1 0 0 1 1.16-.25c.47.17.96.3 1.46.37a1.1 1.1 0 0 1 .96 1.16Z"
                  stroke="currentColor"
                  stroke-width="1.3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {{ siteConfig.contact.phone }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
