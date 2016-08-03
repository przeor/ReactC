import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
const muiTheme = getMuiTheme({ userAgent: 'all' });

import Header from '../../components/Header'
import classes from './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children }) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div className='container text-center'>
      <Header />
      <div className={classes.mainContainer}>
        {children}
      </div>
    </div>
  </MuiThemeProvider>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
