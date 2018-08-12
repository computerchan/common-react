import { REQUEST, requestError, requestSuccess } from './actions'

export default ({ dispatch }) => next => action => {
  next(action)

  if (action.type.includes(REQUEST)) {
    const { url, method, feature, ...meta } = action.meta
    const options = {
      body: JSON.stringify(action.payload),
      method,
      headers: {
        "Content-Type": "application/json"
      }
    }

    return fetch(url, options)
      .then(response => response.json())
      .then(data => dispatch(requestSuccess({ response: data, feature, meta })))
      .catch(error => dispatch(requestError({ error, feature })))
  }
}
