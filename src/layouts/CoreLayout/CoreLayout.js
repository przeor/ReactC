import React from 'react'
import Header from '../../components/Header'
import classes from './CoreLayout.scss'
import '../../styles/core.scss'
import { 
  sessionLoginAsync
} from '../modules/core'

export const CoreLayout = ({ children }) => (
    <div className='container text-center'>
      <Header 
      	sessionLoginAsync={sessionLoginAsync} />
      <div className={classes.mainContainer}>
        {children}
      </div>
    </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
