<template>
  <div :class="$style.container">
    <div :class="$style.itemGroup">
      <label>Filter</label>
      <el-date-picker
        :value="filter.date"
        :class="$style.dateSelect"
        type="date"
        value-format="d MMM yyyy"
        placeholder="Pick a day"
        @input="setFilter('date', $event)"
      >
      </el-date-picker>
    </div>
    <div :class="$style.itemGroup">
      <label>Search</label>
      <el-input
        :value="filter.searchName"
        placeholder="Search name"
        @input="setFilter('searchName', $event)"
      ></el-input>
    </div>
    <template v-if="showButton">
      <el-button :class="$style.deleteBtn" type="default" plain @click="$emit('delete')"> Delete </el-button>
      <el-button type="danger" @click="$emit('download')"> Download</el-button>
    </template>
  </div>
</template>
<script>
import { getCurrentInstance } from '@vue/composition-api'
export default {
  props: {
    filter: Object,
    showButton: Boolean,
  },
  setup() {
    const vm = getCurrentInstance().proxy

    const setFilter = (key, $event) => {
      console.log('🚀 ~ file: filter-bar.vue ~ line 50 ~ setFilter ~ $event', $event)
      vm.$emit('set-filter', key, $event)
    }

    return {
      setFilter,
    }
  },
}
</script>
<style lang="scss" module>
.container {
  display: flex;
  align-items: center;
  column-gap: 20px;
  margin-bottom: 26px;

  strong {
    color: $color-text;
  }
  .dateSelect,
  .itemGroup {
    :global {
      .el-input {
        &__inner {
          font-weight: 600;
          font-size: 12px;
          background: none;
          color: $color-text;
          border: none;
          border-bottom: 1px solid #979797;
          border-radius: 0;
        }
      }
    }
  }
  .itemGroup {
    display: flex;
    align-items: center;
    > label {
      margin-right: 22px;
      font-weight: bold;
      color: $color-text;
    }
  }
  .deleteBtn {
    margin-left: auto;
    + button {
      margin: 0;
    }
  }
}
</style>
