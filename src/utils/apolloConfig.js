import ApolloClient, { createNetworkInterface } from 'apollo-client'
import gql from 'graphql-tag'

const config = {
  scapholdUrl: 'https://us-west-2.api.scaphold.io/graphql/measly-jail'
}


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

client
  .query({query})
  .then((results) => {
    const { data: { viewer: { allDashboardItems: { edges } }}} = results
    const resArray = edges.map((item, i) => {
      return item.node
    })
    console.info('Example resArray: ', resArray)
    return resArray
})


export default { config, client }