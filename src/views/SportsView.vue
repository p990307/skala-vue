<script setup>
import SportsBoard from '../components/sports/SportsBoard.vue'
import KBOStandings from '../components/sports/KBOStandings.vue'
</script>

<template>
  <div class="sports-view">
    <header class="sports-header">
      <h2>⚾ KBO 실시간 스코어</h2>
      <p>⚠️ 아직 데모 데이터예요. 실제 KBO API 키가 준비되면 진짜 경기 데이터로 교체할 예정입니다.</p>
    </header>
    <SportsBoard />

    <header class="sports-header standings-header">
      <h2>🏆 KBO 순위</h2>
      <p>실제 순위 데이터를 옮겨왔어요.</p>
    </header>
    <KBOStandings />
  </div>
</template>

<style scoped>
.sports-view {
  max-width: 820px;
  margin: 0 auto;
}
.sports-header {
  margin-bottom: 16px;
}
.standings-header {
  margin-top: 32px;
}
.sports-header h2 {
  margin: 0 0 4px;
}
.sports-header p {
  margin: 0;
  color: #8b8fa3;
  font-size: 13px;
}
</style>
