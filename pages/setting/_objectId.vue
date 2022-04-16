<template>
  <el-container direction="vertical" :class="$style.container">
    <portal to="right-toolbar">
      <div :class="$style.headerTitle">International Commerce Centre</div>
    </portal>
    <el-container direction="vertical">
      <nuxt-link to="/setting">
        <el-button :class="$style.backBtn" icon="el-icon-arrow-left">Back to Setting </el-button>
      </nuxt-link>
      <el-container direction="vertical" :class="$style.container">
        <filter-bar :filter="filter" :is-sensor="isSensor" @set-filter="setFilter" />
        <el-row :gutter="32">
          <el-col :span="8">
            <el-card v-if="isSensor" :class="$style.sensorCard">
              <form-detail-sensor />
            </el-card>
            <el-card v-else :class="$style.elevatorCard">
              <form-detail-elevator />
              <ul :class="$style.bearingList">
                <div :class="$style.listTitle">Elevator Components</div>
                <li v-for="bearing in BEARING_LIST" :key="bearing" :class="$style.bearingListItem">
                  {{ bearing }}
                </li>
              </ul>
            </el-card>
          </el-col>
          <el-col :span="16">
            <form-installation v-if="isSensor" />
            <form-bearing v-else />
          </el-col>
        </el-row>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { getCurrentInstance, onBeforeUnmount, onMounted, reactive, toRefs } from '@vue/composition-api'
import { useContext } from '@nuxtjs/composition-api'
import filterBar from '@/components/settings/object/filter-bar.vue'
import FormDetailElevator from '~/components/settings/object/form-detail-elevator.vue'
import FormDetailSensor from '~/components/settings/object/form-detail-sensor.vue'
import FormBearing from '~/components/settings/object/form-bearing.vue'
import FormInstallation from '~/components/settings/object/form-installation.vue'

const BEARING_LIST = ['Bearing 1', 'Bearing 2']

export default {
  components: {
    filterBar,
    FormDetailElevator,
    FormDetailSensor,
    FormBearing,
    FormInstallation,
  },
  beforeRouteLeave(to, from, next) {
    if (this.isChangedData) {
      this.$showConfirmBox({ cancel: next, opts: { showMessage: false } })
    } else {
      next()
    }
  },
  layout: 'base',
  setup() {
    const vm = getCurrentInstance().proxy
    const { route } = useContext()
    const data = reactive({
      filter: {
        zone: '',
        elevator: '',
        sensor: '',
      },
      isSensor: false,
      isChangedData: false,
    })

    const setFilter = (key, value) => {
      data.filter[key] = value
    }

    const changedData = (value) => {
      data.isChangedData = value
    }

    vm.$root.$on('changed-data', changedData)

    onMounted(() => {
      data.isSensor = route.value.query.type === 'sensor'
    })

    onBeforeUnmount(() => {
      vm.$root.$off('changed-data', changedData)
    })

    return {
      ...toRefs(data),
      BEARING_LIST,
      setFilter,
    }
  },
}
</script>

<style lang="scss" module>
.headerTitle {
  font-weight: $font-weight-primary;
  font-size: 20px;
  line-height: 27px;
  color: $color-text;
}
.backBtn {
  display: flex;
  align-items: center;
  background: none !important;
  border: none;
  font-size: 20px;
  padding: 4px 8px;
  margin-bottom: 10px;
}
.container {
  .title {
    font-weight: $font-weight-primary;
    font-size: $font-size-extra-large;
    line-height: 27px;
    margin-bottom: 12px;
    color: $color-text;
  }
  .elevatorCard,
  .sensorCard {
    :global {
      .el-card__body {
        background: #f3f3f3;
      }
    }
  }
  .elevatorCard {
    .bearingList {
      .listTitle {
        font-weight: bold;
        margin-bottom: 14px;
      }
      &Item {
        height: 35px;
        font-weight: $font-weight-primary;
        padding: 7px 20px;
        border-radius: 5px;
        cursor: pointer;
        &:hover {
          background: rgba(255, 255, 255, 0.8);
        }
      }
    }
  }
}
</style>
