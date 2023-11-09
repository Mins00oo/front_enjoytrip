<template>
  <TourList></TourList>
  <TourFeature></TourFeature>
</template>

<script>
import TourList from '../tours/TourList.vue'
import TourFeature from '../tours/TourFeature.vue'

export default {
  components: {
    // 컴포넌트를 등록
    TourList,
    TourFeature
  }
}
</script>
