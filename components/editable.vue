<template>
  <div class="el-input">
    <input
      v-bind="$attrs"
      type="text"
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

export default {
  inheritAttrs: false,
  props: { value: String, isEditing: Boolean },
  setup(props, { emit }) {
    const data = reactive({
      isEditable: false,
    })

    const onInput = (event) => {
      emit('input', event.target.value)
    }

    watch(
      () => props.isEditing,
      () => {
        data.isEditable = props.isEditing
      }
    )

    return {
      ...toRefs(data),
      onInput,
    }
  },
}
</script>
<style lang=""></style>
