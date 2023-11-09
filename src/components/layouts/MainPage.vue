<template>
  <TourList></TourList>
  <TourRecommend></TourRecommend>
  <TourFeature></TourFeature>
</template>

<script>
import TourList from '../tours/TourList.vue'
import TourFeature from '../tours/TourFeature.vue'
import TourRecommend from '../tours/TourRecommend.vue'

export default {
  components: {
    // 컴포넌트를 등록
    TourList,
    TourFeature,
    TourRecommend
  }
}
</script>
