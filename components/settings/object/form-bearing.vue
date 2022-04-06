<template>
  <el-card :class="$style.container">
    <div :class="$style.header">
      <div :class="$style.headerTitle">Bearing 1 Information</div>
      <template v-if="isEditing">
        <el-button type="text" :class="$style.btnText" @click="checkDirty">Cancel</el-button>
        <el-button type="danger" :class="$style.btn">Save</el-button>
      </template>
      <el-button v-else type="text" :class="$style.btnText" @click="isEditing = true">Edit</el-button>
    </div>
    <el-container>
      <el-form :class="$style.elForm" label-position="left" label-width="150px">
        <el-form-item label="ID*">
          <editable :value="bearingForm.id" />
        </el-form-item>
        <el-form-item label="Model*">
          <editable v-model="bearingForm.model" :is-editing="isEditing" />
        </el-form-item>
        <el-form-item label="Inner diameter*">
          <editable v-model="bearingForm.innerDiameter" :is-editing="isEditing" />
        </el-form-item>
        <el-form-item label="Outer diameter*">
          <editable v-model="bearingForm.outerDiameter" :is-editing="isEditing" />
        </el-form-item>
        <el-form-item label="No. of ball(s)*">
          <editable v-model="bearingForm.No" :is-editing="isEditing" />
        </el-form-item>
        <el-form-item label="Diameter of ball(s)*">
          <editable v-model="bearingForm.diameterBall" :is-editing="isEditing" />
        </el-form-item>
        <el-form-item label="Contact angle*">
          <editable v-model="bearingForm.contact" :is-editing="isEditing" />
        </el-form-item>
        <el-form-item label="RPM*">
          <editable v-model="bearingForm.rpm" :is-editing="isEditing" />
        </el-form-item>
        <el-form-item label="Description">
          <editable v-model="bearingForm.desc" :is-editing="isEditing" />
        </el-form-item>

        <h3 :class="$style.headerTitle">Bearing#1 Installation Details</h3>
        <el-form-item label="Installation Date*">
          <el-date-picker v-if="isEditing" v-model="bearingForm.insDate" />
          <editable v-else v-model="bearingForm.insDate" />
        </el-form-item>
        <el-form-item label="Installation Location*">
          <div v-if="isEditing" :class="$style.groupItem">
            <el-select v-model="bearingForm.insLoc.zone" placeholder="All Zones">
              <el-option v-for="item in ZONE_OPTIONS" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="bearingForm.insLoc.elevator" placeholder="All Elevators">
              <el-option v-for="item in ELEVATOR_OPTIONS" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <editable v-model="bearingForm.insLoc.motor" :class="$style.groupInput" :is-editing.sync="isEditing" />

            <el-select v-model="bearingForm.insLoc.loadingEnd" placeholder="All Loadings">
              <el-option v-for="item in LOADING_OPTIONS" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>

          <editable v-else :value="getInsLocations()" />
        </el-form-item>
      </el-form>
      <div :class="$style.imageWrapper">
        <img src="~/static/bearing-section.svg" />
      </div>
    </el-container>
  </el-card>
</template>
<script>
import { getCurrentInstance, onMounted, reactive, toRefs, watch } from '@vue/composition-api'
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'
import { ELEVATOR_OPTIONS, ZONE_OPTIONS } from '@/constants'

const LOADING_OPTIONS = ['Loading End']

export default {
  setup() {
    const vm = getCurrentInstance().proxy

    const data = reactive({
      isEditing: false,
      originForm: null,
      bearingForm: {
        id: 'Bearing 1',
        model: 'model',
        innerDiameter: '000000 mm',
        outerDiameter: '000000 mm',
        No: '00 mm',
        diameterBall: '000000 mm',
        contact: '0 degree',
        rpm: 'RPM',
        desc: 'Description',
        insDate: '1 Jan 2021',
        insLoc: {
          zone: 'Zone 1',
          elevator: 'Elevator 001',
          motor: 'Motor',
          loadingEnd: 'Loading End',
        },
      },
    })
    const getInsLocations = () => {
      return Object.values(data.bearingForm.insLoc).join(', ')
    }

    const checkDirty = () => {
      if (!isEqual(data.originForm, data.bearingForm)) {
        vm.$showConfirmBox({
          cancel: () => (data.bearingForm = cloneDeep(data.originForm)),
          final: () => (data.isEditing = false),
        })
      } else {
        data.isEditing = false
      }
    }

    watch(
      () => isEqual(data.originForm, data.bearingForm),
      (val, oldVal) => {
        val ^ oldVal && vm.$root.$emit('changed-data', !val)
      },
      { deep: true }
    )
    onMounted(() => {
      data.originForm = cloneDeep(data.bearingForm)
    })

    return {
      ...toRefs(data),
      getInsLocations,
      checkDirty,
      ELEVATOR_OPTIONS,
      ZONE_OPTIONS,
      LOADING_OPTIONS,
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
    .groupItem {
      .groupInput {
        width: 200px;
        margin-top: 10px;
      }
    }
  }

  :global {
    .el-date-editor {
      height: 30px;
    }
    .el-input {
      max-width: 240px;
    }
  }
}
</style>
