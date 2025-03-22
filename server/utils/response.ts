export const createPaginatedResponse = <T>(results: T, total: number) => ({
  results,
  total,
})

export const createNotFoundResponse = (message: string) => createError({
  statusCode: 404,
  statusMessage: 'Not found',
  message,
})
