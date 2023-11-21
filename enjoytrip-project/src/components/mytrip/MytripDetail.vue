<template>
    <div class="container mt-5 mb-5">
        <h1>마이트립</h1>
        <mytrip-map
        :list="mytripStore.list"></mytrip-map>
        <mytrip-sidebar></mytrip-sidebar>
    </div>
</template>

<script setup>
import { useMytripStore } from '../../stores/mytripStore'
import { onMounted } from 'vue'
import MytripMap from "../map/MytripMap.vue";
import MytripSidebar from "./MytripSidebar.vue";

const props = defineProps({
  mytripId: String
})

const { tourList, mytripStore } = useMytripStore()

// onMounted(async () => {
  console.log('마이트립 내 관광지 리스트 가져오기')
tourList(props.mytripId)
  console.log(mytripStore.list)
// })
</script>

<style scoped>
@import '../../assets/css/mytrip_sidebar.css'
</style>