const config = {
  scapholdUrl: 'https://us-west-2.api.scaphold.io/graphql/measly-jail'
}

//          EXAMPLE #1.
// *************************
// *************************
// *************************

import ApolloClient, { createNetworkInterface } from 'apollo-client'
import gql from 'graphql-tag'


const query = gql`query GetAllDashboardItems {
  viewer {
    allDashboardItems  {
      edges {
        node {
          id
          label
        }
      }
    }
  }
}`



const opts = {uri: config.scapholdUrl}
const networkInterface = createNetworkInterface(opts)
const client = new ApolloClient({
  networkInterface,
});

client.query({query}).then((results) => {
  console.info('res', results)
})


export default { config }