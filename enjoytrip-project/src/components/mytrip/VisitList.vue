<template>
  <div class="row gallery">
    <div class="col-md-4" v-for="(visit, index) in dataList" v-bind:key="index">
      <!--디테일 페이지 연동하기-->
      <div class="image-container">
        <img :src="visit.firstImage" class="responsive-image" />
        <div class="overlay">
          <router-link :to="`/detail/${visit.contentId}`" class="link-style">
            <p>{{ visit.title }}</p>
          </router-link>
          <hr />
          <i @click="writeReview(visit.contentId)" class="fas fa-trash"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import http from '@/common/axios.js'
import { useAuthStore } from '@/stores/userStore'

//관광지 정보 세팅하기
const { setLogout } = useAuthStore()
const dataList = ref([])
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
@import '/src/assets/css/starlist.css';
@import '/src/assets/css/fontawesome.css';
@import '/src/assets/css/fontawesome.min.css';
</style>
