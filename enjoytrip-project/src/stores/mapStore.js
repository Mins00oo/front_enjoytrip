import { pushScopeId, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from '@/common/axios.js'

// const router = useRouter() storep에서 router를 사용하려면 defineStore안에 선언해야한다.
export const useMapStore = defineStore('mapStore', () => {
  const router = useRouter()

  //로그인 여부, 사용자 이름, 프로필 이미지, 로그인 항목

  let mapList = ref([])
  let mapDetail = ref({})

  const getMapList = async function () {
    try {
      // let { data } = await axios.get('/place/main')

      mapList.value = data
      console.log('getmapList store', mapList.value)
    } catch (error) {
      console.error(error)
    }
  }

  const getMapDetail = async function (contentId) {
    try {
      let { data } = await axios.get(`/tours/${contentId}`)

      mapDetail.value = data
      console.log('getmapDetail store', mapDetail.value)
    } catch (error) {
      console.error(error)
    }
  }

  return { mapList, mapDetail, getMapList, getMapDetail }
})
