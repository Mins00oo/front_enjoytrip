<template>
    <div>
        <div v-for="(mytrip, index) in dataList" :key="index" class="mytrip-container mt-3">
            <div class="mytrip-item">
                <div class="mytrip-title-container">
                    <div class="mytrip-title" @click="detailMytrip(mytrip.mytripId)">{{ mytrip.title }}</div>
                    <i v-if="mytrip.isOwner === 1" @click="deleteMytrip(mytrip.mytripId)" class="fas fa-trash mytrip-trash-icon"></i>
                </div>
                <div class="user">
                    <i class="fas fa-users"></i>
                    <div v-if="mytrip.isOwner === 1">소유자</div>
                    <div v-if="mytrip.isOwner === 0">게스트</div>
                </div>
                <div class="mytrip-userCnt mt-2"><i far fa-calendar-alt></i>생성일: {{ mytrip.creDate }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import http from '@/common/axios.js'
import { useRouter } from 'vue-router'

const router = useRouter()

//리뷰 정보 가져오기
const dataList = ref([])
const list = async () => {
    try {
        let { data } = await http.get("/mytrips");
        dataList.value = data;
    } catch (error) {
        console.error(error);
    }
}
list()

const detailMytrip = (mytripId) => {
    router.push({ name: 'MytripDetail', params: { mytripId: mytripId } })
}

const deleteMytrip = async (mytripId) => {
    try {
        let { data } = await http.delete("/mytrips/"+mytripId);
    } catch (error) {
        console.error(error);
    }
    list()
}
</script>

<style scoped>
@import '../../assets/css/mytrip.css';
</style>