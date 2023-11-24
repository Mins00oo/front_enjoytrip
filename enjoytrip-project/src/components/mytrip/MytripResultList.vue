<template>
  <div class="row row-cols-auto">
    <div
      v-for="(tour, index) in store.tourStore.searchResultList"
      :key="index"
      class="result-container"
    >
      <div class="result-item">
        <div class="content-container">
          <div class="image-container">
            <img
              class="tour-image"
              :src="tour.firstImage || '/src/assets/img/default_img.png'"
              :alt="tour.title"
            />
          </div>
          <div class="tour-text">
            <div class="tour-title-container">
              <div class="tour-title">{{ tour.title }}</div>
              <i @click="addTour(tour.contentId)" class="fas fa-plus plus"></i>
            </div>
            <div class="tour-score">{{ tour.score }}</div>
            <div class="tour-addr">{{ tour.addr1 }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="more-button-container">
    <button @click="loadMore" class="btn" style="background-color: #198754; color: white; margin-top: 20px; margin-left: 32.5%;">더보기</button>
  </div>
</template>

<script setup>
import http from '@/common/axios.js'
import { ref } from 'vue'
import { useTourStore } from '../../stores/tourStore'
import { useMytripStore } from '../../stores/mytripStore'

//검색을 위한 store
// 아래와같이 진행하면 안됨!! --> 다른 component와 공유 불가능
// const { tourStore, tourSearchList } = useTourStore()

const { tourStore } = useTourStore()
const store = useTourStore()
const mStore = useMytripStore()
const localLimit = ref(10)
const localOffset = ref(0)

const addTour = async (contentId) => {
  //추가할 관광지가 이미 마이트립 내에 존재하는지 확인
  let param = {
    mytripId: mStore.mytripStore.mytripId,
    contentId: contentId
  }
  if (!isTourContain(mStore.mytripStore.list, contentId)) {
    try {
      let { data } = await http.post('/mytrips/tour', param)
      mStore.tourList(mStore.mytripStore.mytripId)
      alert('관광지가 추가되었습니다!')
    } catch (error) {
      console.error(error)
    }
  } else {
    alert('이미 추가된 관광지 입니다!')
  }
}

const loadMore = () => {
  localLimit.value += localLimit.value
  tourStore.limit = localLimit.value
  store.tourSearchList()
}

const isTourContain = (list, id) => {
  return list.some((item) => item.contentId === id)
}
</script>

<style scoped>
@import '../../assets/css/mytripSearchList.css';
</style>
