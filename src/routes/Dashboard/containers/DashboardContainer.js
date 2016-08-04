import React from 'react'
import { connect } from 'react-redux'
import { dashboardVisitIncrement, dashboardAddItem } from '../modules/dashboard'
import Dashboard from 'components/Dashboard'

const mapActionCreators = {
  dashboardVisitIncrement: () => dashboardVisitIncrement(1),
  dashboardAddItem: (value) => dashboardAddItem(value)
}

const mapStateToProps = (state) => ({
  dashboard: state.dashboard
})


class DashboardContainer extends React.Component {
  constructor(props) {
    super(props)

    this.inputOnChange = this.inputOnChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)


    this.state = {
      inputValue: ''
    }
  }

  componentDidMount() {
    this.props.dashboardVisitIncrement();
  }

  inputOnChange(e) {
    this.setState({ inputValue: e.target.value })
  }

  itemOnEdit(itemIndex) {
    console.info('itemIndex', itemIndex)
  }

  onSubmit(e) {
    e.preventDefault()
    const val = this.state.inputValue
    if(val) {
      this.props.dashboardAddItem(val)
      this.setState({ inputValue: '' })
    } else {
      alert(`Value can't be empty`)
    }
  }

  render () {
    return (
        <Dashboard {...this.props} 
          itemOnEdit={this.itemOnEdit}
          inputValue={this.state.inputValue}
          inputOnChange={this.inputOnChange}
          onSubmit={this.onSubmit} />
    );
  }
}

export default connect(mapStateToProps, mapActionCreators)(DashboardContainer)
