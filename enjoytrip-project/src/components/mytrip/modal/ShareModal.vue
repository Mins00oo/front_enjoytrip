<template>
  <div
    class="modal fade"
    id="shareModal"
    tabindex="-1"
    aria-labelledby="shareModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="shareModalLabel">친구에게 공유하기</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="searchUser()">
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="이메일로 검색"
                aria-label="Recipient's email"
                aria-describedby="button-addon2"
                v-model="userEmail"
              />
              <button
                class="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                @click="searchUser()"
              >
                검색
              </button>
            </div>
          </form>
          <ul class="list-group">
            <li
              v-for="(user, index) in userList"
              :key="user.userId"
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              <div class="friend-info">
                <strong>{{ user.userNickname }}</strong> ({{ user.userEmail }})
              </div>
              <button type="button" class="btn btn-primary" @click="share(user.userId)">
                공유하기
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import http from '@/common/axios.js'
import { useAuthStore } from '@/stores/userStore'
import { useMytripStore } from '../../../stores/mytripStore'

const mStore = useMytripStore()
const { setLogout, authStore } = useAuthStore()
const userEmail = ref('')
const userList = ref([])

const searchUser = async () => {
  if (userEmail.value == '') {
    alert('검색어를 입력해주세요!')
    return
  }

  try {
    let { data } = await http.get(`/users/search/${userEmail.value}`)
    console.log('userSearchData', data)
    if (data.result == 'login') {
      doLogout()
    } else {
      userList.value = data.list.filter((user) => user.userEmail != authStore.userEmail)
      userEmail.value = ''
    }
  } catch (error) {
    console.log(error)
  }
}

const share = async (userId) => {
  let myTripRequestDto = {
    mytripId: mStore.mytripStore.mytripId,
    userId: userId
  }

  try {
    let { data } = await http.post('/mytrips/share', myTripRequestDto)
    console.log('data', data)
    if (data.result == 'login') {
      doLogout()
    } else if (data.result == 'false') {
      alert('이미 공유한 항목입니다!')
    } else if (data == 1) {
      alert('공유되었습니다!')
    }
  } catch (error) {
    console.log(error)
  }
}

// logout 처리 별도 method
const doLogout = () => {
  setLogout({
    isLogin: false,
    userNickName: '',
    userId: '',
    userEmail: ''
  })
  router.push('/login')
}

// 모달이 닫힐 때 실행될 함수
const resetUserList = () => {
  userList.value = []
}

// 모달 이벤트 리스너 추가
onMounted(() => {
  const modal = document.getElementById('shareModal')
  modal.addEventListener('hidden.bs.modal', resetUserList)
})
</script>

<style scoped>
.modal-body {
  max-height: 60vh;
  overflow-y: auto;
}

.input-group {
  margin-bottom: 20px;
}

.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
}
.friend-info {
  font-size: 0.9rem;
}

.friend-info strong {
  font-weight: bold;
  color: #007bff;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}
</style>
