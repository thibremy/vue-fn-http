import { useFetch } from '@/fetch'

export const BASE_URL = 'https://api.discogs.com'

export const useDiscogApi = () => {
    
  const releases = () => {
    return useFetch(`${BASE_URL}/releases/`)
  }

  const user = () => {
    const fetchUser = useFetch(`${BASE_URL}/users/`)
    return fetchUser
  }
   
  return {
    user,
    releases
  }
}
