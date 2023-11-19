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

const { tourList, totalPages } = useTourStore()

tourList()
</script>
