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
            <p class="number-stat">13</p>
            <p class="desc-stat">Visited</p>
          </div>
          <div class="stat">
            <p class="number-stat">5</p>
            <p class="desc-stat">Reviews</p>
          </div>
          <div class="stat">
            <p class="number-stat">7</p>
            <p class="desc-stat">Uploads</p>
          </div>
        </div>
        <!--좌측 하단 소개말-->
        <p class="desc">버킷리스트: 해외 유명맛집 부수기!!</p>
      </div>
      <UserModifyModal :userName="userName" :userNickname="userNickname" :userEmail="userEmail" />
      <div class="right col-lg-8">
        <ul class="nav">
          <li @click="selectTab('gallery')" :class="{ 'selected': selectedTab === 'gallery' }">Gallery</li>
          <li @click="selectTab('review')" :class="{ 'selected': selectedTab === 'review' }">Reviews</li>
          <li>Groups</li>
          <li>About</li>
        </ul>
        <span class="edit" @click="showUserModifyModal()">정보 수정</span>
        &nbsp; &nbsp;

        <UserDeleteModal></UserDeleteModal>
        <!-- Button trigger modal -->
        <span class="edit" @click="showUserDeleteModal()">회원 탈퇴</span>

        <!--갤러리 이미지-->
        <star-list v-show="selectedTab === 'gallery'"></star-list>
        <!--리뷰-->
        <review-list v-show="selectedTab === 'review'"></review-list>
      </div>
    </div>
  </div>
</template>

<script setup>
import http from '@/common/axios.js'
import UserModifyModal from './modal/UserModifyModal.vue'

import StarList from "../star/StarList.vue"
import ReviewList from "../review/ReviewList.vue"
import UserDeleteModal from './modal/UserDeleteModal.vue'

import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { Modal } from 'bootstrap'

let deleteUserModal = null
let userModifyModal = null

onMounted(() => {
  deleteUserModal = new Modal(document.getElementById('staticBackdrop'))
  userModifyModal = new Modal(document.getElementById('userEditModal'))
})

const router = useRouter()
const { authStore } = useAuthStore()

const userName = ref('')
const userNickname = ref('')
const userEmail = ref('')

const userDetail = async () => {
  try {
    let { data } = await http.get(`/users/${authStore.userId}`)
    console.log('userDetailData', data)
    userName.value = data.userName
    userNickname.value = data.userNickname
    userEmail.value = data.userEmail
    console.log(userEmail)
  } catch (error) {
    console.log(error)
  }
}

const showUserModifyModal = () => {
  userModifyModal.show()
}
userDetail()

//초기값은 gallery
const selectedTab = ref('gallery');

const selectTab = (tab) => {
  selectedTab.value = tab;
}


const showUserDeleteModal = () => {
  deleteUserModal.show()
}

onMounted(() => {
  userDetail()
  console.log(userName.value)
})

</script>

<style scoped>
@import '/src/assets/css/profile.css';
</style>
