<template>
  <el-card :class="$style.container">
    <strong slot="header">Elevator System Overview</strong>
    <div :class="$style.elevator">
      <div>Hotel</div>
      <div>Zone 5</div>
      <div>Zone 4</div>
      <div>Zone 3</div>
      <div>Zone 2</div>
      <div>Zone 1</div>
    </div>
  </el-card>
</template>

<script>
export default {
  setup() {
    return {}
  },
}
</script>

<style lang="scss" module>
.container {
  margin-top: 20px;
  :global {
    .el-card {
      &__header {
        padding: 20px 20px 0;
        height: 73px;
      }
      &__body {
        padding: 0;
      }
    }
  }
  .elevator {
    height: 527px;
    width: 100%;
    background: url('~/static/elevator.svg') center no-repeat;
    padding-bottom: 101px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    > div {
      border-bottom: 2px dashed #9f9f9f;
      color: #9f9f9f;
      padding-left: 20px;

      &:nth-child(1) {
        height: 40px;
        line-height: 40px;
      }
      &:nth-child(2) {
        height: 38px;
        line-height: 38px;
      }
      &:nth-child(3) {
        height: 67px;
        line-height: 67px;
      }
      &:nth-child(4) {
        height: 63px;
        line-height: 63px;
      }
      &:nth-child(5) {
        height: 77px;
        line-height: 77px;
      }
      &:nth-child(6) {
        height: 42px;
        line-height: 42px;
      }
    }
  }
}
</style>
