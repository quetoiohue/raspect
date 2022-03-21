<template>
  <el-card :class="$style.boxCard">
    <h4>Elevator Monitoring System</h4>
    <el-form label-position="top" label-width="100%">
      <el-form-item>
        <div slot="label" :class="$style.linkLabel">
          <label>Email Address</label>
          <nuxt-link to="/login">
            <label>Sign In</label>
          </nuxt-link>
        </div>
        <el-input></el-input>
      </el-form-item>
      <div :class="$style.bottomBtns">
        <el-button type="danger">Send</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'IndexPage',
  layout: 'default',
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
