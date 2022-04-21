import API from '@/services/http'

export default function (ctx, inject) {
  const $api = new API(ctx).apiInstance

  inject('api', $api)
}
