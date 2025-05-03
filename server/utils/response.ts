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

export const createUnauthorizedResponse = (message: string) => createError({
  statusCode: 401,
  statusMessage: 'Unauthorized',
  message,
})

export const createBadRequestResponse = (message: string) => createError({
  statusCode: 400,
  statusMessage: 'Bad request',
  message,
})
