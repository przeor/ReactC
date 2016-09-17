// ------------------------------------
// Constants
// ------------------------------------
export const DASHBOARD_VISITS_COUNT = 'DASHBOARD_VISITS_COUNT'
export const DASHBOARD_ADD_ITEM = 'DASHBOARD_ADD_ITEM'
export const DASHBOARD_EDIT_ITEM = 'DASHBOARD_EDIT_ITEM'
export const DASHBOARD_REORDER_ITEM = 'DASHBOARD_REORDER_ITEM'

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


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [DASHBOARD_VISITS_COUNT]: (state, action) => { 
    state.visitsCount = state.visitsCount + action.payload
    return Object.assign({}, state)
  },
  [DASHBOARD_ADD_ITEM]: (state, action) => { 
    const mockedId = Math.floor(Date.now() / 1000)
    const newItem = {
      label: action.payload,
      id: mockedId
    }
    state.dashboardItems.push(newItem)
    return Object.assign({}, state)
  },
  [DASHBOARD_EDIT_ITEM]: (state, action) => { 
    const newRowValue = action.payload.val
    const index = action.payload.editedItemIndex
    state.reducerRows[index].rowColumns = newRowValue
    return Object.assign({}, state)
  },
  [DASHBOARD_REORDER_ITEM]: (state, action) => { 
    const reorder = action.payload
    const reorderItem = state.reducerRows[reorder.start]
    let newReducerRows = []
    state.reducerRows.map((item, i) => {
      if(i === reorder.start) {
        return
      }

      // we need that if statement because
      // the behaviour is determined if someone is dragging
      // an item from higher to lower place on the list or vice versa
      if(reorder.end < reorder.start) {
        if(i === reorder.end) {
          newReducerRows.push(reorderItem)
        }
        newReducerRows.push(item)
      } else {
        newReducerRows.push(item)
        if(i === reorder.end) {
          newReducerRows.push(reorderItem)
        }
      }
    })
    state.reducerRows = newReducerRows
    return Object.assign({}, state)
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  reducerSchema: {
    {
      technology: String,
      review: String
    }
  },
  visitsCount: 0,
  reducerRows: [
    {
      key: 0, 
      rowColumns: [
        'Angular',
        'super'
      ]
    },
    {
      key: 1, 
      rowColumns: [
        'JQuery',
        'old'
      ]
    }
  ]
}
export default function dashboardReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
