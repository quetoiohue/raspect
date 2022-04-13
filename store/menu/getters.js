import { NAV_INDEXS } from '~/constants'
import { genWeekly, genYearly, genDaily } from '~/utils/dashboard'

export default {
  selectedDates(state) {
    switch (state.currentNav) {
      case NAV_INDEXS.WEEKLY:
        return genWeekly()
      case NAV_INDEXS.YEARLY:
        return genYearly()
      case NAV_INDEXS.MONTHLY:
      case NAV_INDEXS.DATE:
        return genDaily(state.currentNav)
      default:
        return {}
    }
  },
}
