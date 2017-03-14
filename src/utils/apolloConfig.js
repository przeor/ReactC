import ApolloClient, { createNetworkInterface } from 'apollo-client'
import gql from 'graphql-tag'

const config = {
  scapholdUrl: 'https://us-west-2.api.scaphold.io/graphql/reactjs-co'
}

const opts = {uri: config.scapholdUrl}
const networkInterface = createNetworkInterface(opts)


networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}  // Create the header object if needed.
    }
    if (localStorage.getItem('token')) {
      req.options.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }
    next()
  }
}])



const client = new ApolloClient({
  networkInterface,
})

export default client