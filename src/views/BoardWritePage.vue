<template>
  <div class="container mt-2">
    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
    <button type="button" class="btn btn-primary mt-2" @click="sendTellMe">Send</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
const ckeditor = CKEditor.component
const editor = ClassicEditor
const editorData = ref('<p>Content of Editor</p>')
const editorConfig = {}

const sendTellMe = () => {
  alert(editorData.value)
}
</script>

<style scoped>
/* CKEditor 컨테이너 스타일링 */
.container {
  max-width: 800px; /* 적절한 최대 너비 설정 */
  margin: auto; /* 중앙 정렬 */
}

/* CKEditor 편집 가능 영역 스타일링 */
.container:deep(.ck-editor__editable) {
  height: 400px;
  padding: 1rem; /* 내부 여백 추가 */
  border: 1px solid #ced4da; /* 테두리 스타일링 */
  border-radius: 0.25rem; /* 모서리 둥글게 */
  background-color: #fefefe; /* 배경색 변경 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */
  font-family: 'Helvetica', 'Arial', sans-serif; /* 폰트 스타일 변경 */
}

/* Send 버튼 스타일링 */
.btn-primary {
  font-size: 1rem; /* 폰트 크기 조정 */
  padding: 0.5rem 1rem; /* 패딩 조정 */
  border-radius: 0.25rem; /* 모서리 둥글게 */
}

.btn-primary:hover {
  background-color: #0056b3; /* 호버 시 배경색 변경 */
  border-color: #004085; /* 호버 시 테두리 색상 변경 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 호버 시 그림자 효과 추가 */
}
</style>
