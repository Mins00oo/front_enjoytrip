<template>
  <section class="bg-light">
    <div class="container py-5">
      <div class="row text-center py-3">
        <div class="col-lg-6 m-auto">
          <h1 class="h1">추천 관광지</h1>
        </div>
      </div>
      <div class="row">
        <div
          class="col-12 col-md-4 mb-4"
          v-for="(item, index) in tourStore.mainTourRecommendList"
          :key="index"
        >
          <div class="card h-100">
            <router-link :to="`/detail/${item.contentId}`">
              <img :src="item.firstImage" class="card-img-top" :alt="item.title" />
            </router-link>
            <div class="card-body">
              <ul class="list-unstyled d-flex justify-content-between">
                <li></li>
                <li class="text-muted text-right">{{ item.addr1 }}</li>
              </ul>
              <a
                :href="`/tour-detail/${item.contentId}`"
                class="h2 text-decoration-none text-dark"
                >{{ item.title }}</a
              >
              <p class="card-text">{{ item.addr1 }}</p>
              <p class="text-muted">Reviews ({{ item.addr1 }})</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTourStore } from '../../stores/tourStore'
import http from '@/common/axios.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const { tourStore, setTourDetail } = useTourStore()

const goToTourDetail = async (contentId) => {
  try {
    let { data } = await http.get('/tours/' + contentId)

    if (data.result == 'login') {
      console.log(data)
      doLogout()
    } else {
      console.log(data)
      sessionStorage.setItem('contentId', contentId)
      setTourDetail(data)

      router.push({ name: 'TourDetail', params: { contentId: contentId } })
    }
  } catch (error) {
    console.log('BoardMainVue: error : ')
    console.log(error)
  }
}
</script>
