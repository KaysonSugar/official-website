<script setup lang="ts">
interface NavItem {
  label: string
  href: string
}

interface Feature {
  title: string
  desc: string
}

const navItems: NavItem[] = [
  { label: '首页', href: '#home' },
  { label: '产品', href: '#features' },
  { label: '方案', href: '#solutions' },
  { label: '关于', href: '#about' },
]

const features: Feature[] = [
  { title: '能力一', desc: '在这里填写功能描述' },
  { title: '能力二', desc: '在这里填写功能描述' },
  { title: '能力三', desc: '在这里填写功能描述' },
]
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
      <a class="text-xl font-bold tracking-tight text-slate-900" href="#home">LOGO</a>
      <nav class="flex items-center gap-8">
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          class="text-sm text-slate-600 transition-colors hover:text-slate-900"
        >{{ item.label }}</a>
      </nav>
    </div>
  </header>

  <main class="pt-16">
    <section id="home" class="bg-gradient-to-b from-slate-50 to-white py-32 text-center">
      <h1 class="text-5xl font-bold tracking-tight text-slate-900">官网标题</h1>
      <p class="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
        一句话简介，后续替换成真实内容。
      </p>
    </section>

    <section id="features" class="mx-auto max-w-6xl px-6 py-24">
      <h2 class="text-3xl font-bold text-slate-900">产品能力</h2>
      <ul class="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="item in features"
          :key="item.title"
          class="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
        >
          <h3 class="text-lg font-semibold text-slate-900">{{ item.title }}</h3>
          <p class="mt-3 text-sm leading-relaxed text-slate-600">{{ item.desc }}</p>
        </li>
      </ul>
    </section>

    <section id="solutions" class="bg-slate-50 py-24">
      <div class="mx-auto max-w-6xl px-6">
        <h2 class="text-3xl font-bold text-slate-900">解决方案</h2>
        <p class="mt-4 text-slate-600">占位内容。</p>
      </div>
    </section>

    <section id="about" class="mx-auto max-w-6xl px-6 py-24">
      <h2 class="text-3xl font-bold text-slate-900">关于我们</h2>
      <p class="mt-4 text-slate-600">占位内容。</p>
    </section>
  </main>

  <footer class="border-t border-slate-200 py-10 text-center text-sm text-slate-500">
    <p>© 2026 公司名称. All rights reserved.</p>
  </footer>
</template>
