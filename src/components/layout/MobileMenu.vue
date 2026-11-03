<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import { siteConfig } from '@/config/site'

/**
 * 移动端下拉菜单（<1024px，从 SiteHeader 拆出来的部分）
 *
 * 开关状态在顶栏壳上（汉堡按钮在那边），这里只管展示与收起：
 * 点任意链接后发 close 事件，由壳把 menuOpen 置 false。
 */
defineProps<{ open: boolean }>()

const emit = defineEmits<{ close: [] }>()

// 当前路由路径，模板里拿来标当前页
const route = useRoute()
const activePath = computed(() => route.path)

// 模板里多处 @click 都要收菜单，包一层省得重复 emit
const closeMenu = () => emit('close')
</script>

<template>
  <!-- 移动端下拉菜单：v-show 切换 display（保留 DOM，切换无重排卡顿）；
       absolute top-full 紧贴顶栏下沿；inset-x-0 横向铺满；lg:hidden 桌面不显示；
       bg-white 纯白底遮住下方内容；pf-4/pt-2 内边距；max-h-[calc(100vh-4rem)] + overflow-y-auto 防超长 -->
  <nav
    v-show="open"
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
</template>
