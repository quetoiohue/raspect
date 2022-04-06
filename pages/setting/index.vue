<template>
  <el-container direction="vertical" :class="$style.container">
    <portal to="right-toolbar">
      <div :class="$style.headerTitle">International Commerce Centre</div>
    </portal>
    <el-container direction="vertical">
      <div :class="$style.title">Setting</div>
      <el-container direction="vertical" :class="$style.container">
        <filter-bar :filter="filter" @set-filter="setFilter" />
        <el-row :gutter="50">
          <el-col v-for="(_, type) in mockData" :key="type" :span="8">
            <div :class="$style.listTitle">{{ getTitle(type) }}</div>
            <collapse-items v-for="group in mockData[type].groups" :key="group.subTitle" :sub-title="group.subTitle">
              <nuxt-link
                v-for="(item, index) in group.items"
                :key="group.subTitle + index"
                :to="`/setting/${index}?type=${type === 'elevator' ? 'elevator' : 'sensor'}`"
              >
                <li :class="[$style.listItem, $style[type], 'list-item']">
                  <template v-if="type === 'location'">
                    <span :class="$style.icon"><icons name="ic-layer" /></span>
                    <span :class="$style.name">{{ item.name }}</span>
                    <chip :class="$style.chip" :label="group.items.length + ' elevators'" color="#4A90E2" />
                  </template>
                  <template v-else-if="type === 'elevator'">
                    <span :class="$style.icon"><icons name="ic-elevator" /></span>
                    <span :class="$style.name">{{ item.name }}</span>
                    <chip :class="$style.chip" :label="group.items.length + ' sensors'" color="#4A90E2" />
                  </template>
                  <template v-else>
                    <span :class="$style.icon"><icons name="ic-sensor-dark" /></span>
                    <span :class="$style.name">{{ item.name }}</span>
                    <chip
                      :class="$style.chip"
                      :label="item.status ? 'on' : 'off'"
                      :color="item.status ? '#26CB72' : 'rgba(0, 0, 0, 0.25)'"
                    />
                    <span :class="$style.type">
                      {{ item.type }}
                    </span>
                  </template>
                </li>
              </nuxt-link>
            </collapse-items>
          </el-col>
        </el-row>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { reactive, toRefs } from '@vue/composition-api'
import filterBar from '@/components/settings/filter-bar.vue'
import collapseItems from '@/components/settings/collapse-items.vue'

const mockData = {
  location: {
    groups: [
      {
        subTitle: 'Floor Group',
        items: Array.from({ length: 2 }, (_, idx) => ({
          name: 'Zone ' + (idx + 1),
          total: 5,
        })),
      },
    ],
  },
  elevator: {
    groups: [
      {
        subTitle: 'Zone 1',
        items: Array.from({ length: 5 }, (_, idx) => ({
          name: 'ELEVATOR 00 ' + (idx + 1),
          total: 5,
        })),
      },
      {
        subTitle: 'Zone 2',
        items: Array.from({ length: 2 }, (_, idx) => ({
          name: 'ELEVATOR 00 ' + (5 + idx),
          total: 5,
        })),
      },
    ],
  },
  sensor: {
    groups: [
      {
        subTitle: 'Elevator 001',
        items: Array.from({ length: 5 }, (_, idx) => ({
          name: 'sensor 000' + (idx + 1),
          total: 5,
          type: 'Type	Wireless Vibration',
          status: idx % 2,
        })),
      },
      {
        subTitle: 'Elevator 002',
        items: Array.from({ length: 2 }, (_, idx) => ({
          name: 'sensor 000' + (idx + 1),
          total: 5,
          type: 'Type	Wireless Vibration',
          status: idx % 2,
        })),
      },
    ],
  },
}

export default {
  components: {
    filterBar,
    collapseItems,
  },
  layout: 'base',
  setup() {
    const data = reactive({
      filter: {
        zone: '',
        elevator: '',
        sensor: '',
      },
    })

    const getTitle = (type) => {
      switch (type) {
        case 'location':
          return `Location (${getTotalItems(mockData[type].groups)})`
        case 'elevator':
          return `Elevator (${getTotalItems(mockData[type].groups)})`
        case 'sensor':
          return `Sensor (${getTotalItems(mockData[type].groups)})`
        default:
          return ''
      }
    }

    const getTotalItems = (groups) => {
      return groups.reduce((acc, group) => acc + group.items.length, 0)
    }

    const setFilter = (key, value) => {
      data.filter[key] = value
    }

    return {
      ...toRefs(data),
      mockData,
      setFilter,
      getTitle,
    }
  },
}
</script>

<style lang="scss" module>
.container {
  .title {
    font-weight: $font-weight-primary;
    font-size: $font-size-extra-large;
    line-height: 27px;
    margin-bottom: 12px;
    color: $color-text;
  }
  .listTitle {
    height: 40px;
    line-height: 40px;
    background: #ffffff;
    border: 0.75px solid #979797;
    border-radius: 5px;
    text-align: center;
    font-weight: bold;
    color: $color-text;
    margin-bottom: 10px;
  }
}
.headerTitle {
  font-weight: $font-weight-primary;
  font-size: 20px;
  line-height: 27px;
  color: $color-text;
}
.listItem {
  .name {
    font-weight: $font-weight-primary;
    font-size: $font-size-small;
    color: $color-black;
  }
  .chip {
    margin-left: auto;
  }
  .icon {
    margin-right: 6px;
    > :global(svg) {
      display: inline-block;
      vertical-align: middle;
    }
  }
  &.elevator {
    .icon {
      margin-right: 22px;
    }
    .name {
      text-transform: uppercase;
    }
  }
  &.sensor {
    position: relative;
    .type {
      font-size: $font-size-small;
      position: absolute;
      bottom: 4px;
      color: $border-color-light;
    }
  }
}
</style>
