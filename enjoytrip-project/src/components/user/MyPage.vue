<template>
  <div class="container">
    <div class="row">
      <div class="left col-lg-4">
        <div class="photo-left">
          <!--profile image-->
          <img class="photo" src="/src/assets/img/monga.jpg" />
        </div>
        <!--왼쪽 편의 정보-->
        <h4 class="name">{{ userName }}</h4>
        <p class="info">{{ userNickname }}</p>
        <p class="info">{{ userEmail }}</p>
        <!--사용자 정보-->
        <div class="stats">
          <div class="stat">
            <p class="number-stat">{{ visitedCount }}</p>
            <p class="desc-stat">Visited</p>
          </div>
          <div class="stat">
            <p class="number-stat">{{ reviewCount }}</p>
            <p class="desc-stat">Reviews</p>
          </div>
          <div class="stat">
            <p class="number-stat">{{ boardCount }}</p>
            <p class="desc-stat">Uploads</p>
          </div>
        </div>
        <!--좌측 하단 소개말-->
        <p class="desc">소개글: {{ userDescription }}</p>
      </div>
      <UserModifyModal
        :userName="userName"
        :userNickname="userNickname"
        :userEmail="userEmail"
        :userDescription="userDescription"
      />
      <div class="right col-lg-8">
        <ul class="nav">
          <li @click="selectTab('visited')" :class="{ selected: selectedTab === 'visited' }">
            Visited
          </li>
          <li @click="selectTab('star')" :class="{ selected: selectedTab === 'star' }">Stared</li>
          <li @click="selectTab('review')" :class="{ selected: selectedTab === 'review' }">
            Reviews
          </li>
          <li @click="selectTab('mytrip')" :class="{ selected: selectedTab === 'mytrip' }">
            MyTrip
          </li>
        </ul>
        <span class="edit" @click="showUserModifyModal()">정보 수정</span>
        &nbsp; &nbsp;

        <span class="edit" @click="showChangePasswordModal()">비밀 번호 수정</span>
        &nbsp; &nbsp;

        <UserDeleteModal></UserDeleteModal>
        <!-- Button trigger modal -->
        <span class="edit" @click="showUserDeleteModal()">회원 탈퇴</span>

        <!-- 방문했던 장소 -->
        <visit-list v-show="selectedTab === 'visited'"></visit-list>
        <!-- 즐겨찾기 -->
        <star-list v-show="selectedTab === 'star'"></star-list>
        <!-- 리뷰 -->
        <review-list v-show="selectedTab === 'review'"></review-list>
        <!-- 마이트립 -->
        <my-trip-list v-show="selectedTab === 'mytrip'"></my-trip-list>
      </div>
    </div>
    <ChangePasswordModal :userId="userId"></ChangePasswordModal>
  </div>
</template>

<script setup>
import http from '@/common/axios.js'
import UserModifyModal from './modal/UserModifyModal.vue'

import StarList from '../star/StarList.vue'
import ReviewList from '../review/ReviewList.vue'
import VisitList from '../review/VisitList.vue'
import MyTripList from "../mytrip/MyTripList.vue"
import UserDeleteModal from './modal/UserDeleteModal.vue'
import ChangePasswordModal from './modal/ChangePasswordModal.vue'

import { ref, onMounted, effect } from 'vue'
import { useAuthStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { Modal } from 'bootstrap'

let deleteUserModal = null
let userModifyModal = null
let changePasswordModal = null

onMounted(() => {
  deleteUserModal = new Modal(document.getElementById('staticBackdrop'))
  userModifyModal = new Modal(document.getElementById('userEditModal'))
  changePasswordModal = new Modal(document.getElementById('editPasswordModal'))
})

const router = useRouter()
const { authStore, setLogout } = useAuthStore()

const userName = ref('')
const userNickname = ref('')
const userEmail = ref('')
const userId = ref('')
const userDescription = ref('')
const visitedCount = ref('')
const reviewCount = ref('')
const boardCount = ref('')
const starCount = ref('')

const userDetail = async () => {
  try {
    let { data } = await http.get(`/users/${authStore.userId}`)
    console.log('userDetailData', data)
    if (data.result == 'login') {
      doLogout()
    }
    userName.value = data.userName
    userNickname.value = data.userNickname
    userEmail.value = data.userEmail
    userId.value = data.userId
    visitedCount.value = data.visitedCount
    reviewCount.value = data.reviewCount
    boardCount.value = data.boardCount
    starCount.value = data.starCount
    userDescription.value = data.userDescription
    console.log(userEmail)
  } catch (error) {
    console.log(error)
  }
}

const showUserModifyModal = () => {
  userModifyModal.show()
}

const showChangePasswordModal = () => {
  changePasswordModal.show()
}
userDetail()

//초기값은 visited
const selectedTab = ref('visited')

const selectTab = (tab) => {
  selectedTab.value = tab
}

const showUserDeleteModal = () => {
  deleteUserModal.show()
}

onMounted(() => {
  userDetail()
  console.log(userName.value)
})

// logout 처리 별도 method
const doLogout = () => {
  setLogout({
    isLogin: false,
    userNickName: '',
    userId: '',
    userEmail: ''
  })
  router.push('/login')
}
</script>

<style scoped>
@import '/src/assets/css/profile.css';
</style>
