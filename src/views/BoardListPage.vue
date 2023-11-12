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

<script>
import axios from 'axios'

export default {
  data() {
    return {
      posts: [],
      currentPage: 1,
      perPage: 10,
      currentPost: null, // 현재 선택된 게시물의 상세 정보
      isModalOpen: false // 모달 상태
    }
  },

  computed: {
    paginatedPosts() {
      const start = (this.currentPage - 1) * this.perPage
      const end = start + this.perPage
      return this.posts.slice(start, end)
    },
    totalPages() {
      return Math.ceil(this.posts.length / this.perPage)
    }
  },

  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++
    },

    prevPage() {
      if (this.currentPage > 1) this.currentPage--
    },

    async getBoardDetail(boardId) {
      try {
        const response = await axios.get(`http://localhost:8080/boards/${boardId}`)
        this.currentPost = response.data
        this.isModalOpen = true // 모달을 열기
      } catch (error) {
        console.error('상세 정보를 가져오는데 실패했습니다.', error)
      }
    },

    async deleteBoard(boardId) {
      try {
        const response = await axios.delete(`http://localhost:8080/boards/${boardId}`)
        this.currentPost = response.data
        this.isModalOpen = false // 모달을 열기
        await this.getBoardList() // 게시판 목록 새로고침
      } catch (error) {
        console.error('게시글을 삭제하는데 실패했습니다.', error)
      }
    },

    async getBoardList() {
      try {
        const response = await axios.get('http://localhost:8080/boards')
        this.posts = response.data
      } catch (error) {
        console.error('게시판 데이터를 가져오는데 실패했습니다.', error)
      }
    }
  },

  mounted() {
    this.getBoardList()
  }
}
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
