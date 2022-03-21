<template>
  <div :class="$style.container">
    <portal-target name="right-toolbar"> </portal-target>
    <portal-target name="center-toolbar"> </portal-target>
    <portal-target name="left-toolbar"> </portal-target>
  </div>
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
  background: $color-white;
  height: $toolbar-height;
  display: flex;
  justify-content: space-between;
  padding: 12px 25px 12px 36px;
}
</style>
