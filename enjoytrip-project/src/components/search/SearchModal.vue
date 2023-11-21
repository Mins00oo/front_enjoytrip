<template>
  <div
    class="modal fade"
    id="templatemo_search"
    tabindex="-1"
    aria-labelledby="searchModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form class="d-flex" @submit.prevent="submitSearch">
            <select
              class="form-select w-25 me-2"
              :name="selectedCity"
              v-model="selectedCity"
              @click="updateRegions(selectedCityId)"
            >
              <option
                v-for="city in tourStore.sidoList"
                :key="city.sidoCode"
                :value="city.sidoName"
              >
                {{ city.sidoName }}
              </option>
            </select>
            <select class="form-select w-25 me-2" v-model="selectedGugun">
              <option
                v-for="gugun in tourStore.gugunList"
                :key="gugun.gugunCode"
                :value="gugun.gugunName"
              >
                {{ gugun.gugunName }}
              </option>
            </select>
            <input
              type="text"
              class="form-control"
              placeholder="Search ..."
              v-model="tourStore.searchWord"
            />
            <button type="submit" class="btn btn-success ms-2">
              <i class="fa fa-fw fa-search text-white"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import { useTourStore } from '../../stores/tourStore'

const { tourStore, tourSidoList, tourGugunList } = useTourStore()

const selectedCity = ref(null) // 시도
const selectedCityId = ref('')
const selectedGugun = ref(null) // 구군

const regions = ref([])

const updateRegions = (sidoCode) => {
  console.log(sidoCode, 'region업데이트')
}

const submitSearch = () => {
  // 검색 로직을 여기에 추가
}

onMounted(async () => {
  console.log('시도 불러와')
  await tourSidoList()
  if (tourStore.sidoList.length > 0) {
    selectedCity.value = tourStore.sidoList[0].sidoName
    selectedCityId.value = tourStore.sidoList[0].sidoCode
    await tourGugunList(tourStore.sidoList[0].sidoCode)
    if (tourStore.gugunList.length > 0) {
      console.log('초기 구군')
      selectedGugun.value = tourStore.gugunList[0].gugunName
      console.log(selectedGugun.value)
    }
  }
})
</script>

<style scoped>
.modal-header {
  border-bottom: 0;
}
.modal-body {
  padding: 2rem;
}
</style>
