import isEmpty from 'lodash/isEmpty'
import { LOCAL_STORAGE } from '~/constants'

export default async function ({ store, $storage, redirect }) {
  const user = store.getters['user/loggedInUser']
  const userId = store.getters['user/loggedInUserId']($storage)
  const refreshToken = $storage.getLocalStorage(LOCAL_STORAGE.REFRESH_TOKEN)

  if (!userId || !refreshToken) return redirect('/login')

  if (isEmpty(user)) {
    try {
      await store.dispatch('user/refreshToken', {
        userId,
        refreshToken,
      })
    } catch (error) {
      await store.dispatch('user/logout', {
        userId,
        refreshToken,
      })
      redirect('/login')
    }
  }
}
