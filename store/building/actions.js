export default {
  async getBuildingList(ctx, params) {
    const { corporateId, projectTypes } = params
    const { data } = await global.$api.get(`/asset/api/v1/corporates/${corporateId}/projects`, {
      params: {
        projectTypes,
      },
    })
    ctx.commit('SET_BUILDING_LIST', data)

    return data
  },
}
