<template>
  <TourDetailContent
    :contentId="props.contentId"
    :latitude="tourStore.latitude"
    :longitude="tourStore.longitude"
  ></TourDetailContent>
  <div class="container mt-4">
    <div class="row">
      <!-- 좌측 카드 섹션 -->
      <div class="col-md-8">
        <div class="row row-cols-1 row-cols-md-2 g-4">
          <div
            class="col"
            v-for="tour in tourStore.tourRelatedList"
            :key="tour.contentId"
            @click="goToDetailPage(tour.contentId)"
          >
            <div class="card h-100">
              <img :src="tour.firstImage" class="card-img-top img-fixed-size" />
              <div class="card-body">
                <h5 class="card-title">{{ tour.title }}</h5>
                <p class="card-text">{{ tour.addr1 }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 우측 후기 섹션 -->
      <div class="col-md-4">
        <h2>후기</h2>
        <div class="review-list">
          <!-- 리뷰가 없는 경우 표시 -->
          <div v-if="tourStore.reviewResponseDtos.length === 0" class="no-reviews">
            아직 후기가 없습니다.
          </div>
          <div
            v-else
            class="review"
            v-for="(review, index) in tourStore.reviewResponseDtos"
            :key="index"
          >
            <div class="review-author">
              <strong>{{ review.userNickname }}</strong>
              <!-- 닉네임 추가 -->
            </div>
            <div class="review-content">
              <p>{{ review.content }}</p>
            </div>
            <div class="review-rating">
              <span
                v-for="n in 5"
                :key="`star-${index}-${n}`"
                class="star"
                :class="{ filled: n <= review.score }"
              >
                <i class="fa fa-star"></i>
              </span>
            </div>
            <div class="review-meta">
              <span class="review-date">{{ review.createAt }}</span>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TourDetailContent from '@/components/tours/TourDetailContent.vue'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, watch } from 'vue'
import { useTourStore } from '../stores/tourStore'

const { tourDetail, tourStore, tourRelatedList } = useTourStore()
const route = useRoute()
const router = useRouter()
const props = defineProps({
  contentId: String
})

tourDetail(props.contentId)

// 새로운 contentId로 값이 변경되었을때 데이터 처리
watch(
  () => route.params.contentId,
  async (newContentId) => {
    if (newContentId) {
      await tourDetail(newContentId)
      tourRelatedList(newContentId)
      window.scrollTo(0, 0)
    }
  },
  { immediate: true }
)

tourRelatedList(props.contentId)

const goToDetailPage = (contentId) => {
  router.push({ name: 'TourDetail', params: { contentId: contentId } })
}

onMounted(async () => {
  window.scrollTo(0, 0)
})
</script>

<style scoped>
@import '/src/assets/css/tourDetailPage.css';
</style>
