import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/views/MainPage.vue'
import TourList from '@/components/main/MainTourList.vue'
import TourRecommend from '@/components/main/MainTourRecommend.vue'
import TourListPage from '@/views/TourListPage.vue'
import TourDetailPage from '@/views/TourDetailPage.vue'
import BoardView from '@/views/BoardView.vue'
//User 관련 추가
import LoginPage from '@/components/user/LoginPage.vue'
import RegisterPage from '@/components/user/RegisterPage.vue'
import MyPage from '@/components/user/MyPage.vue'
import { useAuthStore } from '@/stores/userStore'

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
      component: BoardView,
      beforeEnter: (to, from, next) => {
        // authstore에서 isLogin 확인 후 분기처리 => navigation guard
        const { authStore } = useAuthStore()
        let ssLogin = sessionStorage.getItem('isLogin')

        if (authStore.isLogin || ssLogin == 'true') {
          next()
        } else {
          next('/login')
        }
      }
    },
    //User 관련 (로그인, 회원가입, 마이페이지)
    {
      path: '/login',
      component: LoginPage
    },
    {
      path: '/register',
      component: RegisterPage
    },
    {
      path: '/mypage',
      component: MyPage,
      beforeEnter: (to, from, next) => {
        // authstore에서 isLogin 확인 후 분기처리 => navigation guard
        const { authStore } = useAuthStore()
        let ssLogin = sessionStorage.getItem('isLogin')

        if (authStore.isLogin || ssLogin == 'true') {
          next()
        } else {
          next('/login')
        }
      }
    }
  ]
})

export default router
