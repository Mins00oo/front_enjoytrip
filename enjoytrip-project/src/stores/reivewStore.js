import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'

import http from '@/common/axios.js'

export const useReviewStore = defineStore('reviewStore', () => {
  const reviewStore = reactive({
    list: [],
    contentId: 0,
    reviewId: 0
  })

  // list
  const reviewList = async () => {
    try {
      let { data } = await http.get('/tours/reviews')
      setReviewList(data)
    } catch (error) {
      console.error(error)
    }
  }

  const setContentId = async (contentId) => {
    reviewStore.contentId = contentId
  }

  const setReviewId = async (reviewId) => {
    reviewStore.reviewId = reviewId
  }

  const setReviewList = (list) => (reviewStore.list = list)

  return {
    reviewList,
    reviewStore,
    setContentId,
    setReviewId
  }
})
