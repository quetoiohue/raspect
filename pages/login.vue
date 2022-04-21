<template>
  <el-card :class="$style.boxCard">
    <h4>Elevator Monitoring System</h4>
    <el-form label-position="top" label-width="100px">
      <el-form-item label="Email Address">
        <el-input v-model="username" />
      </el-form-item>
      <el-form-item label-width="100%">
        <div slot="label" :class="$style.linkLabel">
          <label>Password</label>
          <nuxt-link to="/forget-password">
            <label>Forgot password</label>
          </nuxt-link>
        </div>
        <el-input v-model="password" type="password" />
      </el-form-item>
      <div :class="$style.bottomBtns">
        <el-button type="danger" :disabled="disabled" :loading="loading" @click="login">Sign in</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<script>
import { computed, defineComponent, reactive, toRefs, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'IndexPage',
  layout: 'default',
  setup() {
    const { store } = useContext()
    const data = reactive({
      username: 'team_admin@raspect.ai',
      password: 'Raspect2021',
      loading: false,
      disabled: computed(() => data.loading || !data.username || !data.password),
    })

    const login = async () => {
      try {
        if (data.loading || data.disabled) return false
        data.loading = true
        await store.dispatch('user/login', { login: data.username, password: data.password })
        window.location.href = '/'
        data.loading = false
      } catch (error) {
        return false
      }
    }

    return {
      ...toRefs(data),
      login,
    }
  },
})
</script>

<style lang="scss" module>
.boxCard {
  width: 400px;
  padding: 36px 40px;
  margin: 27vh auto auto;
  h4 {
    font-weight: $font-weight-bold;
    line-height: 25px;
    margin: 0;
    margin-bottom: 35px;
  }
  .linkLabel {
    display: flex;
    justify-content: space-between;
    width: 100%;

    label + a {
      color: $color-danger;
      font-weight: $font-weight-primary;
    }
    label {
      cursor: pointer;
    }
  }

  .bottomBtns {
    text-align: center;
    margin-top: 45px;
  }

  :global {
    .el-form-item__label {
      width: 100%;
    }
  }
}
</style>
