<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import BrandLogo from '@/components/brand/BrandLogo.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { siteConfig, type NavItem } from '@/config/site'

/**
 * 顶部导航（对应原型 01 首页的顶部条）
 *
 * 三段式：品牌标识 / 主导航 / 电话 + 预约演示按钮。
 * ≥1024px 显示完整导航，<1024px 收进汉堡菜单；「产品矩阵」带二级项，
 * 桌面悬停展开、移动端在菜单里平铺。高亮直接比对当前路由。
 */
const scrolled = ref(false)
const menuOpen = ref(false)
const route = useRoute()

// 当前展开的下拉所属导航项（存 to，天然互斥：同时只可能展开一个）
const openDropdown = ref<string | null>(null)

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

const onScroll = () => {
  scrolled.value = window.scrollY > 8
}

const closeMenu = () => {
  menuOpen.value = false
}

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

// 移动端菜单展开时锁定页面滚动，避免背景跟着滑动
watch(menuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

// 切页后收起所有浮层：下拉面板与汉堡菜单都归位
watch(activePath, () => {
  openDropdown.value = null
  closeMenu()
})

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  // 组件卸载时恢复滚动，防止菜单打开状态下离开页面导致 body 一直锁死
  document.body.style.overflow = ''
})
</script>

<template>
  <!-- 顶栏：fixed 固定在顶部，高度 h-16 / lg:h-[84px]（画板 1440×84）。
       背景两态：顶部 bg-white/95 + backdrop-blur 透出首屏渐变，滚动后 bg-white 实心。
       transition-[...] 只过渡背景/阴影/描边，避免整块重绘 -->
  <header
    class="fixed inset-x-0 top-0 z-50 h-16 border-b transition-[background-color,border-color,box-shadow] duration-300 lg:h-[84px]"
    :class="
      scrolled
        ? 'border-ink-100 bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)]'
        : 'border-transparent bg-white/95 backdrop-blur'
    "
  >
    <!-- 导航容器：container-page 是全局内容容器（见 style.css），
         1440px 下左右各留 80px —— 与原型稿中 logo、首屏标题的基准线一致；
         flex + items-center 垂直居中 + justify-between 三段分布 -->
    <div class="container-page flex h-full items-center justify-between gap-4">
      <!-- 左侧：品牌标识（图形 mark + 中英文），点击回首页 -->
      <BrandLogo :name="siteConfig.brand.name" :name-en="siteConfig.brand.nameEn" />

      <!-- 中间：主导航，hidden 默认隐藏，lg:flex 在 ≥1024px 横向显示；
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
            :class="
              isActive(item) ? 'font-semibold text-ink-900' : 'text-ink-600 hover:text-brand-500'
            "
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

      <!-- 右侧：电话 + 主按钮 + 移动端汉堡 -->
      <div class="flex shrink-0 items-center gap-3 lg:gap-6">
        <!-- 电话号码：md:block ≥768px 显示，与移动端菜单互补，避免同屏出现两个入口 -->
        <a
          :href="siteConfig.contact.phoneHref"
          class="hidden font-medium text-ink-900 transition-colors duration-200 hover:text-brand-500 md:block lg:text-[14px]"
          >{{ siteConfig.contact.phone }}</a
        >

        <!-- 主按钮「预约演示」：外层 div 负责断点显隐（<640px 隐藏），
             不能把 hidden 直接写在 BaseButton 上——组件内部基础类含 inline-flex，
             同属 display 属性且无媒体查询，会把 hidden 覆盖掉（实测 375px 下按钮仍显示）。
             同样与菜单互补：这里 ≥640 显示，菜单里就只在 <640 补一份 -->
        <div class="hidden sm:block">
          <BaseButton :href="siteConfig.contact.ctaHref" size="md">
            {{ siteConfig.contact.ctaLabel }}
          </BaseButton>
        </div>

        <!-- 汉堡按钮：lg:hidden 仅 <1024px 显示；h-10 w-10 触控区 2.5rem 满足移动端最小点击尺寸；
             rounded-lg 圆角；hover:bg-ink-50 悬停浅灰底 -->
        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-lg text-ink-900 transition-colors hover:bg-ink-50 lg:hidden"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          aria-label="切换导航菜单"
          @click="menuOpen = !menuOpen"
        >
          <!-- 图标容器：relative 作为三条线的定位基准；block h-4 w-5 尺寸 1rem × 1.25rem -->
          <span class="relative block h-4 w-5">
            <!-- 顶线：absolute inset-x-0 top-0 横向撑满贴顶；h-0.5 线粗 2px；bg-current 跟随父级文字色；
                 展开时下移 7px 并旋转 45°，与底线组成 × -->
            <span
              class="absolute inset-x-0 top-0 h-0.5 bg-current transition-transform duration-300"
              :class="menuOpen ? 'translate-y-[7px] rotate-45' : ''"
            />
            <!-- 中线：top-[7px] 垂直居中；展开时淡出 -->
            <span
              class="absolute inset-x-0 top-[7px] h-0.5 bg-current transition-opacity duration-300"
              :class="menuOpen ? 'opacity-0' : ''"
            />
            <!-- 底线：bottom-0 贴底；展开时上移 7px 并反向旋转 45° -->
            <span
              class="absolute inset-x-0 bottom-0 h-0.5 bg-current transition-transform duration-300"
              :class="menuOpen ? '-translate-y-[7px] -rotate-45' : ''"
            />
          </span>
        </button>
      </div>
    </div>

    <!-- 移动端下拉菜单：v-show 切换 display（保留 DOM，切换无重排卡顿）；
         absolute top-full 紧贴顶栏下沿；inset-x-0 横向铺满；lg:hidden 桌面不显示；
         bg-white 纯白底遮住下方内容；pf-4/pt-2 内边距；max-h-[calc(100vh-4rem)] + overflow-y-auto 防超长 -->
    <nav
      v-show="menuOpen"
      id="mobile-menu"
      class="absolute inset-x-0 top-full max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-ink-100 bg-white pb-6 pt-2 shadow-lg lg:hidden"
      aria-label="移动端导航"
    >
      <!-- 内容同样套 container-page，保证手机端菜单项与 logo 左边缘对齐 -->
      <div class="container-page">
        <!-- 菜单项容器：每项一个 div，分隔线画在容器上（父项 + 子项算作一组） -->
        <div
          v-for="item in siteConfig.navItems"
          :key="item.to"
          class="border-b border-ink-100 last:border-b-0"
        >
          <!-- 一级项：block 独占一行；py-3 保证触控高度；当前页加粗为品牌橙 -->
          <RouterLink
            :to="item.to"
            class="block py-3 text-base transition-colors duration-200"
            :class="
              activePath === item.to
                ? 'font-semibold text-brand-500'
                : 'text-ink-700 hover:text-brand-500'
            "
            @click="closeMenu"
            >{{ item.label }}</RouterLink
          >

          <!-- 二级项：缩进平铺（只有 3 个，一屏能看完，不做折叠减少一次点击）；
               pl-4 缩进 + 灰点前缀，明确从属于上一行的「产品矩阵」 -->
          <ul v-if="item.children" class="pb-2">
            <li v-for="child in item.children" :key="child.to">
              <RouterLink
                :to="child.to"
                class="flex items-baseline gap-2 rounded-lg py-2 pl-4 pr-2 transition-colors duration-200"
                :class="
                  activePath === child.to ? 'text-brand-500' : 'text-ink-600 hover:text-brand-500'
                "
                @click="closeMenu"
              >
                <!-- 项目符号：4px 浅灰点，比纯缩进更能看出层级（ink-300 未在 @theme 定义，用 ink-400） -->
                <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-400" aria-hidden="true" />
                <span class="text-sm font-medium">{{ child.label }}</span>
                <span v-if="child.desc" class="text-xs text-ink-400">{{ child.desc }}</span>
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- 菜单底部行动区：与顶栏右侧互补，同一个入口只出现一份。
             电话 md:hidden（顶栏 ≥768 已常驻），预约演示 sm:hidden（顶栏 ≥640 已常驻） -->
        <div class="mt-5 flex flex-col gap-3 md:hidden">
          <!-- 电话做成描边按钮，与顶栏主按钮区分主次 -->
          <BaseButton :href="siteConfig.contact.phoneHref" variant="outline" block>
            {{ siteConfig.contact.phone }}
          </BaseButton>
          <!-- 主行动按钮：外层 div 负责断点显隐（<640 才出现在菜单里）。
               注意不能把 sm:hidden 直接写在 BaseButton 上 —— 组件基础类含 inline-flex，
               同属 display 属性且无媒体查询，会把 hidden 覆盖掉 -->
          <div class="sm:hidden">
            <BaseButton :href="siteConfig.contact.ctaHref" block @click="closeMenu">
              {{ siteConfig.contact.ctaLabel }}
            </BaseButton>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
