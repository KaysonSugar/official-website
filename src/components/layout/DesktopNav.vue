<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { siteConfig, type NavItem } from '@/config/site'

/**
 * 桌面端主导航（≥1024px，从 SiteHeader 拆出来的部分）
 *
 * 三段式里中间那段：悬停展开「产品矩阵」下拉，键盘 Tab 也能展开。
 * 高亮直接比对当前路由；展开状态自己管，不牵扯顶栏壳。
 */
// 当前展开的下拉所属导航项（存 to，天然互斥：同时只可能展开一个）
const openDropdown = ref<string | null>(null)

const route = useRoute()

// 当前路由路径
const activePath = computed(() => route.path)

/**
 * 判断一级导航是否处于激活态
 *
 * 父项带子项时，访问 /products/chemical 也要把「产品矩阵」点亮，
 * 所以除完全相等外，还要判断当前路径是否落在该父项的子路径下。
 */
const isActive = (item: NavItem) =>
  activePath.value === item.to ||
  Boolean(item.children?.some((child) => activePath.value === child.to))

/**
 * 键盘操作时收起下拉
 *
 * 焦点离开整个导航项（比如 Tab 到下一个导航项）才收起；
 * 焦点在链接与面板之间移动时 relatedTarget 仍在容器内，保持展开。
 */
const onFocusOut = (event: FocusEvent) => {
  const wrapper = event.currentTarget as HTMLElement
  const next = event.relatedTarget as Node | null
  if (!next || !wrapper.contains(next)) openDropdown.value = null
}

// 切页后收起下拉面板
watch(activePath, () => {
  openDropdown.value = null
})
</script>

<template>
  <!-- 主导航：hidden 默认隐藏，lg:flex 在 ≥1024px 横向显示；
       gap-8 项间距 2rem，xl:gap-10 在 ≥1280px 放宽到 2.5rem -->
  <nav class="hidden items-center gap-8 lg:flex xl:gap-10" aria-label="主导航">
    <!-- 导航项外层：relative 给下拉面板定位；h-16 / lg:h-[84px] 撑满顶栏高度，
         这样面板的 top-full 正好落在顶栏下沿（而不是文字下沿），不会压住顶栏自己的白底。
         mouseenter/mouseleave 控制下拉；focusin/focusout 让键盘 Tab 也能展开 -->
    <div
      v-for="item in siteConfig.navItems"
      :key="item.to"
      class="relative flex h-16 items-center lg:h-[84px]"
      @mouseenter="openDropdown = item.to"
      @mouseleave="openDropdown = null"
      @focusin="openDropdown = item.to"
      @focusout="onFocusOut"
    >
      <!-- 导航项：text-[15px] 微调字号贴合原型；当前项 font-semibold + text-ink-900（黑粗），
           其余 text-ink-600 且悬停变品牌橙；RouterLink 走前端路由切页，不整页刷新 -->
      <RouterLink
        :to="item.to"
        class="relative flex items-center gap-1 py-2 text-[15px] transition-colors duration-200"
        :class="isActive(item) ? 'font-semibold text-ink-900' : 'text-ink-600 hover:text-brand-500'"
        :aria-current="activePath === item.to ? 'page' : undefined"
        :aria-haspopup="item.children ? 'true' : undefined"
        :aria-expanded="item.children ? openDropdown === item.to : undefined"
        >{{ item.label }}
        <!-- 下拉箭头：仅带二级项的导航显示；展开时旋转 180°，给"还能收起"的反馈 -->
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
      </RouterLink>

      <!-- 下拉面板：与顶栏连体，不是浮在下面的独立卡片。
           top-full + -mt-px 让顶边压住顶栏的 border-b；只留 rounded-b-xl 与左右下三边 -->
      <div
        v-if="item.children"
        v-show="openDropdown === item.to"
        class="absolute left-1/2 top-full z-10 -mt-px w-72 -translate-x-1/2"
      >
        <div
          class="rounded-b-xl border-x border-b border-ink-100 bg-white p-2 shadow-[0_16px_40px_-8px_rgba(26,26,26,0.18)]"
        >
          <!-- 子项：block 整块可点；px-4 py-2.5 保证触控高度；hover:bg-ink-50 浅灰反馈；
               当前所在子页用 bg-ink-50 + 品牌橙文字标识 -->
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
            <!-- 子项标题：15px，与一级导航同号，形成连贯的层级 -->
            <span class="block text-[15px] font-medium">{{ child.label }}</span>
            <!-- 子项补充说明：12px 弱化色，让「化工生产」一眼看得出对应「生产与经营管理」 -->
            <span v-if="child.desc" class="mt-0.5 block text-xs text-ink-400">{{
              child.desc
            }}</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>
