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
// 引入element-plus插件样式
import 'element-plus/dist/index.css'
// 国际化文件
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)
app.component('Top', Top)
app.component('Bottom', Bottom)


app.use(ElementPlus,{
    locale: zhCn,
})
app.use(createPinia())

app.use(router)

app.mount('#app')
