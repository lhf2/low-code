import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// 全局引入组件 就无需每个页面都引入了 也可以使用插件的形式 暴露一个 install 方法，里面全局注册组件
// vue3 中使用 require.context 报错，改用下面的方法
const files = import.meta.globEager('./components/stage1/*.vue');
Object.keys(files).forEach((fileName) => {
    // 去除中间名称
    const name = fileName.replace(/\.\/components\/stage1\/(.*)\.vue/g, "$1")
    app.component(name, files[fileName].default)
});

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')
