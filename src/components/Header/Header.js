import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'

const login = (props) => {
  console.info('login is', props)
  props.sessionLoginAsync({login: 'user', password: 'pass'})
}

export const Header = (props) => {
  console.info('propppp222', props)
  return (
    <div>
      <h1>React Redux Starter Kit</h1>
      <IndexLink to='/' activeClassName={classes.activeRoute}>
        Home
      </IndexLink>
      {' · '}
      <Link to='/counter' activeClassName={classes.activeRoute}>
        Counter
      </Link>
      {' · '}
      <Link to='/dashboard' activeClassName={classes.activeRoute}>
        Dashboard
      </Link>
      {' · '}
      <div onClick={login.bind(undefined, props)}>
        Login
      </div>

    </div>
  )
}

export default Header
