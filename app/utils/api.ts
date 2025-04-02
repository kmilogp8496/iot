export const useApiFetch: typeof useFetch = (url, options) => {
  return useFetch(url, {
    onResponseError: (error) => {
      useToast().add({
        title: 'Error',
        description: error.error?.message ?? (String(error.error?.cause) || 'An error occurred while performing the action'),
        color: 'error',
      })
    },
    ...options,
  })
}
