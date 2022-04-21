<template>
  <div :class="$style.header">
    <div :class="$style.titleContainer">
      <span>
        <img :class="$style.logo" src="~/static/icons/icon.svg" />
      </span>
      <span>
        <el-input
          v-if="showSearchBar"
          :class="$style.searchBar"
          :placeholder="placeholder"
          prefix-icon="el-icon-search"
        />
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
          <el-avatar :class="$style.userInfoAvatar" :size="100">{{ user.userName | leadWord }}</el-avatar>
          <div :class="$style.userInfoText">
            <div :class="$style.userInfoTextName">{{ user.userName }}</div>
            <div>{{ `ID: ${loggedInEmail}` }}</div>
            <nuxt-link to="/profile">
              <el-button @click="closePopup">Edit Profile</el-button>
            </nuxt-link>
          </div>
        </div>
        <div :class="$style.userBottomAction">
          <el-button type="text" @click.prevent="logout">Sign Out</el-button>
        </div>
      </div>
      <div slot="reference" :class="$style.userSettingBtn">
        <span>
          <el-avatar :class="$style.userSettingAvatar" :size="35">{{ user.userName | leadWord }}</el-avatar>
        </span>
        <span>{{ user.lastName }}</span>
        <span><i class="el-icon-caret-bottom"></i> </span>
      </div>
    </el-popover>
  </div>
</template>

<script>
import { computed, getCurrentInstance, reactive, toRefs } from '@vue/composition-api'
import { useContext } from '@nuxtjs/composition-api'

export default {
  setup() {
    const vm = getCurrentInstance().proxy
    const { route, store, $storage, next } = useContext()
    const SHOWED_SEARCH_ROUTES = ['index', 'buildingId']
    const PLACEHOLDERS = {
      index: 'Building Name / Building ID',
      buildingId: 'Find elevator',
    }

    const data = reactive({
      showSearchBar: computed(() => SHOWED_SEARCH_ROUTES.includes(route.value.name)),
      placeholder: computed(() => PLACEHOLDERS[route.value.name]),
      user: computed(() => store.getters['user/loggedInUser'] || {}),
      loggedInEmail: computed(() => store.getters['user/loggedInEmail']($storage)),
    })

    const closePopup = () => vm.$refs.menu && vm.$refs.menu.doClose()
    const logout = async () => {
      await store.dispatch('user/logout')
      await next('/login')
    }

    return {
      ...toRefs(data),
      closePopup,
      logout,
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
