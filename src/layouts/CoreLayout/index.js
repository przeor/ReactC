import CoreLayout from './CoreLayout'
import { injectReducer } from '../../store/reducers'

export default (store) => { 

  /*  Webpack - use require callback to define
      dependencies for bundling   */
  const Core = require('./CoreLayout').default
  const reducer = require('../modules/core').default

  /*  Add the reducer to the store on key 'core'  */
  injectReducer(store, { key: 'core', reducer })

  return CoreLayout
}
