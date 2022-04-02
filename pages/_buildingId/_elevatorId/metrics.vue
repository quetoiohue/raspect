<template>
  <el-container direction="vertical" :class="$style.container">
    <portal to="right-toolbar">
      <nuxt-link to="/">
        <el-button class="back-btn" type="primary" icon="el-icon-back" round>Back to Project list</el-button>
      </nuxt-link>
    </portal>
    <el-container direction="vertical">
      <div :class="$style.title">Bearing 1</div>
      <dashboard
        v-for="(opts, index) in optList"
        :key="opts.id"
        :index="index"
        :metrics="filteredData"
        :opts="opts"
        @add-opts="addOpts"
        @remove-opts="removeOpts"
      />
    </el-container>
  </el-container>
</template>
<script>
import uniqueId from 'lodash/uniqueId'
import { computed, reactive, toRefs } from '@vue/composition-api'
import dashboard from '~/components/metrics/dashboard.vue'
import { METRICS } from '~/constants/mock'

const defaultOpts = { isFirst: false, showChart: false }
export default {
  components: { dashboard },
  layout: 'base',
  setup() {
    const filteredData = computed(() => METRICS)
    const data = reactive({
      filter: {
        zone: '',
        status: '',
      },
      optList: [{ id: uniqueId(), isFirst: true, showChart: true }],
    })

    const addOpts = () => {
      if (data.optList.length >= 4) return
      data.optList.push({ id: uniqueId(), ...defaultOpts })
    }

    const removeOpts = (id) => {
      const idx = data.optList.findIndex((opt) => opt.id === id)
      idx > -1 && data.optList.splice(idx, 1)
    }

    const setFilter = (key, value) => {
      data.filter[key] = value
    }

    return {
      ...toRefs(data),
      filteredData,
      setFilter,
      addOpts,
      removeOpts,
    }
  },
}
</script>
<style lang="scss" module>
.container {
  .title {
    font-weight: $font-weight-primary;
    font-size: $font-size-extra-large;
    line-height: 27px;
    margin-bottom: 12px;
    color: $color-text;
  }
}
</style>
