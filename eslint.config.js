import js from '@eslint/js'
// Vue 官方 ESLint 插件（flat config），含 SFC 模板规则
import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
// 关掉和 Prettier 冲突的格式规则，格式统一交给 Prettier
import prettier from 'eslint-config-prettier'
import globals from 'globals'

export default tseslint.config(
  // 忽略构建产物、依赖和 .workbuddy（里面是 memory、脚本、截图 profile，会刷出上千条报错）
  { ignores: ['dist/**', 'node_modules/**', '*.config.js', '.workbuddy/**'] },

  // JS 基础推荐规则
  js.configs.recommended,

  // TS 推荐规则（不带类型感知，跑得快）
  ...tseslint.configs.recommended,

  // Vue SFC 推荐规则，含模板里 v-for key、属性顺序检查
  ...pluginVue.configs['flat/recommended'],

  {
    files: ['**/*.vue'],
    languageOptions: {
      // <script lang="ts"> 用 TS 解析器
      parserOptions: { parser: tseslint.parser },
    },
  },

  {
    languageOptions: {
      // 声明浏览器与 Node 全局变量，避免 no-undef 误报
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      // 组件名允许单个单词，项目里 App.vue 这类就这样
      'vue/multi-word-component-names': 'off',
      // 未使用变量报错，_ 开头的占位参数放过
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },

  // 必须放最后，才能覆盖前面的格式类规则
  prettier,
)
