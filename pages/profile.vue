<template>
  <el-card :class="$style.container">
    <portal to="right-toolbar">
      <nuxt-link to="/">
        <el-button :class="$style.backBtn" icon="el-icon-arrow-left">Back </el-button>
      </nuxt-link>
    </portal>
    <div :class="$style.form">
      <el-avatar :class="$style.formAvatar" :size="120">{{ user.lastName | leadWord }}</el-avatar>
      <div :class="$style.formInner">
        <el-form label-position="left" label-width="200px">
          <el-form-item label="User Name*">
            <editable v-model="userForm.userName" :is-editing="isEditingUser" />
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
            <el-button
              v-else
              :class="$style.saveBtn"
              type="danger"
              :loading="loading"
              :disabled="loading"
              @click="saveUserForm"
            >
              Save
            </el-button>
          </div>
        </el-form>

        <el-form :class="$style.passForm" label-position="left" label-width="200px">
          <p :class="$style.title">Change Password</p>
          <el-form-item label="Old Password">
            <editable
              v-model="passForm.oldPassword"
              :is-editing="isEditingPass"
              placeholder="input old password"
              type="password"
            />
          </el-form-item>
          <el-form-item label="New password">
            <editable
              v-model="passForm.newPassword"
              :is-editing="isEditingPass"
              placeholder="input new password"
              type="password"
            />
          </el-form-item>
          <el-form-item label="Confirm New Password">
            <editable
              v-model="passForm.confirmPassword"
              :is-editing="isEditingPass"
              placeholder="input new password"
              type="password"
            />
          </el-form-item>

          <div :class="$style.bottomBtns">
            <el-button v-if="isEditingPass === true" :class="$style.editBtn" type="text" @click="cancelPassForm">
              Cancel
            </el-button>
            <el-button :class="$style.saveBtn" type="danger" :disabled="loading" @click="savePassForm">
              Change Password
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </el-card>
</template>

<script>
import isEqual from 'lodash/isEqual'
import cloneDeep from 'lodash/cloneDeep'
import { computed, getCurrentInstance, onMounted, reactive, toRefs, watch } from '@vue/composition-api'
import { useContext } from '@nuxtjs/composition-api'

export default {
  beforeRouteLeave(to, from, next) {
    if (this.isChangedData) {
      this.$showConfirmBox({ cancel: next, opts: { showMessage: false } })
    } else {
      next()
    }
  },
  layout: 'base',
  setup() {
    const vm = getCurrentInstance().proxy
    const { store, $storage } = useContext()
    const data = reactive({
      isEditingUser: false,
      isEditingPass: false,
      originalUserForm: null,
      originalPassForm: null,
      isChangedData: false,
      loading: false,
      user: computed(() => store.getters['user/loggedInUser'] || {}),
      loggedInEmail: computed(() => store.getters['user/loggedInEmail']($storage)),
      passForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      userForm: {
        userName: 'Quang Tran',
        email: 'admin@gmail.com',
        tel: '123-123-123',
      },
    })

    const saveUserForm = async () => {
      if (data.loading) return
      data.loading = true
      const { userName, tel, email } = data.userForm
      const names = userName?.split(' ')
      const reqData = {
        firstName: names.slice(0, 1).join(''),
        lastName: names.slice(1).join(' '),
        login: email,
        tel,
      }
      await store.dispatch('user/updateProfile', { userId: data.user.userId, reqData })
      initialProfilers()
      data.loading = false
      data.isEditingUser = false
    }

    const savePassForm = async () => {
      if (data.isEditingPass === false) {
        return (data.isEditingPass = true)
      }

      if (data.loading) return
      data.loading = true
      const { oldPassword, newPassword } = data.passForm
      const reqData = {
        oldPassword,
        newPassword,
      }
      await store.dispatch('user/changePassword', { userId: data.user.userId, reqData })
      data.loading = false
      data.isEditingPass = false
    }

    const cancelPassForm = () => {
      if (!isEqual(data.originalPassForm, data.passForm)) {
        vm.$showConfirmBox({
          cancel: () => (data.passForm = data.originalPassForm),
          final: () => (data.isEditingPass = false),
        })
      } else {
        data.isEditingPass = false
      }
    }

    const initialProfilers = () => {
      const _userInfo = {
        userName: data.user.firstName + ' ' + data.user.lastName,
        email: data.loggedInEmail,
        tel: data.user.tel,
      }
      data.userForm = Object.assign({}, data.userForm, _userInfo)
    }

    watch(
      () => [isEqual(data.originalUserForm, data.userForm), isEqual(data.originalPassForm, data.passForm)],
      ([a, b]) => {
        data.isChangedData = a || b
      }
    )

    onMounted(() => {
      initialProfilers()
      data.originalUserForm = cloneDeep(data.userForm)
      data.originalPassForm = cloneDeep(data.passForm)
    })

    return {
      ...toRefs(data),
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
