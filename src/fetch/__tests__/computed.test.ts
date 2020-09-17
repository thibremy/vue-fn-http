import { createLocalVue  } from '@vue/test-utils'
import VueCompositionApi from '@vue/composition-api'
import * as Computed from '../computed'
import { useFetch, FetchStates } from '../use-fetch'

const Vue = createLocalVue()
Vue.use(VueCompositionApi)

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos'

test('isFetchCompleted', async () => {
  const fetch = useFetch()
  await fetch.fetch()
  expect(fetch.isCompleted.value).toBe(true)
})
test('isFetchFeching', async () => {
  const fetch = useFetch()
  const defer = fetch.fetch()
  expect(fetch.isFetching.value).toBe(true)
  await expect(defer).resolves.toBeDefined()
})
test('isFetchIdle', async () => {
  const fetch = useFetch()
  expect(fetch.isIdle.value).toBe(true)
})
test('isRequest', async () => {
  expect(Computed.isRequest(new Request(''))).toEqual(true)
})
