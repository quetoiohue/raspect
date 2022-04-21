import { LOCAL_STORAGE } from '~/constants'

export default {
  setLocalUser(ctx, { data, params }) {
    this.$storage.setLocalStorage(LOCAL_STORAGE.AUTH_TOKEN, data.accessToken)
    this.$storage.setLocalStorage(LOCAL_STORAGE.REFRESH_TOKEN, data.refreshToken)
    this.$storage.setLocalStorage(LOCAL_STORAGE.USER_ID, data.userId)
    params.login && this.$storage.setLocalStorage(LOCAL_STORAGE.LOGGED_IN, params.login)
  },
  removeLocalUser() {
    this.$storage.removeLocalStorage(LOCAL_STORAGE.REFRESH_TOKEN)
    this.$storage.removeLocalStorage(LOCAL_STORAGE.AUTH_TOKEN)
    this.$storage.removeLocalStorage(LOCAL_STORAGE.USER_ID)
  },
  async login(ctx, params) {
    const { data } = await global.$api.post('/user/api/v1/auth/login', params)
    ctx.commit('setLoggedInUser', data)
    ctx.dispatch('setLocalUser', { data, params })
    return data
  },
  async updateProfile(ctx, { userId, reqData }) {
    const { data } = await global.$api.put(`/user/api/v1/users/${userId}`, reqData)
    ctx.commit('setLoggedInUser', data)
    return data
  },
  async changePassword(ctx, { userId, reqData }) {
    try {
      await global.$api.post(`/user/api/v1/users/${userId}/change-password`, reqData)
    } catch (error) {}
  },
  async forgotPassword(ctx, login) {
    try {
      await global.$api.post(`/user/api/v1/auth/reset-password`, {
        login,
      })
    } catch (error) {}
  },
  async refreshToken(ctx, params) {
    const { data } = await global.$api.post(`/user/api/v1/auth/refresh`, params)
    ctx.commit('setLoggedInUser', data)
    ctx.dispatch('setLocalUser', { data, params })
    return data
  },
  async logout(ctx) {
    const refreshToken = ctx.getters.refreshToken(this.$storage)
    const userId = ctx.getters.loggedInUserId(this.$storage)
    await global.$api.post(`/user/api/v1/auth/logout`, { refreshToken, userId })
    await ctx.dispatch('removeLocalUser')
  },
}
