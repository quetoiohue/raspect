<template>
  <el-card :class="$style.container">
    <div :class="$style.header">
      <div :class="$style.headerTitle">Installation Details</div>
      <template v-if="isEditing">
        <el-button type="text" :class="$style.btnText" @click="checkDirty">Cancel</el-button>
        <el-button type="danger" :class="$style.btn">Save</el-button>
      </template>
      <el-button v-else type="text" :class="$style.btnText" @click="isEditing = true">Edit</el-button>
    </div>
    <el-container>
      <el-form :class="$style.elForm" label-position="left" label-width="150px">
        <el-form-item label="Installation Date*">
          <el-date-picker v-if="isEditing" v-model="sensorForm.insDate" />
          <editable v-else v-model="sensorForm.insDate" />
        </el-form-item>
        <el-form-item label="Sensor Location">
          <div v-if="isEditing" :class="$style.groupItem">
            <el-select v-model="sensorForm.insLoc.zone" placeholder="All Zones">
              <el-option v-for="item in ZONE_OPTIONS" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="sensorForm.insLoc.elevator" placeholder="All Elevators">
              <el-option v-for="item in ELEVATOR_OPTIONS" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <editable v-model="sensorForm.insLoc.motor" :class="$style.groupInput" :is-editing.sync="isEditing" />

            <el-select v-model="sensorForm.insLoc.bearing" placeholder="All Bearings">
              <el-option v-for="item in BEARING_OPTIONS" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>

          <editable v-else :value="getInsLocations()" />
        </el-form-item>
      </el-form>
    </el-container>
  </el-card>
</template>
<script>
import { getCurrentInstance, onMounted, reactive, toRefs, watch } from '@vue/composition-api'
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'
import { ELEVATOR_OPTIONS, ZONE_OPTIONS, BEARING_OPTIONS } from '@/constants'

export default {
  setup() {
    const vm = getCurrentInstance().proxy

    const data = reactive({
      isEditing: false,
      originForm: null,
      sensorForm: {
        insDate: '1 Jan 2021',
        insLoc: {
          zone: 'Zone 1',
          elevator: 'Elevator 001',
          motor: 'Motor',
          bearing: 'Bearing 1',
        },
      },
    })
    const getInsLocations = () => {
      return Object.values(data.sensorForm.insLoc).join(', ')
    }

    const checkDirty = () => {
      if (!isEqual(data.originForm, data.sensorForm)) {
        vm.$showConfirmBox({
          cancel: () => (data.sensorForm = cloneDeep(data.originForm)),
          final: () => (data.isEditing = false),
        })
      } else {
        data.isEditing = false
      }
    }

    watch(
      () => isEqual(data.originForm, data.sensorForm),
      (val, oldVal) => {
        val ^ oldVal && vm.$root.$emit('changed-data', !val)
      },
      { deep: true }
    )
    onMounted(() => {
      data.originForm = cloneDeep(data.sensorForm)
    })

    return {
      ...toRefs(data),
      getInsLocations,
      checkDirty,
      ELEVATOR_OPTIONS,
      ZONE_OPTIONS,
      BEARING_OPTIONS,
    }
  },
}
</script>
<style lang="scss" module>
.container {
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    button {
      margin-left: auto;
      font-weight: $font-weight-primary;
      padding: 8px 10px;
      width: 90px;
      color: $color-text-danger;
      + button {
        margin-left: 15px;
        color: $color-white;
      }
    }
  }
  .headerTitle {
    font-weight: $font-weight-primary;
    font-size: $font-size-base;
  }
  .elForm {
    flex: 1;
    max-width: 660px;
    .groupItem {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      column-gap: 20px;
      > div {
        width: 30%;
      }
    }
  }

  :global {
    .el-date-editor {
      height: 30px;
    }
  }
}
</style>
