import type { ZodType, z } from 'zod'
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
}

export const validatedEventHandler = <
  ReturnType = unknown,
  Query extends ZodType = EmptyZodType,
  Body extends ZodType = EmptyZodType,
  Param extends ZodType = EmptyZodType,
  ValidateSession extends boolean = true,
>(
  handler: (event: H3Event, requestBag: EventBag<Body, Query, Param, ValidateSession>) => Promise<ReturnType>,
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
    const session = validateSession ? await requireUserSession(event) : undefined
    const query = querySchema ? await getValidatedQuery(event, querySchema.parse) : undefined
    const body = bodySchema ? await readValidatedBody(event, bodySchema.parse) : undefined
    const params = paramsSchema ? await getValidatedRouterParams(event, paramsSchema.parse) : undefined

    return handler(event, {
      session,
      body,
      query,
      params,
    } as EventBag<Body, Query, Param, ValidateSession>)
  })
}
