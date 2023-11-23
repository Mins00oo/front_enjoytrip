<template>
  <div>
    <!-- 검색 바 -->
    <div class="input-group mb-3">
      <input type="text" v-model="store.tourStore.searchWord" class="form-control form-control-lg"
        placeholder="Search Here" />
      <button @click="search" type="button" class="input-group-text btn-success">
        <i class="fas fa-search"></i> Search
      </button>
    </div>
    <button @click="setBound"><i class="fas fa-map-marker-alt"></i> 마커 한눈에 보기</button>
    <button @click="showShareModal"><i class="fas fa-user-plus"></i> 친구 추가하기</button>  
    <div class="container mt-3 mb-3">
      <div id="map" class="map"></div>
      <div class="sidebar">
        <h3 style="font-weight: bold; margin-left: 10px;">List</h3>
        <!-- 현재 관광지 표시하기 -->
          <div v-for="(p, index) in mStore.mytripStore.list" :key="index" class="item">
            <div v-if="p.contentId !== 0">
              {{ p.contentTitle }}
              <i @click="deleteTour(p.contentId)" class="fas fa-trash trash"></i>
            </div>
            <div v-if="p.contentId === 0">
              관광지를 추가해주세요!
            </div>
          </div>
      </div>
    </div>
    <ShareModal></ShareModal>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useTourStore } from '../../stores/tourStore'
import { useMytripStore } from '../../stores/mytripStore'
import ShareModal from '@/components/mytrip/modal/ShareModal.vue'
import { Modal } from 'bootstrap'

const store = useTourStore()
const mStore = useMytripStore()

let shareModal = null

onMounted(() => {
  shareModal = new Modal(document.getElementById('shareModal'))
})

const showShareModal = () => shareModal.show()

//검색
const search = () => {
  store.tourStore.limit = 10;
  console.log('검색', store.tourStore.searchWord)
  store.tourSearchList()
}

//삭제
const deleteTour = (contentId) => {
  mStore.deleteTour(contentId)
}

const map = ref(null)
//let은 변환가능, const는 불가능
let mapContainer = ''

//중간점을 중심으로
const mapOption = {
  center: new window.kakao.maps.LatLng(33.450701, 126.570667),
  level: 4
}

//onMounted되야 가상돔을 다 들고온다.
onMounted(() => {
  mapContainer = document.getElementById('map')
  if (window.kakao && window.kakao.maps) {
    console.log('load Map')
    loadMap()
  } else {
    console.log('load Script')
    loadScript()
  }
})

watch(
  () => mStore.mytripStore.len,
  (newVal, oldVal) => {
    console.log(newVal)

    if (window.kakao && window.kakao.maps) {
      console.log('load Map')
      loadMap()
    } else {
      console.log('load Script')
      loadScript()
    }
  }
)

function loadScript() {
  const script = document.createElement('script')
  script.src =
    '//dapi.kakao.com/v2/maps/sdk.js?appkey=8c9c48c691ae8f2d69dd2fe0c560fbd0&libraries=services'
  script.onload = () => window.kakao.maps.load(loadMap)
  document.head.appendChild(script)
}

function loadMap() {
  map.value = new window.kakao.maps.Map(mapContainer, mapOption)
  loadMaker()
}

// 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
let bounds = new kakao.maps.LatLngBounds()

function loadMaker() {
  bounds = new kakao.maps.LatLngBounds()
  for (var i = 0; i < mStore.mytripStore.len; i++) {
    //마커 객체
    let marker = new window.kakao.maps.Marker({
      title: mStore.mytripStore.list[i].title,
      position: new kakao.maps.LatLng(
        mStore.mytripStore.list[i].latitude,
        mStore.mytripStore.list[i].longitude
      )
    })
    marker.setMap(map.value)
    // LatLngBounds 객체에 좌표를 추가합니다
    bounds.extend(
      new kakao.maps.LatLng(
        mStore.mytripStore.list[i].latitude,
        mStore.mytripStore.list[i].longitude
      )
    )
  }
  setBound()
}

function setBound() {
  // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
  // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다
  map.value.setBounds(bounds)
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

button {
  margin-left: 13px;
  padding: 5px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 2px solid #FF3366;
  background-color: #fbedf2; 
}

i {
    font-family: 'Font Awesome 5 Free';
}
.map {
  width: 70%;
  /* 맵의 너비를 조절하세요 */
  height: 550px;
  float: left;
  /* 맵을 왼쪽에 배치합니다 */
  border-radius: 8px;
  border: 2px solid #198754;
}

.sidebar {
  width: 30%;
  /* 사이드바의 너비를 조절하세요 */
  height: 550px;
  overflow: auto;
  /* 내용이 높이를 초과할 경우 스크롤바를 추가합니다 */
  box-sizing: border-box;
  /* 너비에 패딩과 테두리를 포함합니다 */
  padding: 10px;
  /* 사이드바 내용에 패딩을 추가합니다 */
}

.item {
  margin: 5px;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 2px solid #FF3366;
  background-color: #fbedf2; 
}

.trash {
  float: right;
  margin-top: 3px;
}


</style>
