<template>
  <el-card>
    <gmap-map ref="mapRef" :center="central" :zoom="15" map-type-id="terrain" :style="styles">
      <gmap-marker
        v-for="(m, index) in markers"
        :key="index"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center = m.position"
      />
    </gmap-map>
    <div :class="$style.addresses">
      <small>Address</small>
      <div>1 Austin Road West, West Kowloon‎</div>
      <small>Management Company</small>
      <div>Kai Shing Management Services Ltd</div>
    </div>
  </el-card>
</template>

<script>
import Vue from 'vue'
import * as GmapVue from 'gmap-vue'
import { Map as gmapMap, Marker as gmapMarker } from 'gmap-vue'
import { useContext } from '@nuxtjs/composition-api'

export default {
  components: {
    gmapMap,
    gmapMarker,
  },
  props: {
    central: {
      type: Object,
      default: () => ({ lat: 22.303627914794337, lng: 114.16031799744177 }),
    },
    markers: {
      type: Array,
      default: () => [{ id: 1, position: { lat: 22.303627914794337, lng: 114.16031799744177 } }],
    },
    zoom: {
      type: Number,
      default: 7,
    },
    styles: {
      type: Object,
      default: () => ({
        width: '100%',
        height: '140px',
      }),
    },
  },
  setup(props, { refs }) {
    const { $config } = useContext()
    Vue.use(GmapVue, {
      load: {
        key: $config.GOOGLE_API_KEY,
        libraries: '.places',
      },
      installComponents: false,
    })
  },
}
</script>

<style lang="scss" module>
.addresses {
  small {
    font-size: 10px;

    > small {
      margin-top: 10px;
    }
  }

  div {
    font-size: 12px;
    font-weight: 600;
  }
}
</style>
