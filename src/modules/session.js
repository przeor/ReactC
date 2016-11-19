import {push} from 'react-router-redux'

// ------------------------------------
// Constants
// ------------------------------------
export const SESSION_LOGIN_SUCCESS = 'SESSION_LOGIN_SUCCESS'
export const SESSION_LOGIN_FAIL = 'SESSION_LOGIN_FAIL'

// ------------------------------------
// Actions
// ------------------------------------
export function loginSuccess (value) {
  return {
    type: SESSION_LOGIN_SUCCESS,
    payload: value
  }
}

export function loginFail (value) {
  return {
    type: SESSION_LOGIN_FAIL,
    payload: value
  }
}

export const loginAsync = (loginObj) => {
  return async (dispatch, getState) => {
    let loginToken = await new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 200)
    }).then(() => {

      if(loginObj.user === 'przeor' && loginObj.password === 'mwp.io') {
        return 'www.mwp.io' // just a mocked token
      } else {
        return 'invalid' // mocked non successful login
      }
    })

    if(loginToken !== 'invalid') {
      dispatch(loginSuccess(loginToken))
      dispatch(push('/dashboard'))
    } else {
      dispatch(loginFail(loginToken))
    }
    
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SESSION_LOGIN_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      loginToken: action.payload,
      isNotLoggedIn: false
    })
  },
  [SESSION_LOGIN_FAIL]: (state, action) => {
    return Object.assign({}, state, {
      loginToken: action.payload
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { 
  count: 0,
  isNotLoggedIn: true,
  loginToken: 'none'
}
export default function sessionReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
