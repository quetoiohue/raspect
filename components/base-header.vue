<template>
  <div :class="$style.header">
    <div :class="$style.titleContainer">
      <span>
        <img :class="$style.logo" src="~/static/icons/icon.svg" />
      </span>
      <span>
        <el-input :class="$style.searchBar" placeholder="Building Name / Building ID" prefix-icon="el-icon-search" />
      </span>
    </div>

    <el-popover
      ref="menu"
      placement="bottom-end"
      width="400"
      trigger="click"
      :visible-arrow="false"
      popper-class="setting-popover"
    >
      <div :class="$style.user">
        <div :class="$style.userInfo">
          <el-avatar :class="$style.userInfoAvatar" :size="100">A</el-avatar>
          <div :class="$style.userInfoText">
            <div :class="$style.userInfoTextName">Admin CHAN</div>
            <div>ID: admin_chan@schindler.com</div>
            <nuxt-link to="/profile">
              <el-button @click="closePopup">Edit Profile</el-button>
            </nuxt-link>
          </div>
        </div>
        <div :class="$style.userBottomAction">
          <nuxt-link to="/login">
            <el-button type="text">Sign Out</el-button>
          </nuxt-link>
        </div>
      </div>
      <div slot="reference" :class="$style.userSettingBtn">
        <span>
          <el-avatar :class="$style.userSettingAvatar" :size="35">A</el-avatar>
        </span>
        <span>Admin</span>
        <span><i class="el-icon-caret-bottom"></i> </span>
      </div>
    </el-popover>
  </div>
</template>

<script>
import { getCurrentInstance } from '@vue/composition-api'

export default {
  setup() {
    const vm = getCurrentInstance().proxy

    const closePopup = () => vm.$refs.menu && vm.$refs.menu.doClose()

    return {
      closePopup,
    }
  },
}
</script>

<style lang="scss" module>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 $header-padding;
  background: $background-color-header;
  height: $header-height;
  .titleContainer {
    display: flex;
    align-items: center;
    .logo {
      width: 160px;
      height: auto;
    }
    span {
      + span {
        margin-left: 64px;
      }
      .searchBar {
        :global(input) {
          height: 35px;
          border-radius: 100px;
          width: 344px;
        }
      }
    }
  }
}

.userSettingBtn {
  cursor: pointer;
  > span {
    vertical-align: middle;
    + span {
      margin-left: 10px;
    }
  }
}

.user {
  &Info {
    display: flex;
    padding-bottom: 30px;
    border-bottom: 1px solid #d8d8d8;
    &Avatar {
      flex: none;
      font-size: 3rem;
    }
    &Text {
      margin-left: 20px;
      &Name {
        font-weight: 600;
        font-size: 16px;
        line-height: 22px;
        + div {
          font-size: 14px;
          line-height: 19px;
          margin-bottom: 20px;
        }
      }
      button {
        padding: 8px 40px;
      }
    }
  }
  &BottomAction {
    margin-top: 18px;
  }
}

:global {
  .setting-popover {
    margin: 0;
  }
}
</style>
