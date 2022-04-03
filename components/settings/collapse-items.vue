<template>
  <div :class="$style.list">
    <div :class="$style.collapseBox">
      <div :class="$style.collapseBar">
        <span :class="$style.label">{{ subTitle }}</span>
        <span :class="$style.dashLine" />
        <span :class="$style.icon" @click="collapse = !collapse">
          <icons name="ic-collapse-down" />
        </span>
      </div>
      <transition name="fade">
        <ul v-if="!collapse" :class="$style.listItems">
          <slot />
        </ul>
      </transition>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from '@vue/composition-api'
export default {
  props: {
    subTitle: String,
  },
  setup() {
    const data = reactive({
      collapse: false,
    })

    return {
      ...toRefs(data),
    }
  },
}
</script>
<style lang="scss" module>
.list {
  .collapseBox {
    .collapseBar {
      height: 40px;
      line-height: 40px;
      display: flex;
      align-items: center;
      .label {
        font-weight: bold;
        color: $color-text;
        margin-right: 8px;
      }
      .dashLine {
        flex: 1;
        height: 2px;
        background: repeating-linear-gradient(to right, transparent, transparent 2%, $color-text 2%, $color-text 4%);
        margin-right: 15px;
      }
      .icon {
        cursor: pointer;
        :global(svg) {
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
    .listItems {
      :global(.list-item) {
        background: $color-white;
        box-shadow: 0px 1px 2px 1px rgb(187 187 187 / 80%);
        border-radius: 5px;
        min-height: 60px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        padding: 15px 22px;
        transition: 0.3s all;
        cursor: pointer;

        &:hover {
          border: 1px solid $color-text;
          box-shadow: 0px 1px 4px 1px rgba(187, 187, 187, 0.8);
        }
      }
    }
  }
}
</style>
