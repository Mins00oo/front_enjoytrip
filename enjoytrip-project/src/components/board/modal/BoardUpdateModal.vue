<template>
  <div class="modal" tabindex="-1" id="updateModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">글 수정</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <!-- v-model 을 store 와 직접 연결하기 보다 computed-get-set 을 사용(strict mode 에서는 오류 발생) -->
            <!-- <input v-model="$store.state.board.title" type="text" class="form-control" placeholder="제목"> -->
            <input v-model="boardStore.title" type="text" class="form-control" placeholder="제목" />
          </div>
          <div class="mb-3">
            <!-- <div id="divEditorUpdate"></div> -->
            <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
          </div>
          <!-- 기존 파일 내용 보여줌  -->
        </div>
        <div class="modal-footer">
          <button
            @click="boardUpdate"
            class="btn btn-sm btn-primary btn-outline"
            data-dismiss="modal"
            type="button"
          >
            수정
          </button>
        </div>
        <!-- {{ editorData.value }} {{ boardStore.content }} {{ boardStore.title }} -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import http from '@/common/axios.js'

import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// import VueAlertify from 'vue-alertify';

import { useBoardStore } from '@/stores/boardStore'
const { boardStore } = useBoardStore()

const ckeditor = CKEditor.component
const editor = ClassicEditor
// 아래처럼 하면 안된다. editorData 가 empty 로 유지된다. 일단 공백으로 하고 onMounted 에서 bootstrap event 를 이용해서 show 될 때 store의 값으로 설정하도록
// const editorData = ref(boardStore.content)
const editorData = ref('')
// https://ckeditor.com/docs/ckeditor5/latest/installation/getting-started/configuration.html
const editorConfig = {}

const initUI = () => {
  editorData.value = boardStore.content
}

const boardUpdate = async () => {
  // post form data
  let boardObj = {
    boardId: boardStore.boardId,
    boardTitle: boardStore.title,
    boardContent: editorData.value
  }
  console.log(boardObj)

  let options = {
    headers: { 'Content-Type': 'application/json' }
  }

  try {
    let { data } = await http.put('/boards', boardObj, options)

    console.log('UpdateModalVue: data : ')
    console.log(data)
    if (data.result == 'login') {
      doLogout()
    } else {
      // $alertify.success("글이 수정되었습니다.");
      alert('글이 수정되었습니다.')
      closeModal()
    }
  } catch (error) {
    console.log('UpdateModalVue: error ')
    console.log(error)
  }
}

const emit = defineEmits(['call-parent-update'])
const closeModal = () => emit('call-parent-update')

// logout 처리 별도 method
const doLogout = () => {
  setLogout({
    isLogin: false,
    userNickName: '',
    userId: '',
    userEmail: ''
  })
  router.push('/login')
}

onMounted(() => {
  // bootstrap modal show event hook
  // UpdateModal 이 보일 때 초기화
  const thisModal = document.getElementById('updateModal')
  thisModal.addEventListener('show.bs.modal', function () {
    initUI()
  })
})
</script>

<style scoped>
.modal:deep(.ck-editor__editable) {
  min-height: 300px !important;
}

.modal:deep(.thumbnail-wrapper) {
  margin-top: 5px;
}

.modal:deep(.thumbnail-wrapper img) {
  width: 100px !important;
  margin-right: 5px;
  max-width: 100%;
}
</style>
