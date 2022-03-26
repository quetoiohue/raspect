<template>
  <div :class="$style.container">
    <strong>Select Elevator</strong>
    <el-select :value="filter.zone" placeholder="All Zone" @change="setFilter('zone', $event)">
      <el-option v-for="item in zoneOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>
    <el-select :value="filter.status" placeholder="All Elevators" @change="setFilter('status', $event)">
      <el-option v-for="item in elevatorOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>
  </div>
</template>
<script>
import { getCurrentInstance, reactive, toRefs } from '@vue/composition-api'
export default {
  props: {
    filter: Object,
  },
  setup() {
    const vm = getCurrentInstance().proxy
    const data = reactive({
      zoneOptions: [
        {
          value: 1,
          label: 'Zone 1',
        },
        {
          value: 2,
          label: 'Zone 2',
        },
        {
          value: 3,
          label: 'Zone 3',
        },
        {
          value: 4,
          label: 'Zone 4',
        },
        {
          value: 5,
          label: 'Zone 5',
        },
        {
          value: 6,
          label: 'Hotel',
        },
      ],
      elevatorOptions: [
        {
          value: 1,
          label: 'Elevator 2',
        },
      ],
    })

    const setFilter = (key, $event) => {
      console.log('🚀 ~ file: filter-bar.vue ~ line 50 ~ setFilter ~ $event', $event)
      vm.$emit('set-filter', key, $event)
    }

    return {
      ...toRefs(data),
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
