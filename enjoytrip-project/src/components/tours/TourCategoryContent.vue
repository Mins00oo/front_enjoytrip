<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-lg-3">
        <h1 class="h2 pb-4">Categories</h1>
        <div v-for="category in categories" :key="category.id" class="category-box">
            <i :class="category.icon"></i>
            <a class="category" @click="TourCategory(category.id)">
            {{ category.name }}
            </a>
        </div>
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
          <div class="col-md-4" v-for="(item, index) in tourStore.list" :key="index">
            <div class="card mb-4 product-wap rounded-0">
              <div class="card h-100 position-relative">
                <router-link :to="`/detail/${item.contentId}`">
                  <img
                    :src="item.firstImage || '/src/assets/img/default_img.jpg'"
                    class="card-img-top"
                    :alt="item.title"
                  />
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
        <nav aria-label="Page navigation">
          <ul class="pagination justify-content-center">
            <li v-if="prev" class="page-item">
              <a
                class="page-link"
                href="#"
                aria-label="Previous"
                @click="movePage(startPageIndex - 1)"
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li
              v-for="index in endPageIndex - startPageIndex + 1"
              :key="index"
              v-bind:class="{ active: startPageIndex + index - 1 == tourStore.currentPage }"
              class="page-item"
            >
              <a @click="movePage(startPageIndex + index - 1)" class="page-link">{{
                startPageIndex + index - 1
              }}</a>
              <!-- href 는 그대로, 커서 모양 유지-->
            </li>
            <li v-if="next" class="page-item">
              <a class="page-link" href="#" aria-label="Next" @click="movePage(endPageIndex + 1)">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
        {{ tourStore.startPageIndex }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import http from '@/common/axios.js'
import { storeToRefs } from 'pinia'
import { useTourStore } from '../../stores/tourStore'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()
const selectOption = ref('0')
const category = ref('')

const categories = [
  { id: '', name: '전체', icon: 'fas fa-globe' },
  { id: '12', name: '관광지', icon: 'fas fa-archway' },
  { id: '14', name: '문화시설', icon: 'fas fa-synagogue' },
  { id: '15', name: '축제공연행사', icon: 'fas fa-theater-masks' },
  { id: '25', name: '여행코스', icon: 'fas fa-map' },
  { id: '28', name: '레포츠', icon: 'fas fa-running' },
  { id: '32', name: '숙박', icon: 'fas fa-bed' },
  { id: '38', name: '쇼핑', icon: 'fas fa-shopping-cart' },
  { id: '39', name: '음식점', icon: 'fas fa-utensils' }
]

const { startPageIndex, endPageIndex, prev, next } = storeToRefs(useTourStore()) // destructuring 에 의한 reactive 손실 보정
const { tourStore, setTourDetail, tourList, setTourListDefault, setTourMovePage } = useTourStore()

//관광지 아이디 넣어주면 됨!!
const contentId = ref('125408')
const starObj = {
  contentId: contentId.value
}

const props = defineProps({
  region: String
})

setTourListDefault()
tourStore.region = props.region
tourStore.currentPage = 1
tourList()

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
      tourList()
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
      tourList()
    }
  } catch (error) {
    console.log(error)
  }
}

const movePage = (pageIndex) => {
  setTourMovePage(pageIndex)
  tourList()
  window.scroll(0, 0)
}

const TourCategory = (categoryId) => {
  category.value = categoryId
  tourStore.category = categoryId
  tourStore.region = props.region
  tourList()
  window.scroll(0, 0)
}

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

  tourStore.region = props.region
  tourStore.category = category.value
  tourList()
})

// logout 처리 별도 method
const doLogout = () => {
  setLogout({
    isLogin: false,
    userNickName: '',
    userId: '',
    userEmail: ''
  })
  router.push('/login')
}

onMounted(() => {
  window.scroll(0, 0)
})
</script>

<style scoped>
@import '@/assets/css/mainTourList.css';
</style>