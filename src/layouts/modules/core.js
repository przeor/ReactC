// ------------------------------------
// Constants
// ------------------------------------
export const CORE_INCREMENT = 'CORE_INCREMENT'

// ------------------------------------
// Actions
// ------------------------------------
export function increment (value = 1) {
  return {
    type: CORE_INCREMENT,
    payload: value
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk!

    NOTE: This is solely for demonstration purposes. In a real application,
    you'd probably want to dispatch an action of CORE_DOUBLE and let the
    reducer take care of this logic.  */

export const doubleAsync = () => {
  return async (dispatch, getState) => {
    let returnDobule = await new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 200)
    }).then(() => {
      return 'kamil'
    })
    console.info('returnDobule', returnDobule)
    dispatch(increment(getState().core))


    let returnDobuleAgain = await new Promise((resolve) => {
      setTimeout(() => {
        dispatch(increment(getState().core))
        resolve()
      }, 200)
    })

    return returnDobuleAgain
  }
}

export const actions = {
  increment,
  doubleAsync
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CORE_INCREMENT]: (state, action) => state + action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0
export default function coreReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
