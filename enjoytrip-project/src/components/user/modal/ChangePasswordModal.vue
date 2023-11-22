<template>
  <div
    ref="editPasswordModalRef"
    class="modal fade"
    id="editPasswordModal"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editPasswordModalLabel">비밀번호 수정</h5>
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
              <label for="userPassword" class="form-label">비밀번호</label>
              <input
                type="password"
                class="form-control"
                id="userPassword"
                v-model="userPassword"
              />
            </div>
            <div class="mb-3">
              <label for="userPassword2" class="form-label">비밀번호 확인</label>
              <input
                type="password"
                class="form-control"
                id="userPassword2"
                v-model="userPassword2"
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import http from '@/common/axios.js'

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

const updateUser = async () => {
  let userObj = {
    userPassword: userPassword.value
  }

  console.log(userObj)

  try {
    let { data } = await http.put('/users/pw', userObj)
    console.log(data)
    alert('회원정보가 변경되었습니다!')
    // 모달 닫기
    router.push('/')
  } catch (error) {
    console.log(error)
  }
}
</script>
