<template>
  <div class="modal" tabindex="-1" id="detailModal">
    <div class="modal-dialog">
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
          <table class="table table-hover">
            <tbody>
              <tr>
                <td width="20%">글번호</td>
                <td>{{ boardStore.boardId }}</td>
              </tr>
              <tr>
                <td>제목</td>
                <td>{{ boardStore.title }}</td>
              </tr>
              <tr>
                <td>내용</td>
                <td v-html="boardStore.content"></td>
              </tr>
              <tr>
                <td>작성자</td>
                <td>{{ boardStore.userName }}</td>
              </tr>
              <!-- 아래 코드는 오류 발생 초기 생성 시점에 regDt = {} -->
              <!-- <tr><td>작성일시</td><td>{{ makeDateStr(regDt.date.year, regDt.date.month, regDt.date.day, '.') }}</td></tr> -->
              <tr>
                <td>작성일시</td>
                <td>{{ boardStore.regDate }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button
            v-show="boardStore.sameUser"
            @click="changeToUpdate"
            class="btn btn-sm btn-primary btn-outline"
            data-dismiss="modal"
            type="button"
          >
            글 수정하기
          </button>
          <button
            v-show="boardStore.sameUser"
            @click="changeToDelete"
            class="btn btn-sm btn-warning btn-outline"
            data-dismiss="modal"
            type="button"
          >
            글 삭제하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBoardStore } from '@/stores/boardStore'

const { boardStore } = useBoardStore()

const emit = defineEmits(['call-parent-change-to-update', 'call-parent-change-to-delete'])
const changeToUpdate = () => emit('call-parent-change-to-update')
const changeToDelete = () => emit('call-parent-change-to-delete')
</script>

<style></style>
