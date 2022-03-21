<template>
  <el-card :class="$style.container">
    <div slot="header" :class="$style.header">
      <strong>Elevator Health Condition Distribution</strong>
    </div>
    <div :class="$style.table">
      <div v-for="(date, i) in selectedDates" :key="date.month + i" :class="$style.tableRow">
        <line-bar :class="$style.lineBar" dir="vertical" />
        <div :class="$style.label">
          <div :class="$style.monthLabel">{{ date.month }}</div>
          <strong
            v-if="(selectedDates[i] && selectedDates[i].year) !== (selectedDates[i - 1] && selectedDates[i - 1].year)"
            :class="$style.yearLabel"
          >
            {{ selectedDates[i] && selectedDates[i].year }}
          </strong>
        </div>
      </div>
      <div v-for="idx in 4" :key="idx" :class="$style.tableRowLine" :style="{ top: idx * 20 + '%' }" />
    </div>
  </el-card>
</template>

<script>
import { reactive, toRefs } from '@nuxtjs/composition-api'
import lineBar from './line-bar.vue'

export default {
  components: { lineBar },
  setup() {
    const data = reactive({
      selectedDates: [
        { year: 2021, month: 'Jun' },
        { year: 2021, month: 'Jul' },
        { year: 2021, month: 'Aug' },
        { year: 2021, month: 'Sep' },
        { year: 2021, month: 'Oct' },
        { year: 2021, month: 'Nov' },
        { year: 2021, month: 'Dec' },
        { year: 2022, month: 'Jan' },
        { year: 2022, month: 'Feb' },
        { year: 2022, month: 'Mar' },
        { year: 2022, month: 'Apr' },
        { year: 2022, month: 'May' },
        { year: 2022, month: 'Jun ' },
      ],
    })

    return {
      ...toRefs(data),
    }
  },
}
</script>

<style lang="scss" module>
.container {
  :global {
    .el-card {
      &__header {
        padding: 20px 25px 14px;
      }
      &__body {
        padding: 0 25px 20px;
      }
    }
  }
  .header {
    > strong {
      display: block;
    }
  }
  .table {
    display: flex;
    height: 140px;
    position: relative;
    margin-bottom: 40px;
    .tableRow {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      .label {
        position: absolute;
        top: 100%;
        text-align: center;
        .monthLabel,
        .yearLabel {
          font-size: 12px;
          line-height: 16px;
          margin-top: 6px;
        }
      }
    }
    .tableRowLine {
      width: 100%;
      border-bottom: 1px dashed $color-text;
      position: absolute;
      left: 0;
    }
  }
}
</style>
