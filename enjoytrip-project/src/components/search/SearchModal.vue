<template>
  <div
    class="modal fade"
    id="search"
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
          <form @submit.prevent="submitSearch" class="d-flex">
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
            <button class="btn btn-success ms-2" data-bs-dismiss="modal" @click="submitSearch()">
              <i class="fa fa-fw fa-search text-white"></i>
            </button>
          </form>

          <div class="recent-searches mt-3">
            <h5>최근 검색어</h5>
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="searchSavingSwitch"
                  v-model="searchSavingEnabled"
                />
                <label class="form-check-label" for="searchSavingSwitch">검색어 저장</label>
              </div>
              <button class="btn btn-outline-secondary btn-sm" @click="clearAllSearchTerms()">
                전체 삭제
              </button>
            </div>
            <ul class="list-group">
              <li
                v-for="(word, index) in recentSearches"
                :key="index"
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                <button class="search-term" @click="useSearchTerm(word)" data-bs-dismiss="modal">
                  {{ word }}
                </button>
                <button class="btn btn-outline-danger btn-sm" @click="removeSearchTerm(word)">
                  X
                </button>
              </li>
            </ul>
          </div>
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
const recentSearches = ref([])
const searchSavingEnabled = ref(true) // 최근 검색어 저장 기능 활성화 상태

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
  if (searchSavingEnabled.value) {
    addSearchTerm(tourStore.searchWord)
  }
  const sido = tourStore.sidoList.find((sido) => sido.sidoName === selectedCity.value)
  const gugun = tourStore.gugunList.find((gugun) => gugun.gugunName === selectedGugun.value)
  tourStore.sidoCode = sido.sidoCode
  tourStore.gugunCode = gugun.gugunCode
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

const useSearchTerm = (word) => {
  const sido = tourStore.sidoList.find((sido) => sido.sidoName === selectedCity.value)
  const gugun = tourStore.gugunList.find((gugun) => gugun.gugunName === selectedGugun.value)
  // URL 변경
  router.push({
    path: '/tours/search',
    query: {
      sidoCode: sido.sidoCode,
      gugunCode: gugun.gugunCode,
      searchWord: word
    }
  })
  tourStore.searchWord = ''
}

// 새로운 검색어 추가
const addSearchTerm = (term) => {
  loadRecentSearches()

  // 중복된 검색어가 없도록 체크
  if (!recentSearches.value.includes(term)) {
    recentSearches.value = [term, ...recentSearches.value].slice(0, 10) // 최대 10개 검색어만 저장
    saveRecentSearches(recentSearches.value)
  }
}

// 검색어 제거
const removeSearchTerm = (term) => {
  let searches = recentSearches.value.filter((search) => search !== term)
  localStorage.setItem('recentSearches', JSON.stringify(searches))
  recentSearches.value = searches
}

// LocalStorage에서 최근 검색어 로드
const loadRecentSearches = () => {
  const searches = localStorage.getItem('recentSearches')
  recentSearches.value = searches ? JSON.parse(searches) : []
}

// 최근 검색어를 LocalStorage에 저장
const saveRecentSearches = (searches) => {
  localStorage.setItem('recentSearches', JSON.stringify(searches))
}

// 모든 검색어를 삭제하는 함수
const clearAllSearchTerms = () => {
  recentSearches.value = []
  saveRecentSearches(recentSearches.value)
}

onMounted(() => {
  loadRecentSearches()
})

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
