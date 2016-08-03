import React from 'react'
import classes from './Dashboard.scss'


import Chip from 'material-ui/Chip'


const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};
const renderChip = (data) => {
  return (
    <Chip
      key={data.key}
      onRequestDelete={() => {}}
      style={styles.chip}
    >
      {data.label}
    </Chip>
  )
}

const ChipList = (props) => {
  console.info('chip', props)
  const chipData = props.dashboard.dashboardItems
  return (
    <div style={styles.wrapper}>
      {chipData.map(renderChip)}
    </div>
)}




export const Dashboard = (props) => {
  console.info(props)
  return (
  <div>
    <h2 className={classes.dashboardContainer}>
      Dashboard visits:
      {' '}
      <span className={classes['dashboard--green']}>
        {props.dashboard.visitsCount}
      </span>
    </h2>
    <ChipList {...props} />
  </div>
)}

Dashboard.propTypes = {
  // dashboard: React.PropTypes.object.isRequired
}

export default Dashboard
