<template>
  <div id="template-mo-zay-hero-carousel" class="carousel slide" data-bs-ride="carousel">
    <ol class="carousel-indicators">
      <li
        v-for="(item, index) in tourStore.recommendList"
        :key="index"
        data-bs-target="#template-mo-zay-hero-carousel"
        :data-bs-slide-to="index"
        :class="{ active: index === 0 }"
      ></li>
    </ol>
    <div class="carousel-inner">
      <div
        v-for="(item, index) in tourStore.recommendList"
        :key="index"
        :class="['carousel-item', { active: index === 0 }]"
      >
        <div class="container">
          <div class="row p-5">
            <div class="product-wap card rounded-0">
              <div class="col-md-8 col-lg-6 mx-auto order-lg-last text-center">
                <img class="img-fluid" :src="item.firstImage" />
                <div
                  class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center"
                >
                  <ul class="list-unstyled">
                    <li>
                      <button
                        class="btn btn-success text-white"
                        @click="tourDetail(item.contentId)"
                      >
                        <i class="far fa-heart"></i>
                      </button>
                    </li>
                    <li>
                      <button
                        class="btn btn-success text-white mt-2"
                        @click="tourDetail(item.contentId)"
                      >
                        <i class="far fa-eye"></i>
                      </button>
                    </li>
                    <li>
                      <button
                        class="btn btn-success text-white mt-2"
                        @click="tourDetail(item.contentId)"
                      >
                        <i class="fas fa-cart-plus"></i>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
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
