<script setup>
import { ref, onMounted, watch } from 'vue'
import { useTourStore } from '../../stores/tourStore'
//import { useMapStore } from "../../stores/mapStore";
const { tourStore, tourDetail } = useTourStore()
//const { getMapDetail } = useMapStore()

const map = ref(null)
const center = ref('')
//let은 변환가능, const는 불가능
let mapContainer = ''
//위치 정보
const props = defineProps({
  contentId: String,
  latitude: Number,
  longitude: Number
})

//const data = getMapDetail(tourStore.contentId);

//좌표 정보
const pos = {
  title: tourStore.title,
  lat: props.latitude,
  lng: props.longitude
}

const mapOption = {
  center: new window.kakao.maps.LatLng(33.450701, 126.570667),
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

  //사이즈 변경 시 맵의 중심좌표 유지
  center.value = map.value.getCenter()
})

watch(
  () => props.latitude,
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
  var LatLng = new window.kakao.maps.LatLng(props.latitude, props.longitude)
  map.value.setCenter(LatLng)
  center.value = map.value.getCenter()
  //마커 객체
  let markerPosition = LatLng
  marker = new window.kakao.maps.Marker({
    position: markerPosition
  })
  loadMaker()
}

function loadMaker() {
  marker.setMap(map.value)
}
</script>

<template>
  <div id="map" style="width: 100%; height: 350px"></div>
</template>
