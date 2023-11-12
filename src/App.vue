<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/layouts/NavBar.vue'
import SearchModal from './components/search/SearchModal.vue'
import FooterBar from './components/layouts/FooterBar.vue'
import './assets/css/fontawesome.min.css'
import './assets/css/custom.css'
</script>

<template>
  <nav-bar></nav-bar>
  <search-modal></search-modal>
  <router-view></router-view>
  <footer-bar></footer-bar>
</template>

<style scoped></style>
