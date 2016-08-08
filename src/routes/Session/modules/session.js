// ------------------------------------
// Constants
// ------------------------------------
export const SESSION_INCREMENT = 'SESSION_INCREMENT'
export const SESSION_LOGIN_SUCCESS = 'SESSION_LOGIN_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
export function increment (value = 1) {
  return {
    type: SESSION_INCREMENT,
    payload: value
  }
}

export function loginSuccess (value) {
  return {
    type: SESSION_LOGIN_SUCCESS,
    payload: value
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk!

    NOTE: This is solely for demonstration purposes. In a real application,
    you'd probably want to dispatch an action of SESSION_DOUBLE and let the
    reducer take care of this logic.  */

export const loginAsync = (loginObj) => {
  console.info('login value', loginObj)


  return async (dispatch, getState) => {
    let loginToken = await new Promise((resolve) => {
      console.info('logging with details:', loginObj)
      setTimeout(() => {
        resolve()
      }, 200)
    }).then(() => {
      if(loginObj.user === 'admin' && loginObj.password === 'mwp.io') {
        return 'www.mwp.io' // just a mocked token
      } else {
        return 'invalid' // mocked non successful login
      }
    })
    console.info('loginToken', loginToken)
    dispatch(loginSuccess(loginToken))
  }
}

export const actions = {
  increment,
  loginAsync
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SESSION_INCREMENT]: (state, action) => {
    state.count = state.count + action.payload
    return Object.assign({}, state)
  },
  [SESSION_LOGIN_SUCCESS]: (state, action) => {
    state.loginToken = action.payload
    return Object.assign({}, state)
  }
}


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { 
  count: 0,
  loginToken: 'none'
}
export default function sessionReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
