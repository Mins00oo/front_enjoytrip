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
          <div class="col-md-4" v-for="(item, index) in tourStore.list" :key="index">
            <div class="card mb-4 product-wap rounded-0">
              <div class="card rounded-0">
                <img
                  class="card-img rounded-0 img-fluid"
                  :src="item.firstImage"
                  :alt="item.title"
                />
                <div
                  class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center"
                >
                  <ul class="list-unstyled">
                    <li>
                      <button class="btn btn-success text-white" @click="star(item.contentId)">
                        <i class="far fa-heart"></i>
                      </button>
                    </li>
                    <li>
                      <button
                        class="btn btn-success text-white mt-2"
                        @click="tourDetail(item.contentId)"
                      >
                        <i class="far fa-eye"></i>
                      </button>
                    </li>
                    <li>
                      <button
                        class="btn btn-success text-white mt-2"
                        @click="tourDetail(item.contentId)"
                      >
                        <i class="fas fa-cart-plus"></i>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="card-body">
                <a :href="`/shop-single/${item.contentId}`" class="h3 text-decoration-none">{{
                  item.title
                }}</a>
                <ul class="w-100 list-unstyled d-flex justify-content-between mb-0">
                  <!-- 여기에 사이즈나 색상 등의 정보를 표시할 수 있음 -->
                </ul>
                <ul class="list-unstyled d-flex justify-content-center mb-1">
                  <!-- 별점 표시 -->
                  <li>
                    <i
                      class="text-warning fa fa-star"
                      v-for="n in 5"
                      :key="`star-${index}-${n}`"
                    ></i>
                    <!-- 혹은 별점이 숫자로 주어진다면, 반복문 수정 필요 -->
                  </li>
                </ul>
                <p class="text-center mb-0">{{ item.addr1 }}</p>
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
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()
const selectOption = ref('0')
const category = ref('')
const { tourStore, setTourDetail, tourList, setTourListDefault } = useTourStore()
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

const star = async (contentId) => {
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
      alert('추가 되었습니다!')
    }
  } catch (error) {
    console.log(error)
  }
}
const tourDetail = async (contentId) => {
  console.log(contentId)
  try {
    let { data } = await http.get('/tours/' + contentId)

    if (data.result == 'login') {
      console.log(data)
      doLogout()
    } else {
      console.log(data)
      sessionStorage.setItem('contentId', contentId)
      setTourDetail(data)

      router.push({ name: 'TourDetail', params: { contentId: contentId } })
    }
  } catch (error) {
    console.log('BoardMainVue: error : ')
    console.log(error)
  }
}

// 페이지 변경 함수
const changePage = (page) => {
  tourStore.currentPage = page
  tourStore.offset = (page - 1) * tourStore.limit
  tourStore.region = props.region
  window.scroll(0, 0)
  tourList()
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
