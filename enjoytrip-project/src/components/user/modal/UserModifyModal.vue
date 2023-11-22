<template>
  <div
    ref="userEditModalRef"
    class="modal fade"
    id="userEditModal"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="userEditModalLabel">회원 정보 수정</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!-- 여기에 폼 입력 필드 추가 -->
          <form>
            <div class="mb-3">
              <label for="userEmail" class="form-label">이메일</label>
              <input
                type="text"
                class="form-control"
                id="userEmail"
                v-model="localUserEmail"
                readonly
              />
            </div>
            <div class="mb-3">
              <label for="userName" class="form-label">이름</label>
              <input type="email" class="form-control" id="userName" v-model="localUserName" />
            </div>
            <div class="mb-3">
              <label for="userNickname" class="form-label">닉네임</label>
              <input
                type="text"
                class="form-control"
                id="userNickname"
                v-model="localUserNickname"
              />
            </div>
            <!-- 기타 필드 추가 -->
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="updateUser()"
          >
            수정하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/userStore'
import { defineProps } from 'vue'
import { ref, onMounted, watch } from 'vue'
import http from '@/common/axios.js'
import { useRouter } from 'vue-router'
import { Modal } from 'bootstrap'

// Modal 인스턴스와 Router 인스턴스 준비
let userEditModal = null
const router = useRouter()
const { authStore } = useAuthStore()

const localUserEmail = ref('')
const localUserName = ref('')
const localUserNickname = ref('')

const updateUser = async () => {
  let userObj = {
    userEmail: localUserEmail.value,
    userName: localUserName.value,
    userNickname: localUserNickname.value
  }

  console.log(userObj)

  try {
    let { data } = await http.put(`/users/${authStore.userId}`, userObj)
    console.log(data)
    alert('회원정보가 변경되었습니다!')
    // 모달 닫기
    router.push('/')
  } catch (error) {
    console.log(error)
  }
}

const props = defineProps({
  userName: String,
  userNickname: String,
  userEmail: String
})

// Props와 로컬 데이터 동기화
watch(
  () => props.userName,
  (newVal) => {
    localUserName.value = newVal
  }
)

watch(
  () => props.userNickname,
  (newVal) => {
    localUserNickname.value = newVal
  }
)

watch(
  () => props.userEmail,
  (newVal) => {
    localUserEmail.value = newVal
  }
)
console.log('props', props)
</script>
