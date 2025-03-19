import { describe, expectTypeOf, it } from 'vitest'
import type { H3Event } from 'h3'
import { z } from 'zod'
import { defineValidatedEventHandler } from './event'
import type { UserSessionRequired } from '#auth-utils'

describe('defineValidatedEventHandler type tests', () => {
  // Define some test schemas
  const bodySchema = z.object({
    name: z.string(),
    age: z.number(),
  })

  const querySchema = z.object({
    page: z.number(),
    limit: z.number(),
  })

  const paramsSchema = z.object({
    id: z.string(),
  })

  it('should infer correct types when all schemas are provided', () => {
    const _handler = defineValidatedEventHandler(
      async (event, requestBag) => {
        expectTypeOf(requestBag.body).toEqualTypeOf<{
          name: string
          age: number
        }>()

        expectTypeOf(requestBag.query).toEqualTypeOf<{
          page: number
          limit: number
        }>()

        expectTypeOf(requestBag.params).toEqualTypeOf<{
          id: string
        }>()

        expectTypeOf(requestBag.session).toEqualTypeOf<UserSessionRequired>()

        return true
      },
      {
        bodySchema,
        querySchema,
        paramsSchema,
      },
    )

    expectTypeOf(_handler).toBeFunction()
    expectTypeOf(_handler).parameter(0).toEqualTypeOf<H3Event>()
    expectTypeOf(_handler).returns.toEqualTypeOf<Promise<boolean>>()
  })

  it('should infer undefined for missing schemas', () => {
    const _handler = defineValidatedEventHandler(
      async (event, requestBag) => {
        expectTypeOf(requestBag.body).toBeUndefined()
        expectTypeOf(requestBag.query).toBeUndefined()
        expectTypeOf(requestBag.params).toBeUndefined()
        expectTypeOf(requestBag.session).toEqualTypeOf<UserSessionRequired>()

        return true
      },
      {},
    )
  })

  it('should infer undefined session when validateSession is false', () => {
    const _handler = defineValidatedEventHandler(
      async (event, requestBag) => {
        expectTypeOf(requestBag.session).toBeUndefined()
        expectTypeOf(requestBag.body).toEqualTypeOf<{
          name: string
          age: number
        }>()

        return true
      },
      {
        validateSession: false,
        bodySchema,
      },
    )
  })

  it('should infer correct types with partial schemas', () => {
    const _handler = defineValidatedEventHandler(
      async (event, requestBag) => {
        expectTypeOf(requestBag.body).toEqualTypeOf<{
          name: string
          age: number
        }>()
        expectTypeOf(requestBag.query).toBeUndefined()
        expectTypeOf(requestBag.params).toEqualTypeOf<{
          id: string
        }>()
        expectTypeOf(requestBag.session).toEqualTypeOf<UserSessionRequired>()

        return true
      },
      {
        bodySchema,
        paramsSchema,
      },
    )
  })

  it('should infer return type correctly', () => {
    const handlerString = defineValidatedEventHandler(
      async () => 'string',
      {},
    )
    expectTypeOf(handlerString).returns.toEqualTypeOf<Promise<string>>()

    const handlerNumber = defineValidatedEventHandler<number>(
      async () => 42,
      {},
    )
    expectTypeOf(handlerNumber).returns.toEqualTypeOf<Promise<number>>()

    const handlerComplex = defineValidatedEventHandler<{ data: string[] }>(
      async () => ({ data: ['test'] }),
      {},
    )
    expectTypeOf(handlerComplex).returns.toEqualTypeOf<Promise<{ data: string[] }>>()
  })

  // Type error tests - these should fail type checking
  it('should not allow accessing undefined properties', () => {
    defineValidatedEventHandler(
      async (event, requestBag) => {
        // @ts-expect-error body is undefined
        let _ = requestBag.body.name

        // @ts-expect-error query is undefined
        _ = requestBag.query.page

        return true
      },
      {},
    )
  })

  it('should not allow accessing session when validateSession is false', () => {
    defineValidatedEventHandler(
      async (event, requestBag) => {
        // @ts-expect-error session is undefined
        const _ = requestBag.session.asdasd

        return true
      },
      {
        validateSession: false,
      },
    )
  })
})
