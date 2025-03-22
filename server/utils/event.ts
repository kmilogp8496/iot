import { ZodError, type ZodType, type z } from 'zod'
import type { H3Event } from 'h3'
import { eventHandler } from 'h3'
import type { UserSessionRequired } from '#auth-utils'

type EmptyZodType = ZodType<never>

interface EventBag<
  Body extends ZodType,
  Query extends ZodType,
  Param extends ZodType,
  ValidateSession extends boolean,
> {
  body: Body extends EmptyZodType ? undefined : z.infer<Body>
  query: Query extends EmptyZodType ? undefined : z.infer<Query>
  params: Param extends EmptyZodType ? undefined : z.infer<Param>
  session: ValidateSession extends true ? UserSessionRequired : undefined
  event: H3Event
}

export const validatedEventHandler = <
  ReturnType = unknown,
  Query extends ZodType = EmptyZodType,
  Body extends ZodType = EmptyZodType,
  Param extends ZodType = EmptyZodType,
  ValidateSession extends boolean = true,
>(
  handler: (requestBag: EventBag<Body, Query, Param, ValidateSession>) => Promise<ReturnType>,
  {
    bodySchema = undefined,
    querySchema = undefined,
    paramsSchema = undefined,
    validateSession = true as ValidateSession,
  }: {
    bodySchema?: Body
    querySchema?: Query
    paramsSchema?: Param
    validateSession?: ValidateSession
  }) => {
  return eventHandler(async (event) => {
    try {
      const session = validateSession ? await requireUserSession(event) : undefined
      const params = paramsSchema ? await getValidatedRouterParams(event, paramsSchema.parse) : undefined
      const body = bodySchema ? await readValidatedBody(event, bodySchema.parse) : undefined
      const query = querySchema ? await getValidatedQuery(event, querySchema.parse) : undefined

      return handler({
        session,
        body,
        query,
        params,
        event,
      } as EventBag<Body, Query, Param, ValidateSession>)
    }
    catch (error) {
      if (error instanceof Error && 'data' in error && error.data instanceof ZodError) {
        const errors = error.data.errors

        const formattedErrors = errors.map((error) => {
          return ({
            path: error.path.join('.'),
            message: error.message,
          })
        })

        throw createError({
          statusCode: 400,
          statusMessage: 'Bad request',
          message: 'Validation error on fields: ' + formattedErrors.map(error => error.path).join(', '),
          data: formattedErrors,
        })
      }
      console.error(error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal server error',
      })
    }
  })
}
