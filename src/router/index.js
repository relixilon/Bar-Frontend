import { createRouter, createWebHistory } from 'vue-router'
import mainPage from '../components/main.vue'
import dashboardPage from '../components/dashboard.vue'

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
]

const router = createRouter(
  {
    history: createWebHistory(process.env.BASE_URL),
    routes
  }
)

export default router
