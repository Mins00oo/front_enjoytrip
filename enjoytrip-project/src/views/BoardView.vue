<template>
  <div class="container mt-5">
    <h4 class="text-center" style="font-weight: bold !important; font-size: 30px !important">
      게시판
    </h4>

    <div class="input-group mt-3 mb-3">
      <!-- store 사용 -->
      <input
        v-model="boardStore.searchWord"
        @keydown.enter="boardList"
        type="text"
        class="form-control"
      />
      <button @click="boardList" class="btn btn-success" type="button">Search</button>
    </div>

    <!-- <board-list :detailModal="detailModal"></board-list> -->
    <!-- props X -->
    <board-list @call-parent-show-detail="showDetailModal"></board-list>

    <PaginationUI v-on:call-parent="movePage"></PaginationUI>

    <button
      class="btn btn-sm mb-5"
      @click="showInsertModal"
      style="color: white; background-color: #198754; font-size: 15px !important"
    >
      글쓰기
    </button>

    <insert-modal v-on:call-parent-insert="closeAfterInsert"></insert-modal>
    <!-- props 제거 -->
    <detail-modal
      v-on:call-parent-change-to-update="changeToUpdate"
      v-on:call-parent-change-to-delete="changeToDelete"
    ></detail-modal>
    <update-modal v-on:call-parent-update="closeAfterUpdate"></update-modal>
  </div>
</template>

<script setup>
// basic
import { ref, onMounted } from 'vue'
// common
import http from '@/common/axios.js'
import util from '@/common/util.js'

// 3rd party
import { Modal } from 'bootstrap'

import InsertModal from '@/components/board/modal/BoardWritePage.vue'
import DetailModal from '@/components/board/modal/BoardDetailModal.vue'
import UpdateModal from '@/components/board/modal/BoardUpdateModal.vue'
import PaginationUI from '@/components/board/PaginationUI.vue'

import BoardList from '@/components/board/BoardListPage.vue'

// router
import { useRouter } from 'vue-router'

// store
import { useBoardStore } from '@/stores/boardStore'
import { useAuthStore } from '@/stores/userStore'

const router = useRouter()

const { boardStore, boardList, setBoardMovePage, setBoardDetail } = useBoardStore()
const { authStore } = useAuthStore()

// data
let insertModal = null
let detailModal = ref(null)
let updateModal = null

// lifecycle
onMounted(() => {
  insertModal = new Modal(document.getElementById('insertModal'))
  detailModal = new Modal(document.getElementById('detailModal'))
  updateModal = new Modal(document.getElementById('updateModal'))
})

// 초기 작업
boardStore.currentPageIndex = 1
boardStore.limit = 10
boardStore.offset = 0
boardStore.searchWord = ''
console.log('boardList 호출전', boardStore)
boardList()

// pagination
const movePage = (pageIndex) => {
  console.log('BoardMainVue : movePage : pageIndex : ' + pageIndex)
  setBoardMovePage(pageIndex)
  boardList()
}

// insert
const showInsertModal = () => insertModal.show()
const closeAfterInsert = () => {
  insertModal.hide()
  boardList()
}

const showDetailModal = () => {
  detailModal.show()
}

const changeToUpdate = () => {
  detailModal.hide()
  updateModal.show()
}

const closeAfterUpdate = () => {
  updateModal.hide()
  boardList()
}

const changeToDelete = () => {
  detailModal.hide()

  if (confirm('이 글을 삭제하시겠습니까?')) {
    boardDelete()
  }
}

const boardDelete = async () => {
  try {
    let { data } = await http.delete('/boards/' + boardStore.boardId)
    console.log(data)

    if (data.result == 'login') {
      doLogout()
    } else {
      alert('글이 삭제되었습니다.')
      boardList()
    }
  } catch (error) {
    console.log('BoardMainVue: error : ')
    console.log(error)
  }
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
  router.push('/login')
}
</script>

<style scoped>
@font-face {
  font-family: 'SUITE-Regular';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Regular.woff2')
    format('woff2');
  font-weight: 400;
  font-style: normal;
}

* {
  font-family: 'SUITE-Regular';
}

i {
  font-family: 'Font Awesome 5 Free';
}
</style>
