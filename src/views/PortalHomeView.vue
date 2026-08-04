<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useConfigStore } from '../stores/configStore'
import WeatherCard from '../components/exercise/WeatherCard.vue'
import SportsBoard from '../components/sports/SportsBoard.vue'

const configStore = useConfigStore()

const FALLBACK_WEATHER_LIST = [
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
]

const weatherList = ref([])
const isWeatherLoading = ref(true)
const lastSynced = ref('')

const fetchHeroWeather = async () => {
  isWeatherLoading.value = true
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'
  try {
    const [seoulRes, suwonRes, busanRes] = await Promise.all([
      axios.get(`${BASE_URL}?q=Seoul&appid=${API_KEY}&units=metric&lang=kr`),
      axios.get(`${BASE_URL}?q=Suwon&appid=${API_KEY}&units=metric&lang=kr`),
      axios.get(`${BASE_URL}?q=Busan&appid=${API_KEY}&units=metric&lang=kr`),
    ])
    weatherList.value = [
      { id: 'city_01', name: '서울', temp: seoulRes.data.main.temp, status: seoulRes.data.weather[0].description },
      { id: 'city_02', name: '수원', temp: suwonRes.data.main.temp, status: suwonRes.data.weather[0].description },
      { id: 'city_03', name: '부산', temp: busanRes.data.main.temp, status: busanRes.data.weather[0].description },
    ]
  } catch {
    weatherList.value = FALLBACK_WEATHER_LIST
  } finally {
    isWeatherLoading.value = false
    lastSynced.value = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
  }
}

const todayLabel = new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' })

const heroCity = computed(() => weatherList.value[0])
const displayHeroTemp = computed(() => {
  if (!heroCity.value) return null
  const raw = heroCity.value.temp
  return configStore.unit === 'fahrenheit' ? Math.round((raw * 9) / 5 + 32) : Math.round(raw)
})

onMounted(fetchHeroWeather)
</script>

