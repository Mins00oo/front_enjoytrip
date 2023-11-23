<template>
  <section class="bg-light">
    <div class="container pb-5">
      <div class="row">
        <div class="col-lg-5 mt-5">
          <div class="card mb-3">
            <img
              class="card-img img-fluid"
              :src="tourStore.firstImage"
              alt="Card image cap"
              id="product-detail"
            />
          </div>
        </div>
        <!-- col end -->
        <div class="col-lg-7 mt-5">
          <div class="card">
            <div class="card-body">
              <h1 class="h2">{{ tourStore.title }}</h1>

              <ul class="list-inline">
                <li class="list-inline-item">
                  <h6>위치:</h6>
                </li>
                <li class="list-inline-item">
                  <p class="text-muted">
                    <strong>{{ tourStore.addr1 }}</strong>
                  </p>
                </li>

                <ul class="list-unstyled d-flex justify-content-center mb-1">
                  <li v-for="n in 5" :key="`star-${tourStore.averageScore}-${n}`">
                    <i
                      :class="{
                        'text-warning': n <= tourStore.averageScore,
                        'text-muted': n > tourStore.averageScore
                      }"
                      class="fa fa-star"
                    ></i>
                  </li>
                </ul>
              </ul>

              <h6>Description:</h6>
              <p>
                {{ tourStore.overview }}
              </p>

              <div class="row pb-3">
                <div class="col d-grid">
                  <button type="submit" class="btn btn-success btn-lg" name="submit" value="buy">
                    마이트립 추가
                  </button>
                </div>
                <div class="col d-grid">
                  <button
                    v-if="tourStore.favorite"
                    class="btn btn-success btn-lg"
                    @click="deleteStar(tourStore.contentId)"
                  >
                    즐겨찾기 삭제
                  </button>
                  <button
                    v-else
                    class="btn btn-success btn-lg"
                    @click="addStar(tourStore.contentId)"
                  >
                    즐겨찾기 추가
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- col end -->
        <!-- map -->
        <kakao-map
          :contentId="props.contentId"
          :latitude="props.latitude"
          :longitude="props.longitude"
        ></kakao-map>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useTourStore } from '../../stores/tourStore'
import { useAuthStore } from '@/stores/userStore'
import { ref } from 'vue'
import KakaoMap from '../map/KakaoMap.vue'
import http from '@/common/axios.js'

const { setLogout } = useAuthStore()
const props = defineProps({
  contentId: String,
  latitude: Number,
  longitude: Number
})

const content = ref('')
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
      tourStore.favorite = true
      alert('추가 되었습니다!')
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
      tourStore.favorite = false
      alert('삭제 되었습니다!')
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
    userEmail: ''
  })
}

const { tourStore, tourDetail } = useTourStore()
</script>
