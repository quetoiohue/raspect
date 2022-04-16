<template>
  <div :class="$style.container">
    <label>{{ isSensor ? 'Select Sensor' : 'Select Elevator' }}</label>
    <el-select :value="filter.zone" placeholder="All Zones" @change="setFilter('zone', $event)">
      <el-option v-for="item in ZONE_OPTIONS" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>
    <el-select :value="filter.elevator" placeholder="All Elevators" @change="setFilter('elevator', $event)">
      <el-option v-for="item in ELEVATOR_OPTIONS" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <el-select
      v-if="isSensor"
      :value="filter.sensor"
      placeholder="Vibration Sensor"
      @change="setFilter('sensor', $event)"
    >
      <el-option v-for="item in SENSOR_OPTIONS" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>
  </div>
</template>
<script>
import { getCurrentInstance } from '@vue/composition-api'
import { ZONE_OPTIONS, ELEVATOR_OPTIONS, SENSOR_OPTIONS } from '@/constants'
export default {
  props: {
    filter: Object,
    isSensor: Boolean,
  },
  setup() {
    const vm = getCurrentInstance().proxy

    const setFilter = (key, $event) => {
      vm.$emit('set-filter', key, $event)
    }

    return {
      ZONE_OPTIONS,
      ELEVATOR_OPTIONS,
      SENSOR_OPTIONS,
      setFilter,
    }
  },
}
</script>
<style lang="scss" module>
.container {
  display: flex;
  align-items: center;
  column-gap: 20px;
  margin-bottom: 26px;

  > label {
    margin-right: 5px;
    font-weight: bold;
    color: $color-text;
  }
}
</style>
