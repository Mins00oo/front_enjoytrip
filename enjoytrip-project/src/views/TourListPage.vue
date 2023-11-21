<template>
  <div class="container py-5">
    <div class="row">
      <TourCategory></TourCategory>
      <TourList></TourList>
    </div>
  </div>
</template>

<script setup>
import TourCategory from '@/components/tours/TourCategory.vue'
import TourList from '@/components/tours/TourList.vue'
import { useTourStore } from '../stores/tourStore'
import { onMounted } from 'vue'

const { tourList, totalPages, tourStore, setTourListDefault } = useTourStore()

setTourListDefault()
console.log('tourDefault로!')
tourStore.searchWord = ''
tourStore.region = ''
tourList()

onMounted(() => {
  window.scroll(0, 0)
})
</script>
