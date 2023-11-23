<template>
  <!-- 회원탈퇴 Modal -->
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">회원 탈퇴</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">정말 탈퇴하시겠습니까?</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="deleteUser()"
          >
            탈퇴하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import http from '@/common/axios.js'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/userStore'
import { Modal } from 'bootstrap'



const router = useRouter()
const { authStore, setLogin } = useAuthStore()

const deleteUser = async () => {
  try {
    let { data } = await http.delete(`/users/${authStore.userId}`)
    userName.value = ''
    userNickname.value = ''
    userEmail.value = ''
    sessionStorage.removeItem('isLogin')
    sessionStorage.removeItem('userNickName')
    sessionStorage.removeItem('userId')
    setLogin({
      isLogin: false,
      userNickName: '',
      userId: '',
      userEmail: ''
    })
    alert('탈퇴 완료되었습니다.')

    router.push('/')
  } catch (error) {
    console.log(error)
  }
}
</script>
