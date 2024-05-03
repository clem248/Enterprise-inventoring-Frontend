import { createRouter, createWebHashHistory } from 'vue-router';
import Auth from './components/Auth.vue';
import Dashboard from './components/Dashboard.vue';

const routes = [
  { path: '/', redirect: '/login' }, // Перенаправляем с '/' на '/login'
  { path: '/login', component: Auth },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// Добавляем защиту маршрута, чтобы требовать аутентификацию для доступа к дашборду
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('token')) {
    // Если пользователь не аутентифицирован и пытается перейти на защищенный маршрут, перенаправляем на страницу авторизации
    next('/login');
  } else {
    // В противном случае разрешаем доступ
    next();
  }
});

export default router;
