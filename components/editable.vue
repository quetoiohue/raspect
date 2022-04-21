<template>
  <div class="el-input" @click="onDbClick">
    <input
      v-bind="$attrs"
      autocomplete="off"
      class="el-input__inner"
      :value="value"
      :contenteditable="isEditable"
      :readonly="!isEditable"
      @input="onInput"
    />
  </div>
</template>
<script>
import { reactive, toRefs, watch } from '@vue/composition-api'

const TRIGGER_EVENTS = ['dbclick']
const CLICK_DURATION = 300

export default {
  inheritAttrs: false,
  props: {
    value: String,
    isEditing: Boolean,
    triggerEvent: {
      type: String,
      validator: (value) => TRIGGER_EVENTS.includes(value),
    },
  },
  setup(props, { emit }) {
    let clicks = 0
    let clickTimer

    const data = reactive({
      isEditable: false,
    })

    const onInput = (event) => {
      emit('input', event.target.value)
    }

    const onDbClick = (e) => {
      if (!TRIGGER_EVENTS.includes(props.triggerEvent)) return e.preventDefault()

      dbClick(() => {
        data.isEditable = !data.isEditable
      })
    }

    const dbClick = (cb) => {
      clicks++
      if (clicks === 1) {
        clickTimer = setTimeout(() => {
          clicks = 0
        }, CLICK_DURATION)
      } else {
        clearTimeout(clickTimer)
        cb?.()
        clicks = 0
      }
    }

    watch(
      () => props.isEditing,
      (value) => {
        data.isEditable = value
      },
      { immediate: true }
    )

    return {
      ...toRefs(data),
      onInput,
      onDbClick,
    }
  },
}
</script>
<style lang=""></style>
