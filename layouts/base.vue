<template>
  <el-container :class="$style.layoutContainer">
    <base-header />
    <div :class="$style.mainContainer">
      <base-sidebar v-if="showSidebar" />
      <div :class="$style.mainContainer__content">
        <base-toolbar />
        <div :class="$style.container">
          <nuxt />
        </div>
      </div>
    </div>
  </el-container>
</template>

<script>
import { defineComponent, reactive, toRefs, useContext, watch } from '@nuxtjs/composition-api'

import BaseHeader from '~/components/base-header.vue'
import BaseToolbar from '~/components/base-toolbar.vue'
import BaseSidebar from '~/components/base-sidebar.vue'

export default defineComponent({
  name: 'BaseLayout',
  components: {
    'base-header': BaseHeader,
    'base-toolbar': BaseToolbar,
    'base-sidebar': BaseSidebar,
  },
  setup() {
    const { route } = useContext()
    const data = reactive({
      showSidebar: false,
    })

    watch(
      () => route.value.name,
      (val) => {
        data.showSidebar = !['profile', 'index'].includes(val)
      },
      { immediate: true }
    )

    return {
      ...toRefs(data),
    }
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

  .mainContainer {
    flex: 1;
    display: flex;
    align-items: stretch;
    &__content {
      flex: 1;
      .container {
        min-height: calc(100vh - #{$header-height} - #{$toolbar-height});
        padding: 25px $container-padding 15px;
      }
    }
  }
}
</style>
