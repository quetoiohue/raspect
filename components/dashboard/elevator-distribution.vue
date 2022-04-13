<template>
  <el-card :class="$style.container">
    <div slot="header" :class="$style.header">
      <strong>Elevator Health Condition Distribution</strong>
      <div v-if="showPagination" :class="$style.pagination">
        <el-button type="text" icon="el-icon-arrow-left" :disabled="pagination.page <= 0" @click="pagination.page--">
          Previous
        </el-button>
        <el-button type="text" :disabled="pagination.limitPage <= pagination.page" @click="pagination.page++">
          Next <i class="el-icon-arrow-right" />
        </el-button>
      </div>
    </div>
    <div :class="$style.table">
      <template v-for="(values, key) in selectedDates">
        <template v-if="key === getMonth() || !showPagination">
          <div v-for="(date, i) in values" :key="date + key" :class="$style.tableRow">
            <line-bar :class="$style.lineBar" dir="vertical" />
            <div :class="$style.label">
              <div :class="$style.monthLabel">{{ date }}</div>
              <strong v-if="!i" :class="$style.yearLabel">
                {{ key }}
              </strong>
            </div>
          </div>
        </template>
      </template>

      <div v-for="idx in 4" :key="idx" :class="$style.tableRowLine" :style="{ top: idx * 20 + '%' }" />
    </div>
  </el-card>
</template>

<script>
import { computed, reactive, toRefs, useContext } from '@nuxtjs/composition-api'
import lineBar from './line-bar.vue'
import { NAV_INDEXS } from '~/constants'

export default {
  components: { lineBar },
  setup() {
    const { store } = useContext()

    const data = reactive({
      selectedDates: computed(() => store.getters['menu/selectedDates']),
      pagination: {
        page: 0,
        offset: 31,
        limitPage: computed(() => Object.keys(data.selectedDates).length - 1),
      },
      showPagination: computed(() => store.state.menu.currentNav === NAV_INDEXS.DATE),
    })

    const getMonth = () => Object.keys(data.selectedDates)[data.pagination.page]

    return {
      ...toRefs(data),
      getMonth,
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
    display: flex;
    align-items: center;
    justify-content: space-between;
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
  .pagination {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    button {
      font-size: $font-size-small;
      font-weight: $font-weight-primary;
      &:global(.is-disabled) {
        opacity: 0.5;
      }
      + button {
        margin-left: 15px;
      }
    }
  }
}
</style>
