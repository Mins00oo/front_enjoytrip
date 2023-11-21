<template>
  <TourDetailContent :contentId="contentId"></TourDetailContent>
  <TourRelateContent></TourRelateContent>
</template>

<script setup>
import TourDetailContent from '@/components/tours/TourDetailContent.vue'
import TourRelateContent from '@/components/tours/TourRelatedContent.vue'
import { useRoute } from 'vue-router'
import { onMounted, watch } from 'vue'
import { useTourStore } from '../stores/tourStore'

const { tourDetail } = useTourStore()
const route = useRoute()
const props = defineProps({
  contentId: String
})

// 새로운 contentId로 값이 변경되었을때 데이터 처리
watch(
  () => route.params.contentId,
  async (newContentId) => {
    console.log(newContentId)
    if (newContentId) {
      await tourDetail(newContentId)
      window.scrollTo(0, 0)
    }
  },
  { immediate: true }
)

onMounted(() => {
  console.log('detail page mount 이후!')
  window.scrollTo(0, 0)
})
</script>
