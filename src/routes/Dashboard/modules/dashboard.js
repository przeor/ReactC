import client from 'utils/apolloConfig'
import gql from 'graphql-tag'



// ------------------------------------
// Constants
// ------------------------------------
export const DASHBOARD_VISITS_COUNT = 'DASHBOARD_VISITS_COUNT'
export const DASHBOARD_ADD_ITEM = 'DASHBOARD_ADD_ITEM'
export const DASHBOARD_EDIT_ITEM = 'DASHBOARD_EDIT_ITEM'
export const DASHBOARD_REORDER_ITEM = 'DASHBOARD_REORDER_ITEM'
export const FETCH_DASHBOARD_DATA_SUCCESS = 'FETCH_DASHBOARD_DATA_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
export function dashboardVisitIncrement (value = 1) {
  return {
    type: DASHBOARD_VISITS_COUNT,
    payload: value
  }
}

export function dashboardAddItem (value) {
  return {
    type: DASHBOARD_ADD_ITEM,
    payload: value
  }
}

export function fetchDashboardDataSuccess (value) {
  return {
    type: FETCH_DASHBOARD_DATA_SUCCESS,
    payload: value
  }
}



export function dashboardEditItem (value) {
  return {
    type: DASHBOARD_EDIT_ITEM,
    payload: value
  }
}

export function dashboardReorderItems (value) {
  return {
    type: DASHBOARD_REORDER_ITEM,
    payload: value
  }
}



export const fetchDashboardDataAsync = () => {
  return async (dispatch, getState) => {
    // below we are mocking the list name, but in future
    // when we will have more than just a one list
    // then that name below "dashboardMainListOrder"
    // will be dynamic one
    const dashboardListOrderName = 'dashboardMainListOrder'



    // this query, is asking for the Order
    const queryOrder = gql`query GetAllDashboardItemListOrders {
      viewer {
        allDashboardItemListOrders  {
          edges {
            node {
              id
              orderListIdsArray
              orderListName
            }
          }
        }
      }
    }`

    // based on the results, we will have the dashboardItemsOrdersArray
    let dashboardItemsOrdersArray = await client
      .query({query: queryOrder})
      .then((results) => {
        console.info('results', results)
        // const { data: { viewer: { allDashboardItems: { edges } }}} = results
        // const resArray = edges.map((item, i) => {
        //   return item.node
        // })
        // return resArray
    }).catch((errorReason) => {
      // Here you handle any errors.
      // You can dispatch some
      // custom error actions like:
      // dispatch(yourCustomErrorAction(errorReason))
    })



    // THE ITEMS ORDER is known, let's ask for the certain
    // items.. as we know the items Ids from the dashboardItemsOrdersArray
    const queryFetchItems = gql`query GetAllDashboardItems {
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

    let dashboardItemsArray = await client
      .query({query: queryFetchItems})
      .then((results) => {
        console.info('results', results)
        const { data: { viewer: { allDashboardItems: { edges } }}} = results
        const resArray = edges.map((item, i) => {
          return item.node
        })
        return resArray
    }).catch((errorReason) => {
      // Here you handle any errors.
      // You can dispatch some
      // custom error actions like:
      // dispatch(yourCustomErrorAction(errorReason))
    })

    dispatch(fetchDashboardDataSuccess(dashboardItemsArray))
  }
}



// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_DASHBOARD_DATA_SUCCESS]: (state, action) => { 
    return Object.assign({}, state, {
      dashboardItems: action.payload
    })
  },
  [DASHBOARD_VISITS_COUNT]: (state, action) => { 
    return Object.assign({}, state, {
      visitsCount: state.visitsCount + action.payload
    })
  },
  [DASHBOARD_ADD_ITEM]: (state, action) => { 
    const mockedId = Math.floor(Date.now() / 1000)
    const newItem = {
      label: action.payload,
      id: mockedId
    }
    return Object.assign({}, state, {
      dashboardItems: [...state.dashboardItems, newItem]
    })
  },
  [DASHBOARD_EDIT_ITEM]: (state, action) => { 
    const newLabel = action.payload.val
    const index = action.payload.editedItemIndex
    let immutableDashboardItems = [...state.dashboardItems]
    immutableDashboardItems[index].label = newLabel
    return Object.assign({}, state, {
      dashboardItems: immutableDashboardItems
    })
  },
  [DASHBOARD_REORDER_ITEM]: (state, action) => { 
    const reorder = action.payload
    const reorderItem = state.dashboardItems[reorder.start]
    let newDashboardItems = []
    state.dashboardItems.map((item, i) => {
      if(i === reorder.start) {
        return
      }

      // we need that if statement because
      // the behaviour is determined if someone is dragging
      // an item from higher to lower place on the list or vice versa
      if(reorder.end < reorder.start) {
        if(i === reorder.end) {
          newDashboardItems.push(reorderItem)
        }
        newDashboardItems.push(item)
      } else {
        newDashboardItems.push(item)
        if(i === reorder.end) {
          newDashboardItems.push(reorderItem)
        }
      }
    })

    return Object.assign({}, state, {
      dashboardItems: newDashboardItems
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  dashboardHasFetchedData: false,
  visitsCount: 0,
  dashboardItems: [
  ]
}
export default function dashboardReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
