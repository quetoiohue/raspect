<template>
  <div :class="$style.container">
    <portal to="right-toolbar">
      <div :class="$style.welcomeTitle">
        Welcome Back <span>{{ userName }}</span>
      </div>
    </portal>
    <div :class="$style.title">{{ `All Buildings (${list.length})` }}</div>
    <div :class="$style.list">
      <nuxt-link v-for="(building, index) in list" :key="index" :to="`/${building._id}`">
        <el-card :body-style="{ padding: '0px' }" :class="$style.listItem">
          <img src="~/static/building.svg" class="image" />
          <div :class="$style.metas">
            <strong>{{ building.name }}</strong>
            <p :class="$style.address">1 Autsin Road West, West Kowloon</p>
            <p :class="$style.author">
              Created by <span>{{ building.clientName }}</span> on <span>{{ building.startDate | dateFormat }}</span>
            </p>
          </div>
        </el-card>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, reactive, toRefs, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'base',
  setup() {
    const { store } = useContext()
    const data = reactive({
      corporateId: computed(() => store.getters['user/getCorporateId']),
      userName: computed(() => store.getters['user/loggedInUser']?.userName),
      list: computed(() => store.state.building.list),
    })

    onMounted(async () => {
      await store.dispatch('building/getBuildingList', {
        corporateId: data.corporateId,
        projectTypes: 'Monitoring.Elevator',
      })
    })

    return {
      ...toRefs(data),
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
