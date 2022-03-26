<template>
  <div :class="[$style.lineBar, { [$style.isVertical]: dir === 'vertical' }]">
    <template v-for="percentage in percentages">
      <div
        v-if="percentage.value"
        :key="percentage.color"
        :class="$style.lineBarItem"
        :style="{
          backgroundColor: percentage.color,
          [dir === 'vertical' ? 'height' : 'width']: `${percentage.value}%`,
        }"
      >
        <el-tooltip placement="top" :visible-arrow="false" popper-class="info-tooltip">
          <div slot="content" class="content" v-html="percentage.info"></div>
          <div
            v-if="indicatorVisible && percentage.value"
            :class="$style.indicator"
            :style="{ backgroundColor: percentage.color }"
          />
        </el-tooltip>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    percentages: {
      type: Array,
      default: () => [
        {
          color: '#f44336',
          value: 0,
          info: 'Moderate <br> 3 Mar 2021',
        },
        {
          color: '#ffb74d',
          value: 30,
          info: 'Moderate <br> 3 Mar 2021',
        },
        {
          color: '#4a90e2',
          value: 30,
          info: 'Moderate <br> 3 Mar 2021',
        },
        {
          color: '#9f9f9f',
          value: 40,
          info: 'Moderate <br> 3 Mar 2021',
        },
      ],
    },
    dir: {
      type: String,
      default: 'horizontal',
      validator: (dir) => ['vertical', 'horizontal'].includes(dir),
    },
    indicatorVisible: {
      type: Boolean,
    },
  },
}
</script>
<style lang="scss" module>
.lineBar {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  width: 100%;

  &.isVertical {
    flex-direction: column;
    height: 100%;
    row-gap: 4px;
    .lineBarItem {
      width: 5px;
      + .lineBarItem {
        margin-left: 0;
      }
    }
  }

  &Item {
    border-radius: 2.5px;
    height: 5px;
    position: relative;
    + .lineBarItem {
      margin-left: 4px;
    }
  }
}
.indicator {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  position: absolute;
  left: 5px;
  top: 50%;
  transform: translate(-50%, -50%);
}

:global {
  .info-tooltip {
    .content {
      font-size: 10px;
      line-height: 14px;
      padding: 3px 18px;
      text-align: center;
    }
  }
}
</style>
