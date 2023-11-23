<template>
  <section class="container py-5">
    <div class="row text-center pt-3">
      <div class="col-lg-6 m-auto">
        <h2 class="h2">대표 지역별</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-4 p-5 mt-3" v-for="city in cities" :key="city.name">
        <div class="city-card">
          <div class="city-image-container">
            <img :src="city.imageUrl" class="city-image" />
          </div>
          <h5 class="text-center mt-3 mb-3">{{ city.name }}</h5>
          <p class="text-center">
            <button class="btn btn-success" @click="goToCategoryView(city.name)">둘러보기</button>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useTourStore } from '../../stores/tourStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const { tourStore, tourList } = useTourStore()
const cities = [
  { name: '서울', imageUrl: '/src/assets/img/seoul.jpg' },
  { name: '부산', imageUrl: '/src/assets/img/busan.jpg' },
  { name: '제주', imageUrl: '/src/assets/img/jeju.webp' }
]
const goToCategoryView = (region) => {
  window.scroll(0, 0)
  router.push({ path: `/tours/region/${region}` })
}
</script>

<style>
.city-card {
  text-align: center;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.city-image {
  width: 100%; /* 컨테이너에 맞춰 이미지 너비 조정 */
  height: 100%; /* 컨테이너에 맞춰 이미지 높이 조정 */
  object-fit: cover; /* 이미지 비율 유지 및 채우기 */
}

.city-card h5 {
  margin-top: 20px;
  font-weight: bold;
  color: #333;
}

.city-card button {
  margin-top: 10px;
  background-color: #28a745;
  border: none;
  padding: 10px 20px;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.city-card button:hover {
  background-color: #218838;
}

.city-image-container {
  width: 200px; /* 이미지 컨테이너 너비 */
  height: 200px; /* 이미지 컨테이너 높이 */
  border-radius: 50%; /* 원형 모양 */
  overflow: hidden; /* 이미지가 컨테이너 바깥으로 나가지 않도록 */
  margin: 0 auto; /* 중앙 정렬 */
}
</style>
