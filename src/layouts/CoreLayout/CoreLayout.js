import React, { Component, PropTypes } from 'react'
import Header from '../../components/Header'
import classes from './CoreLayout.scss'
import '../../styles/core.scss'
import { connect } from 'react-redux'
import { loginAsync, checkIflAlreadyLogin, clearStorageAndLogout } from '../../modules/session'

const mapActionCreators = {
  loginAsync,
  checkIflAlreadyLogin,
  clearStorageAndLogout
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

  componentWillMount() {
    this.props.checkIflAlreadyLogin()
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
          handleLogout={this.props.clearStorageAndLogout}
          session={this.props.session} />
        <div className={classes.mainContainer}>
          {this.props.children}
        </div>
      </div>)

    }
}


export default connect(mapStateToProps, mapActionCreators)(CoreLayout)