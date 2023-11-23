<template>
  <div class="row text-left p-2 pb-3">
    <h4 style="font-weight: bold !important;">관련 관광지</h4>
  </div>
  <div id="template-mo-zay-hero-carousel" class="carousel slide" data-bs-ride="carousel">
    <ol class="carousel-indicators">
      <li
        v-for="(item, index) in tourStore.tourRelatedList"
        :key="index"
        data-bs-target="#template-mo-zay-hero-carousel"
        :data-bs-slide-to="index"
        :class="{ active: index === 0 }"
      ></li>
    </ol>
    <div class="carousel-inner">
      <div
        v-for="(item, index) in tourStore.tourRelatedList"
        :key="index"
        :class="['carousel-item', { active: index === 0 }]"
      >
        <div class="container">
          <div class="row p-5">
            <div class="product-wap card rounded-0">
              <div class="col-md-8 col-lg-6 mx-auto order-lg-last text-center">
                <router-link :to="`/detail/${item.contentId}`">
                  <img
                    :src="item.firstImage || '@/assets/img/default_img.png'"
                    class="card-img-top"
                    :alt="item.title"
                  />
                </router-link>
                <div
                  class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center"
                >
                  <ul class="list-unstyled">
                    <li>
                      <router-link
                        :to="`/detail/${item.contentId}`"
                        class="btn btn-success text-white mt-2"
                      >
                        <i class="fas fa-heart"></i>
                      </router-link>
                    </li>
                    <li>
                      <button
                        class="btn btn-success text-white mt-2"
                        @click="goToDetailPage(item.contentId)"
                      >
                        <i class="far fa-eye"></i>
                      </button>
                    </li>
                    <li>
                      <router-link
                        :to="`/detail/${item.contentId}`"
                        class="btn btn-success text-white mt-2"
                      >
                        <i class="fas fa-cart-plus"></i>
                      </router-link>
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
import { useTourStore } from '@/stores/tourStore'
import http from '@/common/axios.js'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()

const { tourStore, setTourDetail, tourRelatedList } = useTourStore()

tourRelatedList(tourStore.contentId)

const goToDetailPage = async (contentId) => {
  try {
    let { data } = await http.get('/tours/' + contentId)

    if (data.result == 'login') {
      doLogout()
    } else {
      sessionStorage.setItem('contentId', contentId)

      router.push({ name: 'TourDetail', params: { contentId: contentId } })
    }
  } catch (error) {
    console.log('BoardMainVue: error : ')
    console.log(error)
  }
}
</script>

<style scoped>
@font-face {
    font-family: 'SUITE-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
}

* {
    font-family: 'SUITE-Regular';
}

i {
    font-family: 'Font Awesome 5 Free';
}

</style>
