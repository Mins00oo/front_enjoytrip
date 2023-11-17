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
      <div class="right col-lg-8">
        <ul class="nav">
          <li @click="selectTab('gallery')" :class="{ 'selected': selectedTab === 'gallery' }">Gallery</li>
          <li @click="selectTab('review')" :class="{ 'selected': selectedTab === 'review' }">Reviews</li>
          <li>Groups</li>
          <li>About</li>
        </ul>
        <span class="edit" @click="showUserModifyModal()">정보 수정</span>

        <!-- Button trigger modal -->
        <button
          type="button"
          class="btn-delete"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          회원 탈퇴
        </button>

        <!--갤러리 이미지-->
        <star-list v-show="selectedTab === 'gallery'"></star-list>
        <!--리뷰-->
        <review-list v-show="selectedTab === 'review'"></review-list>
      </div>
    </div>
  </div>

  <!-- 회원탈퇴 Modal -->
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">회원 탈퇴</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">정말 탈퇴하시겠습니까?</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
          <button type="button" class="btn btn-primary" @click="deleteUser()">탈퇴하기</button>
        </div>
      </div>
    </div>
  </div>
  <UserModifyModal></UserModifyModal>
</template>

<script setup>
import http from '@/common/axios.js'
import UserModifyModal from './modal/UserModifyModal.vue'
import StarList from "../star/StarList.vue"
import ReviewList from "../review/ReviewList.vue"
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
  } catch (error) {
    console.log(error)
  }
}

const showUserModifyModal = () => userModifyModal.show()

const deleteUser = async () => {
  try {
    let { data } = await http.delete(`/users/${authStore.userId}`)
    userName.value = ''
    userNickname.value = ''
    userEmail.value = ''
    sessionStorage.removeItem('isLogin')
    sessionStorage.removeItem('userNickName')
    sessionStorage.removeItem('userId')
    deleteUserModal.hide()
    router.push('/')
  } catch (error) {
    console.log(error)
  }
}
userDetail()

//초기값은 gallery
const selectedTab = ref('gallery');

const selectTab = (tab) => {
  selectedTab.value = tab;
}

</script>

<style scoped>
@import '/src/assets/css/profile.css';
</style>
