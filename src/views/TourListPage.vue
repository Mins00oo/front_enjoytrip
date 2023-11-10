<template>
  <div class="container py-5">
    <div class="row">
      <MainTourCategory></MainTourCategory>
      <MainTourList></MainTourList>
    </div>
  </div>
</template>

<script>
import MainTourCategory from '@/components/tours/TourCategory.vue'
import MainTourList from '@/components/tours/TourList.vue'

export default {
  components: {
    // 컴포넌트를 등록
    MainTourCategory,
    MainTourList
  }
}
</script>
