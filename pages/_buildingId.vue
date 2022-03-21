<template>
  <el-row :gutter="20" :class="$style.container">
    <portal to="right-toolbar">
      <nuxt-link to="/">
        <el-button class="back-btn" type="primary" icon="el-icon-back" round>Back to Project list</el-button>
      </nuxt-link>
    </portal>
    <portal to="center-toolbar">
      <div :class="$style.navs">
        <span
          v-for="(nav, id) in NAVS"
          :key="id"
          :for="nav"
          :class="[$style.nav, { [$style.active]: +currentNav === +id }]"
          @click="onNavClick(id)"
        >
          {{ +NAV_INDEXS.DATE === +id && dateRange ? dateRange.join(' - ') : nav }}
          <el-date-picker
            v-if="+NAV_INDEXS.DATE === +id"
            :id="nav"
            ref="datePicker"
            v-model="dateRange"
            type="daterange"
            align="center"
            start-placeholder="Start Date"
            end-placeholder="End Date"
            default-value="2010-10-01"
            value-format="d MMM yyyy"
            :visible-arrow="false"
          >
          </el-date-picker>
        </span>
      </div>
    </portal>
    <portal to="left-toolbar">
      <div :class="$style.alertContainer">
        <span :class="$style.today">Today</span>
        <span :class="$style.date">1 June 2021 12:20:00 , Tuesday </span>
        <span>
          <el-badge :value="3" class="item">
            <i class="el-icon-message-solid" />
          </el-badge>
        </span>
      </div>
    </portal>
    <el-col :span="6">
      <el-container direction="vertical">
        <div :class="$style.title">International Commerce Centre</div>
        <google-map />
        <elevator-overview />
      </el-container>
    </el-col>
    <el-col :span="18">
      <filter-bar :filter="filter" @set-filter="setFilter" />
      <elevator-distribution v-if="currentNav === NAV_INDEXS.DATE" />
      <health-distribution v-else :show-zone-chart="showZoneChart" />
      <health-condition-overview :is-date="currentNav === NAV_INDEXS.DATE" />
    </el-col>
  </el-row>
</template>

<script>
import { computed, defineComponent, getCurrentInstance, reactive, toRefs } from '@nuxtjs/composition-api'
import googleMap from '~/components/google-map.vue'
import elevatorOverview from '~/components/dashboard/elevator-overview.vue'
import healthDistribution from '~/components/dashboard/health-distribution.vue'
import healthConditionOverview from '~/components/dashboard/health-condition-overview.vue'
import elevatorDistribution from '~/components/dashboard/elevator-distribution.vue'
import filterBar from '~/components/dashboard/filter-bar.vue'

const NAV_INDEXS = Object.freeze({
  TODAY: 1,
  WEEKLY: 2,
  MONTHLY: 3,
  YEARLY: 4,
  DATE: 5,
})
const NAVS = Object.freeze({
  [NAV_INDEXS.TODAY]: 'Today',
  [NAV_INDEXS.WEEKLY]: 'Weekly',
  [NAV_INDEXS.MONTHLY]: 'Monthly',
  [NAV_INDEXS.YEARLY]: 'Yearly',
  [NAV_INDEXS.DATE]: 'Pick a Date / Date range',
})
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
    const vm = getCurrentInstance().proxy
    const data = reactive({
      currentNav: NAV_INDEXS.TODAY,
      dateRange: null,
      filter: {
        zone: '',
        status: '',
      },
      showZoneChart: computed(() => !!(!data.filter.zone && data.filter.status)),
    })

    const onNavClick = (idx) => {
      data.currentNav = +idx

      if (+idx === NAV_INDEXS.DATE && vm.$refs.datePicker && vm.$refs.datePicker[0]) {
        vm.$refs.datePicker[0].showPicker()
      }
      console.log(vm)
    }

    const setFilter = (key, value) => {
      data.filter[key] = value
    }

    return {
      NAVS,
      NAV_INDEXS,
      ...toRefs(data),
      onNavClick,
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
:global {
  .el-button.is-round.back-btn {
    border: 1px solid $color-primary;
    border-radius: 16px;
    background: none;
    color: $color-text;
    border-color: $color-text;
    padding: 8px 12px;
  }
  .el-picker-panel {
    &[x-placement^='bottom'] {
      margin: 0;
    }
    .popper__arrow {
      display: none;
    }
  }
}
.navs {
  display: flex;
  align-items: center;
  height: 100%;
  .nav {
    font-weight: $font-weight-primary;
    font-size: $font-size-small;
    padding: 0 12px;
    cursor: pointer;
    position: relative;
    &.active {
      color: $color-text-danger;
      &:before {
        content: '';
        width: 100%;
        height: 5px;
        background-color: $color-text-danger;
        position: absolute;
        bottom: -20px;
        left: 0;
      }
    }

    :global(.el-date-editor) {
      opacity: 0;
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
    }
  }
}
.alertContainer {
  display: flex;
  align-items: center;
  font-size: $font-size-small;
  height: 100%;
  .today {
    font-weight: $font-weight-primary;
  }
  .date {
    margin: 0 20px 0 17px;
  }
  > span {
    i {
      font-size: $font-size-medium;
      cursor: pointer;
    }
  }
}
</style>
