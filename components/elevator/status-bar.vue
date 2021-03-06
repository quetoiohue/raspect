<template>
  <div :class="$style.statusBar">
    <template v-for="(idx, i) in statusIndexs">
      <div
        :key="i"
        :class="[$style.indicator, { [$style.isActive]: +idx === currentStatus }]"
        :style="indicatorStyle(idx)"
      >
        <span v-if="showLabel" :class="$style.label">{{ STATUSES[idx].label }}</span>
      </div>
      <div v-if="i < statusIndexs.length - 1" :key="i + idx" :class="$style.line" :style="lineStyle(idx)" />
    </template>
  </div>
</template>
<script>
import { STATUSES } from '~/constants'

export default {
  props: {
    currentStatus: {
      type: Number,
      default: 2,
    },
    parentBgColor: {
      type: String,
      default: () => '#fff',
    },
    showLabel: Boolean,
  },
  setup(props) {
    const statusIndexs = Object.keys(STATUSES).reverse()
    const lineStyle = (idx) => {
      const _currentStatus = STATUSES[idx]
      const _nextStatus = STATUSES[+idx - 1]
      const rangeColor = `linear-gradient(to right, ${_currentStatus.color}, ${_nextStatus.color})`

      if (+idx === props.currentStatus) {
        return {
          background: `repeating-linear-gradient(to right, ${props.parentBgColor}, ${props.parentBgColor} 5%, transparent 5%, transparent 10%), ${rangeColor}`,
        }
      } else {
        return {
          background: rangeColor,
        }
      }
    }

    const indicatorStyle = (idx) => {
      const _currentStatus = STATUSES[idx]
      return {
        background: _currentStatus.color,
      }
    }

    return { STATUSES, statusIndexs, lineStyle, indicatorStyle }
  },
}
</script>
<style lang="scss" module>
.statusBar {
  display: flex;
  align-items: center;
  .indicator {
    height: 16px;
    width: 16px;
    border-radius: 50%;
    flex: none;
    position: relative;

    .label {
      position: absolute;
      top: calc(100% + 12px);
      left: 50%;
      transform: translateX(-50%);
      font-weight: $font-weight-primary;
      font-size: 10px;
      color: $color-white;
    }

    &.isActive {
      z-index: 1;
      &:before {
        content: '';
        height: 28px;
        width: 28px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        background-color: inherit;
        opacity: 0.4;
        z-index: 0;
      }
    }
  }
  .line {
    height: 3px;
    background-position: center;
    flex: 1;
  }
}
</style>
