<template>
  <aside @mouseenter="isCollapse = false" @mouseleave="isCollapse = true">
    <el-menu
      :default-active="currentIndex"
      class="el-menu-vertical-demo"
      text-color="#4A4A4A"
      active-text-color="#ED2939"
      menu-trigger="click"
      :router="true"
      :collapse="isCollapse"
      @select="handleSelect"
    >
      <div class="user-info">
        <el-avatar class="user-info--vatar" :size="40">S</el-avatar>
        <div class="user-info--name">Schindler</div>
      </div>
      <el-menu-item index="buildingId" :route="{ name: 'buildingId' }">
        <icons name="ic-dashboard" :is-active="currentIndex === 'buildingId'" />
        <span slot="title" class="menuitem-name">Elevator Dashboard</span>
      </el-menu-item>
      <el-menu-item index="report" :route="{ name: 'report' }">
        <icons name="ic-report" :is-active="currentIndex === 'report'" />
        <span slot="title" class="menuitem-name">Report</span>
      </el-menu-item>

      <el-submenu index="setting">
        <template slot="title">
          <icons name="ic-setting" :is-active="currentIndex in ['setting', 'setting-alert', 'setting-contact']" />
          <span slot="title" class="menuitem-name">Setting</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="setting" :route="{ name: 'setting' }">Sensor Setting</el-menu-item>
          <el-menu-item index="setting-alert" :route="{ name: 'setting-alert' }">Alert Notification</el-menu-item>
          <el-menu-item index="setting-contact" :route="{ name: 'setting-contact' }">Notification Contact</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </aside>
</template>

<script>
import { onMounted, reactive, toRefs, useContext } from '@nuxtjs/composition-api'

export default {
  setup() {
    const { route } = useContext()
    const data = reactive({
      isCollapse: true,
      currentIndex: '',
    })

    const handleSelect = (index) => {
      data.currentIndex = index
    }

    onMounted(() => {
      data.currentIndex = route.value.name
    })

    return {
      ...toRefs(data),
      handleSelect,
    }
  },
}
</script>

<style lang="scss" module>
:global {
  .el-menu {
    min-height: 100%;

    &--collapse {
      width: 80px;
      .user-info {
        &--name {
          display: none;
        }
      }
      > .el-menu-item,
      .el-submenu > .el-submenu__title {
        justify-content: center;
        text-align: center;
        svg {
          width: 21px;
          height: 21px;
        }
        span {
          margin: 0;
        }
      }
    }

    &-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
    }

    &-item,
    .el-submenu__title {
      height: 60px;
      line-height: 60px;
      display: flex;
      &.is-active {
        border-right: 3px solid;
      }
      .menuitem-name {
        margin-left: 12px;
      }
    }

    .user-info {
      display: flex;
      align-items: center;
      padding: 20px;
      color: $color-text;
      &--avatar {
        background-color: $color-text;
        font-size: 21px;
      }
      &--name {
        font-weight: 600;
        line-height: 19px;
        margin-left: 16px;
      }
    }
  }
}
</style>
