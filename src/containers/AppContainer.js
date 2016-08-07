import React, { Component, PropTypes } from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'


import { connect } from 'react-redux'
import { increment, loginAsync } from '../routes/Session/modules/session'

const mapActionCreators = {
  increment: () => increment(1),
  loginAsync
}

const mapStateToProps = (state) => ({
  session: state.session
})


class AppContainer extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  render () {
    const { history, routes, store } = this.props

    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <div onClick={this.props.loginAsync} >login</div>
          <Router history={history} children={routes} />
        </div>
      </Provider>
    )
  }
}

export default connect(mapStateToProps, mapActionCreators)(AppContainer)