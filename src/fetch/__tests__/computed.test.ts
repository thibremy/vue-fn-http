import * as Computed from '../computed'
import { useFetch } from '../use-fetch'

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
