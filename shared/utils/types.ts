import type { AsyncData } from '#app'
import type { PaginatedResponse } from '~~/server/utils/response'

export type InferPaginationType<T> = T extends AsyncData<PaginatedResponse<infer U> | undefined, unknown> ? U : never
