import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children:[
      {
        path: '/categories/create',
        // name: 'CategoryEdit',
        component: CategoryEdit
      },
      {
        path: '/categories/edit/:id',
        // name: 'CategoryEdit',
        component: CategoryEdit,
        props:true,//将id注入这个组件中
      },
      {
        path: '/categories/list',
        name: 'CategoryList',
        component: CategoryList
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
