<template>
  <div :class="$style.container">
    <status-bar :class="$style.statusBar" parent-bg-color="#4a4a4a" :current-status="3" :show-label="true" />
    <div :class="$style.statusDesc">
      <icons name="ic-warning" />
      <span :class="$style.desc">
        <div :class="$style.descTitle">Ball or Roller Fault</div>
        <small>Mid Frequency Abnormal</small>
      </span>
    </div>
  </div>
</template>
<script>
import statusBar from '~/components/elevator/status-bar.vue'

export default {
  components: { statusBar },
}
</script>
<style lang="scss" module>
.container {
  width: 415px;
  padding: 16px 20px;
  background: $color-text;
  color: $color-white;
  mix-blend-mode: normal;
  opacity: 0.9;
  border-radius: 10px;
  .statusBar {
    margin-bottom: 36px;
  }
  .statusDesc {
    display: flex;
    .desc {
      margin-left: 8px;
      .descTitle {
        font-weight: 700;
        font-size: 18px;
        line-height: 25px;
      }
      > small {
        font-size: 13px;
        line-height: 21px;
      }
    }
  }
}
</style>
