import { useFetch } from '@/fetch'

export const BASE_URL = 'https://api.discogs.com'

export const useDiscogApi = () => {
  const discog = useFetch(BASE_URL)

  return discog
}
