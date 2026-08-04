<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  // 포털 홈 미리보기에서는 3경기만, /sports 전체 페이지에서는 전부 표시
  compact: { type: Boolean, default: false },
})

const SPORT_ICON = { baseball: '⚾' }
const STATUS_META = {
  진행중: { key: 'live', label: '🔴 LIVE' },
  예정: { key: 'upcoming', label: '예정' },
  종료: { key: 'ended', label: '종료' },
}

// ⚠️ 아직 실제 KBO API 연동 전 — 진행중 경기만 자동으로 점수가 살짝 오르는 데모 데이터
const matches = ref([
  { id: 'm1', sport: 'baseball', league: 'KBO', teamA: 'SKALA 타이거즈', teamB: '수원 이글스', scoreA: 3, scoreB: 3, status: '진행중', clock: '7회말' },
  { id: 'm2', sport: 'baseball', league: 'KBO', teamA: '서울 히어로즈', teamB: '부산 자이언츠', scoreA: 2, scoreB: 5, status: '진행중', clock: '5회초' },
  { id: 'm3', sport: 'baseball', league: 'KBO', teamA: '대전 이글스', teamB: '광주 타이거즈', scoreA: 4, scoreB: 1, status: '종료', clock: 'FINAL' },
  { id: 'm4', sport: 'baseball', league: 'KBO', teamA: '인천 와이번스', teamB: '창원 다이노스', scoreA: 0, scoreB: 0, status: '예정', clock: '18:30' },
])

// 🔴 진행중인 경기만 몇 초마다 점수가 살짝 오르는 실시간 시뮬레이션 (Lifecycle Hook 실전 적용)
let timerId = null
onMounted(() => {
  timerId = setInterval(() => {
    matches.value.forEach((m) => {
      if (m.status === '진행중' && Math.random() < 0.35) {
        if (Math.random() < 0.5) m.scoreA++
        else m.scoreB++
      }
    })
  }, 4000)
})
onUnmounted(() => clearInterval(timerId))
</script>

<template>
  <div class="sports-board">
    <div v-for="m in compact ? matches.slice(0, 3) : matches" :key="m.id" class="match-card" :class="`is-${STATUS_META[m.status].key}`">
      <div class="match-meta">
        <span class="sport-icon">{{ SPORT_ICON[m.sport] }}</span>
        <span class="league">{{ m.league }}</span>
        <span class="status-badge" :class="`badge-${STATUS_META[m.status].key}`">{{ STATUS_META[m.status].label }}</span>
      </div>
      <div class="match-score">
        <span class="team">{{ m.teamA }}</span>
        <span class="score">{{ m.scoreA }} : {{ m.scoreB }}</span>
        <span class="team team-away">{{ m.teamB }}</span>
      </div>
      <div class="match-clock">{{ m.clock }}</div>
    </div>
  </div>
</template>

<style scoped>
.sports-board {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.match-card {
  border: 1px solid #ececf5;
  border-radius: 12px;
  padding: 14px 16px;
  background: #fff;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}
.match-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(45, 34, 110, 0.08);
}
.match-card.is-live {
  border-color: #ffd4c2;
  background: linear-gradient(135deg, #fff9f6, #fff);
}
.match-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 12px;
  color: #8b8fa3;
}
.sport-icon {
  font-size: 15px;
}
.league {
  font-weight: 700;
  color: #5b5f78;
}
.status-badge {
  margin-left: auto;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
}
.badge-live {
  background: #ffe4d6;
  color: #e0602a;
}
.badge-upcoming {
  background: #eceefc;
  color: #5b5fc7;
}
.badge-ended {
  background: #eef0f4;
  color: #8b8fa3;
}
.match-score {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-weight: 700;
  color: #22213b;
}
.team {
  flex: 1;
  font-size: 14px;
}
.team-away {
  text-align: right;
}
.score {
  font-size: 18px;
  letter-spacing: 0.5px;
  color: #4a3fd6;
}
.match-clock {
  margin-top: 6px;
  font-size: 11px;
  color: #b0b3c4;
  text-align: right;
}
</style>
