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
          <form class="d-flex">
            <select
              class="form-select w-25 me-2"
              :name="selectedCity"
              v-model="selectedCity"
              @click="updateGugun(selectedCity)"
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
            <button
              type="submit"
              class="btn btn-success ms-2"
              data-bs-dismiss="modal"
              @click="submitSearch()"
            >
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
import { useRouter } from 'vue-router'

const router = useRouter()
const { tourStore, tourSidoList, tourGugunList, tourSearchList } = useTourStore()

const selectedCity = ref('') // 시도
const selectedGugun = ref('') // 구군

// 모달 요소를 찾습니다.

// Bootstrap의 Modal 인스턴스를 생성합니다.

const updateGugun = async (sidoName) => {
  const selectedSido = tourStore.sidoList.find((sido) => sido.sidoName === sidoName)
  if (selectedSido) {
    const sidoCode = selectedSido.sidoCode
    // 해당 시도 코드를 사용하여 구/군 데이터를 비동기적으로 업데이트
    await tourGugunList(sidoCode)
    // tourGugunList 완료 후, 첫 번째 구/군 이름을 selectedGugun에 할당
    if (tourStore.gugunList.length > 0) {
      selectedGugun.value = tourStore.gugunList[0].gugunName
      console.log(selectedGugun.value)
    }
  }
}

const submitSearch = () => {
  const sido = tourStore.sidoList.find((sido) => sido.sidoName === selectedCity.value)
  const gugun = tourStore.gugunList.find((gugun) => gugun.gugunName === selectedGugun.value)
  // URL 변경
  router.push({
    path: '/tours/search',
    query: {
      sidoCode: sido.sidoCode,
      gugunCode: gugun.gugunCode,
      searchWord: tourStore.searchWord
    }
  })
  tourStore.searchWord = ''
}

onMounted(async () => {
  await tourSidoList()
  if (tourStore.sidoList.length > 0) {
    console.log(tourStore.sidoList)
    selectedCity.value = tourStore.sidoList[0].sidoName
    await tourGugunList(tourStore.sidoList[0].sidoCode)
    if (tourStore.gugunList.length > 0) {
      selectedGugun.value = tourStore.gugunList[0].gugunName
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
