import React from 'react'
import classes from './Session.scss'

export const Session = (props) => (
  <div>
    <h2 className={classes.sessionContainer}>
      Session:
      {' '}
      <span className={classes['session--green']}>
        {props.session.count} <br/>
        {props.session.loginToken}
      </span>
    </h2>
    <button className='btn btn-default' onClick={props.increment}>
      Increment
    </button>
  </div>
)

Session.propTypes = {
  session: React.PropTypes.object.isRequired,
  loginAsync: React.PropTypes.func.isRequired,
  increment: React.PropTypes.func.isRequired
}

export default Session