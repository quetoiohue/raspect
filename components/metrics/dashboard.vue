<template>
  <el-container direction="vertical" :class="$style.container">
    <filter-bar
      :filter="filter"
      :opts="opts"
      :index="index"
      @set-filter="setFilter"
      @set-opts="setOpts"
      @add-opts="addOpts"
      @remove-opts="removeOpts"
    />
    <el-card v-show="opts.showChart" :class="$style.contentContainer">
      <div slot="header" :class="$style.header">
        <strong>Bearing Frequency Spectrum</strong>
        <div :class="$style.direction">
          <div :class="$style.label">
            <icons name="sensor-direction" />
            <span>Sensor Direction</span>
          </div>
          <el-button
            v-for="dir in DIRECTIONS"
            :key="dir"
            :class="[$style.directionBtn, { [$style.isActive]: dir === direction }]"
            round
            @click="direction = dir"
          >
            {{ dir }}
          </el-button>
        </div>
      </div>
      <el-container ref="boxContainer" direction="vertical">
        <el-container :class="$style.statusContainer">
          <status-box />
          <unit-bar v-model="unit" />
        </el-container>
        <chart :metrics="sortedMetrics" />
      </el-container>
    </el-card>
  </el-container>
</template>
<script>
import { computed, getCurrentInstance, reactive, toRefs } from '@vue/composition-api'
import filterBar from '~/components/metrics/filter-bar.vue'
import statusBox from '~/components/metrics/status-box.vue'
import unitBar from '~/components/metrics/unit-bar.vue'
import chart from '~/components/metrics/chart.vue'
import { UNIT_TYPES } from '~/constants'

const DIRECTIONS = ['Radial', 'Axial']

export default {
  components: { filterBar, statusBox, unitBar, chart },
  layout: 'base',
  props: {
    metrics: {
      type: Array,
      default: () => [],
    },
    opts: {
      type: Object,
      default: () => ({}),
    },
    index: Number,
  },
  setup(props, { emit }) {
    const vm = getCurrentInstance().proxy
    const data = reactive({
      filter: {
        elevator: '',
        bearing: '',
        date: new Date(),
        time: '17:00',
      },
      direction: 'Radial',
      unit: UNIT_TYPES.FT,
    })
    const sortedMetrics = computed(() =>
      props.metrics.map((l) => l[data.unit]).sort((a, b) => a.frequency - b.frequency)
    )

    const setOpts = (key, value) => {
      vm.$set(props.opts, key, value)
    }
    const addOpts = () => emit('add-opts')
    const removeOpts = () => {
      emit('remove-opts', props.opts.id)
    }
    const setFilter = (key, value) => {
      data.filter[key] = value
    }

    return {
      ...toRefs(data),
      sortedMetrics,
      DIRECTIONS,
      setFilter,
      setOpts,
      addOpts,
      removeOpts,
    }
  },
}
</script>
<style lang="scss" module>
.container {
  margin-bottom: 40px;
  .title {
    font-weight: $font-weight-primary;
    font-size: $font-size-extra-large;
    line-height: 27px;
    margin-bottom: 12px;
    color: $color-text;
  }

  .contentContainer {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border: none;
    :global {
      .el-card__header {
        padding: 12px 20px;
        background: #9f9f9f;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .el-card__body {
        padding: 30px 40px;
      }
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      color: $color-white;
      .direction {
        display: flex;
        align-items: center;
        column-gap: 20px;
        font-weight: 700;
        font-size: $font-size-small;
        .label {
          display: flex;
          align-items: center;
        }
        > button {
          margin: 0;
          border-radius: 15.5px;
          padding: 4px 12px;
          font-size: $font-size-small;
          color: #fff;
          background: no-repeat;
          border: none;
          &.isActive {
            background: rgba(0, 0, 0, 0.5);
            mix-blend-mode: normal;
            opacity: 0.81;
          }
        }
      }
    }
    .statusContainer {
      margin-bottom: 50px;
    }
    .chartContainer {
      position: relative;

      .leftYaxis,
      .rightYaxis {
        position: absolute;
        top: -20px;
        font-weight: 700;
        text-align: center;
        font-size: $font-size-small;
        min-width: 72px;
      }
      .leftYaxis {
        left: 0;
      }
      .rightYaxis {
        right: 0;
      }
    }
  }
}
</style>
