<template>
  <div class="container mt-2">
    <input type="text" v-model="title" placeholder="제목을 입력하세요" class="title-input" />
    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
    <input type="file" @change="handleFileUpload" />
    <button type="button" class="btn btn-primary mt-2" @click="sendTellMe">Send</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useRouter } from 'vue-router'

const router = useRouter()
const ckeditor = CKEditor.component
const editor = ClassicEditor
const title = ref('') // 글 제목을 위한 ref
const editorData = ref('')
const editorConfig = {
  removePlugins: ['Heading', 'Link', 'CKFinder'],
  toolbar: [
    'bold',
    'italic',
    'bulletedList',
    'numberedList',
    'blockQuote',
    'Heading',
    'Link',
    'CKFinder'
  ]
}
const file = ref(null)

const handleFileUpload = (event) => {
  file.value = event.target.files[0] // 파일 객체 저장
}

const sendTellMe = async () => {
  if (!title.value.trim() || !editorData.value.trim()) {
    alert('제목과 내용은 필수입니다.')
    return
  }

  try {
    let formData = new FormData()

    // 객체를 JSON 문자열로 변환하여 추가
    const boardRequestDto = JSON.stringify({
      userId: 1, // 사용자 ID
      boardTitle: title.value,
      boardContent: '테스트용'
    })

    formData.append('dto', new Blob([boardRequestDto], { type: 'application/json' }))

    // 이미지 추가
    if (file.value) {
      formData.append('boardImg', file.value)
    }

    console.log(boardRequestDto)

    const response = await axios.post('http://localhost:8080/boards', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    console.log(response.data)
    alert('글이 성공적으로 전송되었습니다.')
    router.push('/board') // 리다이렉트
  } catch (error) {
    console.error('전송 중 에러가 발생했습니다.', error)
    alert('전송에 실패했습니다.')
  }
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

.title-input {
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}
</style>
