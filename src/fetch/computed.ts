import { FetchStates } from './'
import { Ref, computed } from 'vue'

export const isRequest = (src: any): src is Request => {
  return src instanceof Request
}

export const isBaseURL = (src: any): src is string => {
  const schemes = ['http://', 'https://']
  if (typeof src !== 'string') {
    return false
  }
  return schemes.some((scheme) => src.startsWith(scheme))
}

export const isOnFetchState = (current: Ref<FetchStates>, target: FetchStates) => {
  return computed(() => current.value === target)
}

export const isFetchCompleted = (current: Ref<FetchStates>) => {
  return isOnFetchState(current, FetchStates.Completed)
}

export const isFetchFetching = (current: Ref<FetchStates>) => {
  return isOnFetchState(current, FetchStates.Fetching)
}

export const isFetchIdle = (current: Ref<FetchStates>) => {
  return isOnFetchState(current, FetchStates.Idle)
}
