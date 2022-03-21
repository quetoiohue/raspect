<template>
  <div :class="$style.header">
    <img :class="$style.logo" src="~/static/icons/icon.svg" />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" module>
.header {
  display: flex;
  background: $background-color-header;
  height: $header-height;
  padding: 0 $header-padding;
  .logo {
    width: 160px;
    height: auto;
  }
}
</style>
