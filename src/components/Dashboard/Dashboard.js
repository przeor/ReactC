import React from 'react'
import classes from './Dashboard.scss'

export const Dashboard = (props) => (
  <div>
    <h2 className={classes.dashboardContainer}>
      Dashboard visits:
      {' '}
      <span className={classes['dashboard--green']}>
        {props.dashboard}
      </span>
    </h2>
  </div>
)

Dashboard.propTypes = {
  dashboard: React.PropTypes.number.isRequired
}

export default Dashboard
