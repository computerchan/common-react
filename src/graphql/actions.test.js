import * as Api from "./actions"

describe("API actions", () => {
  it("can build a query action", () => {
    const options = {
      body: { hello: "world" },
      feature: "[Test]",
      callerType: "[Test] FETCH",
      client: {
        url: "https://example.com/graphql",
        authToken: "secret-token"
      }
    }
    expect(Api.query(options)).toEqual({
      type: "[Test] API_QUERY",
      payload: { hello: "world" },
      meta: {
        callerType: "[Test] FETCH",
        feature: "[Test]",
        client: {
          url: "https://example.com/graphql",
          authToken: "secret-token"
        }
      }
    })
  })

  it("can build a mutate action", () => {
    const options = {
      body: { hello: "world" },
      feature: "[Test]",
      callerType: "[Test] SET",
      client: {
        url: "https://example.com/graphql",
        authToken: "secret-token"
      }
    }
    expect(Api.mutate(options)).toEqual({
      type: "[Test] API_MUTATE",
      payload: { hello: "world" },
      meta: {
        callerType: "[Test] SET",
        feature: "[Test]",
        client: {
          url: "https://example.com/graphql",
          authToken: "secret-token"
        }
      }
    })
  })

  it("can build an API success action", () => {
    const options = {
      response: { hello: "world" },
      feature: "[Test]",
      meta: {
        callerType: "[Test] SET"
      }
    }

    expect(Api.apiSuccess(options)).toEqual({
      type: "[Test] API_SUCCESS",
      payload: { hello: "world" },
      meta: {
        callerType: "[Test] SET",
        feature: "[Test]"
      }
    })
  })

  it("can build an API error action", () => {
    const options = {
      error: { message: "we broke" },
      feature: "[Test]",
      meta: {
        callerType: "[Test] SET"
      }
    }

    expect(Api.apiError(options)).toEqual({
      type: "[Test] API_ERROR",
      payload: { message: "we broke" },
      meta: {
        callerType: "[Test] SET",
        feature: "[Test]"
      }
    })
  })
})
