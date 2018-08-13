export const API_ERROR = 'API_ERROR'
export const API_MUTATE = 'API_MUTATE'
export const API_QUERY = 'API_QUERY'
export const API_SUCCESS = 'API_SUCCESS'

export const query = ({ body, feature, callerType, client, meta }) => ({
  type: `${feature} ${API_QUERY}`,
  payload: body,
  meta: { ...meta, feature, callerType, client }
})

export const mutate = ({ body, feature, callerType, client, meta }) => ({
  type: `${feature} ${API_MUTATE}`,
  payload: body,
  meta: { ...meta, feature, callerType, client }
})

export const apiSuccess = ({ response, feature, meta }) => ({
  type: `${feature} ${API_SUCCESS}`,
  payload: response,
  meta: { ...meta, feature }
})

export const apiError = ({ error, feature, meta }) => ({
  type: `${feature} ${API_ERROR}`,
  payload: error,
  meta: { ...meta, feature }
})
