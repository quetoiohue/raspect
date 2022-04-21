import axios from 'axios'
import { LOCAL_STORAGE } from '~/constants'

export default class API {
  apiInstance = null

  constructor(context) {
    this.apiInstance = this.getAPIInstance(context)
    global.$api = this.apiInstance
  }

  getAPIInstance(context) {
    const instance = axios.create({
      baseURL: context.$config.BASE_URL,
    })

    // Add a request interceptor
    instance.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        if (process.client) {
          const authToken = context.$storage.getLocalStorage(LOCAL_STORAGE.AUTH_TOKEN)
          if (authToken) {
            config.headers.common.Authorization = 'Bearer ' + authToken
          }
        }

        return config
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error)
      }
    )

    return instance
  }
}
