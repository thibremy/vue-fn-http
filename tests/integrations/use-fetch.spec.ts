import { createLocalVue } from '@vue/test-utils'
import VueCompositionApi, { toRaw } from '@vue/composition-api'
import { useFetch, FetchComposition } from '../../src/fetch/use-fetch'

const Vue = createLocalVue()
Vue.use(VueCompositionApi)

const expectSnapshot = (fetchTask: FetchComposition<any>) => {
  expect({
    state: fetchTask.state.value,
    request: fetchTask.request.value,
    response: fetchTask.response.value,
    error: fetchTask.error.value,
  }).toMatchSnapshot()
}

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos'

test('use fetch with no options', async () => {
  const fetchTask = useFetch()
  await fetchTask.fetch()
  expectSnapshot(fetchTask)
})
test('use fetch with request', async () => {
  const fetchTask = useFetch(new Request(BASE_URL))
  await fetchTask.fetch()
  expectSnapshot(fetchTask)
})

test('fetch state with simple url', async () => {
  const fetchTask = useFetch(BASE_URL)
  await fetchTask.fetch()
  expectSnapshot(fetchTask)
})

test('fetch Request', async () => {
  const fetchTask = useFetch(new Request(BASE_URL))
  await fetchTask.fetch()
  expectSnapshot(fetchTask)
})

test('fetch empty string', async () => {
  const fetchTask = useFetch('')
  await fetchTask.fetch()
  expectSnapshot(fetchTask)
})
