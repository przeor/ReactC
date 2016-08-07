import React from 'react'
import classes from './Session.scss'

export const Session = (props) => (
  <div>
    <h2 className={classes.sessionContainer}>
      Session:
      {' '}
      <span className={classes['session--green']}>
        {props.session}
      </span>
    </h2>
    <button className='btn btn-default' onClick={props.increment}>
      Increment
    </button>
    {' '}
    <button className='btn btn-default' onClick={props.loginAsync}>
      login (Async)
    </button>
  </div>
)

Session.propTypes = {
  session: React.PropTypes.number.isRequired,
  loginAsync: React.PropTypes.func.isRequired,
  increment: React.PropTypes.func.isRequired
}

export default Session
