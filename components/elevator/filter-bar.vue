<template>
  <div :class="$style.container">
    <strong>Select Elevator</strong>
    <el-select :value="filter.zone" placeholder="All Zone" @change="setFilter('zone', $event)">
      <el-option v-for="item in ZONE_OPTIONS" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>
    <el-select :value="filter.status" placeholder="All Elevators" @change="setFilter('status', $event)">
      <el-option v-for="item in ELEVATOR_OPTIONS" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>
<script>
import { getCurrentInstance } from '@vue/composition-api'
import { ZONE_OPTIONS, ELEVATOR_OPTIONS } from '@/constants'

export default {
  props: {
    filter: Object,
  },
  setup() {
    const vm = getCurrentInstance().proxy

    const setFilter = (key, $event) => {
      vm.$emit('set-filter', key, $event)
    }

    return {
      ZONE_OPTIONS,
      ELEVATOR_OPTIONS,
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

  strong {
    color: $color-text;
  }
}
</style>
