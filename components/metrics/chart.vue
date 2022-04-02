<template>
  <div :class="$style.chartContainer">
    <line-chart
      ref="chart"
      :chart-data="chartConfig.data"
      :options="chartConfig.options"
      :plugins="chartConfig.plugins"
      :width="chartConfig.width"
      :height="chartConfig.height"
    />
    <span :class="$style.leftYaxis">
      Velocity <br />
      (mm/s)
    </span>
    <span :class="$style.rightYaxis">
      Acceleration <br />
      (g)
    </span>
  </div>
</template>
<script>
import { getCurrentInstance, onMounted, watch } from '@vue/composition-api'
import lineChart from '~/components/line-chart.vue'

const plugin = {
  id: 'chartAreaBorder',
  afterDraw: (chart, args, opts) => {
    const {
      chartArea: { left, right, bottom },
      ctx,
    } = chart
    const {
      borders: { bLbR },
    } = opts

    ctx.save()
    if (bLbR && bLbR.borderWidth !== 0) {
      ctx.beginPath()
      ctx.strokeStyle = bLbR.borderColor || 'black'
      ctx.lineWidth = bLbR.borderWidth || 1
      ctx.moveTo(left, bottom)
      ctx.lineTo(right, bottom)
      ctx.stroke()
    }

    ctx.restore()
  },
}
export default {
  components: { lineChart },
  props: {
    metrics: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    let countLog10 = 2
    const vm = getCurrentInstance().proxy
    const chartConfig = {
      data: {
        labels: [],
        datasets: [],
      },
      plugins: [plugin],
      options: {
        responsive: true,
        interaction: {
          intersect: false,
        },
        stacked: false,
        legend: {
          display: false,
        },
        layout: {
          padding: {
            left: 20,
            right: 20,
            top: 50,
            bottom: 0,
          },
        },
        title: {
          display: true,
          text: 'Frequency (Hz)',
          color: 'grey',
          font: {
            size: 14,
            weight: 'bold',
            lineHeight: '23px',
          },
          position: 'bottom',
          padding: 20,
        },
        // eslint-disable-next-line no-dupe-keys
        plugins: {
          title: {
            display: false,
          },
          chartAreaBorder: {
            borders: {
              bLbR: {
                borderWidth: 2,
                borderColor: 'grey',
              },
            },
          },
        },
        scales: {
          yAxes: [
            {
              type: 'linear',
              display: true,
              position: 'left',
              id: 'y',
              ticks: {
                min: 0,
                suggestedMax: 0.45,
                stepSize: 0.05,
              },
              gridLines: {
                display: false,
              },
            },
            {
              type: 'linear',
              display: true,
              position: 'right',
              id: 'y1',
              ticks: {
                min: 0,
                suggestedMax: 0.45,
                stepSize: 0.05,
              },
              gridLines: {
                display: false,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                callback(val, index, values) {
                  let label = ''
                  const log10Value = Math.log10(+val)
                  const pow10Count = Math.pow(10, countLog10)
                  if (log10Value > countLog10 || index === values.length - 1) {
                    label = pow10Count > 1000 ? pow10Count / 1000 + 'k' : pow10Count
                    countLog10 = Math.ceil(log10Value)
                  }

                  return label
                },
                color: 'grey',
                autoSkip: false,
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },

      width: 900,
      height: 417,
    }

    const updateChart = (_metrics) => {
      chartConfig.data.labels = _metrics.map((l) => l.frequency)
      chartConfig.data.datasets = [
        {
          label: 'Velocity',
          data: _metrics.map((l) => l.velocity),
          borderColor: 'grey',
          fill: false,
          yAxisID: 'y',
        },
      ]
      vm.$refs.chart && vm.$refs.chart.renderChart(chartConfig.data, chartConfig.options)
    }

    onMounted(() => {
      updateChart(props.metrics)
    })

    watch(
      () => props.metrics,
      (val) => {
        updateChart(val)
      },
      { deep: true }
    )

    return {
      chartConfig,
    }
  },
}
</script>
<style lang="scss" module>
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
</style>
