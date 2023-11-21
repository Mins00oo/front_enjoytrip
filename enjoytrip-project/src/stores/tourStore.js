import { reactive, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/userStore'

import http from '@/common/axios.js'

export const useTourStore = defineStore('tourStore', () => {
  const router = useRouter()
  const { authStore } = useAuthStore()
  const tourStore = reactive({
    // list
    list: [],
    recommendList: [],
    tourRelatedList: [],
    mainTourRecommendList: [],
    regionTourList: [],
    sidoList: [],
    gugunList: [],
    limit: 9,
    offset: 0,
    searchWord: '',
    region: '',
    category: '',
    // pagination
    currentPage: 1,
    totalListItemCount: 0,
    // detail, update, delete
    contentId: 0,
    title: '',
    addr1: '',
    userName: '',
    zipcode: '',
    firstImage: '',
    firstImage2: '',
    readCount: 0,
    sidoCode: 0,
    gugunCode: 0,
    latitude: 0,
    longitude: 0,
    avgScore: 0,
    reviewResponseDtos: [],
    favorite: true,
    overview: '',
    option: 'title',
    how: 'asc'
  })

  const setTourList = (list) => (tourStore.list = list)
  const setTourRecommendList = (list) => (tourStore.recommendList = list)
  const setTourRelatedList = (list) => (tourStore.tourRelatedList = list)
  const setTourRegionList = (list) => (tourStore.regionTourList = list)
  const setTourGugunList = (list) => (tourStore.gugunList = list)
  const setTourSidoList = (list) => (tourStore.sidoList = list)
  const setTourListDefault = () => {
    tourStore.limit = 9
    tourStore.offset = 0
    tourStore.searchWord = ''
    tourStore.region = ''
    tourStore.category = ''
    tourStore.option = 'title'
    tourStore.how = 'asc'
  }
  const setMainTourRecommendList = (list) => {
    tourStore.mainTourRecommendList = list
  }
  const setTourDetail = (payload) => {
    tourStore.contentId = payload.contentId
    tourStore.title = payload.title
    tourStore.addr1 = payload.addr1
    tourStore.userName = payload.userName
    tourStore.zipcode = payload.zipcode
    tourStore.firstImage = payload.firstImage
    tourStore.firstImage2 = payload.firstImage2
    tourStore.readCount = payload.readCount
    tourStore.sidoCode = payload.sidoCode
    tourStore.gugunCode = payload.gugunCode
    tourStore.latitude = payload.latitude
    tourStore.longitude = payload.longitude
    tourStore.avgScore = payload.avgScore
    tourStore.favorite = payload.favorite
    tourStore.reviewResponseDtos = payload.reviewResponseDtos
    tourStore.overview = payload.overview
  }

  // list
  const tourList = async () => {
    let params = {
      limit: tourStore.limit,
      offset: tourStore.offset,
      searchWord: tourStore.searchWord,
      region: tourStore.region,
      category: tourStore.category,
      option: tourStore.option,
      how: tourStore.how
    }

    console.log(params, 'list 호출 params')

    try {
      let { data } = await http.get('/tours', { params })
      setTourList(data.list)
      tourStore.totalListItemCount = data.count
    } catch (error) {
      console.error(error)
    }
  }

  // 전체 시도 리스트 조회
  const tourSidoList = async () => {
    try {
      let { data } = await http.get('/tours/sido')
      setTourSidoList(data.sidoList)
      console.log(data)
      console.log('시도 리스트 조회 후', tourStore.sidoList)
    } catch (error) {
      console.error(error)
    }
  }

  const tourGugunList = async (sidoId) => {
    console.log(sidoId, 'gugun api호출')
    try {
      let { data } = await http.get('/tours/gugun/' + sidoId)
      setTourGugunList(data.gugunList)
      console.log('구군 리스트 조회 후', tourStore.gugunList.length)
    } catch (error) {
      console.error(error)
    }
  }

  const tourDetail = async (contentId) => {
    try {
      let { data } = await http.get('/tours/' + contentId)

      if (data.result == 'login') {
        doLogout()
      } else {
        setTourDetail(data)
      }
    } catch (error) {
      console.log('BoardMainVue: error : ')
      console.log(error)
    }
  }

  const tourRecommendList = async () => {
    try {
      let { data } = await http.get('/tours/recommends') // params: params shorthand property, let response 도 제거
      setTourRecommendList(data)
    } catch (error) {
      console.error(error)
    }
  }

  const tourRelatedList = async (contentId) => {
    try {
      let { data } = await http.get('/tours/relate/' + contentId)
      if (data.result == 'login') {
        router.push('/login')
      } else {
        setTourRelatedList(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const mainTourRecommendList = async () => {
    try {
      let { data } = await http.get('/tours/main')
      setMainTourRecommendList(data)
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  const totalPages = computed(() => {
    console.log(tourStore.totalListItemCount)
    Math.ceil(tourStore.totalListItemCount / tourStore.limit)
  })

  return {
    tourList,
    tourStore,
    tourRecommendList,
    tourSidoList,
    setTourDetail,
    setTourRelatedList,
    setTourListDefault,
    setTourSidoList,
    tourRelatedList,
    tourGugunList,
    setTourGugunList,
    mainTourRecommendList,
    tourDetail,
    totalPages
  }
})
