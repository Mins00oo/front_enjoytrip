<template>
  <MainTourRecommend></MainTourRecommend>
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
tourRecommendList()
mainTourRecommendList()
</script>
