<template>
  <section class="container py-5">
    <div class="row text-center pt-3">
      <div class="col-lg-6 m-auto">
        <h1 class="h1">지역별</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-4 p-5 mt-3">
        <img src="/src/assets/img/seoul.jpg" class="rounded-circle img-fluid border" />
        <h5 class="text-center mt-3 mb-3">서울</h5>
        <p class="text-center">
          <button class="btn btn-success" @click="goToCategoryView('서울')">둘러보기</button>
        </p>
      </div>
      <div class="col-12 col-md-4 p-5 mt-3">
        <img src="src/assets/img/busan.jpg" class="rounded-circle img-fluid border" />
        <h2 class="h5 text-center mt-3 mb-3">부산</h2>
        <p class="text-center">
          <button class="btn btn-success" @click="goToCategoryView('부산')">둘러보기</button>
        </p>
      </div>
      <div class="col-12 col-md-4 p-5 mt-3">
        <img src="src/assets/img/jeju.webp" class="rounded-circle img-fluid border" />
        <h2 class="h5 text-center mt-3 mb-3">제주</h2>
        <p class="text-center">
          <button class="btn btn-success" @click="goToCategoryView('제주')">둘러보기</button>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useTourStore } from '../../stores/tourStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const { tourStore, tourList } = useTourStore()

const goToCategoryView = (region) => {
  window.scroll(0, 0)
  router.push({ path: `/tours/region/${region}` })
}
</script>

<style>
.image-fixed-size {
  width: 250px; /* 고정 너비 */
  height: 250px; /* 고정 높이 */
  object-fit: cover; /* 이미지 비율 유지하며 잘라내기 */
}
</style>
