<template>
  <div class="login-page">
    <div class="form">
      <form class="login-form">
        <div class="mb-3">
          <input
            type="text"
            placeholder="이름"
            :class="{
              'is-valid': isUserNameFocusAndValid,
              'is-invalid': isUserNameFocusAndInValid
            }"
            name="userName"
            required
            v-model="userName"
            @input="validateUserName"
            @focus="isUserNameFocus = true"
            @blur="isUserNameFocus = false"
          />
          <div class="valid-feedback">Valid.</div>
          <div class="invalid-feedback">Invalid.</div>
        </div>

        <div class="mb-3">
          <input
            type="text"
            placeholder="닉네임"
            :class="{
              'is-valid': isUserNicknameFocusAndValid,
              'is-invalid': isUserNicknameFocusAndInValid
            }"
            name="userNickname"
            required
            v-model="userNickname"
            @input="validateUserNickname"
            @focus="isUserNicknameFocus = true"
            @blur="isUserNicknameFocus = false"
          />
          <div class="valid-feedback">Valid.</div>
          <div class="invalid-feedback">Invalid.</div>
        </div>

        <div class="mb-3">
          <input
            type="text"
            placeholder="이메일"
            :class="{
              'is-valid': isUserEmailFocusAndValid,
              'is-invalid': isUserEmailFocusAndInValid
            }"
            name="userEmail"
            required
            v-model="userEmail"
            @input="validateUserEmail"
            @focus="isUserEmailFocus = true"
            @blur="isUserEmailFocus = false"
          />
          <div class="valid-feedback">Valid.</div>
          <div id="userEmailInvalidFeedback" class="invalid-feedback">Invalid.</div>
        </div>

        <div class="mb-3">
          <input
            type="password"
            placeholder="비밀번호"
            :class="{
              'is-valid': isUserPasswordFocusAndValid,
              'is-invalid': isUserPasswordFocusAndInValid
            }"
            name="userPassword"
            required
            v-model="userPassword"
            @input="validateUserPassword"
            @focus="isUserPasswordFocus = true"
            @blur="isUserPasswordFocus = false"
          />
          <div class="valid-feedback">Valid.</div>
          <div class="invalid-feedback">
            1개 이상의 특수문자, 대소문자 및 숫자를 포함하고 8자리 이상이여야 합니다.
          </div>
        </div>

        <div class="mb-3">
          <input
            type="password"
            placeholder="비밀번호 확인"
            :class="{
              'is-valid': isUserPassword2FocusAndValid,
              'is-invalid': isUserPassword2FocusAndInValid
            }"
            name="userPassword2"
            v-model="userPassword2"
            required
            @input="validateUserPassword2"
            @focus="isUserPassword2Focus = true"
            @blur="isUserPassword2Focus = false"
          />
          <div class="valid-feedback">Valid.</div>
          <div class="invalid-feedback">비밀번호가 일치하지 않습니다.</div>
        </div>

        <p class="message">이미 회원이신가요? <a href="/login">로그인</a></p>
      </form>

      <button @click="register()">회원가입</button>
    </div>
  </div>
</template>

<style scoped>
@import '/src/assets/css/login.css';
</style>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import http from '@/common/axios.js'

const router = useRouter()

const userName = ref('')
const userNickname = ref('')
const userPassword = ref('')
const userPassword2 = ref('')
const userEmail = ref('')

const isUserNameFocus = ref(false)
const isUserNicknameFocus = ref(false)
const isUserPasswordFocus = ref(false)
const isUserPassword2Focus = ref(false)
const isUserEmailFocus = ref(false)

// validation
const isUserNameValid = ref(false)
const isUserNicknameValid = ref(false)
const isUserPasswordValid = ref(false)
const isUserPassword2Valid = ref(false)
const isUserEmailValid = ref(false)

// focus + valid => valid computed
const isUserNameFocusAndValid = computed(() => isUserNameFocus.value && isUserNameValid.value)
const isUserNicknameFocusAndValid = computed(
  () => isUserNicknameFocus.value && isUserNicknameValid.value
)
const isUserPasswordFocusAndValid = computed(
  () => isUserPasswordFocus.value && isUserPasswordValid.value
)
const isUserPassword2FocusAndValid = computed(
  () => isUserPassword2Focus.value && isUserPassword2Valid.value
)
const isUserEmailFocusAndValid = computed(() => isUserEmailFocus.value && isUserEmailValid.value)

// focust + invalid => invalid computed
const isUserNameFocusAndInValid = computed(() => isUserNameFocus.value && !isUserNameValid.value)
const isUserNicknameFocusAndInValid = computed(
  () => isUserNicknameFocus.value && !isUserNicknameValid.value
)
const isUserPasswordFocusAndInValid = computed(
  () => isUserPasswordFocus.value && !isUserPasswordValid.value
)
const isUserPassword2FocusAndInValid = computed(
  () => isUserPassword2Focus.value && !isUserPassword2Valid.value
)
const isUserEmailFocusAndInValid = computed(() => isUserEmailFocus.value && !isUserEmailValid.value)

// validate method
const validateUserName = () => {
  isUserNameValid.value = userName.value.length > 0 ? true : false
}

const validateUserNickname = () => {
  isUserNicknameValid.value = userNickname.value.length > 0 ? true : false
}

const validateUserPassword = () => {
  let patternSpeAtListOne = new RegExp(/[~!@#$%^&*()_+|<>?:{}]+/) // + for at least one
  let patternNumAtListOne = new RegExp(/[0-9]+/) // + for at least one
  let patternEngAtListOne = new RegExp(/[a-zA-Z]+/) // + for at least one

  isUserPasswordValid.value =
    patternEngAtListOne.test(userPassword.value) &&
    patternSpeAtListOne.test(userPassword.value) &&
    patternNumAtListOne.test(userPassword.value) &&
    userPassword.value.length >= 8
      ? true
      : false
}

const validateUserPassword2 = () => {
  isUserPassword2Valid.value = userPassword.value == userPassword2.value
}

const validateUserEmail = () => {
  let regexp = new RegExp(
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
  )
  isUserEmailValid.value = regexp.test(userEmail.value)
}

const register = async () => {
  let userObj = {
    userPassword: userPassword.value,
    userEmail: userEmail.value,
    userName: userName.value,
    userNickname: userNickname.value
  }

  console.log(userObj)

  try {
    let { data } = await http.post('/users', userObj)
    console.log('data', data)
    if (data.result == 'success') {
      alert('환영합니다!')
      router.push('/')
    } else {
      alert('이미 가입된 이메일입니다!')
    }
  } catch (error) {
    console.log(error)
  }
}
</script>
