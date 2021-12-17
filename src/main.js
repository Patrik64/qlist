import Vue from 'vue'
import App from './App.vue'
import Loading from 'vue-loading-overlay'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './index.css'
import 'vue-loading-overlay/dist/vue-loading.css'

/* Vue.use(Loading, {
  loader: 'spinner',
  opacity: 0.85,
  transition: 'none',
  height: 64,
  width: 64,
  'is-full-page': true
}) */

Vue.use(Loading)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
