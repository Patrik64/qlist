import Vue from 'vue'
import VueRouter from 'vue-router'
import QList from '@/components/QList.vue'
import Workspace from '@/components/Workspace.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Workspace',
    component: Workspace
  },
  {
    path: '/qlist/:qlistId',
    name: 'QList',
    component: QList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
