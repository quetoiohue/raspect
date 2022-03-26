import { STATUS_INDEXS } from '~/constants'

export default () => ({
  list: [
    {
      id: '#001',
      content: 'Sensor 0001@bearing 2 Recommened to replace bearing immediately',
      time: '2 mins ago',
      status: STATUS_INDEXS.MAJOR,
    },
    {
      id: '#002',
      content: 'Sensor 0001@bearing 2 Recommened to replace bearing immediately',
      time: '2 mins ago',
      status: STATUS_INDEXS.MODERATE,
    },
    {
      id: '#003',
      content: 'Sensor 0001@bearing 2 Recommened to replace bearing immediately',
      time: '2 mins ago',
      status: STATUS_INDEXS.MINOR,
    },
    {
      id: '#004',
      content: 'Sensor 0001@bearing 2 Recommened to replace bearing immediately',
      time: '2 mins ago',
      status: STATUS_INDEXS.NORMAL,
    },
  ],
})
