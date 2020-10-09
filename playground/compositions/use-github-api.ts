import { useFetch } from '@/fetch'

export const BASE_URL = 'https://api.github.com'

export const useGithubApi = () => {

  const repositories = () => {
    return useFetch(`${BASE_URL}/repos/`)
  }

  const user = () => {
    const fetchUser = useFetch(`${BASE_URL}/users/`)
    return fetchUser
  }
  
  return {
    user,
    repositories
  }
}
