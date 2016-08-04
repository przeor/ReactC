import React from 'react'
import classes from './Dashboard.scss'

export const Dashboard = (props) => {

  const listJSX = props.dashboard.dashboardItems.map((item, i) => {
    return <h4 
            key={i} 
            onClick={props.itemOnEdit.bind(undefined,i)}
            style={{cursor: 'pointer'}}>
              {item.label}
          </h4>
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
    <form onSubmit={props.onSubmit}>
      <input 
        value={props.inputValue}
        type='input' 
        placeholder='type here a value' 
        style={{width: 300}}
        onChange={props.inputOnChange} />
      <input 
        type='submit' 
        value='Add New Item To The List' />
    </form>
    {listJSX}
  </div>
)}

Dashboard.propTypes = {
  dashboard: React.PropTypes.object.isRequired
}

export default Dashboard
