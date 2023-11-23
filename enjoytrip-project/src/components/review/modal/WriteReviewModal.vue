<template>
    <div class="modal" tabindex="-1" id="writeReview">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">리뷰 쓰기</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <input v-model="score" type="number" class="form-control" placeholder="별점" />
                    </div>
                    <div class="mb-3">
                        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
                    </div>
                </div>
                <div class="modal-footer">
                    <button @click="add" class="btn btn-sm btn-primary btn-outline" data-dismiss="modal"
                        type="button">
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
import { useReviewStore } from "../../../stores/reivewStore";
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const store = useReviewStore()
const score = ref()
const ckeditor = CKEditor.component
const editor = ClassicEditor
const editorData = ref('')

onMounted(() => {
  initUI()
})

const initUI = () => {
  editorData.value = ''
}

const setContent = () => {
    editorData.value = editorData.value.replace('</p>', '')
    editorData.value = editorData.value.replace('<p>','')
}

const add = async () => {
    if (score.value == 0) {
        alert('별점을 입력해주세요!')
        return
    }
    setContent()
    const params = {
        contentId: store.reviewStore.contentId,
        score: score.value,
        content: editorData.value
    }
    try {
        let { data } = await http.post("/tours/reviews", params);
        store.reviewList()
        console.log('등록', data)
        if (data.message == undefined) {
            alert('후기 등록에 성공했습니다!')
        }
        else {
            alert(data.message)
        }
    } catch (error) {
        console.error(error);
    }
}

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
  