import type { FetchContext } from 'ofetch'
import { createFetch } from 'ofetch'

export const useApiFetch: typeof useFetch = (url, options) => {
  return useFetch(url, {
    onResponseError: (error: FetchContext & { error: Error }) => {
      useToast().add({
        title: 'Error',
        description: error.error?.message ?? (String(error.error?.cause) || 'An error occurred while performing the action'),
        color: 'error',
      })
    },
    ...options,
  })
}

export const apiFetch = createFetch({
  defaults: {
    onResponseError(error) {
      console.log(error)
      useToast().add({
        title: 'Error',
        description: error.response._data?.message ?? (String(error.error?.cause) || 'An error occurred while performing the action'),
        color: 'error',
      })
    },
  },
}) as typeof $fetch
