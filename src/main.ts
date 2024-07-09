// 引入清除默认样式
import '@/style/reset.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

// 引入vue-router
import router from '@/router/index'
// 引入全局组件
import Top from '@/components/top/index.vue'
import Bottom from '@/components/bottom/index.vue'

// 引入element-plus插件
import ElementPlus from 'element-plus'

const app = createApp(App)
app.component('Top', Top)
app.component('Bottom', Bottom)

app.use(createPinia())

app.use(router)

app.mount('#app')
