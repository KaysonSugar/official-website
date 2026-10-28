<script setup lang="ts">
import logoText from '@/assets/logo-text.webp'
import { siteConfig } from '@/config/site'

/**
 * 页脚
 *
 * 这里用完整组合标 logo-text.webp（图形 + 中文 + 英文竖排），
 * 与导航栏的「图形 + HTML 文字」区分：页脚空间宽裕，整图呈现更完整且无需维护两份文案。
 */
</script>

<template>
  <!-- 页脚容器：border-t 顶部细线分隔；bg-ink-50 浅灰底，与上方白色区块形成收尾层次 -->
  <footer class="border-t border-ink-100 bg-ink-50">
    <!-- 内层：container-page 与顶栏、区块共用同一左右基准线（1440px 下左右各 80px）；
         py-12 上下 3rem（lg:py-16 为 4rem） -->
    <div class="container-page py-12 lg:py-16">
      <!-- 上半部分：flex-col 手机纵向堆叠，md:flex-row 宽屏横向两端对齐 -->
      <div class="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <!-- 左侧：完整品牌标识 + 地址 -->
        <div>
          <!-- 组合标：h-14 高度 3.5rem 等比缩放（w-auto 保持比例）；object-contain 防止拉伸变形 -->
          <img
            :src="logoText"
            :alt="siteConfig.brand.name"
            class="h-14 w-auto object-contain"
            loading="lazy"
            decoding="async"
          />
          <!-- 地址：mt-4 上边距 1rem；text-sm 0.875rem；text-ink-600 次级文字色；not-italic 防被样式改斜体 -->
          <p class="mt-4 max-w-xs text-sm not-italic leading-relaxed text-ink-600">
            {{ siteConfig.footer.address }}
          </p>
        </div>

        <!-- 右侧：快速导航，把主导航再列一遍便于访客直接从页脚跳转 -->
        <nav aria-label="页脚导航">
          <!-- 标题：text-sm 半粗；text-ink-900 强调；mb-4 与列表拉开 1rem -->
          <h3 class="mb-4 text-sm font-semibold text-ink-900">快速导航</h3>
          <!-- 列表：flex-col 纵向；gap-3 每项间距 0.75rem -->
          <ul class="flex flex-col gap-3">
            <li v-for="item in siteConfig.navItems" :key="item.href">
              <!-- 链接：text-sm 小字；text-ink-600 弱化；悬停变品牌橙 -->
              <a
                :href="item.href"
                class="text-sm text-ink-600 transition-colors duration-200 hover:text-brand-500"
                >{{ item.label }}</a
              >
            </li>
          </ul>
        </nav>

        <!-- 右侧：联系方式 -->
        <div>
          <h3 class="mb-4 text-sm font-semibold text-ink-900">联系我们</h3>
          <ul class="flex flex-col gap-3">
            <li>
              <!-- 电话：在页脚放大到 text-base，作为可点击的行动入口 -->
              <a
                :href="siteConfig.contact.phoneHref"
                class="text-base font-semibold text-ink-900 transition-colors duration-200 hover:text-brand-500"
                >{{ siteConfig.contact.phone }}</a
              >
            </li>
          </ul>
        </div>
      </div>

      <!-- 底部版权：mt-10 与上方拉开 2.5rem；border-t 第二条更浅的分隔线；
           pt-6 上内边距 1.5rem；text-center 居中；text-xs 极小号；text-ink-400 最弱化 -->
      <p class="mt-10 border-t border-ink-200 pt-6 text-center text-xs text-ink-400">
        {{ siteConfig.footer.copyright }}
      </p>
    </div>
  </footer>
</template>
