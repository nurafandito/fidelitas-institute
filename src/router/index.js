import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/certificate',
      name: 'search-certificate',
      component: () => import('../components/search-certificate.vue'),
    },
    {
      path: '/certificate/:company/:type/:year/:month/:id',
      name: 'certificate',
      component: () => import('../views/certificate.vue'),
    },
  ],
});

export default router;
