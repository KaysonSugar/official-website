<script setup lang="ts">
import { useTemplateRef } from 'vue'
import SiteHeader from '@/components/SiteHeader.vue'
import HeroSection from '@/components/HeroSection.vue'
import FeatureCard from '@/components/FeatureCard.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'

// 三个内容区块各自独立监听进场：useTemplateRef 按模板上的 ref 名字取到 DOM，再交给 useReveal
const featuresEl = useTemplateRef<HTMLElement>('features')
const solutionsEl = useTemplateRef<HTMLElement>('solutions')
const aboutEl = useTemplateRef<HTMLElement>('about')

const featuresVisible = useReveal(featuresEl)
const solutionsVisible = useReveal(solutionsEl)
const aboutVisible = useReveal(aboutEl)
</script>

<template>
  <SiteHeader :brand="siteConfig.brand" :nav-items="siteConfig.navItems" />

  <!-- 主内容区：pt-14 手机上边距 3.5rem、sm:pt-16 为 4rem，与顶栏高度保持一致，避免首屏被遮挡 -->
  <main class="pt-14 sm:pt-16">
    <HeroSection :title="siteConfig.hero.title" :tagline="siteConfig.hero.tagline" />

    <!-- 产品能力区：mx-auto 水平居中；max-w-6xl 内容最大宽度 72rem；
         px-4 手机左右内边距 1rem，sm:px-6 为 1.5rem；
         py-16 手机上下 4rem，sm:py-20 为 5rem，lg:py-24 为 6rem；
         scroll-mt-14 / sm:scroll-mt-16 锚点跳转时预留顶栏空间；
         transition-all duration-700 ease-out + opacity/translate-y 实现滚动进场 -->
    <section
      id="features"
      ref="featuresEl"
      class="mx-auto max-w-6xl scroll-mt-14 px-4 py-16 transition-all duration-700 ease-out sm:scroll-mt-16 sm:px-6 sm:py-20 lg:py-24"
      :class="featuresVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
    >
      <!-- 区块标题：text-xl 手机 1.25rem，sm:text-2xl 1.5rem，lg:text-3xl 1.875rem；
           font-bold 加粗；text-ink-900 主文字色 -->
      <h2 class="text-xl font-bold text-ink-900 sm:text-2xl lg:text-3xl">
        {{ siteConfig.features.heading }}
      </h2>
      <!-- 卡片栅格：grid 启用网格布局；grid-cols-1 手机单列，sm:2 平板两列，lg:3 桌面三列；
           mt-8 手机上边距 2rem（sm:mt-12 为 3rem）；
           gap-4 手机间距 1rem，sm:gap-6 为 1.5rem（窄屏减小间距换取卡片宽度） -->
      <ul class="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        <FeatureCard
          v-for="(item, index) in siteConfig.features.items"
          :key="item.title"
          :title="item.title"
          :desc="item.desc"
          :delay="index * 100"
        />
      </ul>
    </section>

    <!-- 解决方案区：bg-ink-50 浅灰底与相邻区块形成层次；
         py-16 / sm:py-20 / lg:py-24 三档垂直留白；scroll-mt 预留顶栏；
         内层 div 复用同一套居中容器；同样带滚动进场过渡 -->
    <section
      id="solutions"
      ref="solutionsEl"
      class="scroll-mt-14 bg-ink-50 py-16 transition-all duration-700 ease-out sm:scroll-mt-16 sm:py-20 lg:py-24"
      :class="solutionsVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
    >
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 class="text-xl font-bold text-ink-900 sm:text-2xl lg:text-3xl">
          {{ siteConfig.solutions.heading }}
        </h2>
        <!-- 正文：mt-3 手机上边距 0.75rem（sm:mt-4 为 1rem）；text-sm 手机 0.875rem（sm:text-base 1rem）；
             text-ink-600 次级文字色，与标题形成对比 -->
        <p class="mt-3 text-sm text-ink-600 sm:mt-4 sm:text-base">
          {{ siteConfig.solutions.desc }}
        </p>
      </div>
    </section>

    <!-- 关于我们区：与能力区共用居中容器、标题字号与进场动效，保持节奏一致 -->
    <section
      id="about"
      ref="aboutEl"
      class="mx-auto max-w-6xl scroll-mt-14 px-4 py-16 transition-all duration-700 ease-out sm:scroll-mt-16 sm:px-6 sm:py-20 lg:py-24"
      :class="aboutVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
    >
      <h2 class="text-xl font-bold text-ink-900 sm:text-2xl lg:text-3xl">
        {{ siteConfig.about.heading }}
      </h2>
      <p class="mt-3 text-sm text-ink-600 sm:mt-4 sm:text-base">
        {{ siteConfig.about.desc }}
      </p>
    </section>
  </main>

  <SiteFooter :copyright="siteConfig.footer.copyright" />
</template>
