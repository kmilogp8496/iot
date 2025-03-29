export interface PaginatedResponse<T> {
  results: T[]
  total: number
}

export const createPaginatedResponse = <T>(results: T[], total: number): PaginatedResponse<T> => ({
  results,
  total,
})

export const createNotFoundResponse = (message: string) => createError({
  statusCode: 404,
  statusMessage: 'Not found',
  message,
})
