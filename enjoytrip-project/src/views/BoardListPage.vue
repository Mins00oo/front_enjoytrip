<template>
  <div class="container mt-3">
    <!-- mt-3 추가 -->
    <h4 class="text-center">게시판</h4>
    <div class="input-group mb-3 mt-3">
      <!-- mb-3 mt-3  추가 -->
      <input id="inputSearchWord" type="text" class="form-control" placeholder="Search" />
      <button id="btnSearchWord" class="btn btn-success" type="button">Search</button>
    </div>

    <table class="table table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일시</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="board in posts" :key="board.boardId" @click="showDetailModal(board.boardId)">
          <td>{{ board.boardId }}</td>
          <td>{{ board.boardTitle }}</td>
          <td>{{ board.userNickname }}</td>
          <td>{{ board.boardDate }}</td>
        </tr>
      </tbody>
    </table>

    <BoardWritePage></BoardWritePage>
    <BoardDetailModal
      :boardId="boardDetailId"
      :boardTitle="boardTitle"
      :boardContent="boardContent"
      :userId="userId"
      :userNickname="userNickname"
      :boardDate="boardDate"
    ></BoardDetailModal>

    <button class="btn btn-sm btn-primary" @click="showInsertModal()">글쓰기</button>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import http from '@/common/axios.js'
import { Modal } from 'bootstrap'
import BoardWritePage from '../components/board/modal/BoardWritePage.vue'
import BoardDetailModal from '@/components/board/modal/BoardDetailModal.vue'

let insertModal = null
let detailModal = null

const boardDetailId = ref()
const boardTitle = ref('')
const boardContent = ref('')
const userNickname = ref('')
const userId = ref()
const boardDate = ref('')

const posts = ref([])
const currentPage = ref(1)
const perPage = 10
const currentPost = ref(null)
const isModalOpen = ref(false)

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * perPage
  const end = start + perPage
  return posts.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(posts.value.length / perPage)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const getBoardList = async () => {
  try {
    const response = await http.get('http://localhost:8080/boards')
    console.log(response.data)
    if (response.data.result == 'login') {
      // authLogin 초기ㅗ하
    } else {
      posts.value = response.data
    }
  } catch (error) {
    console.error('게시판 데이터를 가져오는데 실패했습니다.', error)
  }
}

onMounted(() => {
  console.log(11)
  getBoardList()
  insertModal = new Modal(document.getElementById('insertModal'))
  detailModal = new Modal(document.getElementById('detailModal'))
})

const boardDetail = async () => {
  try {
    let { data } = await http.get(`/boards/${boardDetailId.value}`)
    userNickname.value = data.userNickname
    boardTitle.value = data.boardTitle
    boardContent.value = data.boardContent
    userId.value = data.userId
    boardDate.value = data.boardDate
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

const showInsertModal = () => insertModal.show()

const showDetailModal = (boardId) => {
  boardDetailId.value = boardId
  boardDetail()
  detailModal.show()
}
</script>

<style scoped>
@import url('/src/assets/css/boardList.css');
</style>
