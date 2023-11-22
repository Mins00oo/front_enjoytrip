import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'

import http from '@/common/axios.js'

export const useMytripStore = defineStore('mytripStore', () => {
  const mytripStore = reactive({
    // 관광지 정보 list
    list: [],
    mytripId: 0,
    len: 0
  })

  // list
  const tourList = async (mytripId) => {
    try {
      mytripStore.mytripId = mytripId
      let { data } = await http.get('/mytrips/' + mytripId)
      setTourList(data)
      getLength()
    } catch (error) {
      console.error(error)
    }
  }

  const setTourList = (list) => (mytripStore.list = list)

  const getLength = () => (mytripStore.len = mytripStore.list.length)

  return {
    tourList,
    mytripStore
  }
})