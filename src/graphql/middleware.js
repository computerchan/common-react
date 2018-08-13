import { API_MUTATE, API_QUERY, apiError, apiSuccess } from './actions'
import { createClient } from "./client"

export default ({ dispatch }) => next => action => {
  next(action)

  if (action.type.includes(API_QUERY)) {
    const { feature, ...meta } = action.meta
    const client = createClient({
      authToken: meta.client.authToken,
      url: meta.client.url
    })

    return client.query(action.payload)
      .then(response => response.data)
      .then(response => dispatch(apiSuccess({ response, feature, meta })))
      .catch(error => dispatch(apiError({ error, feature, meta })))
  }

  if (action.type.includes(API_MUTATE)) {
    const { feature, ...meta } = action.meta
    const client = createClient({
      authToken: meta.client.authToken,
      url: meta.client.url
    })

    return client.mutate(action.payload)
      .then(response => response.data)
      .then(response => dispatch(apiSuccess({ response, feature, meta })))
      .catch(error => dispatch(apiError({ error, feature, meta })))
  }
}
