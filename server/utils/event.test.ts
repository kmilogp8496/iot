// @vitest-environment node

import { describe, expectTypeOf, it } from 'vitest'
import type { H3Event } from 'h3'
import { z } from 'zod'
import type { UserSessionRequired } from '#auth-utils'

// Define the EventBag type that we'll test against
type EmptyZodType = z.ZodType<never>

type EventBag<
  Body extends z.ZodType = EmptyZodType,
  Query extends z.ZodType = EmptyZodType,
  Param extends z.ZodType = EmptyZodType,
  ValidateSession extends boolean = true,
> = {
  body: Body extends EmptyZodType ? undefined : z.infer<Body>
  query: Query extends EmptyZodType ? undefined : z.infer<Query>
  params: Param extends EmptyZodType ? undefined : z.infer<Param>
  session: ValidateSession extends false ? undefined : UserSessionRequired
}

// Define handler type for type testing
type ValidatedEventHandler<
  ReturnType = unknown,
  Body extends z.ZodType = EmptyZodType,
  Query extends z.ZodType = EmptyZodType,
  Param extends z.ZodType = EmptyZodType,
  ValidateSession extends boolean = true,
> = (
  event: H3Event,
  requestBag: EventBag<Body, Query, Param, ValidateSession>
) => Promise<ReturnType>

describe('EventBag type tests', () => {
  // Define test schemas
  const _bodySchema = z.object({
    name: z.string(),
    age: z.number(),
  })

  const _querySchema = z.object({
    page: z.number(),
    limit: z.number(),
  })

  const _paramsSchema = z.object({
    id: z.string(),
  })

  it('should infer correct types when all schemas are provided', () => {
    type Handler = ValidatedEventHandler<
      boolean,
      typeof _bodySchema,
      typeof _querySchema,
      typeof _paramsSchema,
      true
    >

    type RequestBag = Parameters<Handler>[1]

    expectTypeOf<RequestBag['body']>().toEqualTypeOf<{
      name: string
      age: number
    }>()

    expectTypeOf<RequestBag['query']>().toEqualTypeOf<{
      page: number
      limit: number
    }>()

    expectTypeOf<RequestBag['params']>().toEqualTypeOf<{
      id: string
    }>()

    expectTypeOf<RequestBag['session']>().toEqualTypeOf<UserSessionRequired>()

    expectTypeOf<Handler>().parameter(0).toEqualTypeOf<H3Event>()
    expectTypeOf<Handler>().returns.toEqualTypeOf<Promise<boolean>>()
  })

  it('should infer undefined for missing schemas', () => {
    type Handler = ValidatedEventHandler<boolean>
    type RequestBag = Parameters<Handler>[1]

    expectTypeOf<RequestBag['body']>().toBeUndefined()
    expectTypeOf<RequestBag['query']>().toBeUndefined()
    expectTypeOf<RequestBag['params']>().toBeUndefined()
    expectTypeOf<RequestBag['session']>().toEqualTypeOf<UserSessionRequired>()
  })

  it('should infer undefined session when validateSession is false', () => {
    type Handler = ValidatedEventHandler<
      boolean,
      typeof _bodySchema,
      EmptyZodType,
      EmptyZodType,
      false
    >
    type RequestBag = Parameters<Handler>[1]

    expectTypeOf<RequestBag['session']>().toBeUndefined()
    expectTypeOf<RequestBag['body']>().toEqualTypeOf<{
      name: string
      age: number
    }>()
  })

  it('should infer correct types with partial schemas', () => {
    type Handler = ValidatedEventHandler<
      boolean,
      typeof _bodySchema,
      EmptyZodType,
      typeof _paramsSchema
    >
    type RequestBag = Parameters<Handler>[1]

    expectTypeOf<RequestBag['body']>().toEqualTypeOf<{
      name: string
      age: number
    }>()
    expectTypeOf<RequestBag['query']>().toBeUndefined()
    expectTypeOf<RequestBag['params']>().toEqualTypeOf<{
      id: string
    }>()
    expectTypeOf<RequestBag['session']>().toEqualTypeOf<UserSessionRequired>()
  })

  it('should infer return type correctly', () => {
    type StringHandler = ValidatedEventHandler<string>
    expectTypeOf<StringHandler>().returns.toEqualTypeOf<Promise<string>>()

    type NumberHandler = ValidatedEventHandler<number>
    expectTypeOf<NumberHandler>().returns.toEqualTypeOf<Promise<number>>()

    type ComplexHandler = ValidatedEventHandler<{ data: string[] }>
    expectTypeOf<ComplexHandler>().returns.toEqualTypeOf<Promise<{ data: string[] }>>()
  })
})
