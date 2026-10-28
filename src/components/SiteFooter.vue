<script setup lang="ts">
interface Props {
  copyright: string
}

const props = defineProps<Props>()
</script>

<template>
  <footer class="border-t border-brand-100 bg-ink-50 py-10 text-center text-sm text-ink-400">
    <p>{{ props.copyright }}</p>
  </footer>
</template>
