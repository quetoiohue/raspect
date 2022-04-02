<template>
  <div :class="$style.container">
    <strong :class="$style.index">{{ index + 1 }}</strong>
    <el-select :value="filter.elevator" placeholder="All Elevator" @change="setFilter('elevator', $event)">
      <el-option v-for="item in elevatorOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>
    <el-select :value="filter.bearing" placeholder="All Bearing" @change="setFilter('bearing', $event)">
      <el-option v-for="item in bearingOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>
    <el-date-picker
      :value="filter.date"
      :class="$style.dateSelect"
      type="date"
      value-format="d MMM yyyy"
      placeholder="Pick a day"
      @input="setFilter('date', $event)"
    >
    </el-date-picker>
    <el-time-select
      :value="filter.time"
      :class="$style.timeSelect"
      :picker-options="{
        start: '00:00',
        step: '01:00',
        end: '23:00',
      }"
      placeholder="Select time"
      @input="setFilter('time', $event)"
    >
    </el-time-select>

    <el-button
      v-if="opts.isFirst"
      :class="$style.compareBtn"
      type="default"
      plain
      icon="el-icon-plus"
      @click="$emit('add-opts')"
    >
      Comparison Field
    </el-button>
    <div v-else :class="$style.groupBtns">
      <el-button type="default" plain @click="$emit('set-opts', 'showChart', true)"> Show</el-button>
      <el-button type="default" plain @click="$emit('remove-opts')"> Cancel Comparison</el-button>
    </div>
  </div>
</template>
<script>
import { getCurrentInstance, reactive, toRefs } from '@vue/composition-api'
export default {
  props: {
    filter: Object,
    opts: Object,
    index: {
      type: Number,
      default: 1,
    },
  },
  setup() {
    const vm = getCurrentInstance().proxy
    const elevatorOptions = [
      {
        value: 1,
        label: 'Elevator 001',
      },
    ]
    const bearingOptions = [
      {
        value: 1,
        label: 'Bearing 1',
      },
    ]

    const data = reactive({})

    const setFilter = (key, $event) => {
      console.log('🚀 ~ file: filter-bar.vue ~ line 50 ~ setFilter ~ $event', $event)
      vm.$emit('set-filter', key, $event)
    }

    return {
      ...toRefs(data),
      elevatorOptions,
      bearingOptions,
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

  .index {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: $color-text;
    color: $color-white;
    text-align: center;
  }
  strong {
    color: $color-text;
  }
  .dateSelect,
  .timeSelect {
    :global {
      .el-input {
        &__inner {
          font-weight: 600;
          font-size: 12px;
          background: none;
          color: #4a4a4a;
          border: none;
          border-bottom: 1px solid #979797;
          border-radius: 0;
        }
      }
    }
  }
  .compareBtn {
    margin-left: auto;
  }
  .groupBtns {
    display: flex;
    align-items: center;
    button + button {
      margin-left: 20px;
    }
  }
}
</style>
