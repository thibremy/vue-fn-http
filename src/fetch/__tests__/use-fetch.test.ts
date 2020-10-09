import { useFetch } from '../use-fetch'

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos'

test('use fetch with no options', async () => {
  const fetchTask = useFetch()
  expect(fetchTask).toBeDefined()
})
test('use fetch with request', async () => {
  const fetchTask = useFetch(new Request(BASE_URL))
  expect(fetchTask).toBeDefined()
})
test('use fetch with URL', async () => {
  const fetchTask = useFetch(BASE_URL)
  expect(fetchTask).toBeDefined()
})

test('use fetch with Request', async () => {
  const fetchTask = useFetch(new Request(BASE_URL))
  expect(fetchTask).toBeDefined()
})
test('fetch empty string', async () => {
  const fetchTask = useFetch('')
  expect(fetchTask).toBeDefined()
})
