<script setup>
// 2026 KBO 정규리그 순위 (네이버 스포츠 캡처 기준 스냅샷 — 수동 업데이트)
const UPDATED_AT = '2026-08-04 기준'

const standings = [
  { rank: 1, team: 'KT', games: 97, win: 59, draw: 2, loss: 36, pct: '0.621', gb: '0.0', streak: '6승', last10: '8승 1패 1무' },
  { rank: 2, team: '삼성', games: 99, win: 59, draw: 2, loss: 38, pct: '0.608', gb: '1.0', streak: '1패', last10: '5승 5패 0무' },
  { rank: 3, team: 'LG', games: 100, win: 55, draw: 1, loss: 44, pct: '0.556', gb: '6.0', streak: '2패', last10: '3승 6패 1무' },
  { rank: 4, team: '두산', games: 101, win: 52, draw: 4, loss: 45, pct: '0.536', gb: '8.0', streak: '3승', last10: '5승 3패 2무' },
  { rank: 5, team: 'KIA', games: 100, win: 52, draw: 2, loss: 46, pct: '0.531', gb: '8.5', streak: '1패', last10: '4승 6패 0무' },
  { rank: 6, team: '한화', games: 98, win: 46, draw: 3, loss: 49, pct: '0.484', gb: '13.0', streak: '3패', last10: '5승 5패 0무' },
  { rank: 7, team: 'NC', games: 95, win: 43, draw: 2, loss: 50, pct: '0.462', gb: '15.0', streak: '1승', last10: '3승 6패 1무' },
  { rank: 8, team: '롯데', games: 99, win: 43, draw: 2, loss: 54, pct: '0.443', gb: '17.0', streak: '1승', last10: '3승 7패 0무' },
  { rank: 9, team: 'SSG', games: 102, win: 38, draw: 4, loss: 60, pct: '0.388', gb: '22.5', streak: '1패', last10: '5승 4패 1무' },
  { rank: 10, team: '키움', games: 103, win: 38, draw: 2, loss: 63, pct: '0.376', gb: '24.0', streak: '1승', last10: '5승 5패 0무' },
]
</script>

<template>
  <div class="standings-panel">
    <div class="standings-caption">🏆 2026 KBO 정규리그 순위 · {{ UPDATED_AT }}</div>
    <div class="table-scroll">
      <table>
        <thead>
          <tr>
            <th>순위</th>
            <th class="team-col">팀명</th>
            <th>경기</th>
            <th>승</th>
            <th>무</th>
            <th>패</th>
            <th>승률</th>
            <th>게임차</th>
            <th>연속</th>
            <th>최근10경기</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in standings" :key="t.rank" :class="{ podium: t.rank <= 3 }">
            <td class="rank-cell">{{ t.rank }}</td>
            <td class="team-col team-name">{{ t.team }}</td>
            <td>{{ t.games }}</td>
            <td>{{ t.win }}</td>
            <td>{{ t.draw }}</td>
            <td>{{ t.loss }}</td>
            <td>{{ t.pct }}</td>
            <td>{{ t.gb }}</td>
            <td>{{ t.streak }}</td>
            <td>{{ t.last10 }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.standings-panel {
  background: #fff;
  border: 1px solid #ececf5;
  border-radius: 14px;
  padding: 16px;
}
.standings-caption {
  font-size: 13px;
  font-weight: 700;
  color: #5b5f78;
  margin-bottom: 10px;
}
.table-scroll {
  overflow-x: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  white-space: nowrap;
}
th {
  text-align: center;
  padding: 8px 10px;
  color: #8b8fa3;
  font-weight: 700;
  border-bottom: 2px solid #ececf5;
}
td {
  text-align: center;
  padding: 8px 10px;
  color: #22213b;
  border-bottom: 1px solid #f2f2f7;
}
.team-col {
  text-align: left;
}
.team-name {
  font-weight: 700;
}
.rank-cell {
  font-weight: 800;
  color: #4a3fd6;
}
tr.podium td {
  background: #f8f7ff;
}
</style>
