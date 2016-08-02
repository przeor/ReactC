import React from 'react'
import { connect } from 'react-redux'
import { dashboardVisitIncrement } from '../modules/dashboard'
import Dashboard from 'components/Dashboard'

const mapActionCreators = {
  dashboardVisitIncrement: () => dashboardVisitIncrement(1)
}

const mapStateToProps = (state) => ({
  dashboard: state.dashboard
})


class DashboardContainer extends React.Component {
  componentDidMount() {
    this.props.dashboardVisitIncrement();
  }

  render () {
    return (
        <Dashboard {...this.props} />
    );
  }
}

export default connect(mapStateToProps, mapActionCreators)(DashboardContainer)
