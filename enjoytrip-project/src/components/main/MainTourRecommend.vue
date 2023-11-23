<template>
  <div id="template-mo-zay-hero-carousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div
        v-for="(item, index) in tourStore.recommendList"
        :key="index"
        :class="['carousel-item', { active: index === 0 }]"
      >
        <div class="carousel-item-container">
          <div class="carousel-image-container">
            <img :src="item.firstImage" class="carousel-image" />
          </div>
        </div>
      </div>
    </div>

    <!-- 캐러셀 컨트롤러 -->
    <a
      class="carousel-control-prev text-decoration-none w-auto ps-3"
      href="#template-mo-zay-hero-carousel"
      role="button"
      data-bs-slide="prev"
    >
      <i class="fas fa-chevron-left"></i>
    </a>
    <a
      class="carousel-control-next text-decoration-none w-auto pe-3"
      href="#template-mo-zay-hero-carousel"
      role="button"
      data-bs-slide="next"
    >
      <i class="fas fa-chevron-right"></i>
    </a>
  </div>
</template>

<script setup>
import { useTourStore } from '../../stores/tourStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const { tourStore, setTourDetail } = useTourStore()

const tourDetail = async (contentId) => {
  router.push({ name: 'TourDetail', params: { contentId: contentId } })
}

// logout 처리 별도 method
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
@import '/src/assets/css/tourDetailPage.css';
@import '@/assets/css/mainTourList.css';

.carousel-item-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.carousel-image-container {
  width: 400px; /* 이미지 컨테이너 너비 */
  height: 500px; /* 이미지 컨테이너 높이 */
  overflow: hidden; /* 이미지가 컨테이너 바깥으로 나가지 않도록 */
  border-radius: 15px; /* 둥근 모서리 */
}

.carousel-image {
  width: 100%; /* 컨테이너에 맞춰 이미지 너비 조정 */
  height: 100%; /* 컨테이너에 맞춰 이미지 높이 조정 */
  object-fit: cover; /* 이미지 비율 유지 및 채우기 */
}

.carousel-control-prev,
.carousel-control-next {
  color: #333; /* 캐러셀 컨트롤러 색상 변경 */
}
</style>
