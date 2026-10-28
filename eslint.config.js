import js from '@eslint/js'
// Vue 官方 ESLint 插件（flat config 版本），含 SFC 模板规则
import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
// 关闭与 Prettier 冲突的格式类规则，格式问题统一交给 Prettier 处理
import prettier from 'eslint-config-prettier'
import globals from 'globals'

export default tseslint.config(
  // 忽略构建产物与依赖目录
  { ignores: ['dist/**', 'node_modules/**', '*.config.js'] },

  // JS 基础推荐规则
  js.configs.recommended,

  // TS 推荐规则（非类型感知版本，速度更快）
  ...tseslint.configs.recommended,

  // Vue SFC 推荐规则（含模板中 v-for key、属性顺序等检查）
  ...pluginVue.configs['flat/recommended'],

  {
    files: ['**/*.vue'],
    languageOptions: {
      // 让 <script lang="ts"> 使用 TS 解析器
      parserOptions: { parser: tseslint.parser },
    },
  },

  {
    languageOptions: {
      // 声明浏览器与 Node 全局变量（window、document、process 等），避免 no-undef 误报
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      // 组件名允许单个单词（如 App.vue、SiteHeader.vue 之外的项目惯例）
      'vue/multi-word-component-names': 'off',
      // 未使用变量报错，但允许以 _ 开头的占位参数
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },

  // 必须放在最后：覆盖前面的格式类规则
  prettier,
)
