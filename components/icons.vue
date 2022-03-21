<template>
  <div ref="svgImg" v-html="require(`~/static/icons/${name}.svg?raw`)" :class="{ 'icon-active': isActive }" />
</template>

<script>
import { getCurrentInstance, onMounted, reactive, toRefs, watch } from '@nuxtjs/composition-api'
export default {
  props: {
    name: String,
    activeColor: {
      type: String,
      default: '#ED2939',
    },
    isActive: Boolean,
  },
  setup(props) {
    const vm = getCurrentInstance().proxy
    const data = reactive({
      originFillColor: '',
    })

    const getPathElm = () => vm.$refs.svgImg?.querySelector('path')

    const setActive = () =>
      getPathElm() && getPathElm().setAttribute('fill', props.isActive ? props.activeColor : data.originFillColor)

    onMounted(() => {
      if (getPathElm()) {
        data.originFillColor = getPathElm().getAttribute('fill') || getPathElm().style.fill
        setActive()
      }
    })

    watch(
      () => props.isActive,
      () => setActive()
    )

    return {
      ...toRefs(data),
    }
  },
}
</script>
