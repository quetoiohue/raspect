export default {
  setLoggedInUser(state, info) {
    state.loggedInUser = Object.assign(state.loggedInUser, info)
  },
}
