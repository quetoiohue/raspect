<template>
  <div :class="$style.container">
    <strong>Filter</strong>
    <el-select :value="filter.zone" placeholder="All Zone" @change="setFilter('zone', $event)">
      <el-option v-for="item in zoneOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>
    <el-select :value="filter.status" placeholder="All Health Status" @change="setFilter('status', $event)">
      <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
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
      statusOptions: [
        {
          value: 1,
          label: 'Major Status',
        },
        {
          value: 2,
          label: 'Moderate Status',
        },
        {
          value: 3,
          label: 'Minor Status',
        },
        {
          value: 4,
          label: 'Normal Status',
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
  height: 43px;
  padding-bottom: 10px;

  strong {
    color: $color-text;
  }
}
</style>
