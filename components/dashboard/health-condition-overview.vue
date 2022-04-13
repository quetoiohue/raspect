<template>
  <el-card :class="$style.container">
    <div slot="header" :class="$style.header">
      <strong>Elevator Health Condition Overview</strong>
    </div>
    <div :class="[$style.table, { [$style.datePeriod]: isDate }]">
      <div :class="$style.tableHeader">
        <div :class="$style.tableRow">
          <div :class="$style.tableHeaderCell">Elevator</div>
          <div :class="$style.tableHeaderCell">
            <span>Location</span><span><i class="el-icon-caret-bottom"></i> </span>
          </div>
          <template v-if="isDate">
            <div :class="[$style.tableHeaderCell, { [$style.datePeriodCell]: isDate }]">
              <template v-for="(values, key) in selectedDates">
                <template v-if="key === getMonth() || !showPagination">
                  <div v-for="(date, idx) in values" :key="idx + date" :class="$style.headerCellLabel">
                    <strong v-if="!idx" :class="$style.yearLabel">
                      {{ key }}
                    </strong>
                    <div>{{ date }}</div>
                  </div>
                </template>
              </template>
            </div>
          </template>
          <template v-else>
            <div :class="$style.tableHeaderCell">
              <span>Elevator Health Status</span><span><i class="el-icon-caret-bottom"></i> </span>
            </div>
            <div :class="$style.tableHeaderCell">Equipments / Components with Health Issue</div>
          </template>
        </div>
      </div>
      <div ref="table" :class="$style.tableBody">
        <div v-for="i in 50" :key="i" :class="$style.tableRow" @click="onClickItem(i)">
          <div :class="$style.tableBodyCell">Elevator 001</div>
          <div :class="$style.tableBodyCell">Zone 1</div>
          <template v-if="isDate">
            <div :class="[$style.tableBodyCell, { [$style.datePeriodCell]: isDate }]">
              <div
                v-for="id in getDateLength() - 1"
                :key="id"
                :class="[$style.dateBlock, { [$style.lastBlock]: id === selectedDates.length }]"
              />
              <line-bar :class="$style.lineBar" :indicator-visible="true" />
            </div>
          </template>
          <template v-else>
            <div :class="$style.tableBodyCell">
              <span><icons name="status-major" /></span><span>Major</span>
            </div>
            <div :class="$style.tableBodyCell">
              <span><icons name="status-major" /></span><span>Bearing 2 @Motor</span>
            </div>
          </template>
        </div>
      </div>
      <div v-if="showPagination" :class="$style.pagination">
        <el-button type="text" icon="el-icon-arrow-left" :disabled="pagination.page <= 0" @click="pagination.page--">
          Previous
        </el-button>
        <el-button type="text" :disabled="pagination.limitPage <= pagination.page" @click="pagination.page++">
          Next <i class="el-icon-arrow-right" />
        </el-button>
      </div>
    </div>
  </el-card>
</template>
<script>
import {
  computed,
  getCurrentInstance,
  reactive,
  toRefs,
  useContext,
  useCssModule,
  watch,
} from '@nuxtjs/composition-api'
import lineBar from './line-bar.vue'
import { NAV_INDEXS } from '~/constants'

export default {
  components: { lineBar },
  setup() {
    const { store, route, next } = useContext()
    const style = useCssModule()
    const vm = getCurrentInstance().proxy

    const data = reactive({
      isDate: computed(() => store.state.menu.currentNav !== NAV_INDEXS.TODAY),
      currentNav: computed(() => store.state.menu.currentNav),
      dateRange: computed(() => store.state.menu.dateRange),
      selectedDates: computed(() => store.getters['menu/selectedDates']),
      pagination: {
        page: 0,
        offset: 31,
        limitPage: computed(() => Object.keys(data.selectedDates).length - 1),
      },
      showPagination: computed(() => store.state.menu.currentNav === NAV_INDEXS.DATE),
    })

    const onClickItem = (id) => {
      const path = `${route.value.path}/${id}`
      next(path)
    }

    const getMonth = () => Object.keys(data.selectedDates)[data.pagination.page]

    const getDateLength = () => {
      if (data.showPagination) {
        return data.selectedDates[getMonth()].length
      }
      return Object.keys(data.selectedDates).reduce((acc, item) => {
        return acc + data.selectedDates[item].length
      }, 0)
    }

    watch(
      () => data.currentNav,
      (val) => {
        if (vm.$refs.table && val !== NAV_INDEXS.TODAY) {
          if (!val) return document.documentElement.style.setProperty('--elevator-row-spacing', 0)

          setTimeout(() => {
            const $row = vm.$refs.table.querySelector('.' + style.datePeriodCell)
            const spacing = ($row.getBoundingClientRect().width - 5) / getDateLength() + 'px'

            document.documentElement.style.setProperty('--elevator-row-spacing', spacing)
          }, 300)
        }
      }
    )

    return {
      ...toRefs(data),
      onClickItem,
      getDateLength,
      getMonth,
    }
  },
}
</script>
<style lang="scss" module>
:root {
  --elevator-row-spacing: 0;
}

.container {
  margin-top: 20px;

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
    > small {
      color: $border-color-light;
    }
  }

  .table {
    &Row {
      display: grid;
      min-height: 40px;
      grid-template-columns: 150px 150px 250px auto;
      padding-right: 30px;
    }
    &.datePeriod {
      .tableRow {
        grid-template-columns: 150px 150px auto;
      }

      .tableHeader {
        .datePeriodCell {
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          margin-right: 5px;
          > .headerCellLabel {
            flex: 1;
            transform: translateX(-50%);
            text-align: center;
            position: relative;
            .yearLabel {
              position: absolute;
              top: -20px;
              left: 50%;
              transform: translate(-50%);
            }
          }
        }
      }

      .tableBody {
        .datePeriodCell {
          display: flex;
          flex-wrap: nowrap;
          position: relative;
          margin-right: var(--elevator-row-spacing);
          border-right: 1px dashed $color-text;

          .dateBlock {
            border-left: 1px dashed $color-text;
            flex: 1;
            height: 100%;

            &.lastBlock {
              flex: 0;
            }
          }
          .lineBar {
            position: absolute;
          }
        }
      }
    }

    &Header {
      &Cell {
        font-size: 12px;
        line-height: 16px;
        display: flex;
        align-items: center;

        span + span {
          cursor: pointer;
          margin-left: 10px;
        }
      }
    }

    &Body {
      max-height: 480px;
      overflow-y: auto;

      .tableRow {
        cursor: pointer;
        position: relative;

        &:after {
          visibility: hidden;
          content: '';
          height: 24px;
          width: 24px;
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translate(0, -50%) rotate(180deg);
          background: url('~/static/icons/arrow-back.svg') center no-repeat;
        }

        &:hover {
          background-color: #f3f3f3;
          &:after {
            visibility: visible;
          }
        }
      }
      &Cell {
        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        display: flex;
        align-items: center;

        > span {
          > div {
            display: inline-block;
            vertical-align: middle;

            svg {
              width: 24px;
              height: 24px;
            }
          }

          + span {
            margin-left: 15px;
          }
        }
      }
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
