<template>
  <template>
    <div
      class="modal fade"
      id="userEditModal"
      tabindex="-1"
      aria-labelledby="userEditModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="userEditModalLabel">회원 정보 수정</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <!-- 여기에 폼 입력 필드 추가 -->
            <form>
              <div class="mb-3">
                <label for="userName" class="form-label">이름</label>
                <input type="text" class="form-control" id="userName" />
              </div>
              <div class="mb-3">
                <label for="userEmail" class="form-label">이메일</label>
                <input type="email" class="form-control" id="userEmail" />
              </div>
              <!-- 기타 필드 추가 -->
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
            <button type="button" class="btn btn-primary">저장</button>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>
