<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/layouts/NavBar.vue'
import FooterBar from './components/layouts/FooterBar.vue'
import './assets/css/fontawesome.min.css'
import './assets/css/custom.css'

import { useAuthStore } from '@/stores/userStore'
import { useTourStore } from '@/stores/tourStore'

// sessionStorage에 login된 상태를 확인하면 sessionStorage에 있는 값을 이용해서 authStore를 갱신
const { setLogin, setLogout } = useAuthStore()
const { tourStore, tourDetail, tourRelatedList, mainTourRecommendList } = useTourStore()

let isLogin = sessionStorage.getItem('isLogin')
let isContent = sessionStorage.getItem('contentId')

if (isLogin == 'true') {
  let userNickname = sessionStorage.getItem('userNickname')
  let userId = sessionStorage.getItem('userId')
  setLogin({
    isLogin: true,
    userNickname: userNickname,
    userId: userId
  })
} else {
  setLogout({
    isLogin: false,
    userNickName: '',
    userId: '',
    userEmail: ''
  })
}

if (isContent != null) {
  let contentId = sessionStorage.getItem('contentId')
  tourDetail(contentId)
  tourRelatedList(contentId)
}
</script>

<template>
  <nav-bar></nav-bar>
  <router-view></router-view>
  <footer-bar></footer-bar>
</template>

<style scoped></style>
