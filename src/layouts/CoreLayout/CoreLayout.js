import React, { Component, PropTypes } from 'react'
import Header from '../../components/Header'
import classes from './CoreLayout.scss'
import '../../styles/core.scss'
import { connect } from 'react-redux'
import { increment, loginAsync } from '../../routes/Session/modules/session'

const mapActionCreators = {
  increment: () => increment(1),
  loginAsync
}

const mapStateToProps = (state) => ({
  session: state.session
})


class CoreLayout extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin(loginObj, e) {
    e.preventDefault()
    this.props.loginAsync(loginObj)
  }

  render () {
    return (
      <div className='container text-center'>
        <Header 
          handleLogin={this.handleLogin} 
          session={this.props.session} />
        <div className={classes.mainContainer}>
          {this.props.children}
        </div>
      </div>)

    }
}


export default connect(mapStateToProps, mapActionCreators)(CoreLayout)