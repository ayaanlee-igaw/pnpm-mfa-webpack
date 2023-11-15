import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
  Router,
} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';

// @ts-ignore
// eslint-disable-next-line import/extensions
const remoteRouterModule = await import('service/router');
const remoteRouter: Router = remoteRouterModule.router;
window.console.log('RemoteRouter default', remoteRouterModule);

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
  ...remoteRouter.getRoutes(),
];

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHashHistory(),
  routes,
});

export default router;
