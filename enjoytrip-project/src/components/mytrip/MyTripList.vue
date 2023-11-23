<template>
  <div class="row row-cols-auto">
    <div v-for="(mytrip, index) in store.mytripStore.mytripList" :key="index" class="mytrip-container mt-3">
      <div class="mytrip-item">
        <div class="mytrip-title-container">
          <div class="mytrip-title" @click="detailMytrip(mytrip.mytripId)">{{ mytrip.title }}</div>
          <i v-if="mytrip.isOwner === 1" @click="deleteMytrip(mytrip.mytripId)"
            class="fas fa-trash mytrip-trash-icon"></i>
        </div>
        <div class="user">
          <i class="fas fa-users"></i>
          <div v-if="mytrip.isOwner === 1">소유자</div>
          <div v-if="mytrip.isOwner === 0">게스트</div>
        </div>
        <div class="mytrip-userCnt mt-2">
          <i far fa-calendar-alt></i>생성일: {{ mytrip.creDate }}
        </div>
      </div>
    </div>
    <div class="mytrip-item add">
      <i @click="addMytrip" class="fas fa-plus mytrip-plus-icon"></i>
    </div>
    <add-modal></add-modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import http from '@/common/axios.js'
import { useRouter } from 'vue-router'
import AddModal from '@/components/mytrip/modal/AddModal.vue'
import { Modal } from 'bootstrap'
import { useMytripStore } from '../../stores/mytripStore'

const router = useRouter()

const store = useMytripStore()
let addModal = null

//리스트 초기화
store.getMytripList()
console.log(store.mytripStore.mytripList)

onMounted(() => {
  addModal = new Modal(document.getElementById('addModal'))
})

//마이트립 추가하기
const addMytrip = async () => {
  //모달 띄우기
  addModal.show()
  //다시 리스트 불러오기
  store.getMytripList()
}

const detailMytrip = (mytripId) => {
  router.push({ name: 'MytripDetail', params: { mytripId: mytripId } })
}

const deleteMytrip = async (mytripId) => {
  try {
    let { data } = await http.delete('/mytrips/' + mytripId)
  } catch (error) {
    console.error(error)
  }
  list()
}
</script>

<style scoped>
@import '../../assets/css/mytrip.css';
</style>
