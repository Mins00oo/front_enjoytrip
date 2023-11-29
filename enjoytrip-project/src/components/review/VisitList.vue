<template>
  <div class="row gallery">
    <div class="col-md-4" v-for="(visit, index) in dataList" v-bind:key="index">
      <!--디테일 페이지 연동하기-->
      <div class="image-container">
        <img
          :src="visit.firstImage || '/src/assets/img/default_img.png'"
          class="responsive-image"
        />
        <div class="overlay">
          <router-link :to="`/detail/${visit.contentId}`" class="link-style">
            <p>{{ visit.title }}</p>
          </router-link>
          <hr />
          <i @click="writeReview(visit.contentId)" class="fas fa-edit"></i>
        </div>
      </div>
    </div>
    <write-review-modal></write-review-modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import http from '@/common/axios.js'
import { useAuthStore } from '@/stores/userStore'
import { useReviewStore } from '../../stores/reivewStore'
import WriteReviewModal from './modal/WriteReviewModal.vue'
import { storeToRefs } from 'pinia'
import { Modal } from 'bootstrap'
import { useRouter } from 'vue-router'

const router = useRouter()
// //Modal 세팅
const store = useReviewStore()
let writeModal = null

//관광지 정보 세팅하기
const { setLogout } = useAuthStore()
const dataList = ref([])

onMounted(() => {
  writeModal = new Modal(document.getElementById('writeReview'))
})

//마이트립 추가하기
const writeReview = async (contentId) => {
  //contentId 설정
  store.setContentId(contentId)
  writeModal.show()
  //다시 리스트 불러오기
  list()
}

const list = async () => {
  try {
    let { data } = await http.get('/tours/users')
    if (data.result == 'login') {
      doLogout()
    } else {
      console.log(data, '방문 데이터')
      dataList.value = data
    }
  } catch (error) {
    console.error(error)
  }
}
list()

// logout 처리 별도 method
const doLogout = () => {
  setLogout({
    isLogin: false,
    userNickName: '',
    userId: '',
    userEmail: '',
    userName: '',
    userPassword: ''
  })
  router.push('/login')
}
</script>

<style scoped>
@import '/src/assets/css/starlist.css';
@import '/src/assets/css/fontawesome.css';
@import '/src/assets/css/fontawesome.min.css';
</style>
