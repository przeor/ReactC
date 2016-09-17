import React from 'react'
import classes from './DashboardList.scss'


const ReducerRowsEditor = (props) => {

  if(props.editedItemIndex === null) 
    return <span />

  const rowColumns = props.inputValue ? props.inputValue : props.dashboard.reducerRows[props.editedItemIndex].rowColumns
  let inputJSX = rowColumns.map((cellItem, cellIndex) => {
    let inputJSX = <input 
      value={cellItem}
      type='input' 
      placeholder='type here a value' 
      style={{width: 300}}
      onChange={props.inputOnChange.bind(undefined, rowColumns, cellIndex)} />
    return <div key={cellIndex}>{inputJSX}</div>
  })

  return (<form onSubmit={props.onSubmit}>
    <h3>Edit Item</h3>
    {inputJSX}
    <input 
      type='submit' 
      value={ props.editedItemIndex === null ? 'Add New Item To The List' : 'Edit Item' } />
  </form>)
}


const ReducerRowsAdder = (props) => {
  if(props.editedItemIndex !== null) 
    return <span />

  const addInputJSX = Object.keys(props.dashboard.reducerSchema).map((keyItem, cellIndex) => {
    return (<div key={cellIndex}>
        <input 
          value={props.inputValue}
          type='input' 
          placeholder={keyItem+' - type here a value' }
          style={{width: 300}}
          onChange={props.inputOnChange.bind(undefined, [], cellIndex)} />
      </div>)
  })

  return (<form onSubmit={props.onSubmit}>
    <h3>Add Item</h3>
    {addInputJSX}
    <input 
      type='submit' 
      value={ props.editedItemIndex === null ? 'Add New Item To The List' : 'Edit Item' } />
  </form>)
}

export const DashboardList = (props) => {
  const listJSX = props.dashboard.reducerRows.map((item, i) => {
    const rowColumns = item.rowColumns

    let rowJSX = rowColumns.map((cellItem, cellIndex) => {
      let cellJSX

      if(props.editedItemIndex === i) {
        cellJSX = <p><b><u>{cellItem}</u></b></p>
      } else {
        cellJSX = <p>{cellItem}</p>
      }
      return <div key={cellIndex}>{cellJSX}</div>
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
    <ReducerRowsAdder {...props} />
    <ReducerRowsEditor {...props} />
    {listJSX}
  </div>
)}

DashboardList.propTypes = {
  dashboard: React.PropTypes.object.isRequired
}

export default DashboardList