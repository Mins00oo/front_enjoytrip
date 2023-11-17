<template>
  <div
    class="modal fade"
    id="sendEmailModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">이메일 확인</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label">Email</label>
              <input type="text" class="form-control" id="recipient-name" v-model="checkEmail" />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
          <button type="button" class="btn btn-primary" @click="sendEmail()">이메일 확인</button>
        </div>
      </div>
    </div>
  </div>

  <ChangePassword></ChangePassword>
</template>

<script setup>
import { useAuthStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { Modal } from 'bootstrap'

import ChangePassword from '@/components/user/login/ChangePassword.vue'
import http from '@/common/axios.js'

const checkEmail = ref('')
const { authStore, setLogin } = useAuthStore()

let changePasswordModal = null
let sendEmailModal = null

onMounted(() => {
  changePasswordModal = new Modal(document.getElementById('changePassword'))
  sendEmailModal = new Modal(document.getElementById('sendEmailModal'))
})

const sendEmail = async () => {
  console.log(sendEmailModal)
  try {
    let { data } = await http.get(`/users/email/${checkEmail.value}`)
    if (data.result == 'success') {
      // 이메일 인증 성공 시
      showChangePasswordModal()
    } else if (data.result == 'fail') {
      alert('존재하지 않는 이메일입니다.')
    }
  } catch (error) {
    console.log(error)
  }
}
const showChangePasswordModal = () => changePasswordModal.show()
</script>
