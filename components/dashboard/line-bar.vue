<template>
  <div :class="[$style.lineBar, { [$style.isVertical]: dir === 'vertical' }]">
    <div
      v-for="percentage in percentages"
      :key="percentage.color"
      :class="$style.lineBarItem"
      :style="{ backgroundColor: percentage.color, [dir === 'vertical' ? 'height' : 'width']: `${percentage.value}%` }"
    ></div>
  </div>
</template>
<script>
export default {
  props: {
    percentages: {
      type: Array,
      default: () => [
        { color: '#f44336', value: 10 },
        { color: '#ffb74d', value: 20 },
        { color: '#4a90e2', value: 30 },
        { color: '#9f9f9f', value: 40 },
      ],
    },
    dir: {
      type: String,
      default: 'horizontal',
      validator: (dir) => ['vertical', 'horizontal'].includes(dir),
    },
  },
}
</script>
<style lang="scss" module>
.lineBar {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  column-gap: 4px;
  width: 100%;

  &.isVertical {
    flex-direction: column;
    height: 100%;
    row-gap: 4px;
    .lineBarItem {
      width: 5px;
    }
  }
  &Item {
    border-radius: 2.5px;
    height: 5px;
  }
}
</style>
