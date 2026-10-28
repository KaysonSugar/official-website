<script setup>
const navItems = [
  { label: '首页', href: '#home' },
  { label: '产品', href: '#features' },
  { label: '方案', href: '#solutions' },
  { label: '关于', href: '#about' }
]

const features = [
  { title: '能力一', desc: '在这里填写功能描述' },
  { title: '能力二', desc: '在这里填写功能描述' },
  { title: '能力三', desc: '在这里填写功能描述' }
]
</script>

<template>
  <header>
    <a class="logo" href="#home">LOGO</a>
    <nav>
      <a v-for="item in navItems" :key="item.href" :href="item.href">{{ item.label }}</a>
    </nav>
  </header>

  <main>
    <section id="home">
      <h1>官网标题</h1>
      <p>一句话简介，后续替换成真实内容。</p>
    </section>

    <section id="features">
      <h2>产品能力</h2>
      <ul>
        <li v-for="item in features" :key="item.title">
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </li>
      </ul>
    </section>

    <section id="solutions">
      <h2>解决方案</h2>
      <p>占位内容。</p>
    </section>

    <section id="about">
      <h2>关于我们</h2>
      <p>占位内容。</p>
    </section>
  </main>

  <footer>
    <p>© 2026 公司名称. All rights reserved.</p>
  </footer>
</template>
