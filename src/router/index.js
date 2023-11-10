import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/views/MainPage.vue'
import TourList from '@/components/main/MainTourList.vue'
import TourRecommend from '@/components/main/MainTourRecommend.vue'
import TourListPage from '@/views/TourListPage.vue'
import TourDetailPage from '@/views/TourDetailPage.vue'
import BoardListPage from '@/views/BoardListPage.vue'
import BoardWritePage from '@/views/BoardWritePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainPage
    },
    {
      path: '/about',
      component: TourList
    },
    {
      path: '/tour',
      component: TourListPage
    },
    {
      path: '/tourrecom',
      component: TourRecommend
    },
    {
      path: '/detail',
      component: TourDetailPage
    },
    {
      path: '/board',
      component: BoardListPage
    },
    {
      path: '/board/write',
      name: 'board-write',
      component: BoardWritePage
    }
  ]
})

export default router
