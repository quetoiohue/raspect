<template>
  <el-row :gutter="20" :class="$style.container">
    <portal to="right-toolbar">
      <nuxt-link to="/">
        <el-button class="back-btn" type="primary" icon="el-icon-back" round>Back to Project list</el-button>
      </nuxt-link>
    </portal>
    <el-col :span="6">
      <el-container direction="vertical">
        <div :class="$style.title">International Commerce Centre</div>
        <google-map />
        <elevator-overview :zone="filter.zone" />
      </el-container>
    </el-col>
    <el-col :span="18">
      <filter-bar :filter="filter" @set-filter="setFilter" />
      <elevator-distribution v-if="isDateNav" key="elevator-distribution" />
      <health-distribution v-else key="health-distribution" :show-zone-chart="showZoneChart" />
      <health-condition-overview :is-date="isDateNav" />
    </el-col>
  </el-row>
</template>

<script>
import { computed, defineComponent, reactive, toRefs, useContext } from '@nuxtjs/composition-api'
import googleMap from '~/components/google-map.vue'
import elevatorOverview from '~/components/dashboard/elevator-overview.vue'
import healthDistribution from '~/components/dashboard/health-distribution.vue'
import healthConditionOverview from '~/components/dashboard/health-condition-overview.vue'
import elevatorDistribution from '~/components/dashboard/elevator-distribution.vue'
import filterBar from '~/components/dashboard/filter-bar.vue'
import { NAV_INDEXS } from '~/constants'

export default defineComponent({
  components: {
    googleMap,
    elevatorOverview,
    healthDistribution,
    healthConditionOverview,
    elevatorDistribution,
    filterBar,
  },
  layout: 'base',
  setup() {
    const { store } = useContext()
    const data = reactive({
      isDateNav: computed(() => store.state.menu.currentNav === NAV_INDEXS.DATE),
      filter: {
        zone: '',
        status: '',
      },
      showZoneChart: computed(() => !!(!data.filter.zone && data.filter.status)),
    })

    const setFilter = (key, value) => {
      data.filter[key] = value
    }

    return {
      ...toRefs(data),
      setFilter,
    }
  },
})
</script>

<style lang="scss" module>
.container {
  .title {
    font-weight: $font-weight-primary;
    font-size: $font-size-extra-large;
    line-height: 27px;
    margin-bottom: 16px;
    color: $color-text;
  }
}
</style>
