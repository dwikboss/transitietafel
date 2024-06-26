import { PageName } from '@/utils/_Constants';
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';
import Chat from '../views/Chat.vue';

const routes = [
  {
    path: '/',
    name: PageName.HOME,
    component: Home,
  },
  {
    path: '/dashboard',
    name: PageName.DASHBOARD,
    component: Dashboard,
  },
  {
    path: '/chat',
    name: PageName.CHAT,
    component: Chat,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
