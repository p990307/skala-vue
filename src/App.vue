<script setup>
import UnitToggler from './components/exercise/UnitToggler.vue'
</script>

<template>
  <nav class="exercise-nav">
    <RouterLink to="/">홈</RouterLink>
    <RouterLink to="/sports">스포츠</RouterLink>
    <RouterLink to="/weather-mockup">날씨 Mockup</RouterLink>
    <RouterLink to="/weather-composition">날씨 컴포지션</RouterLink>
    <RouterLink to="/weather-component">날씨 컴포넌트</RouterLink>
    <RouterLink to="/weather-router">날씨 라우터</RouterLink>
    <RouterLink to="/weather-router/about">날씨 소개</RouterLink>
    <RouterLink to="/practices">실습 아카이브</RouterLink>
    <UnitToggler />
  </nav>

  <RouterView />
</template>

<style>
@import '@/assets/exercise.css';
</style>
