<template>
    <div>
        <div v-for="(review, index) in dataList" :key="index" class="review-container">
            <div class="review-tour">{{ review.title }}</div>
            <div class="review-score">{{ review.score }}</div>
            <div class="review-content">{{ review.content }}</div>
            <div class="review-author">작성자: {{ review.userNickname }}</div>
            <i @click="deleteReview(review.reviewId)" class="fas fa-trash"></i>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import http from '@/common/axios.js'

//리뷰 정보 가져오기
const dataList = ref([])
const list = async () => {
    try {
        let { data } = await http.get("/tours/reviews");
        dataList.value = data;
    } catch (error) {
        console.error(error);
    }
}
list()

const deleteReview = async (reviewId) => {
    try {
        let { data } = await http.delete("/tours/reviews/" + reviewId);
        console.log(data)
        list()
    } catch (error) {
        console.error(error);
    }
    list()
}
</script>

<style scoped>
@import '../../assets/css/reivew.css';
</style>