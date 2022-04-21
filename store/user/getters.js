import { LOCAL_STORAGE } from '~/constants'

export default {
  loggedInEmail: (state) => ($storage) => {
    return state.loggedInUser?.login || $storage.getLocalStorage(LOCAL_STORAGE.LOGGED_IN)
  },
  loggedInUser(state) {
    return state.loggedInUser
  },
  loggedInUserId: (state) => ($storage) => {
    return state.loggedInUser?.userId || $storage.getLocalStorage(LOCAL_STORAGE.USER_ID)
  },
  refreshToken: (state) => ($storage) => {
    return state.loggedInUser?.refreshToken || $storage.getLocalStorage(LOCAL_STORAGE.REFRESH_TOKEN)
  },
  getCorporateId(state) {
    return state.loggedInUser.corporates ? state.loggedInUser.corporates[0]?.corporateId : ''
  },
}
