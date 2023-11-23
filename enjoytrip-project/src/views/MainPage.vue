<template>
  <div class="search-container">
    <div class="input-group search-input-group">
      <input
        type="search"
        class="form-control search-input"
        placeholder="지역별 검색"
        aria-label="Search"
        aria-describedby="search-addon"
        readonly
        @click="showModal()"
      />
    </div>
  </div>

  <MainTourRecommend></MainTourRecommend>
  <div class="container">
    <div class="icon-section">
      <div class="icon-grid-container">
        <div class="icon-grid-item">
          <font-awesome-icon
            :icon="['fas', 'users']"
            class="icon-large"
            @click="categoryTour('-1')"
          />
          <span class="icon-label">전체</span>
        </div>

        <div class="icon-grid-item">
          <font-awesome-icon
            :icon="['fas', 'hamburger']"
            class="icon-large"
            @click="categoryTour('39')"
          />
          <span class="icon-label">음식점</span>
        </div>

        <div class="icon-grid-item">
          <font-awesome-icon
            :icon="['fas', 'shopping-cart']"
            class="icon-large"
            @click="categoryTour('38')"
          />
          <span class="icon-label">쇼핑</span>
        </div>

        <div class="icon-grid-item">
          <font-awesome-icon
            :icon="['fas', 'running']"
            class="icon-large"
            @click="categoryTour('28')"
          />
          <span class="icon-label">레포츠</span>
        </div>

        <div class="icon-grid-item">
          <font-awesome-icon
            :icon="['fas', 'map']"
            class="icon-large"
            @click="categoryTour('25')"
          />
          <span class="icon-label">여행코스</span>
        </div>

        <div class="icon-grid-item">
          <font-awesome-icon
            :icon="['fas', 'birthday-cake']"
            class="icon-large"
            @click="categoryTour('15')"
          />
          <span class="icon-label">축제공연행사</span>
        </div>

        <div class="icon-grid-item">
          <font-awesome-icon
            :icon="['fas', 'archway']"
            class="icon-large"
            @click="categoryTour('12')"
          />
          <span class="icon-label">관광지</span>
        </div>

        <div class="icon-grid-item">
          <font-awesome-icon
            :icon="['fas', 'synagogue']"
            class="icon-large"
            @click="categoryTour('14')"
          />
          <span class="icon-label">문화시설</span>
        </div>

        <div class="icon-grid-item">
          <font-awesome-icon
            :icon="['fas', 'house']"
            class="icon-large"
            @click="categoryTour('32')"
          />
          <span class="icon-label">숙박</span>
        </div>
      </div>
    </div>
  </div>

  <MainTourList></MainTourList>
  <MainTourCategory></MainTourCategory>
  <SearchModal></SearchModal>
</template>

<script setup>
import MainTourRecommend from '@/components/main/MainTourRecommend.vue'
import MainTourList from '@/components/main/MainTourList.vue'
import MainTourCategory from '@/components/main/MainTourCategory.vue'
import SearchModal from '../components/search/SearchModal.vue'
import { Modal } from 'bootstrap'
import { useTourStore } from '../stores/tourStore'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()
const { tourStore, tourList, tourRecommendList, mainTourRecommendList } = useTourStore()
let searchModal = null

// 초기 작업
tourRecommendList() // 메인 이미지 보여주기 위함
mainTourRecommendList() // 추천 관광지

const categoryTour = (categoryId) => {
  router.push({ name: 'TourCategoryPage', params: { categoryId: categoryId } })
}

const showModal = () => {
  tourStore.searchWord = ''
  tourStore.againSearchWord = ''
  tourStore.category = ''
  searchModal.show()
}

onMounted(() => {
  if (!searchModal) {
    // searchModal이 이미 존재하지 않을 때만 새로 생성
    searchModal = new Modal(document.getElementById('search'))
  }
})
</script>

<style scoped>
@import '@/assets/css/mainCategory.css';
</style>
