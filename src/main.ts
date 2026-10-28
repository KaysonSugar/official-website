// 应用入口：创建 Vue 实例并挂载到 index.html 中的 #app 节点
import { createApp } from 'vue'
// 全局样式：内含 Tailwind 入口（@import "tailwindcss"）、设计 token 与基础样式，必须在此引入
import './style.css'
import App from './App.vue'

// mount('#app') 对应 index.html 里的 <div id="app"></div>
createApp(App).mount('#app')
