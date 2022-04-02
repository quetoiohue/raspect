<template>
  <div :class="$style.container">
    <div>
      <span>Bearing Failture Frequency</span>
      <span
        v-for="type in UNIT_TYPES"
        :key="type"
        :class="[$style.btn, { [$style.isActive]: value === type }]"
        @click="$emit('input', type)"
      >
        {{ type }}
      </span>
    </div>
    <div>
      <span>Hz value</span>
      <span v-for="(unit, index) in units" :key="index">
        {{ unit }}
      </span>
    </div>
  </div>
</template>
<script>
import { UNIT_TYPES } from '~/constants'

export default {
  props: {
    value: String,
  },
  setup() {
    const units = [9.81, 24.17, 24.17, 24.17, 24.17]

    return {
      UNIT_TYPES,
      units,
    }
  },
}
</script>
<style lang="scss" module>
.container {
  padding: 25px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-left: 30px;

  > div {
    display: flex;
    column-gap: 18px;
    font-weight: $font-weight-primary;
    font-size: 13px;

    + div {
      margin-top: 24px;
      font-weight: 400;
    }

    > span:first-child {
      flex: none;
      min-width: 175px;
      padding: 0;
      text-align: left;
      font-weight: $font-weight-primary;
    }
    > .btn,
    > span {
      text-align: center;
      min-width: 60px;
      border-radius: 15.5px;
      flex: 1;
      height: 30px;
      line-height: 30px;
    }
    > .btn {
      cursor: pointer;
      text-transform: uppercase;
      &.isActive {
        background: #ffffff;
        mix-blend-mode: normal;
        opacity: 0.81;
      }
    }
  }
}
</style>
