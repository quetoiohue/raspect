<template>
  <div :class="$style.container">
    <portal to="right-toolbar">
      <div :class="$style.welcomeTitle">Welcome Back <span>Admin CHAN</span></div>
    </portal>
    <div :class="$style.title">All Buildings (1)</div>
    <div :class="$style.list">
      <nuxt-link to="/1">
        <el-card :body-style="{ padding: '0px' }" :class="$style.listItem">
          <img src="~/static/building.svg" class="image" />
          <div :class="$style.metas">
            <strong>International Commerce Centre</strong>
            <p :class="$style.address">1 Autsin Road West, West Kowloon</p>
            <p :class="$style.author">Created by <span>Admin Chan</span> on <span>1 Jan 2021</span></p>
          </div>
        </el-card>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'base',
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

  .list {
    display: flex;
    flex-wrap: wrap;
    &Item {
      width: 300px;
      .metas {
        padding: 12px 20px;
        strong {
          margin-bottom: 24px;
        }
        .address {
          margin-bottom: 24px;
          font-size: $font-size-small;
        }
        .author {
          font-size: 10px;
          span {
            font-weight: $font-weight-primary;
          }
        }
      }
    }
  }
}

.welcomeTitle {
  font-weight: $font-weight-primary;
  font-size: $font-size-extra-large;

  span {
    color: $color-text-danger;
  }
}
</style>
