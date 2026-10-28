<script setup lang="ts">
interface Props {
  copyright: string
}

const props = defineProps<Props>()
</script>

<template>
  <!-- 页脚：border-t 顶部 1px 描边分隔；bg-ink-50 浅灰底；
       py-8 手机上下内边距 2rem，sm:py-10 为 2.5rem；
       px-4 左右内边距 1rem（sm:px-6 为 1.5rem），防止窄屏文字贴边；
       text-center 居中；text-xs 手机 0.75rem，sm:text-sm 0.875rem；text-ink-400 最弱文字层级 -->
  <footer
    class="border-t border-brand-100 bg-ink-50 px-4 py-8 text-center text-xs text-ink-400 sm:px-6 sm:py-10 sm:text-sm"
  >
    <p>{{ props.copyright }}</p>
  </footer>
</template>
