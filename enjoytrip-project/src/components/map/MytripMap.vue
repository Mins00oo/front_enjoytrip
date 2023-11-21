<script setup>
import { ref, onMounted } from 'vue'

const map = ref(null)
//let은 변환가능, const는 불가능
let mapContainer = ''

//list 불러오기
const props = defineProps({
    list: Array
})

//좌표 정보
var pos = props.list.map(item => {
    return {
        title: item.contentTitle,
        latlng: new kakao.maps.LatLng(item.latitude, item.longitude),
        latitude: item.latitude,
        longitude: item.longitude
    }
})

//중간점을 중심으로
const mapOption = {
    center: new window.kakao.maps.LatLng(33.450701, 126.570667),
    level: 10
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
    for (var i = 0; i < pos.length; i++) {
        //마커 객체
        let marker = new window.kakao.maps.Marker({
            title: pos[i].title,
            position: pos[i].latlng
        })
        marker.setMap(map.value)
    }
}

</script>

<template>
    <div id="map" style="width:100%;height:550px;"></div>
</template>
