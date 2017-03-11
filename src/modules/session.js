import {push} from 'react-router-redux'
import client from 'utils/apolloConfig'
import gql from 'graphql-tag'

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

    console.info('loginObj', loginObj)

    await client
      .mutate({mutation: loginUserMutation, variables: variablesLogin})
      .then((results) => {
        console.info('login res', results)
        return results.data.loginUser.token

    }).catch((errorReason) => {
      // Here you handle any errors.
      // You can dispatch some
      // custom error actions like:
      // dispatch(yourCustomErrorAction(errorReason))
      console.info('error', errorReason.graphQLErrors[0].message)

      dispatch(loginFail(errorReason.graphQLErrors[0].message))
    })

    return 1

    if(loginToken !== 'invalid') {
      dispatch(loginSuccess(loginToken))
      dispatch(push('/dashboard'))
    } else {
      
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
      loginToken: 'invalid',
      errorMessage: action.payload
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
  errorMessage: null
}
export default function sessionReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
