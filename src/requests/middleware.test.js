import middleware from './middleware'
import { REQUEST, REQUEST_SUCCESS, requestError, request, requestSuccess } from './actions'

let dispatch, next

beforeEach(() => {
  dispatch = jest.fn()
  next = jest.fn()
})

describe("Request middleware", () => {
  it("passes the action down the chain", () => {
    const action = { type: "NOT_SUPPORTED" }

    middleware({ dispatch })(next)(action)

    expect(next.mock.calls.map(args => args[0])).toEqual([action])
  })

  describe(`with ${REQUEST} action`, () => {
    describe("with a successful call", () => {
      beforeEach(() => {
        fetch.mockResponseOnce(JSON.stringify({ success: true }))
      })

      it(`maps to an ${REQUEST_SUCCESS} action`, async () => {
        const action = request({
          body: { hello: "world" },
          feature: "TEST",
          meta: { hello: "world" },
          method: "POST",
          url: "https://example.com/test"
        })

        await middleware({ dispatch })(next)(action)

        expect(fetch).toHaveBeenCalledWith(
          "https://example.com/test",
          {
            body: JSON.stringify({ hello: "world" }),
            headers: { "Content-Type": "application/json"},
            method: "POST"
          }
        )

        expect(dispatch).toHaveBeenCalledWith(requestSuccess({
          response: { success: true },
          feature: "TEST",
          meta: { hello: "world" }
        }))
      })
    })

    describe("with a failed call", () => {
      beforeEach(() => {
        fetch.mockReject(new Error("An error occurred"))
      })

      it(`maps to an ${REQUEST_SUCCESS} action`, async () => {
        const action = request({
          body: { hello: "world" },
          method: "POST",
          url: "https://example.com/test",
          feature: "TEST"
        })

        await middleware({ dispatch })(next)(action)

        expect(dispatch).toHaveBeenCalledWith(requestError({
          error: new Error("An error occurred"),
          feature: "TEST"
        }))
      })
    })
  })
})

