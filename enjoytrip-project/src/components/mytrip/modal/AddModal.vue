<template>
  <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addModalLabel">마이트립 추가하기</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="add()">
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="제목" aria-label="Mytrip Title"
                aria-describedby="button-addon2" v-model="mytripTitle" />
              <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="add()">
                추가
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import http from '@/common/axios.js'
import { useMytripStore } from "../../../stores/mytripStore";

const store = useMytripStore()
const mytripTitle = ref('')

const add = async () => {
  if (mytripTitle.value == '') {
    alert('제목을 입력해주세요!')
    return
  }
  const params = {
    isOwner: 1,
    title: mytripTitle.value
  }
  try {
    let { data } = await http.post("/mytrips", params);
    store.getMytripList()
    if (data == 1) {
      alert('추가에 성공했습니다!')
    }
  } catch (error) {
    console.error(error);
  }
}

// 모달 이벤트 리스너 추가
onMounted(() => {
  const modal = document.getElementById('addModal')
})
</script>

<style scoped>
.modal-body {
  max-height: 60vh;
  overflow-y: auto;
}

.input-group {
  margin-bottom: 20px;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}
</style>
