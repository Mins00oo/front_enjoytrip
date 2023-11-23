<template>
  <div class="col-lg-3">
      <h1 class="h2 pb-4" style="font-weight: bold !important;">Categories</h1>
        <div v-for="category in categories" :key="category.id" class="category-box">
            <i :class="category.icon"></i>
            <a class="category" @click="TourCategory(category.id)">
            {{ category.name }}
            </a>
        </div>
    </div>
</template>

<script setup>
import { useTourStore } from '../../stores/tourStore'

const { tourStore, tourList } = useTourStore()

const categories = [
  { id: '', name: '전체', icon: 'fas fa-globe' },
  { id: '12', name: '관광지', icon: 'fas fa-archway' },
  { id: '14', name: '문화시설', icon: 'fas fa-synagogue' },
  { id: '15', name: '축제공연행사', icon: 'fas fa-theater-masks' },
  { id: '25', name: '여행코스', icon: 'fas fa-map' },
  { id: '28', name: '레포츠', icon: 'fas fa-running' },
  { id: '32', name: '숙박', icon: 'fas fa-bed' },
  { id: '38', name: '쇼핑', icon: 'fas fa-shopping-cart' },
  { id: '39', name: '음식점', icon: 'fas fa-utensils' }
]


const TourCategory = (category) => {
  tourStore.category = category
  tourStore.option = 'title'
  tourStore.how = 'asc'
  tourList()
  window.scroll(0, 0)
}
</script>

<style scoped>
@font-face {
    font-family: 'SUITE-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
}

* {
    font-family: 'SUITE-Regular';
}

i {
    font-family: 'Font Awesome 5 Free';
}

.templatemo-accordion {
    padding: 0;
  }
  
  .category-box {
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 8px;
    transition: background-color 0.3s;
  }
  
  .category-box:hover {
    background-color: #8bc34a; /* 초록색 */
  }

  .category-box i {
    margin-right: 10px;
  }
  
  .category {
    text-decoration: none;
    color: #333;
  }
  
  .category:hover {
    text-decoration: underline;
  }
</style>
