<template>
  <div class="container py-5">
    <div class="row">
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
      <div class="col-lg-9">
        <div class="row">
          <div class="col-md-6">
            <h3>여행 장소</h3>
          </div>
          <div class="col-md-6 pb-4">
            <div class="d-flex">
              <select class="form-control" v-model="selectOption">
                <option value="0">가나다 순</option>
                <option value="1">평점 높은순</option>
                <option value="2">평점 낮은순</option>
                <option value="3">조회수 높은순</option>
                <option value="4">조회수 낮은순</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4" v-for="(item, index) in tourStore.searchResultList" :key="index">
            <div class="card mb-4 product-wap rounded-0">
              <div class="card h-100 position-relative">
                <router-link :to="`/detail/${item.contentId}`">
                  <img class="card-img-top" :src="item.firstImage" :alt="item.title" />
                </router-link>
              </div>
              <font-awesome-icon
                class="favorite-icon"
                :icon="[item.favorite ? 'fas' : 'far', 'heart']"
                @click.stop="handleStar(item)"
              />

              <div class="card-body">
                <ul class="list-unstyled d-flex justify-content-between">
                  <li></li>
                  <li class="text-muted text-right">{{ item.addr1 }}</li>
                </ul>

                {{ item.title }}
                <ul class="list-unstyled d-flex justify-content-center mb-1">
                  <li v-for="n in 5" :key="`star-${index}-${n}`">
                    <i
                      :class="{
                        'text-warning': n <= item.averageScore,
                        'text-muted': n > item.averageScore
                      }"
                      class="fa fa-star"
                    ></i>
                  </li>
                  &nbsp; &nbsp; &nbsp;
                  <p class="text-muted text-center">{{ item.reviewCount }} reviews</p>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li
              v-for="page in 10"
              :key="page"
              class="page-item"
              :class="{ active: page === tourStore.currentPage }"
            >
              <a class="page-link" href="#" @click.prevent="changePage(page)">
                {{ page }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import http from '@/common/axios.js'
import { useTourStore } from '../../stores/tourStore'
import { useAuthStore } from '@/stores/userStore'
import { useRouter, useRoute } from 'vue-router'
import { onMounted } from 'vue'

const route = useRoute()
const router = useRouter()
const selectOption = ref('0')
const category = ref('')
const { tourStore, setTourDetail, tourList, setTourListDefault, tourSearchList } = useTourStore()
const { setLogout } = useAuthStore()
//관광지 아이디 넣어주면 됨!!
const contentId = ref('125408')
const starObj = {
  contentId: contentId.value
}

// 쿼리 파라미터 접근
const sidoCode = route.query.sidoCode
const gugunCode = route.query.gugunCode
const searchWord = route.query.searchWord
tourStore.sidoCode = sidoCode
tourStore.gugunCode = gugunCode
tourStore.searchWord = searchWord

tourSearchList()
setTourListDefault()
tourStore.currentPage = 1

const content = ref('')

const handleStar = (item) => {
  if (item.favorite) {
    deleteStar(item.contentId)
  } else {
    addStar(item.contentId)
  }
}

const addStar = async (contentId) => {
  content.value = contentId
  const starObj = {
    contentId: contentId
  }

  try {
    let { data } = await http.post('tours/stars', starObj)
    if (data.result == 'login') {
      alert('로그인 후 사용 가능합니다.')
      doLogout()
    } else if (data.result == 'false') {
      alert('이미 즐겨찾기한 관광지입니다')
    } else {
      tourSearchList()
    }
  } catch (error) {
    console.log(error)
  }
}

const deleteStar = async (contentId) => {
  try {
    let { data } = await http.delete('tours/stars/' + contentId)
    if (data.result == 'login') {
      alert('로그인 후 사용 가능합니다.')
      doLogout()
    } else {
      tourSearchList()
    }
  } catch (error) {
    console.log(error)
  }
}

// 페이지 변경 함수
const changePage = (page) => {
  tourStore.currentPage = page
  tourStore.offset = page - 1
  window.scroll(0, 0)
  tourSearchList()
}

const TourCategory = (categoryId) => {
  category.value = categoryId
  tourStore.category = categoryId
  window.scroll(0, 0)
  tourSearchList()
}

// Query 파라미터의 변경을 감지하기 위한 watch 설정
watch(
  () => route.query,
  (newQuery) => {
    // 새로운 쿼리 파라미터로 검색 로직 수행
    tourStore.sidoCode = newQuery.sidoCode
    tourStore.gugunCode = newQuery.gugunCode
    tourStore.searchWord = newQuery.searchWord

    // 검색 실행
    tourSearchList()
  },
  { immediate: true }
) // 컴포넌트 마운트 시 즉시 실행

watch(selectOption, (newVal) => {
  // tourStore의 정렬 옵션을 설정해주고 list호출
  switch (newVal) {
    case '0':
      tourStore.option = 'title'
      tourStore.how = 'asc'
      break
    case '1':
      tourStore.option = 'average_score'
      tourStore.how = 'desc'
      break
    case '2':
      tourStore.option = 'average_score'
      tourStore.how = 'asc'
      break
    case '3':
      tourStore.option = 'readcount'
      tourStore.how = 'desc'
      break
    case '4':
      tourStore.option = 'readcount'
      tourStore.how = 'asc'
      break
  }

  tourStore.category = category.value
  tourSearchList()
})

// logout 처리 별도 method
const doLogout = () => {
  setLogout({
    isLogin: false,
    userNickName: '',
    userId: '',
    userEmail: ''
  })
}

onMounted(() => {
  window.scroll(0, 0)
})
</script>

<style scoped>
@import '@/assets/css/mainTourList.css';
</style>
