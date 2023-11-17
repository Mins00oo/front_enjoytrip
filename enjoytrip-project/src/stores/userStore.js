//
import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', () => {
  // 로그인 여부, 사용자 이름, 프로필 이미지, 로그인에 필요한 항목
  const authStore = reactive({
    isLogin: false,
    userName: '',
    userEmail: '',
    userId: '',
    userNickName: ''
  })

  // login후 변경
  const setLogin = (payload) => {
    console.log('before', authStore)
    authStore.isLogin = payload.isLogin
    authStore.userNickName = payload.userNickName
    authStore.userId = payload.userId
    console.log('after', authStore)
  }

  const setLogout = () => {
    sessionStorage.removeItem('isLogin')
    sessionStorage.removeItem('userName')
    sessionStorage.removeItem('userNickName')

    authStore.isLogin = false
    authStore.userName = ''
    authStore.userId = ''
    authStore.userNickName = ''
  }

  return { authStore, setLogin, setLogout }
})
