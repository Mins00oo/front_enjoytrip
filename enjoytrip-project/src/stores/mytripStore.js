import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'

import http from '@/common/axios.js'

export const useMytripStore = defineStore('mytripStore', () => {
  const mytripStore = reactive({
    mytripList: [],
    list: [], // 관광지 정보 list
    mytripId: 0,
    len: 0
  })

  // list
  const tourList = async (mytripId) => {
    console.log('tourList')
    try {
      mytripStore.mytripId = mytripId
      let { data } = await http.get('/mytrips/' + mytripId)
      setTourList(data)
      getLength()
    } catch (error) {
      console.error(error)
    }
  }

  const getMytripList = async () => {
    console.log('mytripList')
    try {
      let { data } = await http.get('/mytrips')
      setMytripList(data)
    } catch (error) {
      console.error(error)
    }
  }

  const setTourList = (list) => (mytripStore.list = list)
  const setMytripList = (list) => (mytripStore.mytripList = list)

  const getLength = () => (mytripStore.len = mytripStore.list.length)

  const deleteTour = async (contentId) => {
    try {
      let res = await http.delete('/mytrips/tour/' + mytripStore.mytripId + '/' + contentId)
      tourList(mytripStore.mytripId)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    tourList,
    mytripStore,
    deleteTour,
    getMytripList
  }
})
