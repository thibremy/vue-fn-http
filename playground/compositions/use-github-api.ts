import { useFetch } from '@/fetch'

export const BASE_URL = 'https://api.github.com'

export const useGithubApi = () => {
  const github = useFetch(BASE_URL)

  return github
}
