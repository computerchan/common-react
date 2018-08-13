import * as GraphQL from './actions'
import gql from 'graphql-tag'
import { createClient, mockClient as client } from "./client"
import middleware from './middleware'

jest.mock("./client")

let dispatch, next

beforeEach(() => {
  createClient.mockClear()
  dispatch = jest.fn()
  next = jest.fn()
})

describe("GraphQL middleware", () => {
  it("passes the action down the chain", () => {
    const action = { type: "NOT_SUPPORTED" }

    middleware({ dispatch })(next)(action)

    expect(next.mock.calls.map(args => args[0])).toEqual([action])
  })

  describe(`with an ${GraphQL.API_QUERY} action`, () => {
    let action

    beforeEach(() => {
      action = GraphQL.query({
        body: { query: gql`{ features }` },
        callerType: "[Test] FETCH",
        feature: "TEST",
        client: {
          authToken: "secret-token",
          url: "https://example.com/graphql"
        },
        meta: {
          hello: "world",
        }
      })
    })

    describe("with a successful call", () => {
      beforeEach(async () => {
        client.response = Promise.resolve({ data: { success: true } })
        await middleware({ dispatch })(next)(action)
      })

      it("configures the client correctly", () => {
        expect(createClient).toBeCalledWith({
          authToken: "secret-token",
          url: "https://example.com/graphql"
        })
      })

      it(`maps to an ${GraphQL.API_SUCCESS} action`, () => {
        expect(dispatch).toHaveBeenCalledWith(GraphQL.apiSuccess({
          response: { success: true },
          feature: "TEST",
          meta: {
            hello: "world",
            callerType: "[Test] FETCH",
            client: {
              authToken: "secret-token",
              url: "https://example.com/graphql"
            }
          }
        }))
      })
    })

    describe("with a failed call", () => {
      beforeEach(async () => {
        client.response = Promise.reject({ message: "An error occurred" })
        await middleware({ dispatch })(next)(action)
      })

      it(`maps to an ${GraphQL.API_ERROR} action`, async () => {
        expect(dispatch).toHaveBeenCalledWith(GraphQL.apiError({
          error: { message: "An error occurred" },
          feature: "TEST",
          meta: {
            hello: "world",
            callerType: "[Test] FETCH",
            client: {
              authToken: "secret-token",
              url: "https://example.com/graphql"
            }
          }
        }))
      })
    })
  })

  describe(`with an ${GraphQL.API_MUTATE} action`, () => {
    let action

    beforeEach(() => {
      action = GraphQL.mutate({
        body: { mutation: gql`{ features }` },
        callerType: "[Test] SET",
        feature: "TEST",
        client: {
          authToken: "secret-token",
          url: "https://example.com/graphql"
        },
        meta: {
          hello: "world"
        }
      })
    })

    describe("with a successful call", () => {
      beforeEach(async () => {
        client.response = Promise.resolve({ data: { success: true } })
        await middleware({ dispatch })(next)(action)
      })

      it("configures the client correctly", () => {
        expect(createClient).toBeCalledWith({
          authToken: "secret-token",
          url: "https://example.com/graphql"
        })
      })

      it(`maps to an ${GraphQL.API_SUCCESS} action`, () => {
        expect(dispatch).toHaveBeenCalledWith(GraphQL.apiSuccess({
          response: { success: true },
          feature: "TEST",
          meta: {
            hello: "world",
            callerType: "[Test] SET",
            client: {
              authToken: "secret-token",
              url: "https://example.com/graphql"
            }
          }
        }))
      })
    })

    describe("with a failed call", () => {
      beforeEach(async () => {
        client.response = Promise.reject({ message: "An error occurred" })
        await middleware({ dispatch })(next)(action)
      })

      it(`maps to an ${GraphQL.API_ERROR} action`, async () => {
        expect(dispatch).toHaveBeenCalledWith(GraphQL.apiError({
          error: { message: "An error occurred" },
          feature: "TEST",
          meta: {
            hello: "world",
            callerType: "[Test] SET",
            client: {
              authToken: "secret-token",
              url: "https://example.com/graphql"
            }
          }
        }))
      })
    })
  })
})
