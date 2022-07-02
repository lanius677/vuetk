import { createApp } from 'vue'
import App from './App.vue'
//导入初始化样式
import './assets/common/base.css'
//导入ElementPlusIconsVue包
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//导入路由配置
import router from './router/index';

const app = createApp(App)
app.use(router)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')