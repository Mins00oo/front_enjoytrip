<template>
  <MainTourRecommend></MainTourRecommend>
  <div class="icon-section">
    <div class="icon-grid-container">
      <div class="icon-grid-item">
        <font-awesome-icon :icon="['fas', 'house']" class="icon-large" />
        <span class="icon-label">숙박</span>
      </div>

      <div class="icon-grid-item">
        <font-awesome-icon :icon="['fas', 'house']" class="icon-large" />
        <span class="icon-label">숙박</span>
      </div>

      <div class="icon-grid-item">
        <font-awesome-icon :icon="['fas', 'house']" class="icon-large" />
        <span class="icon-label">숙박</span>
      </div>

      <div class="icon-grid-item">
        <font-awesome-icon :icon="['fas', 'house']" class="icon-large" />
        <span class="icon-label">숙박</span>
      </div>

      <div class="icon-grid-item">
        <font-awesome-icon :icon="['fas', 'house']" class="icon-large" />
        <span class="icon-label">숙박</span>
      </div>

      <div class="icon-grid-item">
        <font-awesome-icon :icon="['fas', 'house']" class="icon-large" />
        <span class="icon-label">숙박</span>
      </div>

      <div class="icon-grid-item">
        <font-awesome-icon :icon="['fas', 'house']" class="icon-large" />
        <span class="icon-label">숙박</span>
      </div>

      <div class="icon-grid-item">
        <font-awesome-icon :icon="['fas', 'house']" class="icon-large" />
        <span class="icon-label">숙박</span>
      </div>

      <div class="icon-grid-item">
        <font-awesome-icon :icon="['fas', 'house']" class="icon-large" />
        <span class="icon-label">숙박</span>
      </div>
    </div>
  </div>

  <MainTourList></MainTourList>
  <MainTourCategory></MainTourCategory>
</template>

<script setup>
import MainTourRecommend from '@/components/main/MainTourRecommend.vue'
import MainTourList from '@/components/main/MainTourList.vue'
import MainTourCategory from '@/components/main/MainTourCategory.vue'
import { useTourStore } from '../stores/tourStore'

const { tourStore, tourList, tourRecommendList, mainTourRecommendList } = useTourStore()

// 초기 작업
tourRecommendList() // 메인 이미지 보여주기 위함
mainTourRecommendList() // 추천 관광지
</script>

<style scoped>
@import '@/assets/css/mainCategory.css';
</style>
