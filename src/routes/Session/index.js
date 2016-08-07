import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'session',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Session = require('./containers/SessionContainer').default
      const reducer = require('./modules/session').default

      /*  Add the reducer to the store on key 'session'  */
      injectReducer(store, { key: 'session', reducer })

      /*  Return getComponent   */
      cb(null, Session)

    /* Webpack named bundle   */
    }, 'session')
  }
})
