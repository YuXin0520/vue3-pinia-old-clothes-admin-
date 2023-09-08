import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('/src/views/Login/login.vue') },
  {
    path: '/layout',
    component: () => import('/src/views/Layout/layout.vue'),
    children: [
      { path: '', redirect: '/layout/home' },
      { path: 'home', component: () => import('/src/views/Layout/home.vue') },
      {
        path: 'order/recover',
        component: () => import('/src/views/Order/orderMessage.vue')
      },
      {
        path: 'users/role',
        component: () => import('/src/views/Users/roleMessage.vue')
      },
      {
        path: 'users/user',
        component: () => import('/src/views/Users/userMessage.vue')
      },
      {
        path: 'users/job',
        component: () => import('/src/views/Users/jobMessage.vue')
      },
      {
        path: 'users/department',
        component: () => import('/src/views/Users/departmentMessage.vue')
      },
      {
        path: 'log/system',
        component: () => import('/src/views/Log/logMessage.vue')
      },
      {
        path: 'memo',
        component: () => import('/src/views/Memo/memoMessage.vue')
      },
      {
        path: 'editpassword',
        component: () => import('/src/views/Password/editPassword.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') {
    return '/login'
  }
  if (to.path === '/login') {
    return true
  }
})

export default router
