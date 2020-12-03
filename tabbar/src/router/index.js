import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home')
const Catagory = () => import('../views/catagory/Catagory')
const Addcart = () => import('../views/add-cart/Add-cart')
const User = () => import('../views/user/User')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/catagory',
    component: Catagory
  },
  {
    path: '/addcart',
    component: Addcart
  },
  {
    path: '/user',
    component: User
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router