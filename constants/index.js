export const NAV_INDEXS = Object.freeze({
  TODAY: 1,
  WEEKLY: 2,
  MONTHLY: 3,
  YEARLY: 4,
  DATE: 5,
})

export const NAVS = Object.freeze({
  [NAV_INDEXS.TODAY]: 'Today',
  [NAV_INDEXS.WEEKLY]: 'Weekly',
  [NAV_INDEXS.MONTHLY]: 'Monthly',
  [NAV_INDEXS.YEARLY]: 'Yearly',
  [NAV_INDEXS.DATE]: 'Pick a Date / Date range',
})

export const STATUS_INDEXS = Object.freeze({
  MAJOR: 1,
  MODERATE: 2,
  MINOR: 3,
  NORMAL: 4,
})

export const STATUSES = Object.freeze({
  [STATUS_INDEXS.MAJOR]: { color: '#f44336', label: 'Major' },
  [STATUS_INDEXS.MODERATE]: { color: '#ffb74d', label: 'Moderate' },
  [STATUS_INDEXS.MINOR]: { color: '#4a90e2', label: 'Minor' },
  [STATUS_INDEXS.NORMAL]: { color: '#9f9f9f', label: 'Normal' },
})

export const ZONES = Object.freeze({
  1: { color: 'rgba(216, 216, 216, 0.5)', label: 'Zone 1' },
  2: { color: 'rgba(187, 187, 187, 0.8)', label: 'Zone 2' },
  3: { color: '#797979', label: 'Zone 3' },
  4: { color: '#4a4a4a', label: 'Zone 4' },
  5: { color: '#848d9c', label: 'Zone 5' },
  6: { color: '#4a90e2', label: 'Hotel' },
})

export const UNIT_TYPES = {
  FT: 'ft',
  RPM: 'rpm',
  BSF: 'bsf',
  BPFO: 'bpfo',
  BPFI: 'bpfi',
}
