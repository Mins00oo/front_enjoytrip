<template>
  <nav class="navbar navbar-expand-lg navbar-light shadow">
    <div class="container d-flex justify-content-between align-items-center">
      <router-link class="navbar-brand text-success logo h1 align-self-center" to="/"
        >Avocado</router-link
      >
      <button
        class="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#templatemo_main_nav"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        class="align-self-center collapse navbar-collapse flex-fill d-lg-flex justify-content-lg-between"
        id="templatemo_main_nav"
      >
        <div class="flex-fill">
          <ul class="nav navbar-nav d-flex justify-content-between mx-lg-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link">홈</router-link>
            </li>
            <li class="nav-item" v-show="authStore.isLogin">
              <router-link to="/mytrip" class="nav-link">마이트립</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/tour" class="nav-link">관광지</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/board" class="nav-link">게시판</router-link>
            </li>
          </ul>
        </div>
        <div class="navbar align-self-center d-flex">
          <div class="d-lg-none flex-sm-fill mt-3 mb-4 col-7 col-sm-auto pr-3">
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                id="inputMobileSearch"
                placeholder="Search ..."
              />
              <div class="input-group-text">
                <i class="fa fa-fw fa-search"></i>
              </div>
            </div>
          </div>
          <button class="btn nav-icon d-none d-lg-inline" type="button" @click="showSearchModal()">
            <i class="fa fa-fw fa-search text-dark mr-2"></i>
          </button>
          <router-link to="/mypage" class="nav-icon position-relative text-decoration-none">
            <i class="fa fa-fw fa-user text-dark mr-3"></i>
            <span
              class="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark"
            ></span>
          </router-link>
          <a class="nav-icon position-relative text-decoration-none" href="#">
            <font-awesome-icon
              :icon="['fas', 'power-off']"
              class="nav-icon position-relative text-decoration-none"
              v-show="authStore.isLogin"
              @click="logout()"
            />
          </a>
        </div>
      </div>
    </div>
  </nav>
  <search-word-modal></search-word-modal>
</template>

<script setup>
import { useAuthStore } from '@/stores/userStore'
import { useTourStore } from '../../stores/tourStore'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { Modal } from 'bootstrap'
import http from '@/common/axios.js'
import SearchWordModal from '../search/SearchWordModal.vue'

const { tourStore } = useTourStore()
const { authStore, setLogout } = useAuthStore()
const router = useRouter()
let searchWordModal = null

const showSearchModal = () => {
  tourStore.searchWord = ''
  tourStore.againSearchWord = ''
  tourStore.category = ''
  tourStore.sidoCode = ''
  tourStore.gugunCode = ''
  tourStore.option = 'title'
  tourStore.how = 'asc'
  searchWordModal.show()
}

onMounted(() => {
  searchWordModal = new Modal(document.getElementById('templatemo_search'))
})

const logout = async () => {
  try {
    let { data } = await http.get('/logout')
    console.log(data)
    if (data.result == 'success') {
      // 세션 스토리지에 저장
      sessionStorage.removeItem('isLogin')
      sessionStorage.removeItem('userNickName')
      sessionStorage.removeItem('userId')
      // store 변경
      setLogout({
        isLogin: false,
        userNickName: '',
        userId: '',
        userEmail: ''
      })
      console.log(authStore)
      alert('로그아웃 되었습니다.')
      router.push('/')
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped>
@font-face {
    font-family: 'SUITE-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
}

* {
    font-family: 'SUITE-Regular';
    font-weight: bold !important;
}

.nav-link {
  font-size: 20px !important;
}

i {
    font-family: 'Font Awesome 5 Free';
}


</style>