<script setup lang="ts">
interface Props {
  title: string
  tagline: string
}

const props = defineProps<Props>()
</script>

<template>
  <section
    id="home"
    class="bg-gradient-to-b from-brand-50 to-white py-24 text-center sm:py-32"
  >
    <h1 class="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
      {{ props.title }}
    </h1>
    <p class="mx-auto mt-6 max-w-2xl px-6 text-base text-ink-600 sm:text-lg">
      {{ props.tagline }}
    </p>
  </section>
</template>
