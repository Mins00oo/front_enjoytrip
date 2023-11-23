//
import { reactive } from 'vue'
import { defineStore } from 'pinia'
import http from '@/common/axios.js'

export const useAuthStore = defineStore('authStore', () => {
  // 로그인 여부, 사용자 이름, 프로필 이미지, 로그인에 필요한 항목
  const authStore = reactive({
    isLogin: false,
    userName: '',
    userEmail: 'potato@naver.com',
    userId: '',
    userNickName: '',
    userPassword: 'AAaa1010^^',
    userDescription: ''
  })

  // login후 변경
  const setLogin = (payload) => {
    console.log('before', authStore)
    authStore.isLogin = payload.isLogin
    authStore.userNickName = payload.userNickName
    authStore.userId = payload.userId
    console.log('after', authStore)
  }

  const logout = async () => {
    try {
      let { data } = await http.get('/logout')

      if (data.result == 'success') {
        setLogout()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const setLogout = (payload) => {
    console.log(payload)
    sessionStorage.removeItem('isLogin')
    sessionStorage.removeItem('userName')
    sessionStorage.removeItem('userNickName')

    authStore.isLogin = payload.isLogin
    authStore.userName = payload.userName
    authStore.userId = payload.userId
    authStore.userNickName = payload.userNickName
    // authStore.userEmail = payload.userEmail
  }

  return { authStore, setLogin, setLogout, logout }
})
