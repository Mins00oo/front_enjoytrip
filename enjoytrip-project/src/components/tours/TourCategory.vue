<template>
  <div class="col-lg-3">
    <h1 class="h2 pb-4">Categories</h1>
    <ul class="list-unstyled templatemo-accordion">
      <ul class="collapse show list-unstyled pl-3">
        <li><a class="text-decoration-none" @click="TourCategory('')">전체</a></li>
        <li><a class="text-decoration-none" @click="TourCategory('12')">관광지</a></li>
        <li><a class="text-decoration-none" @click="TourCategory('14')">문화시설</a></li>
        <li><a class="text-decoration-none" @click="TourCategory('15')">축제공연행사</a></li>
        <li><a class="text-decoration-none" @click="TourCategory('25')">여행코스</a></li>
        <li><a class="text-decoration-none" @click="TourCategory('28')">레포츠</a></li>
        <li><a class="text-decoration-none" @click="TourCategory('32')">숙박</a></li>
        <li><a class="text-decoration-none" @click="TourCategory('38')">쇼핑</a></li>
        <li><a class="text-decoration-none" @click="TourCategory('39')">음식점</a></li>
      </ul>
    </ul>
  </div>
</template>

<script setup>
import { useTourStore } from '../../stores/tourStore'

const { tourStore, tourList } = useTourStore()
const TourCategory = (category) => {
  tourStore.category = category
  tourList()
  window.scroll(0, 0)
}
</script>
