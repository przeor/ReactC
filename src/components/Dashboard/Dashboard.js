import React from 'react'
import classes from './Dashboard.scss'

export const Dashboard = (props) => {

  const listJSX = props.dashboard.dashboardItems.map((item, i) => {
    return <h4 key={i}>{item.label}</h4>
  })

  return (
  <div>
    <h2 className={classes.dashboardContainer}>
      Dashboard visits:
      {' '}
      <span className={classes['dashboard--green']}>
        {props.dashboard.visitsCount}
      </span>
    </h2>
    {listJSX}
  </div>
)}

Dashboard.propTypes = {
  dashboard: React.PropTypes.object.isRequired
}

export default Dashboard
