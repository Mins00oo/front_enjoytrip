<template>
  <footer class="bg-dark" id="tempaltemo_footer">
    <div class="container">
      <div class="row">
        <div class="col-md-4 pt-5">
          <h2 class="h2 text-success border-bottom pb-3 border-light logo">Avokado</h2>
          <ul class="list-unstyled text-light footer-link-list">
            <li>
              <i class="fas fa-map-marker-alt fa-fw"></i>
              Avokado
            </li>
            <li>
              <font-awesome-icon :icon="['fas', 'users']" class="icon-large" />
              정라엘 & 강민수
            </li>
          </ul>
        </div>

        <div class="col-md-4 pt-5">
          <h2 class="h2 text-light border-bottom pb-3 border-light">All Services</h2>
          <ul class="list-unstyled text-light footer-link-list">
            <li><a class="text-decoration-none" href="#">관광지 전체 조회</a></li>
            <li><a class="text-decoration-none" href="#">관광지 검색</a></li>
            <li><a class="text-decoration-none" href="#">카테고리별 관광지 분류</a></li>
          </ul>
        </div>

        <div class="col-md-4 pt-5">
          <h2 class="h2 text-light border-bottom pb-3 border-light">User Services</h2>
          <ul class="list-unstyled text-light footer-link-list">
            <li><a class="text-decoration-none" href="#">게시판 글 작성</a></li>
            <li><a class="text-decoration-none" href="#">후기 작성</a></li>
            <li><a class="text-decoration-none" href="#">나의 여행 일정 생성 & 공유</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
