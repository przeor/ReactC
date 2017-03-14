import {push} from 'react-router-redux'
import client from 'utils/apolloConfig'
import gql from 'graphql-tag'

// ------------------------------------
// Constants
// ------------------------------------
export const SESSION_LOGIN_SUCCESS = 'SESSION_LOGIN_SUCCESS'
export const SESSION_LOGIN_FAIL = 'SESSION_LOGIN_FAIL'
export const SESSION_LOGOUT_SUCCESS = 'SESSION_LOGOUT_SUCCESS'

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

export function sessionLogoutSuccess () {
  return {
    type: SESSION_LOGOUT_SUCCESS
  }
}



export const loginAsync = (loginObj) => {
  return async (dispatch, getState) => {

    const loginUserMutation = gql `
      mutation LoginUserMutation($data: LoginUserInput!) {
        loginUser(input: $data) {
          token
          user {
            id
            username
          }
        }
      }`

    const variablesLogin = {
        'data': {
          // we use this notation for better readability in the tutorial
          'username': loginObj.username,
          'password': loginObj.password
        }
      }

    const loginUserObj = await client
      .mutate({mutation: loginUserMutation, variables: variablesLogin})
      .then((results) => {
        return results.data.loginUser
    }).catch((errorReason) => {
      // Here you handle any errors.
      // You can dispatch some
      // custom error actions like:
      // dispatch(yourCustomErrorAction(errorReason))
      dispatch(loginFail(errorReason.graphQLErrors[0].message))
      return false
    })

    if(loginUserObj) {
      const userDetails = loginUserObj.user
      // we will save those info in the browser's localStorage
      // in order to re-login automatically
      localStorage.setItem('currentToken', loginUserObj.token)
      localStorage.setItem('currentUsername', userDetails.username)
      localStorage.setItem('currentUserId', userDetails.id)
      dispatch(loginSuccess(loginUserObj))
      dispatch(push('/dashboard'))
    }
  }
}

export const checkIflAlreadyLogin = () => {
  return async (dispatch, getState) => {
    // TODO: The login functionality, still is missing
    // recognition mechanism when a login token
    // is expried
    const currentToken = localStorage.getItem('currentToken')
    const currentUsername = localStorage.getItem('currentUsername')
    const currentUserId = localStorage.getItem('currentUserId')
    const isLoggedIn = currentToken && currentUsername && currentUserId
    if(isLoggedIn) {
      const loginUserObj = {
        token: currentToken,
        user: {
          username: currentUsername,
          id: currentUserId
        }
      }
      dispatch(loginSuccess(loginUserObj))
    }
  }
}


export const clearStorageAndLogout = () => {
  return async (dispatch, getState) => {
    localStorage.clear()
    dispatch(sessionLogoutSuccess())
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SESSION_LOGIN_SUCCESS]: (state, action) => {
    const loginUserObj = action.payload
    const userDetails = loginUserObj.user
    return Object.assign({}, state, {
      loginToken: loginUserObj.token,
      isNotLoggedIn: false,
      username: userDetails.username,
      userId: userDetails.id
    })
  },
  [SESSION_LOGIN_FAIL]: (state, action) => {
    return Object.assign({}, state, {
      loginToken: 'invalid',
      errorMessage: action.payload
    })
  },
  [SESSION_LOGOUT_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      loginToken: 'none',
      isNotLoggedIn: true,
      username: null,
      userId: null
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { 
  count: 0,
  isNotLoggedIn: true,
  loginToken: 'none',
  errorMessage: null,
  username: null,
  userId: null
}

export default function sessionReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

