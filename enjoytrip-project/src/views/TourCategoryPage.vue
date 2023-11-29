<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-lg-12">
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
                    class="card-img-top"
                    :src="item.firstImage || '/src/assets/img/default_img.png'"
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
                <a :href="`/shop-single/${item.contentId}`" class="h3 text-decoration-none">{{
                  item.title
                }}</a>
                <ul class="w-100 list-unstyled d-flex justify-content-between mb-0">
                  <!-- 여기에 사이즈나 색상 등의 정보를 표시할 수 있음 -->
                </ul>
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
import { useTourStore } from '../stores/tourStore'
import { onMounted, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/userStore'
import http from '@/common/axios.js'

const { setLogout } = useAuthStore()
const selectOption = ref('0')
const { tourStore, setTourDetail, tourList, setTourListDefault } = useTourStore()
//관광지 아이디 넣어주면 됨!!
const props = defineProps({
  categoryId: String
})
tourStore.currentPage = 1

const content = ref('')

// 초기작업
if (props.categoryId == -1) {
  tourStore.category = ''
} else tourStore.category = props.categoryId
tourList()
window.scroll(0, 0)

const handleStar = (item) => {
  if (item.favorite) {
    deleteStar(item.contentId)
  } else {
    console.log('addstar')
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

// 페이지 변경 함수
const changePage = (page) => {
  tourStore.currentPage = page
  tourStore.offset = page - 1
  tourList()
  window.scroll(0, 0)
}

// logout 처리 별도 method
const doLogout = () => {
  setLogout({
    isLogin: false,
    userNickName: '',
    userId: '',
    userEmail: '',
    userName: '',
    userPassword: ''
  })
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
  tourList()
  tourStore.option = 'title'
  tourStore.how = 'asc'
})
</script>

<style scoped>
@import '@/assets/css/mainTourList.css';
</style>
