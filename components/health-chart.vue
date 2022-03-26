<template>
  <div :class="$style.chartContainer">
    <donut-chart ref="statusChart" :chart-data="chartData" :options="options" :width="width" :height="height" />
    <div :class="$style.chartLabel">
      <slot>
        <strong>10</strong>
        <small>Total no. of elevator(s)</small>
      </slot>
    </div>
    <div v-if="legends.length" :class="$style.chartLegends">
      <div v-for="(legend, index) in legends" :key="index" :class="$style.chartLegend">
        <span :class="$style.sentiment" :style="{ backgroundColor: legend.color }"></span>
        <span :class="$style.label">{{ legend.label }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    options: Object,
    chartData: Object,
    width: Number,
    height: Number,
    legends: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
<style lang="scss" module>
.chartContainer {
  position: relative;
  text-align: center;
  margin-right: 20px;
  margin-left: auto;

  .chartLegends {
    display: flex;
    flex-wrap: wrap;
    gap: 13px 10px;
    position: absolute;
    top: -15px;
    left: -24px;
    transform: translateY(-100%);
    .chartLegend {
      display: flex;
      align-items: center;
      .sentiment {
        width: 17px;
        height: 17px;
      }
      .label {
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: $color-black;
        margin-left: 5px;
      }
    }
  }
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
</style>
