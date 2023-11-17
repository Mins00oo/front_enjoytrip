<template>
    <div class="row gallery">
        <div class="col-md-4" v-for="(star, index) in dataList" v-bind:key="index">
            <!--디테일 페이지 연동하기-->
            <div class="image-container">
                <img :src="star.firstImage" class="responsive-image" />
                <div class="overlay">
                    <router-link to="/detail" class="link-style">
                        <p>{{ star.title }}</p>
                    </router-link>
                    <hr>
                    <i @click="deleteStar(star.contentId)" class="fas fa-trash"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import http from '@/common/axios.js'

//관광지 정보 세팅하기
const dataList = ref([])
const list = async () => {
    try {
        let { data } = await http.get("/tours/stars");
        dataList.value = data;
    } catch (error) {
        console.error(error);
    }
}
list()

const deleteStar = async(contentId) => {
    try {
        let { data } = await http.delete("/tours/stars/"+contentId);
        console.log(data)
        list()
    } catch (error) {
        console.error(error);
    }
}

</script>

<style scoped>
@import '/src/assets/css/starlist.css';
@import '/src/assets/css/fontawesome.css';
@import '/src/assets/css/fontawesome.min.css';

</style>