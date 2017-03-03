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

    // *****************************************************************
    // *************
    // ************* STEP #1. - let's fetch the items order
    // *************

    // this query, is asking for the Order
    const queryOrder = gql`query GetAllDashboardItemListOrders {
      viewer {
        allDashboardItemListOrders (where: {
          orderListName: {
            eq: "${dashboardListOrderName}"
          }
        })  {
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
    const dashboardItemsOrdersArray = await client
      .query({query: queryOrder})
      .then((results) => {
        console.info('results', results.data.viewer.allDashboardItemListOrders.edges)
        const { data: { viewer: { allDashboardItemListOrders: { edges } }}} = results
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

    const orderListIdsArray = dashboardItemsOrdersArray[0].orderListIdsArray

    // *****************************************************************
    // *************
    // ************* STEP #2. - let's fetch the items details
    // *************

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

    let dashboardItemsObjects = await client
      .query({query: queryFetchItems})
      .then((results) => {
        console.info('results', results)
        const { data: { viewer: { allDashboardItems: { edges } }}} = results
        let resObj = {}
        edges.map((item, i) => {
          resObj[item.node.id] = item.node
          return item.node
        })
        return resObj
    }).catch((errorReason) => {
      // Here you handle any errors.
      // You can dispatch some
      // custom error actions like:
      // dispatch(yourCustomErrorAction(errorReason))
    })


    // *****************************************************************
    // *************
    // ************* STEP #3. - let's mix the order with the items details
    // *************
    const dashboardItemsArrayOrdered = orderListIdsArray.map((listItemID) => {
      return dashboardItemsObjects[listItemID]
    })

    // *****************************************************************
    // *************
    // ************* STEP #4. - let's dispatch the dashboardItemsArrayOrdered
    // *************
    dispatch(fetchDashboardDataSuccess(dashboardItemsArrayOrdered))
  }
}


export const dashboardAddItemAsync = (newDashboardItemValue) => {
  return async (dispatch, getState) => {
    
    // *****************************************************************
    // *************
    // ************* STEP #1. - preparation of the mutation query
    // *************
    const mutationInsert = gql`mutation Create($data: CreateDashboardItemInput!) {
        createDashboardItem(input: $data) {
          changedDashboardItem {
            id
            label
          }
        }
      }`

    // *****************************************************************
    // *************
    // ************* STEP #2. - preparation of the variables that we need to insert
    // *************
    const variablesInsert = {
        "data": {
          "label": newDashboardItemValue
        }
      }


    // *****************************************************************
    // *************
    // ************* STEP #3. - making the mutations and retrieving the newDashboardItemID
    // *************
    const newDashboardItemID = await client
      .mutate({mutation: mutationInsert, variables: variablesInsert})
      .then((results) => {
        const newObjectId = results.data.createDashboardItem.changedDashboardItem.id
        console.info('results', newObjectId)
        return newObjectId

    }).catch((errorReason) => {
      // Here you handle any errors.
      // You can dispatch some
      // custom error actions like:
      // dispatch(yourCustomErrorAction(errorReason))
      console.info('error', errorReason)
    })

    // *****************************************************************
    // *************
    // ************* STEP #4. - OK, we've got the ID. Let's update the list
    // *************
    console.info('here is the ID: ', newDashboardItemID)



    // *****************************************************************
    // *************
    // ************* STEP #5. - preparation of the mutation query
    // *************
    const mutationListUpdate = gql`mutation UpdateDashboardItemListOrder($data: UpdateDashboardItemListOrderInput!) {
      updateDashboardItemListOrder(input: $data) {
        changedDashboardItemListOrder {
          id
          orderListIdsArray
        }
      }
    }`

    // *****************************************************************
    // *************
    // ************* STEP #6. - preparation of the variables that we need to insert
    // *************
    const variablesListUpdate = {
      "data": {
        "id": "RGFzaGJvYXJkSXRlbUxpc3RPcmRlcjoz",
        "orderListIdsArray": [
          newDashboardItemID
        ]
      }
    }



    const listID = await client
      .mutate({mutation: mutationListUpdate, variables: variablesListUpdate})
      .then((results) => {
        console.info('results', results)
        const newObjectId = results.data.createDashboardItemListOrder.changedDashboardItemListOrder.id
        console.info('newObjectId', newObjectId)
        return newObjectId
    }).catch((errorReason) => {
      // Here you handle any errors.
      // You can dispatch some
      // custom error actions like:
      // dispatch(yourCustomErrorAction(errorReason))
      console.info('error', errorReason)
    })


    console.info('listID', listID)


    // *****************************************************************
    // *************
    // ************* STEP #5. - we have updated the list, let's dispatch the new value and ID
    // *************
    dispatch(dashboardAddItem({ newDashboardItemValue, newDashboardItemID }))
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
    const newItem = {
      label: action.payload.newDashboardItemValue,
      id: action.payload.newDashboardItemID
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
