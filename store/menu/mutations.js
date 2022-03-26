import { NAV_INDEXS } from '~/constants'

export default {
  SET_MENU(state, currentNav) {
    state.currentNav = currentNav
  },
  SET_DATE_RANGE(state, dateRange) {
    state.dateRange = dateRange
  },
  RESET_MENU(state) {
    state.currentNav = NAV_INDEXS.TODAY
    state.dateRange = null
  },
}
