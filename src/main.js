import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import './styles/element/index.scss'
import 'normalize.css'
import router from './router'


Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
