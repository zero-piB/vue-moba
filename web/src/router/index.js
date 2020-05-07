import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import Article from '../views/Article.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
    children: [
      { path: '/', name: 'home', component: Home },
      // { path: '/strategycenter', name: 'home', component: Home },
      // { path: '/matchindex', name: 'home', component: Home }  
      { path: '/articles/:id', name: 'article', component: Article ,props:true},
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
