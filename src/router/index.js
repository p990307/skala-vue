import { createRouter, createWebHistory } from 'vue-router'
import PortalHomeView from '../views/PortalHomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PortalHomeView,
    },
    {
      path: '/practices',
      name: 'practices',
      component: () => import('../views/PracticesArchiveView.vue'),
    },
    {
      path: '/sports',
      name: 'sports',
      component: () => import('../views/SportsView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/weather-mockup',
      name: 'weather-mockup',
      component: () => import('../components/exercise/WeatherMockup.vue'),
    },
    {
      path: '/weather-composition',
      name: 'weather-composition',
      component: () => import('../components/exercise/WeatherComposition.vue'),
    },
    {
      path: '/weather-component',
      name: 'weather-component',
      component: () => import('../components/exercise/WeatherParent.vue'),
    },
    // 176p: Router 실습 — 지연 로딩 + 동적 라우트(:cityId) + Catch-all
    {
      path: '/weather-router',
      name: 'WeatherHome',
      component: () => import('../views/WeatherHomeView.vue'),
    },
    {
      path: '/weather-router/about',
      name: 'WeatherAbout',
      component: () => import('../views/WeatherAboutView.vue'),
    },
    {
      path: '/weather-router/weather/:cityId',
      name: 'WeatherDetail',
      component: () => import('../views/WeatherDetailView.vue'),
    },
    // Catch-all은 반드시 배열 맨 마지막에 위치
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router
