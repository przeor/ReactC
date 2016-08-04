import React from 'react'
import { connect } from 'react-redux'
import { 
  dashboardVisitIncrement, 
  dashboardAddItem,
  dashboardEditItem 
} from '../modules/dashboard'
import Dashboard from 'components/Dashboard'

const mapActionCreators = {
  dashboardVisitIncrement: () => dashboardVisitIncrement(1),
  dashboardAddItem: (value) => dashboardAddItem(value),
  dashboardEditItem: (value) => dashboardEditItem(value)
}

const mapStateToProps = (state) => ({
  dashboard: state.dashboard
})


class DashboardContainer extends React.Component {
  constructor(props) {
    super(props)

    this.inputOnChange = this.inputOnChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.itemOnEdit = this.itemOnEdit.bind(this)
    this.handleOnDragStart = this.handleOnDragStart.bind(this)
    this.handleOnDrop = this.handleOnDrop.bind(this)
    this.handleOnDragOver = this.handleOnDragOver.bind(this)


    this.state = {
      inputValue: '',
      editedItemIndex: null,
      draggedItemIndex: null,
      droppedItemIndex: null
    }
  }

  componentDidMount() {
    this.props.dashboardVisitIncrement();
  }

  handleOnDragStart (e) {
    const id = e.target.id
    console.info('start id', id)
  }

  handleOnDragOver (e) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
    // You can add here more logic if required
  }

  handleOnDrop (e) {
    const id = e.currentTarget.id
    console.info('drop id', id)
  }

  inputOnChange(e) {
    this.setState({ inputValue: e.target.value })
  }

  itemOnEdit(itemIndex) {
    const editedItem = this.props.dashboard.dashboardItems[itemIndex]
    this.setState({ inputValue: editedItem.label, editedItemIndex: itemIndex })
  }

  onSubmit(e) {
    e.preventDefault()
    const val = this.state.inputValue
    const editedItemIndex = this.state.editedItemIndex
    if(val && editedItemIndex !== null) {
      this.props.dashboardEditItem({ val, editedItemIndex })
      this.setState({ inputValue: '', editedItemIndex: null })
    } else if(val) {
      this.props.dashboardAddItem(val)
      this.setState({ inputValue: '' })
    } else {
      alert(`Value can't be empty`)
    }
  }

  render () {
    return (
        <Dashboard {...this.props} 
          handleOnDragOver={this.handleOnDragOver}
          handleOnDrop={this.handleOnDrop}
          handleOnDragStart={this.handleOnDragStart}
          editedItemIndex={this.state.editedItemIndex}
          itemOnEdit={this.itemOnEdit}
          inputValue={this.state.inputValue}
          inputOnChange={this.inputOnChange}
          onSubmit={this.onSubmit} />
    );
  }
}

export default connect(mapStateToProps, mapActionCreators)(DashboardContainer)
