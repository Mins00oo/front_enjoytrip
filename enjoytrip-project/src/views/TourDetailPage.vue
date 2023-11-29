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
          <div class="col" v-for="tour in tourStore.tourRelatedList" :key="tour.contentId">
            <div class="card h-100">
              <router-link :to="`/detail/${tour.contentId}`">
                <img :src="tour.firstImage" class="card-img-top img-fixed-size" />
              </router-link>

              <font-awesome-icon
                class="favorite-icon"
                :icon="[authStore.isLogin && tour.favorite ? 'fas' : 'far', 'heart']"
                @click.stop="handleStar(tour)"
              />
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
import { onMounted, watch, ref } from 'vue'
import http from '@/common/axios.js'
import { useTourStore } from '../stores/tourStore'
import { useAuthStore } from '@/stores/userStore'

const { authStore } = useAuthStore()
const { tourDetail, tourStore, tourRelatedList } = useTourStore()
const route = useRoute()
const router = useRouter()
const props = defineProps({
  contentId: String
})
const content = ref('')

tourDetail(props.contentId)

const handleStar = (item) => {
  if (item.favorite) {
    deleteStar(item.contentId)
  } else {
    addStar(item.contentId)
  }
}

const addStar = async (contentId) => {
  content.value = contentId
  const starObj = {
    contentId: contentId
  }

  try {
    let { data } = await http.post('tours/stars', starObj)
    if (data.result == 'login') {
      alert('로그인 후 사용 가능합니다.')
      doLogout()
    } else if (data.result == 'false') {
      alert('이미 즐겨찾기한 관광지입니다')
    } else {
      tourDetail(props.contentId)
    }
  } catch (error) {
    console.log(error)
  }
}

const deleteStar = async (contentId) => {
  try {
    let { data } = await http.delete('tours/stars/' + contentId)
    if (data.result == 'login') {
      alert('로그인 후 사용 가능합니다.')
      doLogout()
    } else {
      tourDetail(props.contentId)
    }
  } catch (error) {
    console.log(error)
  }
}

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

onMounted(async () => {
  window.scrollTo(0, 0)
})
</script>

<style scoped>
@import '/src/assets/css/tourDetailPage.css';
@import '@/assets/css/mainTourList.css';
</style>
