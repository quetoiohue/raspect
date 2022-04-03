<template>
  <div :class="$style.container">
    <strong>Filter</strong>
    <el-select :value="filter.zone" placeholder="All Zone" @change="setFilter('zone', $event)">
      <el-option v-for="item in ZONE_OPTIONS" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>
    <el-select :value="filter.status" placeholder="All Health Status" @change="setFilter('status', $event)">
      <el-option v-for="item in STATUS_OPTIONS" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>
  </div>
</template>
<script>
import { getCurrentInstance } from '@vue/composition-api'
import { ZONE_OPTIONS, STATUS_OPTIONS } from '@/constants'

export default {
  props: {
    filter: Object,
  },
  setup() {
    const vm = getCurrentInstance().proxy
    const setFilter = (key, $event) => {
      console.log('🚀 ~ file: filter-bar.vue ~ line 50 ~ setFilter ~ $event', $event)
      vm.$emit('set-filter', key, $event)
    }

    return { ZONE_OPTIONS, STATUS_OPTIONS, setFilter }
  },
}
</script>
<style lang="scss" module>
.container {
  display: flex;
  align-items: center;
  column-gap: 20px;
  height: 43px;
  padding-bottom: 10px;

  strong {
    color: $color-text;
  }
}
</style>
