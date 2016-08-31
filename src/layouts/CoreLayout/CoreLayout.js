import React, { Component, PropTypes } from 'react'
import Header from '../../components/Header'
import classes from './CoreLayout.scss'
import '../../styles/core.scss'
import { connect } from 'react-redux'
import { loginAsync } from '../../modules/session'
import Slideout from 'slideout'

// let's use global variable, because we need to work 
// with it during the React Lifecycle happens
// because the slideout lib works on the real browser's DOM (not virtual)
let slideout; 

const mapActionCreators = {
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

  componentDidMount() {
    slideout = new Slideout({
      'panel': document.getElementById('panel'),
      'menu': document.getElementById('menu'),
      'padding': 256,
      'tolerance': 70
    })
  }

  handleLogin(loginObj, e) {
    e.preventDefault()
    this.props.loginAsync(loginObj)
  }

  render () {

    return (
      <div>
        <nav id="menu" className="menu">
        <a href="https://github.com/mango/slideout" target="_blank">
          <header className="menu-header">
            <span className="menu-header-title">Tests</span>
          </header>
        </a>

        <section className="menu-section">
          <h3 className="menu-section-title">Docs</h3>
          <ul className="menu-section-list">
            <li><a href="https://github.com/mango/slideout#installation" target="_blank">Installation</a></li>
            <li><a href="https://github.com/mango/slideout#usage" target="_blank">Usage</a></li>
            <li><a href="https://github.com/mango/slideout#api" target="_blank">API</a></li>
            <li><a href="https://github.com/mango/slideout#npm-scripts" target="_blank">npm-scripts</a></li>
          </ul>
        </section>

        <section className="menu-section">
          <h3 className="menu-section-title">Docs</h3>
          <ul className="menu-section-list">
            <li><a href="https://github.com/mango/slideout#installation" target="_blank">Installation</a></li>
            <li><a href="https://github.com/mango/slideout#usage" target="_blank">Usage</a></li>
            <li><a href="https://github.com/mango/slideout#api" target="_blank">API</a></li>
            <li><a href="https://github.com/mango/slideout#npm-scripts" target="_blank">npm-scripts</a></li>
          </ul>
        </section>

        <section className="menu-section">
          <h3 className="menu-section-title">Docs</h3>
          <ul className="menu-section-list">
            <li><a href="https://github.com/mango/slideout#installation" target="_blank">Installation</a></li>
            <li><a href="https://github.com/mango/slideout#usage" target="_blank">Usage</a></li>
            <li><a href="https://github.com/mango/slideout#api" target="_blank">API</a></li>
            <li><a href="https://github.com/mango/slideout#npm-scripts" target="_blank">npm-scripts</a></li>
          </ul>
        </section>

        <section className="menu-section">
          <h3 className="menu-section-title">Docs</h3>
          <ul className="menu-section-list">
            <li><a href="https://github.com/mango/slideout#installation" target="_blank">Installation</a></li>
            <li><a href="https://github.com/mango/slideout#usage" target="_blank">Usage</a></li>
            <li><a href="https://github.com/mango/slideout#api" target="_blank">API</a></li>
            <li><a href="https://github.com/mango/slideout#npm-scripts" target="_blank">npm-scripts</a></li>
          </ul>
        </section>
      </nav>

      <main id="panel" className="panel">
        <header className="panel-header">
          <button onClick={() => { slideout.toggle() }} className="btn-hamburger js-slideout-toggle"></button>
          <Header 
            handleLogin={this.handleLogin} 
            session={this.props.session} />
        </header>

        <section className="box">
          {this.props.children}
        </section>

        <footer className="panel-footer">
          <p>with <span className="heart">❤</span> by <a href="https://getmango.com/en" target="_blank">Mango</a></p>
        </footer>
      </main>
    </div>)

    }
}


export default connect(mapStateToProps, mapActionCreators)(CoreLayout)