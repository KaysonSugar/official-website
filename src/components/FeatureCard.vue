<script setup lang="ts">
interface Props {
  title: string
  desc: string
}

const props = defineProps<Props>()
</script>

<template>
  <li class="rounded-2xl border border-brand-100 bg-white p-8 transition-shadow hover:shadow-md">
    <h3 class="text-lg font-semibold text-ink-900">{{ props.title }}</h3>
    <p class="mt-3 text-sm leading-relaxed text-ink-600">{{ props.desc }}</p>
  </li>
</template>
