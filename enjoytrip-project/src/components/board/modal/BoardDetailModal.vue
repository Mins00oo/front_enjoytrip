<template>
  <div class="modal fade" id="detailModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">글 상세</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <table class="table">
            <tbody>
              <tr>
                <td>글번호</td>
                <td id="boardIdDetail">{{ props.boardId }}</td>
              </tr>
              <tr>
                <td>제목</td>
                <td id="titleDetail">{{ props.boardTitle }}</td>
              </tr>
              <tr>
                <td>내용</td>
                <td id="contentDetail">{{ props.boardContent }}</td>
              </tr>
              <tr>
                <td>작성자</td>
                <td id="userNameDetail">{{ props.userNickname }}</td>
              </tr>
              <tr>
                <td>작성일시</td>
                <td id="regDtDetail">{{ props.boardDate }}</td>
              </tr>
            </tbody>
          </table>
          <BoardUpdateModal></BoardUpdateModal>
          <button
            id="btnBoardUpdateUI"
            class="btn btn-sm btn-primary btn-outline"
            data-bs-dismiss="modal"
            type="button"
            @click="showUpdateBoardModal()"
          >
            글 수정하기
          </button>
          &nbsp;
          <button
            id="btnBoardDeleteUI"
            class="btn btn-sm btn-warning btn-outline"
            data-bs-dismiss="modal"
            type="button"
            @click="deleteBoard(props.boardId)"
          >
            글 삭제하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, watch, onMounted } from 'vue'
import BoardUpdateModal from './BoardUpdateModal.vue'
import { Modal } from 'bootstrap'
import http from '@/common/axios.js'
import { useRouter } from 'vue-router'

let updateModal = null

onMounted(() => {
  updateModal = new Modal(document.getElementById('updateModal'))
})

const router = useRouter()
const props = defineProps({
  boardId: Number,
  boardTitle: String,
  boardContent: String,
  userId: Number,
  userNickname: String,
  boardDate: String
})

const deleteBoard = async (boardId) => {
  try {
    await http.delete(`http://localhost:8080/boards/${boardId}`)
    router.push('/board')
  } catch (error) {
    console.error('게시글을 삭제하는데 실패했습니다.', error)
  }
}

const showUpdateBoardModal = () => updateModal.show()
</script>
