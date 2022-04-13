import $moment from 'moment'
import { NAV_INDEXS } from '~/constants'

export const genWeekly = () => {
  const endDate = $moment()
  const startDate = endDate.clone().subtract(6, 'days')
  const results = {}
  let date = startDate

  while (date.isSameOrBefore(endDate)) {
    const key = date.format('MMM')
    if (!(key in results)) {
      results[key] = []
    }
    results[key].push(date.format('ddd'))
    date = date.clone().add(1, 'days')
  }

  return results
}

export const genYearly = () => {
  const endDate = $moment()
  const startDate = endDate.clone().subtract(12, 'months')
  const results = {}
  let date = startDate

  while (date.isSameOrBefore(endDate)) {
    const key = date.format('YYYY')
    if (!(key in results)) {
      results[key] = []
    }
    results[key].push(date.format('MMM'))
    date = date.clone().add(1, 'months')
  }

  return results
}

export const genDaily = (navIndex) => {
  const dateOffset = navIndex === NAV_INDEXS.MONTHLY ? 30 : 365
  const endDate = $moment()
  const startDate = endDate.clone().subtract(dateOffset, 'days')
  const results = {}
  let date = startDate

  while (date.isSameOrBefore(endDate)) {
    const key = date.format('MMM')
    if (!(key in results)) {
      results[key] = []
    }
    results[key].push(date.format('DD'))
    date = date.clone().add(1, 'days')
  }

  return results
}
