<template>
  <el-card :class="$style.container">
    <portal to="right-toolbar">
      <nuxt-link to="/">
        <el-button :class="$style.backBtn" icon="el-icon-arrow-left">Back </el-button>
      </nuxt-link>
    </portal>
    <div :class="$style.form">
      <el-avatar :class="$style.formAvatar" :size="120">A</el-avatar>
      <div :class="$style.formInner">
        <el-form label-position="left" label-width="200px">
          <el-form-item label="User Name*">
            <editable v-model="userForm.username" :is-editing="isEditingUser" />
          </el-form-item>
          <el-form-item label="User Email*">
            <editable v-model="userForm.email" :is-editing="isEditingUser" />
          </el-form-item>
          <el-form-item label="Tel*">
            <editable v-model="userForm.tel" :is-editing="isEditingUser" />
          </el-form-item>

          <div :class="$style.bottomBtns">
            <el-button v-if="isEditingUser === false" :class="$style.editBtn" type="text" @click="isEditingUser = true">
              Edit
            </el-button>
            <el-button v-else :class="$style.saveBtn" type="danger" @click="saveUserForm">Save</el-button>
          </div>
        </el-form>

        <el-form :class="$style.passForm" label-position="left" label-width="200px">
          <p :class="$style.title">Change Password</p>
          <el-form-item label="Old Password">
            <editable v-model="passForm.oldPassword" :is-editing="isEditingPass" placeholder="input old password" />
          </el-form-item>
          <el-form-item label="New password">
            <editable v-model="passForm.newPassword" :is-editing="isEditingPass" placeholder="input new password" />
          </el-form-item>
          <el-form-item label="Confirm New Password">
            <editable v-model="passForm.confirmPassword" :is-editing="isEditingPass" placeholder="input new password" />
          </el-form-item>

          <div :class="$style.bottomBtns">
            <el-button v-if="isEditingPass === true" :class="$style.editBtn" type="text" @click="cancelPassForm">
              Cancel
            </el-button>
            <el-button :class="$style.saveBtn" type="danger" @click="savePassForm">Change Password</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </el-card>
</template>

<script>
import isEqual from 'lodash/isEqual'
import cloneDeep from 'lodash/cloneDeep'
import { getCurrentInstance, onMounted, reactive, toRefs } from '@vue/composition-api'

export default {
  layout: 'base',
  setup() {
    const vm = getCurrentInstance().proxy
    const userForm = reactive({
      username: 'Quang Tran',
      email: 'admin@gmail.com',
      tel: '123-123-123',
    })
    const passForm = reactive({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
    const data = reactive({
      isEditingUser: false,
      isEditingPass: false,
      originalUserForm: null,
      originalPassForm: null,
    })

    const saveUserForm = () => {
      if (!isEqual(data.originalUserForm, userForm)) {
        vm.$confirm('Changes not save yet. Leave without save?', {
          confirmButtonText: 'Save',
          cancelButtonText: 'Don’t save',
          cancelButtonClass: 'cancel-btn',
          confirmButtonClass: 'confirm-btn',
          type: 'error',
          center: true,
        })
          .then(() => {
            vm.$message({
              type: 'success',
              message: 'Update completed',
            })
          })
          .catch(() => {
            vm.$message({
              type: 'info',
              message: 'Update canceled',
            })
          })
          .finally(() => {
            data.isEditingUser = false
          })
      } else {
        data.isEditingUser = false
      }
    }

    const savePassForm = () => {
      if (data.isEditingPass === false) {
        return (data.isEditingPass = true)
      }

      data.isEditingPass = false
    }

    const cancelPassForm = () => {
      data.isEditingPass = false
    }

    onMounted(() => {
      data.originalUserForm = cloneDeep(userForm)
      data.originalPassForm = cloneDeep(passForm)
    })

    return {
      ...toRefs(data),
      userForm,
      passForm,
      saveUserForm,
      savePassForm,
      cancelPassForm,
    }
  },
}
</script>

<style lang="scss" module>
.container {
  padding: 40px;
  .form {
    display: flex;
    column-gap: 100px;
    .formAvatar {
      font-size: 72px;
    }
    &Inner {
      .title {
        margin: 60px 0 30px;
        font-weight: $font-weight-primary;
      }
      .bottomBtns {
        margin-top: 30px;
        > button {
          cursor: pointer;
          + button {
            margin-left: 16px;
          }
        }
        .editBtn {
          font-weight: $font-weight-primary;
          color: $color-text-danger;
        }
      }

      .passForm {
        :global {
          .el-input {
            &__inner {
              border: 1px solid #979797;
            }
          }
        }
      }
    }
  }
}
.backBtn {
  display: flex;
  align-items: center;
  background: none !important;
  border: none;
  font-size: 20px;
  padding: 4px 8px;
}
</style>
