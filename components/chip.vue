<template>
  <div :class="$style.container" :style="{ backgroundColor: color }">
    {{ label }}
  </div>
</template>
<script>
export default {
  props: {
    color: String,
    label: String,
  },
}
</script>
<style lang="scss" module>
.container {
  font-size: $font-size-small;
  color: #fefefe;
  padding: 0px 6px;
  border-radius: 10px;
  height: 20px;
  line-height: 20px;
}
</style>
