import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/userStore'

import http from '@/common/axios.js'

// 여기 만들면 안된다.
// const router = useRouter()

export const useBoardStore = defineStore('boardStore', () => {
  const router = useRouter()
  const { authStore, setLogout } = useAuthStore()
  const boardStore = reactive({
    // list
    list: [],
    limit: 10,
    offset: 0,
    searchWord: '',

    // pagination
    listRowCount: 10,
    pageLinkCount: 10,
    currentPageIndex: 1,
    totalListItemCount: 0,

    // detail, update, delete
    boardId: 0,
    title: '',
    content: '',
    userName: '',
    regDate: '',
    regTime: '',
    readCount: 0,
    fileList: [],
    sameUser: false
  })

  const setBoardList = (list) => (boardStore.list = list)
  const setTotalListItemCount = (count) => (boardStore.totalListItemCount = count)
  const setBoardMovePage = (pageIndex) => {
    boardStore.offset = (pageIndex - 1) * boardStore.listRowCount
    boardStore.currentPageIndex = pageIndex
  }
  const setBoardDetail = (payload) => {
    boardStore.boardId = payload.boardId
    boardStore.title = payload.boardTitle
    boardStore.content = payload.boardContent
    boardStore.userName = payload.userNickname
    boardStore.regDate = payload.boardDate
    if (payload.userId == authStore.userId) {
      boardStore.sameUser = true
    } else {
      boardStore.sameUser = false
    }
  }

  // list
  const boardList = async () => {
    let params = {
      limit: boardStore.limit,
      offset: boardStore.offset,
      searchWord: boardStore.searchWord
    }

    try {
      let { data } = await http.get('/boards', { params }) // params: params shorthand property, let response 도 제거
      if (data.result == 'login') {
        doLogout()
      } else {
        setBoardList(data.list)
        setTotalListItemCount(data.count)
      }
    } catch (error) {
      console.error(error)
    }
  }

  // pagination
  const pageCount = computed(() => {
    return Math.ceil(boardStore.totalListItemCount / boardStore.listRowCount)
  })

  const startPageIndex = computed(() => {
    if (boardStore.currentPageIndex % boardStore.pageLinkCount == 0) {
      //10, 20...맨마지막
      return (
        (boardStore.currentPageIndex / boardStore.pageLinkCount - 1) * boardStore.pageLinkCount + 1
      )
    } else {
      return (
        Math.floor(boardStore.currentPageIndex / boardStore.pageLinkCount) *
          boardStore.pageLinkCount +
        1
      )
    }
  })

  const endPageIndex = computed(() => {
    if (boardStore.currentPageIndex % boardStore.pageLinkCount == 0) {
      //10, 20...맨마지막
      return (
        (boardStore.currentPageIndex / boardStore.pageLinkCount - 1) * boardStore.pageLinkCount +
        boardStore.pageLinkCount
      )
    } else {
      console.log('endPage')
      console.log(pageCount.value)
      return Math.min(
        Math.floor(boardStore.currentPageIndex / boardStore.pageLinkCount) *
          boardStore.pageLinkCount +
          1,
        pageCount.value
      )
    }
  })

  const prev = computed(() =>
    boardStore.currentPageIndex <= boardStore.pageLinkCount ? false : true
  )
  const next = computed(() =>
    Math.floor(pageCount / boardStore.pageLinkCount) * boardStore.pageLinkCount <
    boardStore.currentPageIndex
      ? false
      : true
  )

  const doLogout = () => {
    setLogout({
      isLogin: false,
      userNickName: '',
      userId: '',
      userEmail: ''
    })
    router.push('/login')
  }

  return {
    boardStore,
    setBoardList,
    setBoardMovePage,
    setTotalListItemCount,
    setBoardMovePage,
    setBoardDetail,
    boardList,
    pageCount,
    startPageIndex,
    endPageIndex,
    prev,
    doLogout,
    next
  }
})
