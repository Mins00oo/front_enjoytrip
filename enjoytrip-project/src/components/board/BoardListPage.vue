<template>
  <div class="container mt-3">
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
        <!-- store 사용 -->

        <!-- 직접 store 에 접근해도 된다. -->
        <tr
          v-for="board in boardStore.list"
          @click="boardDetail(board.boardId)"
          v-bind:key="board.boardId"
        >
          <td>{{ board.boardId }}</td>
          <td>{{ board.boardTitle }}</td>
          <td>{{ board.userNickname }}</td>
          <td>{{ board.boardDate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import http from '@/common/axios.js'
import { useBoardStore } from '@/stores/boardStore'
import { useAuthStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const { authStore, setLogout } = useAuthStore()
const { boardStore, setBoardDetail } = useBoardStore()

console.log(boardStore)
//  const props = defineProps(['detailModal'])
const emit = defineEmits(['call-parent-show-detail'])
const boardDetail = async (boardId) => {
  try {
    let { data } = await http.get('/boards/' + boardId)

    if (data.result == 'login') {
      console.log(data)
      doLogout()
    } else {
      console.log(data)
      setBoardDetail(data)

      // props.detailModal.show();
      emit('call-parent-show-detail')
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
