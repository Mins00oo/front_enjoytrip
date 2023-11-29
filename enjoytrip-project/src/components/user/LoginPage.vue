<template>
  <div class="login-page">
    <div class="form">
      <form class="login-form">
        <input type="email" placeholder="이메일" v-model="authStore.userEmail" />
        <input type="password" placeholder="비밀번호" v-model="authStore.userPassword" />
      </form>

      <button @click="login" style="border-radius: 5px">로그인</button>
      <p class="message">
        아직 회원이 아니신가요?
        <router-link to="/register">회원가입</router-link>
      </p>

      <p class="message">
        비밀번호를 까먹으셨나요?
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          data-bs-whatever="@mdo"
          @click="showSendEmailModal()"
        >
          비밀번호 재설정
        </button>
      </p>
    </div>
  </div>

  <SendEmailModal></SendEmailModal>
</template>

<script setup>
import { useAuthStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import SendEmailModal from '@/components/user/login/SendEmailModal.vue'
import http from '@/common/axios.js'

// bootstrap 객체 생성
import { Modal } from 'bootstrap'
import { ref, onMounted } from 'vue'

const { authStore, setLogin } = useAuthStore()
console.log('auth', authStore)
const router = useRouter()

let sendEmailModal = null

onMounted(() => {
  sendEmailModal = new Modal(document.getElementById('sendEmailModal'))
})

const showSendEmailModal = () => sendEmailModal.show()

const login = async () => {
  let loginObj = {
    userPassword: authStore.userPassword,
    userEmail: authStore.userEmail
  }

  try {
    let { data } = await http.post('/login', loginObj)
    console.log(loginObj)
    console.log(data)
    if (data.result == 'success') {
      // 세션 스토리지에 저장
      sessionStorage.setItem('isLogin', 'true')
      sessionStorage.setItem('userNickName', data.userNickName)
      sessionStorage.setItem('userId', data.userId)
      // store 변경
      setLogin({
        isLogin: true,
        userNickName: data.userNickName,
        userId: data.userId
      })
      router.push('/')
    } else if (data.result == 'fail') {
      alert('이메일 혹은 비밀번호를 확인하세요.')
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped>
@import '/src/assets/css/login.css';
</style>
