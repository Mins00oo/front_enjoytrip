<template>
  <section class="bg-light">
    <div class="container pb-5">
      <div class="row">
        <div class="col-lg-5 mt-5">
          <div class="card mb-3">
            <img
              class="card-img img-fluid"
              :src="tourStore.firstImage"
              alt="Card image cap"
              id="product-detail"
            />
          </div>
        </div>
        <!-- col end -->
        <div class="col-lg-7 mt-5">
          <div class="card">
            <div class="card-body">
              <h1 class="h2">{{ tourStore.title }}</h1>
              <p class="py-2">
                <i class="fa fa-star text-warning"></i>
                <i class="fa fa-star text-warning"></i>
                <i class="fa fa-star text-warning"></i>
                <i class="fa fa-star text-warning"></i>
                <i class="fa fa-star text-secondary"></i>
                <span class="list-inline-item text-dark"
                  >Rating {{ tourStore.avgScore }} | 조회수 {{ tourStore.readCount }}</span
                >
              </p>
              <ul class="list-inline">
                <li class="list-inline-item">
                  <h6>위치:</h6>
                </li>
                <li class="list-inline-item">
                  <p class="text-muted">
                    <strong>{{ tourStore.addr1 }}</strong>
                  </p>
                </li>
              </ul>

              <h6>Description:</h6>
              <p>
                {{ tourStore.overview }}
              </p>

              <form action="" method="GET">
                <input type="hidden" name="product-title" value="Activewear" />

                <div class="row pb-3">
                  <div class="col d-grid">
                    <button type="submit" class="btn btn-success btn-lg" name="submit" value="buy">
                      마이트립 추가
                    </button>
                  </div>
                  <div class="col d-grid">
                    <button
                      type="submit"
                      class="btn btn-success btn-lg"
                      name="submit"
                      value="addtocard"
                    >
                      즐겨찾기
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <!-- col end -->
        <!-- map -->
        <kakao-map></kakao-map>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useTourStore } from '../../stores/tourStore'
import KakaoMap from "../map/KakaoMap.vue";

const { tourStore } = useTourStore()
</script>
