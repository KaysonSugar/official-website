<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 桌面主导航
-->
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { siteConfig } from '@/config/site'
import type { NavItem } from '@/config/types'

// 当前展开的是哪个导航项，存 to，天然互斥
const openDropdown = ref<string | null>(null)

const route = useRoute()

const activePath = computed(() => route.path)

// 父项带子项时，进到 /products/chemical 也要把「产品矩阵」点亮
const isActive = (item: NavItem) =>
  activePath.value === item.to ||
  Boolean(item.children?.some((child) => activePath.value === child.to))

// 焦点离开整个导航项才收下拉；在链接和面板之间跳时 relatedTarget 还在容器里，保持展开
const onFocusOut = (event: FocusEvent) => {
  const wrapper = event.currentTarget as HTMLElement
  const next = event.relatedTarget as Node | null
  if (!next || !wrapper.contains(next)) openDropdown.value = null
}

// 切页后收面板
watch(activePath, () => {
  openDropdown.value = null
})
</script>

<template>
  <!-- 导航条：hidden 默认不显示，≥1024 转 flex；项间距 2rem，≥1280 到 2.5rem -->
  <nav class="hidden items-center gap-8 lg:flex xl:gap-10" aria-label="主导航">
    <!-- 每项外面套个 relative 当定位基准，高度撑满顶栏（手机 64 / 桌面 84），
         这样面板的 top-full 正好落在顶栏下沿，而不是文字下沿。
         鼠标进出和焦点进出都控展开 -->
    <div
      v-for="item in siteConfig.navItems"
      :key="item.to"
      class="relative flex h-16 items-center lg:h-[84px]"
      @mouseenter="openDropdown = item.to"
      @mouseleave="openDropdown = null"
      @focusin="openDropdown = item.to"
      @focusout="onFocusOut"
    >
      <!-- 导航项：15px（跟原型的字宽对齐）；当前项黑体加粗，其余灰字 hover 变橙。
           group 给下划线用 -->
      <RouterLink
        :to="item.to"
        class="group relative flex items-center gap-1 py-2 text-[15px] transition-colors duration-200"
        :class="isActive(item) ? 'font-semibold text-ink-900' : 'text-ink-600 hover:text-brand-500'"
        :aria-current="activePath === item.to ? 'page' : undefined"
        :aria-haspopup="item.children ? 'true' : undefined"
        :aria-expanded="item.children ? openDropdown === item.to : undefined"
        >{{ item.label }}
        <!-- 箭头：14px，展开时转 180° 表示能收 -->
        <svg
          v-if="item.children"
          class="h-3.5 w-3.5 transition-transform duration-200"
          :class="openDropdown === item.to ? 'rotate-180' : ''"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2.5 4.5 6 8l3.5-3.5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <!-- 橙色下划线：hover / 当前页 / 下拉展开时从左往右长出来。
             只动 scale，origin-left 让它有"划过去"的方向感 -->
        <span
          class="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 rounded-full bg-brand-500 transition-transform duration-300 ease-out group-hover:scale-x-100"
          :class="isActive(item) || openDropdown === item.to ? 'scale-x-100' : ''"
          aria-hidden="true"
        />
      </RouterLink>

      <!-- 下拉面板：跟顶栏连成一体，不做成浮在下面的独立卡片。
           宽 288，水平居中靠 left-1/2 + -translate-x-1/2；
           -mt-px 让顶边压住顶栏那 1px 描边，所以只有下、左、右三条边。
           显隐在里层卡片上做过渡，外层的 -translate-x-1/2 不能动 -->
      <div
        v-if="item.children"
        class="absolute left-1/2 top-full z-10 -mt-px w-72 -translate-x-1/2"
      >
        <Transition name="drop">
          <div
            v-show="openDropdown === item.to"
            class="rounded-b-xl border-x border-b border-ink-100 bg-white p-2 shadow-[0_16px_40px_-8px_rgba(26,26,26,0.18)]"
          >
            <!-- 子项：整块可点，px-4 py-2.5 保证手点击高度；hover 浅灰，当前页灰底橙字 -->
            <RouterLink
              v-for="child in item.children"
              :key="child.to"
              :to="child.to"
              class="block rounded-lg px-4 py-2.5 transition-colors duration-200"
              :class="
                activePath === child.to
                  ? 'bg-ink-50 text-brand-500'
                  : 'text-ink-700 hover:bg-ink-50 hover:text-brand-500'
              "
              :aria-current="activePath === child.to ? 'page' : undefined"
            >
              <!-- 子项标题：15px，和一级导航同号 -->
              <span class="block text-[15px] font-medium">{{ child.label }}</span>
              <!-- 补充说明：12px 弱化色，一眼能看出「化工生产」对应「生产与经营管理」 -->
              <span v-if="child.desc" class="mt-0.5 block text-xs text-ink-400">{{
                child.desc
              }}</span>
            </RouterLink>
          </div>
        </Transition>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* 下拉展开：淡入 + 下滑 6px，200ms 够了，太慢会显得拖沓。
   过渡写在里层卡片上——外层挂着居中用的 -translate-x-1/2，不能碰 transform */
.drop-enter-active,
.drop-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.drop-enter-from,
.drop-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (prefers-reduced-motion: reduce) {
  .drop-enter-active,
  .drop-leave-active {
    transition: none;
  }
}
</style>
