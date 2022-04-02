<template>
  <el-card :class="$style.container">
    <div slot="header" :class="$style.header">
      <strong>Health Condition Distribution</strong>
      <small>since 7/06/2021 17:30</small>
    </div>
    <div :class="$style.statuses">
      <div :class="$style.statusItem">
        <icons :class="$style.icon" name="status-normal" />
        <strong :class="$style.status">
          Normal
          <br />
          Status
        </strong>
        <div :class="$style.number">
          <strong>7</strong>
          <small>Elevator</small>
        </div>
      </div>
      <div :class="$style.statusItem">
        <icons :class="$style.icon" name="status-major" />
        <strong :class="$style.status">
          Major
          <br />
          Status
        </strong>
        <div :class="$style.number">
          <strong>7</strong>
          <small>Elevator</small>
        </div>
      </div>
      <div :class="$style.statusItem">
        <icons :class="$style.icon" name="status-moderate" />
        <strong :class="$style.status">
          Moderate
          <br />
          Status
        </strong>
        <div :class="$style.number">
          <strong>7</strong>
          <small>Elevator</small>
        </div>
      </div>
      <div :class="$style.statusItem">
        <icons :class="$style.icon" name="status-minor" />
        <strong :class="$style.status">
          Minor
          <br />
          Status
        </strong>
        <div :class="$style.number">
          <strong>7</strong>
          <small>Elevator</small>
        </div>
      </div>
      <client-only>
        <health-chart :chart-data="chartData" :options="options" :legends="legends" :width="180" :height="180">
          <strong>10</strong>
          <small>Total no. of elevator(s)</small>
        </health-chart>
      </client-only>
    </div>
  </el-card>
</template>

<script>
import { reactive, toRefs, watch } from '@nuxtjs/composition-api'
import healthChart from '~/components/health-chart.vue'
import { STATUSES, ZONES } from '~/constants'

export default {
  components: {
    healthChart,
  },
  props: {
    showZoneChart: Boolean,
  },
  setup(props) {
    const data = reactive({
      chartData: {
        labels: Object.values(STATUSES).map((e) => e.label),
        datasets: [
          {
            data: [300, 50, 100, 200],
            backgroundColor: Object.values(STATUSES).map((e) => e.color),
            hoverOffset: 4,
          },
        ],
      },
      options: {
        cutoutPercentage: 80,
        plugins: {
          legend: false,
          tooltip: false,
        },
      },
      legends: [],
    })

    const drawZoneChart = () => {
      data.chartData = {
        labels: Object.values(ZONES).map((e) => e.label),
        datasets: [
          {
            data: [300, 50, 100, 200, 60, 80],
            backgroundColor: Object.values(ZONES).map((e) => e.color),
            hoverOffset: 4,
          },
        ],
      }
      data.legends = Object.values(ZONES)
    }

    const drawStatusChart = () => {
      data.chartData = {
        labels: Object.values(STATUSES).map((e) => e.label),
        datasets: [
          {
            data: [300, 50, 100, 200],
            backgroundColor: Object.values(STATUSES).map((e) => e.color),
            hoverOffset: 4,
          },
        ],
      }
      data.legends = []
    }

    watch(
      () => props.showZoneChart,
      () => {
        props.showZoneChart ? drawZoneChart() : drawStatusChart()
      }
    )

    return {
      ...toRefs(data),
      drawZoneChart,
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
    > small {
      color: $border-color-light;
    }
  }
  .statuses {
    display: flex;
    .statusItem {
      border: 1px solid $border-color-light;
      border-radius: 10px;
      padding: 20px;
      width: 220px;
      height: 170px;
      + .statusItem {
        margin-left: 20px;
      }
      .icon {
        margin-bottom: 20px;
      }
      .status {
        font-size: $font-size-small;
      }
      .number {
        strong {
          font-size: 24px;
        }
        small {
          display: block;
          margin-top: -8px;
        }
      }
    }

    .chartContainer {
      position: relative;
      text-align: center;
      margin-right: 20px;
      margin-left: auto;

      .chartLabel {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        > strong {
          display: block;
          font-size: 40px;
        }
      }
    }
  }
}
</style>
