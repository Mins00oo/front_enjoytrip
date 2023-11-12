<template>
  <TourDetailContent></TourDetailContent>
  <div id="template-mo-zay-hero-carousel" class="carousel slide" data-bs-ride="carousel">
    <TourRelateContent></TourRelateContent>
  </div>
</template>

<script>
import TourDetailContent from '@/components/tours/TourDetailContent.vue'
import TourRelateContent from '@/components/tours/TourRelatedContent.vue'

export default {
  components: {
    // 컴포넌트를 등록
    TourDetailContent,
    TourRelateContent
  }
}
</script>
