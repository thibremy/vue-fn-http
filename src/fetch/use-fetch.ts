import { Ref, computed, ref, watchEffect } from '@vue/composition-api'
import { isRequest, isBaseURL, isFetchFetching, isFetchCompleted, isFetchIdle } from './computed'

export enum FetchStates {
  Idle = 'idle',
  Fetching = 'fetching',
  Completed = 'completed',
}

export type FetchFunction = (
  urlOrOtherRequestInfo?: RequestInfo,
  init?: RequestInit
) => Promise<Response>

export type FetchComposition<T> = {
  fetch: FetchFunction
  isFetching: Ref<boolean>
  isCompleted: Ref<boolean>
  isIdle: Ref<boolean>
  state: Ref<FetchStates>
  request: Ref<Request | null>
  response: Ref<Response | null>
  error: Ref<Error | null>
  abort: Function
  json: Ref<T | null>
  blob: Ref<Blob | undefined>
  text: Ref<string>
}

export const createAbortController = (): AbortController | null => {
  if (window && (window as any).AbortController) {
    return new AbortController()
  }

  if (AbortController) {
    return new AbortController()
  }

  return null
}

export function useFetch<T>(
  requestInfo?: RequestInfo,
  requestInit?: RequestInit
): FetchComposition<T> {
  const requestInfoRef = ref(requestInfo || '')
  const requestInitRef = ref(requestInit || {})
  const requestRef = ref<Request | null>(null)
  const responseRef = ref<Response | null>(null)
  const errorRef = ref<Error | null | any>(null)
  const stateRef = ref(FetchStates.Idle)
  const abortControllerRef = ref(createAbortController())
  const bodyTextRef = ref('')
  const bodyBlobRef = ref<Blob>()
  const bodyJsonRef = ref<T | null>(null)

  const toRequest = (urlIncoming?: RequestInfo, initIncoming?: RequestInit): Request => {
    if (isRequest(urlIncoming)) {
      return toRequest(urlIncoming.clone().url, {
        ...urlIncoming,
        ...requestInitRef.value,
        ...(initIncoming || {}),
      })
    }

    if (isBaseURL(urlIncoming)) {
      return new Request(urlIncoming, {
        ...requestInitRef.value,
        ...(initIncoming || {}),
      })
    }

    const baseUrl = [
      isRequest(requestInfoRef.value) ? requestInfoRef.value.url : requestInfoRef.value,
      urlIncoming,
    ].join('')
    return new Request(baseUrl, {
      ...requestInitRef.value,
      ...(initIncoming || {}),
    })
  }

  const fetch: FetchFunction = async (urlIncoming?: RequestInfo, initIncoming?: RequestInit) => {
    try {
      errorRef.value = null
      abortControllerRef.value = createAbortController()
      requestRef.value = toRequest(urlIncoming, {
        ...(initIncoming || {}),
        signal: abortControllerRef.value ? abortControllerRef.value.signal : null,
      })
      stateRef.value = FetchStates.Fetching
      responseRef.value = await window.fetch(requestRef.value)
      return responseRef.value as Response
    } catch (err) {
      errorRef.value = err
      if (err instanceof Response) {
        responseRef.value = err
      }
      return responseRef.value as Response
    } finally {
      stateRef.value = FetchStates.Completed
    }
  }

  const abort = () => {
    if (!abortControllerRef.value) {
      // eslint-disable-next-line no-console
      console.warn('abort as no effect because abortControllerRef is not defined')
      return
    }
    if (state.value !== FetchStates.Fetching) {
      // eslint-disable-next-line no-console
      console.warn('abort as no effect because state(%s)', state.value)
      return
    }
    abortControllerRef.value.abort()
  }

  const request = computed(() => {
    return requestRef.value
  })

  const response = computed(() => {
    return responseRef.value
  })

  const state = computed(() => {
    return stateRef.value
  })

  const error = computed(() => {
    return errorRef.value
  })

  const json = computed(() => {
    return bodyJsonRef.value as T
  })

  const text = computed(() => {
    return bodyTextRef.value
  })

  const blob = computed(() => {
    return bodyBlobRef.value
  })

  watchEffect(async () => {
    const response = responseRef.value

    if (!response) {
      return
    }

    if (response.bodyUsed) {
      return
    }

    const formats = {
      json: {
        validate() {
          const headers = response.headers
          const values = headers.get('content-type') || ''
          return values.search('application/json') !== -1
        },
        format() {
          if (!formats.json.validate()) {
            return
          }
          return response
            .clone()
            .json()
            .then((value) => (bodyJsonRef.value = value))
        },
      },
      blob: {
        validate() {
          const headers = response.headers
          const values = headers.get('content-type') || ''
          return values.search('application/octet-stream')
        },
        format() {
          if (!formats.blob.validate()) {
            return
          }

          return response
            .clone()
            .blob()
            .then((value) => (bodyBlobRef.value = value))
        },
      },
      text: {
        validate() {
          const headers = response.headers
          const values = headers.get('content-type') || ''
          return values.search('text/html')
        },
        format() {
          if (!formats.text.validate()) {
            return
          }

          return response
            .clone()
            .text()
            .then((value) => (bodyTextRef.value = value))
        },
      },
    }

    await Promise.all([formats.json.format(), formats.blob.format(), formats.text.format()])
  })

  return {
    isFetching: isFetchFetching(state),
    isCompleted: isFetchCompleted(state),
    isIdle: isFetchIdle(state),
    state,
    fetch,
    abort,
    json,
    text,
    blob,
    response,
    request,
    error,
  }
}
