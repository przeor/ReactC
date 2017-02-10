/**
 * Modify the config Scaphold URL to point to your specific app.
 * Find the URL at the top of the page on Scaphold.io once you've created an app.
 * Yup. It's that easy.
 */
import fetch from 'isomorphic-fetch'

const config = {
  scapholdUrl: 'https://us-west-2.api.scaphold.io/graphql/measly-jail'
}

function graphQLFetcher(graphQLParams) {
  console.info('graphQLParams', graphQLParams)

  return fetch(config.scapholdUrl, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.token ? 'Bearer ' + localStorage.token : ''
    },
    body: JSON.stringify(graphQLParams),
  }).then(response => {
  	console.info(response.json())
  	// return response.json() 
  })
}

const operationName = 'GetAllDashboardItems'

const query = `query ${operationName} {
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

const q = { query: query, variables: 'null', operationName: operationName }

graphQLFetcher(q)

export default { config, graphQLFetcher }