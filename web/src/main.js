import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/scss/style.scss'
import './assets/iconfont/iconfont.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import Card from './components/Card'
import ListCard from './components/ListCard'

Vue.use(VueAwesomeSwiper)
Vue.component('m-card', Card);
Vue.component('m-list-card', ListCard);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
