<template>
  <div :class="$style.container">
    <portal-target name="right-toolbar"> </portal-target>
    <portal-target name="center-toolbar">
      <div v-if="showNavs" :class="$style.navs">
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
    </portal-target>
    <portal-target name="left-toolbar">
      <div v-if="showAlert" :class="$style.alertContainer">
        <span :class="$style.today">Today</span>
        <span :class="$style.date">1 June 2021 12:20:00 , Tuesday </span>
        <span @click="showDrawer = true">
          <el-badge :value="3" class="item">
            <i class="el-icon-message-solid" />
          </el-badge>
        </span>
      </div>
    </portal-target>
    <el-drawer title="Alert Notification" size="440px" :visible.sync="showDrawer">
      <div :class="$style.alerts">
        <div :class="$style.alertHeader">
          <span>Elevator</span>
          <span>Alert</span>
          <el-button type="text" :class="$style.clearBtn" @click="removeAllAlert">Clear All</el-button>
        </div>
        <div :class="$style.alertItems">
          <div v-for="alert in alerts" :key="alert.id" :class="$style.alertItem">
            <span :class="$style.title"> {{ alert.id }} </span>
            <div :class="$style.content">
              <div :class="$style.contentStatus" :style="{ color: STATUSES[alert.status].color }">
                {{ STATUSES[alert.status].label }}
              </div>
              <div :class="$style.contentText">{{ alert.content }}</div>
              <div :class="$style.contentTime">{{ alert.time }}</div>
            </div>
            <span :class="$style.contentIcon" @click="removeAlert(alert.id)">
              <icons name="ic-remove" />
            </span>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { useContext, getCurrentInstance, reactive, toRefs, watch, computed } from '@nuxtjs/composition-api'
import { NAV_INDEXS, NAVS, STATUSES } from '~/constants'

export default {
  setup() {
    const { route, store } = useContext()
    const vm = getCurrentInstance().proxy
    const data = reactive({
      currentNav: computed(() => store.state.menu.currentNav),
      dateRange: null,
      alerts: computed(() => store.state.alert.list),
      showNavs: computed(() => ['buildingId', 'elevatorId', 'buildingId-elevatorId'].includes(route.value.name)),
      showAlert: computed(() => !['profile', 'index'].includes(route.value.name)),
      showDrawer: false,
    })

    const onNavClick = (idx) => {
      if (+idx === NAV_INDEXS.DATE && vm.$refs.datePicker && vm.$refs.datePicker[0]) {
        vm.$refs.datePicker[0].showPicker()
      }
      store.commit('menu/SET_MENU', +idx)
    }

    const removeAlert = (id) => store.commit('alert/REMOVE_ALERT', id)

    const removeAllAlert = () => store.commit('alert/REMOVE_ALL_ALERT')

    watch(
      () => data.dateRange,
      (val) => store.commit('menu/SET_DATE_RANGE', val)
    )

    watch(
      () => route.value.name,
      () => {
        store.commit('menu/RESET_MENU')
      }
    )

    return {
      ...toRefs(data),
      NAVS,
      NAV_INDEXS,
      STATUSES,
      onNavClick,
      removeAlert,
      removeAllAlert,
    }
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

  .alerts {
    padding: 30px 15px;
    font-size: 12px;
    color: #4a4a4a;

    .alertHeader {
      display: grid;
      grid-template-columns: 95px auto 46px;
      align-items: center;
      padding: 0 14px;
      margin-bottom: 15px;
      .clearBtn {
        font-size: 12px;
        text-decoration: underline;
        padding: 0;
      }
    }

    .alertItems {
      .alertItem {
        display: grid;
        grid-template-columns: 95px auto 46px;
        padding: 10px 14px;
        border-radius: 5px;
        transition: 0.3s all;
        .contentStatus,
        .title {
          font-weight: $font-weight-primary;
        }
        .contentText {
          margin-bottom: 18px;
        }
        .contentIcon {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        &:hover {
          background-color: $color-white;
        }
      }
    }
  }

  :global {
    .el-drawer {
      background: rgba(243, 243, 243, 0.9);
      border: 0.5px solid #979797;
      box-sizing: border-box;
      box-shadow: 0px 2px 15px rgb(0 0 0 / 30%);

      &__header {
        padding-right: 12px;
        border-bottom: 0.5px solid #979797;
        > span {
          font-weight: 700;
        }
      }

      &__close-btn {
        width: 24px;
        height: 24px;
        padding: 0;
      }
    }

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
}
</style>
