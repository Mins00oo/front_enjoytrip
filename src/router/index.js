import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/components/layouts/MainPage.vue'
import TourList from '@/components/tours/TourList.vue'
import TourRecommend from '@/components/tours/TourRecommend.vue'
import TourFeature from '@/components/tours/TourFeature.vue'

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
      path: '/tourlist',
      component: TourList
    },
    {
      path: '/tourrecom',
      component: TourRecommend
    },
    {
      path: '/tourfeat',
      component: TourFeature
    }
  ]
})

export default router
