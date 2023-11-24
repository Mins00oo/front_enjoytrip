<template>
  <div class="col-lg-9">
    <div class="row">
      <div class="col-md-6">
        <h3 style="font-weight: bold !important">여행 장소</h3>
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
      <div class="col-12 col-md-4 mb-4" v-for="(item, index) in tourStore.list" :key="index">
        <div class="card h-100 position-relative">
          <router-link :to="`/detail/${item.contentId}`">
            <img
              :src="item.firstImage || '/src/assets/img/default_img.png'"
              class="card-img-top"
              :alt="item.title"
            />
          </router-link>
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
          <a class="page-link" href="#" aria-label="Previous" @click="movePage(startPageIndex - 1)">
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
</template>

<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import http from '@/common/axios.js'
import { useTourStore } from '../../stores/tourStore'
import { useAuthStore } from '@/stores/userStore'

const { setLogout } = useAuthStore()
const selectOption = ref('0')
const { startPageIndex, endPageIndex, prev, next } = storeToRefs(useTourStore()) // destructuring 에 의한 reactive 손실 보정
const { tourStore, tourList, setTourMovePage } = useTourStore()
//관광지 아이디 넣어주면 됨!!

tourStore.currentPage = 1

const content = ref('')

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

// pagination
const movePage = (pageIndex) => {
  setTourMovePage(pageIndex)
  tourList()
  window.scroll(0, 0)
}

// logout 처리 별도 method
const doLogout = () => {
  setLogout({
    isLogin: false,
    userNickName: '',
    userId: '',
    userEmail: ''
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
  tourStore.currentPage = 1
  tourStore.offset = 0
  tourStore.limit = 9
  tourList()
})
</script>

<style scoped>
@import '@/assets/css/mainTourList.css';
</style>
