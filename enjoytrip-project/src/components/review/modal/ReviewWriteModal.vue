<template>
  <div class="modal" tabindex="-1" id="insertModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">리뷰 작성</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <input v-model="score" type="number" class="form-control" placeholder="점수" />
          </div>
          <div class="mb-3">
            <!-- <div id=divEditorInsert></div> -->
            <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
          </div>
        </div>
        <div class="modal-footer">
          <button
            @click="reviewInsert"
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
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/userStore'
const { authStore, setLogout } = useAuthStore()

const router = useRouter()
const ckeditor = CKEditor.component
const editor = ClassicEditor
const editorData = ref('')
const editorConfig = {}

const props = defineProps({
  contentId: Number
})

const score = ref(0)

onMounted(() => {
  // console.log( document.querySelector("#inputFileUploadInsert") )
  initUI()
})

const initUI = () => {
  title.value = ''
  score.value = 0
  editorData.value = ''
}

// 굳이 actions 에 있을 필요 없다. backend async 작업이지만, 그 결과로 store 를 변경하는 내용이 없다.
const reviewInsert = async () => {
  let reviewObj = {
    contentId: props.contentId,
    content: editorData.value,
    score: score.value
  }
  console.log(reviewObj)

  try {
    let { data } = await http.post('/tours/reviews', reviewObj)

    console.log('InsertModalVue: data : ')
    console.log('aaa', data)
    if (data.result == 'login') {
      closeModal()
      doLogout()
    } else {
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
    userEmail: ''
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
