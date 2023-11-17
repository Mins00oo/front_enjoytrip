<template>
  <div
    class="modal fade"
    id="changePassword"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">비밀번호 변경하기</h1>
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
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">뒤로 가기</button>
          <button type="button" class="btn btn-primary" @click="changePassword()">
            비밀번호 변경하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import http from '@/common/axios.js'
import { useRouter } from 'vue-router'
import { Modal } from 'bootstrap'

let changePasswordModal = null

onMounted(() => {
  changePasswordModal = new Modal(document.getElementById('changePassword'))
})

const router = useRouter()
const userPassword = ref('')
const userPassword2 = ref('')

const isUserPasswordFocus = ref(false)
const isUserPassword2Focus = ref(false)

const isUserPasswordValid = ref(false)
const isUserPassword2Valid = ref(false)

const isUserPasswordFocusAndValid = computed(
  () => isUserPasswordFocus.value && isUserPasswordValid.value
)
const isUserPassword2FocusAndValid = computed(
  () => isUserPassword2Focus.value && isUserPassword2Valid.value
)

const isUserPasswordFocusAndInValid = computed(
  () => isUserPasswordFocus.value && !isUserPasswordValid.value
)
const isUserPassword2FocusAndInValid = computed(
  () => isUserPassword2Focus.value && !isUserPassword2Valid.value
)

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

const changePassword = async () => {
  if (!isUserPasswordValid.value || !isUserPassword2Valid.value) {
    alert('비밀번호를 다시 확인해주세요.')
    return
  }

  let userObj = {
    userPassword: userPassword.value,
    userEmail: 'aa@naver.com'
  }

  console.log()

  try {
    let { data } = await http.put('/users/pw', userObj)
    console.log('data', data)
    if (data.result == 'success') {
      alert('비밀번호가 변경되었습니다!')
      changePasswordModal.hide()
      router.push('/')
    } else {
      alert('오류가 발생하였습니다. 다시 시도해주세요')
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped>
@import '/src/assets/css/login.css';
</style>
