export default {
  REMOVE_ALERT(state, id) {
    const _list = state.list.filter((alert) => alert.id !== id)
    state.list = _list
  },
  REMOVE_ALL_ALERT(state, id) {
    state.list = []
  },
}
