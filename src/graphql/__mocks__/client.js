class DummyClient {
  response = Promise.resolve({})
  query = jest.fn().mockImplementation(() => this.response)
  mutate = jest.fn().mockImplementation(() => this.response)
}

export const mockClient = new DummyClient()
export const createClient = jest.fn().mockImplementation(() => mockClient)
