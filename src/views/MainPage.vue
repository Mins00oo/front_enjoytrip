<template>
  <MainTourList></MainTourList>
  <MainTourCategory></MainTourCategory>
  <MainTourRecommend></MainTourRecommend>
</template>

<script>
import MainTourList from '@/components/main/MainTourList.vue'
import MainTourCategory from '@/components/main/MainTourCategory.vue'
import MainTourRecommend from '@/components/main/MainTourRecommend.vue'

export default {
  components: {
    // 컴포넌트를 등록
    MainTourList,
    MainTourCategory,
    MainTourRecommend
  }
}
</script>
