<script setup>
import { useConfigStore } from '../../stores/configStore'
const configStore = useConfigStore()
</script>

<template>
  <div class="unit-toggler">
    <span>날씨단위:</span>
    <el-switch
      :model-value="configStore.unit === 'fahrenheit'"
      active-text="화씨(℉)"
      inactive-text="섭씨(℃)"
      @change="configStore.toggleUnit"
    />
  </div>
</template>

<style scoped>
.unit-toggler {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  font-size: 13px;
  color: #4b5563;
}
</style>
