import React from 'react'
import classes from './Dashboard.scss'

export const Dashboard = (props) => {

  const listJSX = props.dashboard.reducerRows.map((item, i) => {
    console.info(item)
    const rowColumns = item.rowColumns

    let rowJSX = rowColumns.map((cellItem, cellIndex) => {
      console.info('cellItem', cellItem)

      let cellJSX

      if(props.editedItemIndex === i) {
        cellJSX = <p><b><u>{cellItem}</u></b></p>
      } else {
        cellJSX = <p>{cellItem}</p>
      }
      return <div>{cellJSX}</div>
    })

    return <h4 
            id={i}
            draggable='true'
            onDragOver={props.handleOnDragOver}
            onDragStart={props.handleOnDragStart}
            onDrop={props.handleOnDrop}
            key={i} 
            onClick={props.itemOnEdit.bind(undefined, i)}
            style={{cursor: 'pointer'}}>
              {rowJSX}
              <hr/>
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
        value={ props.editedItemIndex === null ? 'Add New Item To The List' : 'Edit Item' } />
    </form>
    {listJSX}
  </div>
)}

Dashboard.propTypes = {
  dashboard: React.PropTypes.object.isRequired
}

export default Dashboard
