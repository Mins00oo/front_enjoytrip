<template>
  <div class="modal" tabindex="-1" id="insertModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">글 쓰기</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <input v-model="title" type="text" class="form-control" placeholder="제목" />
          </div>
          <div class="mb-3">
            <!-- <div id=divEditorInsert></div> -->
            <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
          </div>
        </div>
        <div class="modal-footer">
          <button
            @click="boardInsert"
            class="btn btn-sm btn-primary btn-outline"
            data-dismiss="modal"
            type="button"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import http from '@/common/axios.js'

import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import VueAlertify from 'vue-alertify'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/userStore'
const { authStore, setLogout } = useAuthStore()

const router = useRouter()
const ckeditor = CKEditor.component
const editor = ClassicEditor
const editorData = ref('')
const editorConfig = {}

const title = ref('')

onMounted(() => {
  // console.log( document.querySelector("#inputFileUploadInsert") )
  initUI()
})

const initUI = () => {
  title.value = ''
  editorData.value = ''
}

// 굳이 actions 에 있을 필요 없다. backend async 작업이지만, 그 결과로 store 를 변경하는 내용이 없다.
const boardInsert = async () => {
  let boardObj = {
    boardTitle: title.value,
    boardContent: editorData.value
  }
  console.log(boardObj)

  let options = {
    headers: { 'Content-Type': 'application/json' }
  }

  try {
    let { data } = await http.post('/boards', boardObj, options)

    console.log('InsertModalVue: data : ')
    console.log('aaa', data)
    if (data.result == 'login') {
      closeModal()
      doLogout()
    } else {
      // this.$alertify.success('글이 등록되었습니다.');
      closeModal()
    }
  } catch (error) {
    console.log('InsertModalVue: error ')
    console.log(error)
  }
}

const emit = defineEmits(['call-parent-insert'])
const closeModal = () => emit('call-parent-insert')

// logout 처리 별도 method
const doLogout = () => {
  setLogout({
    isLogin: false,
    userNickName: '',
    userId: '',
    userEmail: '',
    userName: '',
    userPassword: ''
  })
  router.push('/login')
}

onMounted(() => {
  // bootstrap modal show event hook
  // UpdateModal 이 보일 때 초기화
  const thisModal = document.getElementById('insertModal')
  thisModal.addEventListener('show.bs.modal', function () {
    initUI()
  })
})
</script>

<style scoped>
@font-face {
  font-family: 'SUITE-Regular';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Regular.woff2')
    format('woff2');
  font-weight: 400;
  font-style: normal;
}

* {
  font-family: 'SUITE-Regular';
}

i {
  font-family: 'Font Awesome 5 Free';
}

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
