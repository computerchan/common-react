export const REQUEST = 'REQUEST'
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS'
export const REQUEST_ERROR = 'REQUEST_ERROR'

export const request = ({ body, method, url, feature, callerType, meta }) => ({
  type: `${feature} ${REQUEST}`,
  payload: body,
  meta: { method, url, feature, callerType, ...meta }
})

export const requestSuccess = ({ response, feature, meta }) => ({
  type: `${feature} ${REQUEST_SUCCESS}`,
  payload: response,
  meta: { ...meta, feature }
})

export const requestError = ({ error, feature, meta }) => ({
  type: `${feature} ${REQUEST_ERROR}`,
  payload: error,
  meta: { ...meta, feature }
})
