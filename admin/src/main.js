import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './style.css'

Vue.config.productionTip = false

Vue.mixin({
  computed: {
    uploadUrl() {
      return this.axios.defaults.baseURL + '/upload'
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
