import ApolloClient from 'apollo-boost'

export const createClient = ({ authToken, url }) => (
  new ApolloClient({
    uri: url,
    request: async operation => {
      operation.setContext({
        headers: { Authorization: `Bearer ${authToken}` }
      })
    }
  })
)
