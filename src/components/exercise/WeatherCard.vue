<script setup>
import { computed } from 'vue'
import { useConfigStore } from '../../stores/configStore'

// 1. 상위로부터 단방향 주입받을 객체 데이터 규격 검수 (매크로)
const props = defineProps({
  cityItem: {
    type: Object,
    required: true,
  },
})

// 2. 상위로 송신할 두 가지 경로의 커스텀 이벤트 식별자 등록 (매크로)
const emit = defineEmits(['select-card', 'click-detail'])

const configStore = useConfigStore()
// [191p 핵심 미션] 스토어의 상태값이 'fahrenheit'일 때만 화씨 공식 적용 연산
// 실제 API는 소수점 온도를 주므로 두 단위 모두 반올림해서 표시
const displayTemp = computed(() => {
  const rawTemp = props.cityItem.temp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return Math.round(rawTemp)
})

// 3. [튜닝] 날씨 상태별 아이콘 + 배경 그라데이션 테마
// Mock 데이터("맑음")뿐 아니라 실제 API 설명문("약간의 구름이 낀 하늘")도 매칭되도록 포함 여부로 판정
const WEATHER_THEMES = [
  { keywords: ['눈'], icon: '❄️', gradient: 'linear-gradient(135deg, #eef6ff, #d6e9ff)' },
  { keywords: ['비', '소나기', '이슬비'], icon: '🌧️', gradient: 'linear-gradient(135deg, #e3f2fd, #a8c8e8)' },
  { keywords: ['맑'], icon: '☀️', gradient: 'linear-gradient(135deg, #fff8e1, #ffd97a)' },
  { keywords: ['구름', '흐림'], icon: '☁️', gradient: 'linear-gradient(135deg, #f5f6f7, #cfd8dc)' },
]
const DEFAULT_THEME = { icon: '🌈', gradient: 'linear-gradient(135deg, #f1f2f6, #dcdde1)' }

const theme = computed(() => {
  const status = props.cityItem.status
  const matched = WEATHER_THEMES.find((t) => t.keywords.some((k) => status.includes(k)))
  return matched ?? DEFAULT_THEME
})
</script>

<template>
  <div
    class="weather-card"
    :style="{ background: theme.gradient }"
    @click="emit('select-card', `${cityItem.name}이 선택되었습니다.`)"
  >
    <span class="weather-icon">{{ theme.icon }}</span>
    <h4>{{ cityItem.name }} ({{ cityItem.status }})</h4>
    <p>현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>

    <span v-if="cityItem.temp >= 25" class="badge hot">🔥 더움</span>
    <span v-else class="badge cool">❄️ 선선함</span>

    <button class="btn-detail" @click.stop="emit('click-detail', cityItem.name, cityItem.status)">
      상세보기
    </button>
  </div>
</template>

<style scoped>
.weather-card {
  border: 1px solid #dee2e6;
  padding: 12px 12px 12px 56px;
  margin-bottom: 10px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}
.weather-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
}
.weather-icon {
  position: absolute;
  left: 12px;
  top: 12px;
  font-size: 28px;
  line-height: 1;
}
.badge {
  display: inline-block;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
  color: #fff;
}
.hot {
  background-color: #ff7675;
}
.cool {
  background-color: #74b9ff;
}
.btn-detail {
  position: absolute;
  right: 12px;
  top: 15px;
  padding: 6px 10px;
  cursor: pointer;
}
</style>
