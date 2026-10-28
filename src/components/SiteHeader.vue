<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import type { NavItem } from '@/config/site'

interface Props {
  brand: string
  navItems: NavItem[]
}

const props = defineProps<Props>()

const scrolled = ref(false)
const menuOpen = ref(false)

const onScroll = () => {
  scrolled.value = window.scrollY > 8
}

const closeMenu = () => {
  menuOpen.value = false
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 h-16 transition-colors duration-300"
    :class="scrolled ? 'border-b border-brand-100 bg-white/90 backdrop-blur' : 'bg-transparent'"
  >
    <div class="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
      <a
        class="text-lg font-bold tracking-tight text-ink-900 transition-colors hover:text-brand-600"
        href="#home"
        @click="closeMenu"
      >{{ props.brand }}</a>

      <nav class="hidden items-center gap-8 md:flex">
        <a
          v-for="item in props.navItems"
          :key="item.href"
          :href="item.href"
          class="text-sm text-ink-600 transition-colors hover:text-brand-600"
        >{{ item.label }}</a>
      </nav>

      <button
        type="button"
        class="flex h-9 w-9 items-center justify-center rounded-md text-ink-600 transition-colors hover:bg-brand-50 hover:text-brand-600 md:hidden"
        :aria-expanded="menuOpen"
        aria-label="切换导航菜单"
        @click="menuOpen = !menuOpen"
      >
        <span class="relative block h-4 w-5">
          <span
            class="absolute inset-x-0 top-0 h-0.5 bg-current transition-transform"
            :class="menuOpen ? 'translate-y-[7px] rotate-45' : ''"
          />
          <span
            class="absolute inset-x-0 top-[7px] h-0.5 bg-current transition-opacity"
            :class="menuOpen ? 'opacity-0' : ''"
          />
          <span
            class="absolute inset-x-0 bottom-0 h-0.5 bg-current transition-transform"
            :class="menuOpen ? '-translate-y-[7px] -rotate-45' : ''"
          />
        </span>
      </button>
    </div>

    <nav
      v-show="menuOpen"
      class="border-b border-brand-100 bg-white px-6 pb-4 md:hidden"
    >
      <a
        v-for="item in props.navItems"
        :key="item.href"
        :href="item.href"
        class="block py-2 text-sm text-ink-600 transition-colors hover:text-brand-600"
        @click="closeMenu"
      >{{ item.label }}</a>
    </nav>
  </header>
</template>
