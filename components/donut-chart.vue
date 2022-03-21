<script>
import { Doughnut } from 'vue-chartjs'
import { getCurrentInstance, onMounted, watch } from '@nuxtjs/composition-api'

export default {
  extends: Doughnut,
  props: {
    options: Object,
    chartData: Object,
    width: Number,
    height: Number,
  },
  setup(props) {
    const vm = getCurrentInstance().proxy

    const drawChart = () => {
      props.width && (vm.width = props.width)
      props.height && (vm.height = props.height)
      vm.renderChart(props.chartData, props.options)
    }

    onMounted(() => {
      // this.chartData is created in the mixin.
      // If you want to pass options please create a local options object
      drawChart()
    })

    watch(
      () => [props.options, props.chartData],
      () => {
        drawChart()
      },
      { deep: true }
    )
  },
}
</script>
<style lang="scss"></style>