<template>
  <div class="portal">
    <section class="hero">
      <div class="hero-text">
        <span class="hero-kicker">{{ todayLabel }}</span>
        <h1>날씨와 경기 스코어,<br />한 화면에서 확인하세요.</h1>
        <p>실시간 기상 데이터와 라이브 스코어를 이어서 보여주는 SKALA LIVE입니다.</p>
        <div class="hero-links">
          <RouterLink to="/weather-router" class="hero-btn primary">날씨 보러가기</RouterLink>
          <RouterLink to="/sports" class="hero-btn ghost">스포츠 보러가기</RouterLink>
        </div>
      </div>

      <div class="hero-widget">
        <template v-if="heroCity">
          <span class="hero-widget-name">{{ heroCity.name }}</span>
          <span class="hero-widget-temp">{{ displayHeroTemp }}{{ configStore.unitSymbol }}</span>
          <span class="hero-widget-status">{{ heroCity.status }}</span>
        </template>
        <span v-else class="hero-widget-status">불러오는 중...</span>
      </div>
    </section>

    <section class="ticker">
      <span class="ticker-item"><b>{{ heroCity?.name ?? '-' }}</b> {{ heroCity ? Math.round(heroCity.temp) + '°C' : '-' }}</span>
      <span class="ticker-item">진행중인 경기 <b>2</b>건</span>
      <span class="ticker-item">🏆 KBO 1위 <b>KT</b></span>
      <span class="ticker-item">단위 <b>{{ configStore.unit === 'celsius' ? '섭씨' : '화씨' }}</b></span>
      <span class="ticker-item">마지막 갱신 <b>{{ lastSynced || '-' }}</b></span>
    </section>

    <section class="columns">
      <div class="panel">
        <div class="panel-head">
          <h2>⚾ KBO 스코어</h2>
          <RouterLink to="/sports">전체 보기 →</RouterLink>
        </div>
        <SportsBoard compact />
      </div>

      <div class="panel">
        <div class="panel-head">
          <h2>🌤️ 지역별 날씨</h2>
          <RouterLink to="/weather-router">전체 보기 →</RouterLink>
        </div>
        <p v-if="isWeatherLoading" class="loading-text">불러오는 중...</p>
        <div v-else class="weather-list">
          <WeatherCard v-for="item in weatherList" :key="item.id" :city-item="item" />
        </div>
      </div>
    </section>

    <section class="quick-links">
      <h2>🗂️ 지금까지 만든 실습 모아보기</h2>
      <div class="quick-grid">
        <RouterLink to="/weather-mockup" class="quick-card">날씨 Mockup</RouterLink>
        <RouterLink to="/weather-composition" class="quick-card">날씨 컴포지션</RouterLink>
        <RouterLink to="/weather-component" class="quick-card">날씨 컴포넌트</RouterLink>
        <RouterLink to="/weather-router" class="quick-card">날씨 라우터</RouterLink>
        <RouterLink to="/practices" class="quick-card">실습 아카이브</RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.portal {
  max-width: 1320px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  padding: 56px 60px;
  border-radius: 28px;
  background: linear-gradient(135deg, #3f2b96, #7b5cf0 55%, #c084fc);
  color: #fff;
  box-shadow: 0 20px 40px rgba(63, 43, 150, 0.25);
}
.hero-kicker {
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
  opacity: 0.85;
  margin-bottom: 12px;
}
.hero-text h1 {
  margin: 0 0 16px;
  font-size: 44px;
  line-height: 1.25;
}
.hero-text p {
  margin: 0 0 24px;
  font-size: 16px;
  opacity: 0.9;
}
.hero-links {
  display: flex;
  gap: 10px;
}
.hero-btn {
  padding: 10px 18px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  transition: transform 0.15s ease;
}
.hero-btn:hover {
  transform: translateY(-2px);
}
.hero-btn.primary {
  background: #fff;
  color: #4a3fd6;
}
.hero-btn.ghost {
  border: 1px solid rgba(255, 255, 255, 0.6);
  color: #fff;
}

.hero-widget {
  min-width: 220px;
  padding: 24px 30px;
  background: rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(6px);
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}
.hero-widget-name {
  font-size: 13px;
  opacity: 0.85;
}
.hero-widget-temp {
  font-size: 48px;
  font-weight: 800;
}
.hero-widget-status {
  font-size: 13px;
  opacity: 0.9;
}

.ticker {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  padding: 14px 24px;
  background: #fff;
  border: 1px solid #ececf5;
  border-radius: 16px;
  font-size: 13px;
  color: #6b6f87;
}
.ticker-item b {
  color: #22213b;
}

.columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
@media (max-width: 720px) {
  .columns {
    grid-template-columns: 1fr;
  }
}
.panel {
  background: #fff;
  border: 1px solid #ececf5;
  border-radius: 18px;
  padding: 20px;
}
.panel-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 14px;
}
.panel-head h2 {
  margin: 0;
  font-size: 17px;
}
.panel-head a {
  font-size: 12px;
  color: #7b5cf0;
  text-decoration: none;
  font-weight: 700;
}
.loading-text {
  color: #8b8fa3;
  font-size: 13px;
}
.weather-list :deep(.weather-card) {
  margin-bottom: 8px;
}

.quick-links {
  background: #fff;
  border: 1px solid #ececf5;
  border-radius: 18px;
  padding: 20px;
}
.quick-links h2 {
  margin: 0 0 14px;
  font-size: 15px;
  color: #6b6f87;
}
.quick-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.quick-card {
  padding: 10px 16px;
  border-radius: 12px;
  background: #f5f4fd;
  color: #4a3fd6;
  font-weight: 700;
  font-size: 13px;
  text-decoration: none;
  transition:
    background 0.15s ease,
    transform 0.15s ease;
}
.quick-card:hover {
  background: #ece9fc;
  transform: translateY(-2px);
}
</style>
