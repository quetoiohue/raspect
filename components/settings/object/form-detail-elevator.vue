<template>
  <el-form label-position="top" label-width="100px" :class="$style.elForm">
    <div :class="$style.formHeader">
      <icons :class="$style.icon" name="ic-elevator" />
      <editable v-model="elevatorForm.name" :is-editing="isEditing" :class="$style.subtitle" />

      <template v-if="isEditing">
        <span :class="$style.btn" @click.prevent="checkDirty">Cancel</span>
        <span :class="[$style.saveBtn, $style.btn]" @click="saveElevatorForm"> Save </span>
      </template>
      <span v-else :class="$style.btn" @click.prevent="isEditing = true">Edit</span>
    </div>

    <div :class="$style.groupItem">
      <el-form-item label="Location">
        <editable v-model="elevatorForm.location" :is-editing="isEditing" />
      </el-form-item>
      <el-form-item label="Floor Served">
        <editable v-model="elevatorForm.floor" :is-editing="isEditing" />
      </el-form-item>
      <el-form-item label="Elevator Model">
        <editable v-model="elevatorForm.modal" :is-editing="isEditing" />
      </el-form-item>
    </div>

    <div :class="$style.groupItem">
      <el-form-item label="Installation Date">
        <editable v-model="elevatorForm.installation_date" :is-editing="isEditing" />
      </el-form-item>
      <el-form-item label="Last Inspection Date">
        <editable v-model="elevatorForm.inspection_date" :is-editing="isEditing" />
      </el-form-item>
    </div>
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
      originalElevatorForm: null,
      isEditing: false,
      elevatorForm: {
        name: 'Elevator 002',
        location: 'Zone 2',
        floor: '100F - 120F',
        modal: 'Schindler 3000',
        installation_date: '12 Jun 2020',
        inspection_date: '12 Jun 2021',
      },
    })

    const saveElevatorForm = () => {}

    const checkDirty = () => {
      if (!isEqual(data.originalElevatorForm, data.elevatorForm)) {
        vm.$showConfirmBox({
          cancel: () => (data.elevatorForm = cloneDeep(data.originalElevatorForm)),
          final: () => (data.isEditing = false),
        })
      } else {
        data.isEditing = false
      }
    }

    onMounted(() => {
      data.originalElevatorForm = cloneDeep(data.elevatorForm)
    })

    watch(
      () => isEqual(data.originalElevatorForm, data.elevatorForm),
      (val, oldVal) => {
        val ^ oldVal && vm.$root.$emit('changed-data', !val)
      },
      { deep: true }
    )

    return {
      ...toRefs(data),
      saveElevatorForm,
      checkDirty,
    }
  },
}
</script>
<style lang="scss" module>
.elForm {
  border-bottom: 1px dashed $border-color-light;
  margin-bottom: 14px;
  .groupItem,
  .formHeader {
    display: flex;
    align-items: center;
    .btn {
      width: 92px;
      color: $color-text-danger;
      font-weight: $font-weight-primary;
      text-align: center;
      cursor: pointer;
    }
  }
  .groupItem {
    column-gap: 20px;
  }
  .formHeader {
    margin-bottom: 20px;
    .icon {
      + div,
      + span {
        margin-left: 16px;
      }
    }
    :global(.el-input) {
      width: auto;
      margin-right: auto;
    }
  }
  :global {
    .el-form-item {
      width: 30%;

      &__label {
        font-size: 10px;
      }
      .el-input {
        &__inner {
          font-weight: $font-weight-primary;
          font-size: 11px;
          &[contenteditable='false'] {
            padding: 0;
          }
        }
      }
    }
  }
}
</style>
