<template>
  <section class="bg-light">
    <div class="container py-5">
      <div class="row text-center py-3">
        <div class="col-lg-6 m-auto">
          <h1
            class="h1"
            style="
              font-family: 'SUITE-Regular' !important;
              font-weight: bold !important;
              font-size: 35px !important;
              margin-bottom: 30px;
            "
          >
            추천 관광지
          </h1>
        </div>
      </div>
      <div class="row">
        <div
          class="col-12 col-md-4 mb-4"
          v-for="(item, index) in tourStore.mainTourRecommendList"
          :key="index"
        >
          <div class="card h-100 position-relative">
            <router-link :to="`/detail/${item.contentId}`">
              <img
                :src="item.firstImage || '/src/assets/img/default_img.png'"
                class="card-img-top"
                :alt="item.title"
              />
            </router-link>
            <font-awesome-icon
              class="favorite-icon"
              :icon="[authStore.isLogin && item.favorite ? 'fas' : 'far', 'heart']"
              @click.stop="handleStar(item)"
            />

            <div class="card-body">
              <a :href="`/shop-single/${item.contentId}`" class="h3 text-decoration-none">{{
                item.title
              }}</a>
              <ul class="list-unstyled d-flex justify-content-center mb-1">
                <li v-for="n in 5" :key="`star-${index}-${n}`">
                  <i
                    :class="{
                      'text-warning': n <= item.averageScore,
                      'text-muted': n > item.averageScore
                    }"
                    class="fa fa-star"
                  ></i>
                </li>
              </ul>
              <p class="text-center mb-0">{{ item.addr1 }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useTourStore } from '../../stores/tourStore'
import { ref } from 'vue'
import http from '@/common/axios.js'
import { useAuthStore } from '@/stores/userStore'

const { setLogout, authStore } = useAuthStore()
const { tourStore, mainTourRecommendList } = useTourStore()
const content = ref('')

const handleStar = (item) => {
  if (item.favorite) {
    deleteStar(item.contentId)
  } else {
    addStar(item.contentId)
  }
}

const addStar = async (contentId) => {
  content.value = contentId
  const starObj = {
    contentId: contentId
  }

  try {
    let { data } = await http.post('tours/stars', starObj)
    if (data.result == 'login') {
      alert('로그인 후 사용 가능합니다.')
      doLogout()
    } else if (data.result == 'false') {
      alert('이미 즐겨찾기한 관광지입니다')
    } else {
      mainTourRecommendList()
    }
  } catch (error) {
    console.log(error)
  }
}

const deleteStar = async (contentId) => {
  try {
    let { data } = await http.delete('tours/stars/' + contentId)
    if (data.result == 'login') {
      alert('로그인 후 사용 가능합니다.')
      doLogout()
    } else {
      mainTourRecommendList()
    }
  } catch (error) {
    console.log(error)
  }
}

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
}
</script>

<style scoped>
@import '@/assets/css/mainTourList.css';
</style>
