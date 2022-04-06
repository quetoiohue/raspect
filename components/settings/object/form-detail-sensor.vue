<template>
  <el-form label-position="top" label-width="100px" :class="$style.elForm">
    <div :class="$style.formHeader">
      <icons :class="$style.icon" name="ic-sensor-dark" />
      <editable value="Sensor 00002" :class="$style.name" />
      <chip :class="$style.status" color="#26CB72" label="on" />
    </div>
    <div :class="$style.formHeader">
      <template v-if="isEditing">
        <span :class="$style.btn" @click.prevent="checkDirty">Cancel</span>
        <span :class="$style.btn" @click="saveSensorForm"> Save </span>
      </template>
      <span v-else :class="$style.btn" @click.prevent="isEditing = true">Edit</span>
    </div>

    <el-form-item label="Name">
      <editable v-model="sensorForm.name" :is-editing="isEditing" />
    </el-form-item>
    <el-form-item label="Type">
      <editable v-model="sensorForm.type" :is-editing="isEditing" />
    </el-form-item>
    <el-form-item label="Model">
      <editable v-model="sensorForm.model" :is-editing="isEditing" />
    </el-form-item>
    <el-form-item label="Link">
      <editable v-model="sensorForm.link" :is-editing="isEditing" />
    </el-form-item>
  </el-form>
</template>
<script>
import { getCurrentInstance, onMounted, reactive, toRefs, watch } from '@vue/composition-api'
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'

export default {
  setup() {
    const vm = getCurrentInstance().proxy
    const data = reactive({
      originalSensorForm: null,
      isEditing: false,
      sensorForm: {
        name: 'Elevator 002',
        type: 'Zone 2',
        model: '100F - 120F',
        link: 'Schindler 3000',
      },
    })

    const saveSensorForm = () => {
      console.log('🚀 ~ file:', data.originalSensorForm, data.sensorForm)
    }

    const checkDirty = () => {
      if (!isEqual(data.originalSensorForm, data.sensorForm)) {
        vm.$showConfirmBox({
          cancel: () => (data.sensorForm = cloneDeep(data.originalSensorForm)),
          final: () => (data.isEditing = false),
        })
      } else {
        data.isEditing = false
      }
    }

    onMounted(() => {
      data.originalSensorForm = cloneDeep(data.sensorForm)
    })

    watch(
      () => isEqual(data.originalSensorForm, data.sensorForm),
      (val, oldVal) => {
        val ^ oldVal && vm.$root.$emit('changed-data', !val)
      },
      { deep: true }
    )

    return {
      ...toRefs(data),
      saveSensorForm,
      checkDirty,
    }
  },
}
</script>
<style lang="scss" module>
.elForm {
  margin-bottom: 100px;
  .formHeader {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .btn {
      margin-left: auto;
      color: $color-text-danger;
      font-weight: $font-weight-primary;
      text-align: center;
      cursor: pointer;
      + .btn {
        margin-left: 16px;
      }
    }
    .name {
      :global(input) {
        font-weight: $font-weight-primary;
        font-size: 18px;
      }
    }
    .icon {
      width: 40px;
      height: 40px;
      padding: 10px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.08);
      text-align: center;
      + div,
      + span {
        margin-left: 16px;
      }
    }
    :global(.el-input) {
      width: auto;
      margin-right: auto;
      font-weight: $font-weight-primary;
      font-size: 18px;
    }
  }
  :global {
    .el-form-item {
      &__label {
        font-size: $font-size-small;
      }
      .el-input {
        &__inner {
          font-weight: $font-weight-primary;
          font-size: $font-size-base;
          &[contenteditable='false'] {
            padding: 0;
          }
        }
      }
    }
  }
}
</style>
