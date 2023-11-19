<template>
  <div class="col-lg-9">
    <div class="row">
      <div class="col-md-6">
        <ul class="list-inline shop-top-menu pb-3 pt-1">
          <li class="list-inline-item">
            <a class="h3 text-dark text-decoration-none mr-3" href="#">All</a>
          </li>
          <li class="list-inline-item">
            <a class="h3 text-dark text-decoration-none mr-3" href="#">Men's</a>
          </li>
          <li class="list-inline-item">
            <a class="h3 text-dark text-decoration-none" href="#">Women's</a>
          </li>
        </ul>
      </div>
      <div class="col-md-6 pb-4">
        <div class="d-flex">
          <select class="form-control">
            <option>Featured</option>
            <option>A to Z</option>
            <option>Item</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4" v-for="(item, index) in tourStore.list" :key="index">
        <div class="card mb-4 product-wap rounded-0">
          <div class="card rounded-0">
            <img class="card-img rounded-0 img-fluid" :src="item.firstImage" :alt="item.title" />
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
                <i class="text-warning fa fa-star" v-for="n in 5" :key="`star-${index}-${n}`"></i>
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
</template>

<script setup>
import { ref } from 'vue'
import http from '@/common/axios.js'
import { useTourStore } from '../../stores/tourStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const { tourStore, setTourDetail, tourList } = useTourStore()
//관광지 아이디 넣어주면 됨!!
const contentId = ref('125408')
const starObj = {
  contentId: contentId.value
}

const props = defineProps({
  region: String
})

tourStore.region = props.region
tourList()

const star = async () => {
  try {
    let { data } = await http.post('tours/stars', starObj)
    if (data.result == 'login') {
      alert('로그인 후 사용가능합니다.')
    } else {
      // 즐겨찾기 할 수 있게
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
  tourList()
}
</script>
