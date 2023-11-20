<script setup>
import { ref, onMounted } from 'vue'
import { useTourStore } from "../../stores/tourStore";
//import { useMapStore } from "../../stores/mapStore";
const { tourStore } = useTourStore()
//const { getMapDetail } = useMapStore()

const map = ref(null)
//let은 변환가능, const는 불가능
let mapContainer = ''
//위치 정보
console.log(tourStore.contentId);
//const data = getMapDetail(tourStore.contentId);

//좌표 정보
const pos = {
  title: tourStore.title,
  lat : tourStore.latitude,
  lng : tourStore.longitude
}
console.log(pos);

const mapOption = {
  center: new window.kakao.maps.LatLng(pos.lat, pos.lng),
  level: 4
}

//위치 객체
const markerPosition = new window.kakao.maps.LatLng(pos.lat, pos.lng)
//마커 객체
let marker = new window.kakao.maps.Marker({
  title: pos.title,
  position: markerPosition
})

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

function loadMaker() {
  marker.setMap(map.value)
}

</script>

<template>
  <div id="map" style="width:100%;height:350px;"></div>
</template>
