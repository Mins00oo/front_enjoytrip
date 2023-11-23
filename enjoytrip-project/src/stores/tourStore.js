import { reactive, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/userStore'

import http from '@/common/axios.js'

export const useTourStore = defineStore('tourStore', () => {
  const router = useRouter()
  const { authStore, setLogout } = useAuthStore()
  const tourStore = reactive({
    // list
    list: [],
    recommendList: [],
    tourRelatedList: [],
    mainTourRecommendList: [],
    regionTourList: [],
    sidoList: [],
    gugunList: [],
    searchResultList: [],
    recentSearchList: [],
    limit: 9,
    offset: 0,
    searchWord: '',
    region: '',
    category: '',
    againSearchWord: '',
    // pagination
    currentPage: 1,
    totalListItemCount: 0,

    // pagination
    listRowCount: 10,
    pageLinkCount: 10,

    // detail, update, delete
    contentId: 0,
    title: '',
    addr1: '',
    userName: '',
    zipcode: '',
    firstImage: '',
    firstImage2: '',
    readCount: 0,
    sidoCode: '',
    gugunCode: '',
    latitude: 0,
    longitude: 0,
    averageScore: 0,
    reviewResponseDtos: [],
    favorite: false,
    overview: '',
    option: 'title',
    how: 'asc'
  })

  const setTourMovePage = (pageIndex) => {
    tourStore.offset = (pageIndex - 1) * tourStore.listRowCount
    tourStore.currentPage = pageIndex
  }

  const setTourList = (list) => (tourStore.list = list)
  const setTourRecommendList = (list) => (tourStore.recommendList = list)
  const setTourRelatedList = (list) => (tourStore.tourRelatedList = list)
  const setTourRegionList = (list) => (tourStore.regionTourList = list)
  const setTourGugunList = (list) => (tourStore.gugunList = list)
  const setTourSidoList = (list) => (tourStore.sidoList = list)
  const setSearchResultList = (list) => (tourStore.searchResultList = list)
  const setTourListDefault = () => {
    tourStore.limit = 9
    tourStore.offset = 0
    tourStore.searchWord = ''
    tourStore.region = ''
    tourStore.category = ''
    tourStore.option = 'title'
    tourStore.how = 'asc'
    tourStore.sidoCode = ''
    tourStore.gugunCode = ''
    tourStore.favorite = false
  }
  const setMainTourRecommendList = (list) => {
    tourStore.mainTourRecommendList = list
  }
  const setTourSearchParamsDefault = () => {
    tourStore.offset = 0
    tourStore.limit = 9
    tourStore.searchWord = ''
    tourStore.region = ''
    tourStore.category = ''
    tourStore.option = 'title'
    tourStore.how = 'asc'
    tourStore.sidoCode = ''
    tourStore.gugunCode = ''
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
    tourStore.averageScore = payload.averageScore
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
      how: tourStore.how,
      sidoCode: tourStore.sidoCode,
      gugunCode: tourStore.gugunCode,
      againSearchWord: tourStore.againSearchWord
    }

    console.log('리스트 조회 params', params)

    try {
      let { data } = await http.get('/tours', { params })
      setTourList(data.list)
      console.log(data)
      tourStore.totalListItemCount = data.count
    } catch (error) {
      console.error(error)
    }
  }

  // search
  const tourSearchList = async () => {
    let params = {
      limit: tourStore.limit,
      offset: tourStore.offset,
      searchWord: tourStore.searchWord,
      region: tourStore.region,
      category: tourStore.category,
      option: tourStore.option,
      how: tourStore.how,
      sidoCode: tourStore.sidoCode,
      gugunCode: tourStore.gugunCode,
      againSearchWord: tourStore.againSearchWord
    }

    console.log(params, 'list 호출 params')
    try {
      let { data } = await http.get('/tours', { params })
      setSearchResultList(data.list)
      console.log('tourSearchList store', data)
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
    } catch (error) {
      console.error(error)
    }
  }

  const tourGugunList = async (sidoCode) => {
    try {
      let { data } = await http.get('/tours/gugun/' + sidoCode)
      setTourGugunList(data.gugunList)
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

      setTourRelatedList(data.list)
    } catch (error) {
      console.error(error)
    }
  }

  const mainTourRecommendList = async () => {
    try {
      let { data } = await http.get('/tours/main')
      setMainTourRecommendList(data.list)
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  // pagination
  const pageCount = computed(() => Math.ceil(tourStore.totalListItemCount / tourStore.listRowCount))

  const startPageIndex = computed(() => {
    if (tourStore.currentPage % tourStore.pageLinkCount == 0) {
      //10, 20...맨마지막
      return (tourStore.currentPage / tourStore.pageLinkCount - 1) * tourStore.pageLinkCount + 1
    } else {
      return (
        Math.floor(tourStore.currentPage / tourStore.pageLinkCount) * tourStore.pageLinkCount + 1
      )
    }
  })

  const endPageIndex = computed(() => {
    let tempEndPageIndex = 0
    if (tourStore.currentPage % tourStore.pageLinkCount == 0) {
      //10, 20...맨마지막
      tempEndPageIndex =
        (tourStore.currentPage / tourStore.pageLinkCount - 1) * tourStore.pageLinkCount +
        tourStore.pageLinkCount
    } else {
      tempEndPageIndex =
        Math.floor(tourStore.currentPage / tourStore.pageLinkCount) * tourStore.pageLinkCount +
        tourStore.pageLinkCount
    }
    // endPageIndex 가 전체 pageCount(페이지 전체 수) 보다 크면 페이지 전체 수로 보정
    if (tempEndPageIndex > pageCount.value) tempEndPageIndex = pageCount.value
    return tempEndPageIndex
  })

  const prev = computed(() => (tourStore.currentPage <= tourStore.pageLinkCount ? false : true))
  const next = computed(() => (endPageIndex.value == pageCount.value ? false : true)) // 위에서 더 큰 값은 보정했으므로 같은 지만 비교

  return {
    tourList,
    tourStore,
    tourRecommendList,
    tourSidoList,
    setTourDetail,
    setTourRelatedList,
    setTourListDefault,
    setTourSidoList,
    tourSearchList,
    setSearchResultList,
    tourRelatedList,
    tourGugunList,
    setTourGugunList,
    mainTourRecommendList,
    tourDetail,
    pageCount,
    startPageIndex,
    setTourMovePage,
    endPageIndex,
    prev,
    next
  }
})
