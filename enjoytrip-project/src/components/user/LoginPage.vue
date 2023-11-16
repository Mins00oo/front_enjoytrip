<template>
  <div class="login-page">
    <div class="form">
      <form class="login-form">
        <input type="email" placeholder="이메일" v-model="authStore.userEmail" />
        <input type="password" placeholder="비밀번호" v-model="authStore.userPassword" />
      </form>

      <button @click="login">로그인</button>
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
          비밀번호 찾기
        </button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import SendEmailModal from '@/components/user/login/SendEmailModal.vue'
import http from '@/common/axios.js'

// bootstrap 객체 생성
import { Modal } from 'bootstrap'
import { ref } from 'vue'
const { authStore, setLogin } = useAuthStore()

const router = useRouter()
const checkEmail = ref('')
const isChecked = ref(false)

let sendEmailModal = null

onMounted(() => {
  sendEmailModal = new Modal(document.getElementById('sendEmailModal'))
})

const login = async () => {
  let loginObj = {
    userPassword: authStore.userPassword,
    userEmail: authStore.userEmail
  }

  try {
    let { data } = await http.post('/login', loginObj)
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
      console.log(authStore)
      router.push('/')
    } else if (data.result == 'fail') {
      alert('이메일 혹은 비밀번호를 확인하세요.')
    }
  } catch (error) {
    console.log(error)
  }
}

const sendEmail = async () => {
  try {
    let { data } = await http.get(`/users/email/${checkEmail.value}`)
    console.log(data)
    if (data.result == 'success') {
      isChecked.value = true
    } else if (data.result == 'fail') {
      alert('존재하지 않는 이메일입니다.')
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped>
@import '/src/assets/css/login.css';
</style>
