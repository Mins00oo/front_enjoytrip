<template>
    <div class="row row-cols-auto">
        <div v-for="(review, index) in store.reviewStore.list" :key="index" class="review-container">
            <div class="review-title-container">
                <div class="review-title">{{ review.title }}</div>
                <i @click="deleteReview(review.reviewId)" class="fas fa-trash mytrip-trash-icon"></i>
            </div>
            <div class="review-star">
                <i v-for="n in review.score" :key="n" class="fas fa-star star"></i>
            </div>
            <div class="review-content">{{ review.content }}</div>
            <div class="review-author">작성자: {{ review.userNickname }}</div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import http from '@/common/axios.js'
import { useReviewStore } from "../../stores/reivewStore";
import { Modal } from 'bootstrap'

const store = useReviewStore()

//리뷰 정보 가져오기
store.reviewList()

const deleteReview = async (reviewId) => {
    try {
        let { data } = await http.delete("/tours/reviews/" + reviewId);
        console.log(data)
        store.reviewList()
    } catch (error) {
        console.error(error);
    }
}
</script>

<style scoped>
@import '../../assets/css/reivew.css';
</style>