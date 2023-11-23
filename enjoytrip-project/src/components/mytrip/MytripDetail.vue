<template>
    <div class="container mt-5 mb-5">
        <h1 class="mb-4" style="font-weight: bold;">마이트립</h1>
        <mytrip-map></mytrip-map>
        <mytrip-result-list></mytrip-result-list>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useMytripStore } from '../../stores/mytripStore'
import MytripMap from "../map/MytripMap.vue";
import MytripResultList from "./MytripResultList.vue"

const route = useRoute()

const props = defineProps({
  mytripId: Number
})

const store = useMytripStore()

console.log('마이트립 내 관광지 리스트 가져오기')
// store.mytripStore.mytripId = props.mytripId
// store.tourList(props.mytripId)
store.tourList(route.params.mytripId)
console.log('mytripDetail mStore', store.mytripStore.list)

</script>

<style scoped>
@import '../../assets/css/mytrip_sidebar.css'
</style>