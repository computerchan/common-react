import * as Actions from "./actions"

describe("Request actions", () => {
  it(`supports ${Actions.REQUEST} actions`, () => {
    const options = {
      body: { hello: "world" },
      method: "POST",
      url: "http://example.com/test",
      feature: "[Test]",
      callerType: "[Test] example",
      meta: { secret: "data" }
    }

    expect(Actions.request(options)).toEqual({
      type: "[Test] REQUEST",
      payload: { hello: "world" },
      meta: {
        method: "POST",
        url: "http://example.com/test",
        feature: "[Test]",
        callerType: "[Test] example",
        secret: "data"
      }
    })
  })

  it(`supports ${Actions.REQUEST_SUCCESS} actions`, () => {
    const options = {
      response: { hello: "world" },
      feature: "[Test]",
      meta: { secret: "data" }
    }

    expect(Actions.requestSuccess(options)).toEqual({
      type: "[Test] REQUEST_SUCCESS",
      payload: { hello: "world" },
      meta: {
        feature: "[Test]",
        secret: "data"
      }
    })
  })

  it(`supports ${Actions.REQUEST_ERROR} actions`, () => {
    const options = {
      error: { message: "we broke" },
      feature: "[Test]",
      meta: { secret: "data" }
    }

    expect(Actions.requestError(options)).toEqual({
      type: "[Test] REQUEST_ERROR",
      payload: { message: "we broke" },
      meta: {
        feature: "[Test]",
        secret: "data"
      }
    })
  })
})
