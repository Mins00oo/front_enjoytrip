<template>
  <div class="board-list-page">
    <h1>게시판</h1>
    <div class="board-list">
      <table>
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(post, index) in paginatedPosts"
            :key="index"
            @click="getBoardDetail(post.boardId)"
          >
            <td>{{ post.boardTitle }}</td>
            <td>{{ post.userNickname }}</td>
            <td>{{ post.boardDate }}</td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage <= 1">이전</button>
        <span>페이지 {{ currentPage }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage >= totalPages">다음</button>
        <router-link to="/board/write" tag="button" class="btn-write">작성하기</router-link>
      </div>
    </div>

    <div v-if="isModalOpen" class="modal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">글 상세</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="isModalOpen = false"
            ></button>
          </div>
          <div class="modal-body">
            <table class="table">
              <tbody>
                <tr>
                  <td>제목</td>
                  <td id="titleDetail">{{ currentPost.boardTitle }}</td>
                </tr>
                <tr>
                  <td>내용</td>
                  <td id="contentDetail">{{ currentPost.boardContent }}</td>
                </tr>
                <tr>
                  <td>작성자</td>
                  <td id="userNameDetail">{{ currentPost.userNickname }}</td>
                </tr>
                <tr>
                  <td>작성일시</td>
                  <td id="regDtDetail">{{ currentPost.boardDate }}</td>
                </tr>
              </tbody>
            </table>
            <button
              id="btnBoardUpdateUI"
              class="btn btn-sm btn-primary btn-outline"
              data-bs-dismiss="modal"
              type="button"
              style="margin-right: 10px"
            >
              글 수정하기
            </button>
            <button
              id="btnBoardDeleteUI"
              class="btn btn-sm btn-warning btn-outline"
              data-bs-dismiss="modal"
              type="button"
              @click="deleteBoard(currentPost.boardId)"
            >
              글 삭제하기
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

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

const getBoardDetail = async (boardId) => {
  try {
    const response = await axios.get(`http://localhost:8080/boards/${boardId}`)
    currentPost.value = response.data
    isModalOpen.value = true
  } catch (error) {
    console.error('상세 정보를 가져오는데 실패했습니다.', error)
  }
}

const deleteBoard = async (boardId) => {
  try {
    await axios.delete(`http://localhost:8080/boards/${boardId}`)
    currentPost.value = null
    isModalOpen.value = false
    await getBoardList()
  } catch (error) {
    console.error('게시글을 삭제하는데 실패했습니다.', error)
  }
}

const getBoardList = async () => {
  try {
    const response = await axios.get('http://localhost:8080/boards')
    posts.value = response.data
  } catch (error) {
    console.error('게시판 데이터를 가져오는데 실패했습니다.', error)
  }
}

onMounted(async () => {
  await getBoardList()
})
</script>

<style scoped>
@import url('/src/assets/css/boardList.css');

.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: white;
  padding: 40px;
  border-radius: 5px;
  /* ... 추가 스타일 ... */
}
</style>
