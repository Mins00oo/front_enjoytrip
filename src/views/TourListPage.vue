<template>
  <div class="container py-5">
    <div class="row">
      <MainTourCategory></MainTourCategory>
      <MainTourList></MainTourList>
    </div>
  </div>
</template>

<script setup>
import MainTourCategory from '@/components/tours/TourCategory.vue'
import MainTourList from '@/components/tours/TourList.vue'
</script>
