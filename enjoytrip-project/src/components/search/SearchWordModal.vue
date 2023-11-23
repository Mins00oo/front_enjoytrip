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
          <form @submit.prevent="submitSearch" class="d-flex">
            <input
              type="text"
              class="form-control"
              placeholder="검색어 입력"
              v-model="tourStore.searchWord"
            />
            <button class="btn btn-success ms-2" data-bs-dismiss="modal">
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
import { useTourStore } from '../../stores/tourStore'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const router = useRouter()
const { tourStore } = useTourStore()
const recentSearches = ref([])
const searchSavingEnabled = ref(true) // 최근 검색어 저장 기능 활성화 상태

const submitSearch = () => {
  if (searchSavingEnabled.value) {
    addSearchTerm(tourStore.searchWord)
  }
  // URL 변경
  router.push({
    path: '/tours/search',
    query: {
      sidoCode: '',
      gugunCode: '',
      searchWord: tourStore.searchWord
    }
  })
  tourStore.searchWord = ''
}

const useSearchTerm = (word) => {
  // URL 변경
  router.push({
    path: '/tours/search',
    query: {
      sidoCode: '',
      gugunCode: '',
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
</script>

<style scoped>
.recent-searches h5 {
  margin-bottom: 10px;
}

.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  cursor: pointer;
}

.list-group-item:hover {
  background-color: #f8f9fa;
}

.search-term:hover {
  text-decoration: underline;
}

.list-group-item button {
  margin-left: 10px;
}
</style>
