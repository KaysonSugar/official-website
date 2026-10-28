<script setup lang="ts">
import SiteHeader from '@/components/SiteHeader.vue'
import HeroSection from '@/components/HeroSection.vue'
import FeatureCard from '@/components/FeatureCard.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import { siteConfig } from '@/config/site'
</script>

<template>
  <SiteHeader :brand="siteConfig.brand" :nav-items="siteConfig.navItems" />

  <main class="pt-16">
    <HeroSection
      :title="siteConfig.hero.title"
      :tagline="siteConfig.hero.tagline"
    />

    <section id="features" class="mx-auto max-w-6xl scroll-mt-16 px-6 py-20 sm:py-24">
      <h2 class="text-2xl font-bold text-ink-900 sm:text-3xl">
        {{ siteConfig.features.heading }}
      </h2>
      <ul class="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          v-for="item in siteConfig.features.items"
          :key="item.title"
          :title="item.title"
          :desc="item.desc"
        />
      </ul>
    </section>

    <section id="solutions" class="scroll-mt-16 bg-ink-50 py-20 sm:py-24">
      <div class="mx-auto max-w-6xl px-6">
        <h2 class="text-2xl font-bold text-ink-900 sm:text-3xl">
          {{ siteConfig.solutions.heading }}
        </h2>
        <p class="mt-4 text-ink-600">{{ siteConfig.solutions.desc }}</p>
      </div>
    </section>

    <section id="about" class="mx-auto max-w-6xl scroll-mt-16 px-6 py-20 sm:py-24">
      <h2 class="text-2xl font-bold text-ink-900 sm:text-3xl">
        {{ siteConfig.about.heading }}
      </h2>
      <p class="mt-4 text-ink-600">{{ siteConfig.about.desc }}</p>
    </section>
  </main>

  <SiteFooter :copyright="siteConfig.footer.copyright" />
</template>
