<template>
  <div :class="$style.layoutContainer">
    <default-header />
    <div :class="$style.container">
      <nuxt />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

import DefaultHeader from '~/components/default-header.vue'

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    'default-header': DefaultHeader,
  },
})
</script>

<style lang="scss" module>
.layoutContainer {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  overflow: auto;

  .container {
    flex: 1;
  }
}
</style>
