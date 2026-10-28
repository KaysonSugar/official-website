<script setup lang="ts">
interface Props {
  title: string
  tagline: string
}

const props = defineProps<Props>()
</script>

<template>
  <!-- 首屏 Hero：bg-gradient-to-b from-brand-50 to-white 由浅蓝渐变到白色；
       py-20 手机上下内边距 5rem，sm:py-28 平板 7rem，lg:py-32 桌面 8rem（窄屏压缩留白避免首屏过高）；
       text-center 文字居中 -->
  <section
    id="home"
    class="bg-gradient-to-b from-brand-50 to-white py-20 text-center sm:py-28 lg:py-32"
  >
    <!-- 主标题：text-3xl 手机 1.875rem，sm:text-4xl 平板 2.25rem，lg:text-5xl 桌面 3rem（响应式逐级放大）；
         font-bold 加粗；tracking-tight 收紧字距让大标题更紧凑；
         px-4 保证窄屏标题换行后不贴边（sm:px-6） -->
    <h1 class="px-4 text-3xl font-bold tracking-tight text-ink-900 sm:px-6 sm:text-4xl lg:text-5xl">
      {{ props.title }}
    </h1>
    <!-- 副标题：mx-auto 居中；max-w-2xl 最大宽 42rem 控制每行字数、避免长行难读；
         mt-4 手机上边距 1rem（sm:mt-6 为 1.5rem）；px-4 左右留白（sm:px-6）；
         text-sm 手机 0.875rem，sm:text-base 1rem，lg:text-lg 1.125rem -->
    <p
      class="mx-auto mt-4 max-w-2xl px-4 text-sm text-ink-600 sm:mt-6 sm:px-6 sm:text-base lg:text-lg"
    >
      {{ props.tagline }}
    </p>
  </section>
</template>
