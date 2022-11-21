import { createRouter, createWebHistory } from 'vue-router'
import mainPage from '../components/main.vue'
import dashboardPage from '../components/dashboard.vue'
import loginPage from '../components/login.vue'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: mainPage
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: dashboardPage
  },
  {
    path: '/login',
    name: 'Login',
    component: loginPage
  }
]

const router = createRouter(
  {
    history: createWebHistory(process.env.BASE_URL),
    routes
  }
)

export default router
