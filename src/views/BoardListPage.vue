<template>
  <div class="board-list-page">
    <h1>게시판</h1>
    <div class="board-list">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(post, index) in paginatedPosts" :key="post.id">
            <td>{{ index + 1 + (currentPage - 1) * perPage }}</td>
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
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      posts: [],
      currentPage: 1,
      perPage: 10
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
    }
  },
  async mounted() {
    try {
      console.log('요청전송!')
      const response = await axios.get('http://localhost:8080/boards') // 실제 엔드포인트 URL로 대체하세요.
      console.log(response)
      this.posts = response.data // 여기서는 서버 응답 데이터가 배열이라고 가정합니다.
    } catch (error) {
      console.error('게시판 데이터를 가져오는데 실패했습니다.', error)
    }
  }
}
</script>
<style scoped>
@import url('/src/assets/css/boardList.css');
</style>
