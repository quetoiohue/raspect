<script>
import { Line, mixins } from 'vue-chartjs'
import { getCurrentInstance, onMounted } from '@nuxtjs/composition-api'

export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: {
    options: Object,
    chartData: Object,
    width: Number,
    height: Number,
  },
  setup(props) {
    const vm = getCurrentInstance().proxy

    const drawChart = () => {
      if ((props.width || props.height) && vm.$refs.canvas) {
        vm.$refs.canvas.style.width = '100%'
        vm.$refs.canvas.style.height = props.height + 'px'
      }
    }

    onMounted(() => {
      // this.chartData is created in the mixin.
      // If you want to pass options please create a local options object
      drawChart()
    })
  },
}
</script>
<style lang="scss"></style>
