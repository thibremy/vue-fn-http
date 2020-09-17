import { watchEffect } from '@vue/composition-api'
import { FetchComposition } from './use-fetch'

export const watchFetchRequest = <T>(fetch: FetchComposition<T>, handler: Function) => {
  return watchEffect(async () => {
    const request = fetch.request.value
    await handler(request)
  })
}

export const watchFetchResponse = <T>(fetch: FetchComposition<T>, handler: Function) => {
  return watchEffect(async () => {
    const response = fetch.response.value
    await handler(response)
  })
}
