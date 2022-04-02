export const METRICS = Array.from({ length: 100 }, (_, index) => ({
  ft: {
    frequency: (index * 100) | 0,

    velocity: Math.random().toFixed(2),
  },

  rpm: {
    frequency: (Math.random().toFixed(2) * 100000) | 0,

    velocity: Math.random().toFixed(2),
  },

  bsf: {
    frequency: (Math.random().toFixed(2) * 100000) | 0,

    velocity: Math.random().toFixed(2),
  },

  bpfo: {
    frequency: (Math.random().toFixed(2) * 100000) | 0,

    velocity: Math.random().toFixed(2),
  },

  bpfi: {
    frequency: (Math.random().toFixed(2) * 100000) | 0,

    velocity: Math.random().toFixed(2),
  },
}))
