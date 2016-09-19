import React from 'react'
import { connect } from 'react-redux'
import { 
  dashboardVisitIncrement, 
  dashboardAddItem,
  dashboardEditItem ,
  dashboardReorderItems
} from '../modules/dashboard'
import DashboardList from 'components/Dashboard/DashboardList'

const mapActionCreators = {
  dashboardVisitIncrement: () => dashboardVisitIncrement(1),
  dashboardAddItem: (value) => dashboardAddItem(value),
  dashboardEditItem: (value) => dashboardEditItem(value),
  dashboardReorderItems: (value) => dashboardReorderItems(value)
}

const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
  session: state.session
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
    this.addInputOnChange = this.addInputOnChange.bind(this)


    this.state = {
      inputValue: [],
      editedItemIndex: null,
      draggedItemIndex: null
    }
  }

  componentDidMount() {
    this.props.dashboardVisitIncrement();
  }

  handleOnDragStart (e) {
    const id = e.target.id
    this.setState({ draggedItemIndex: id })
  }

  handleOnDragOver (e) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'  // See the section on the DataTransfer object.
    // You can add here more logic if required
  }

  handleOnDrop (e) {
    const droppedItemId = e.currentTarget.id
    let reorderVal = {
      start: parseInt(this.state.draggedItemIndex),
      end: parseInt(droppedItemId)
    }

    // the div ids have to be numbers to reorder correctly
    // and the start and end value has to be different (otherwise reorder is not required)
    const reorderIsCorrect = !isNaN(reorderVal.start) && !isNaN(reorderVal.end) && reorderVal.start !== reorderVal.end

    if(reorderIsCorrect) {
      this.props.dashboardReorderItems(reorderVal)
    }

    this.setState({ draggedItemIndex: null })
  }

  inputOnChange(rowColumns, cellIndex, e) {
    rowColumns[cellIndex] = Object.assign({}, rowColumns[cellIndex])  // passing by value, NOT reference!
    rowColumns[cellIndex].value = e.target.value
    this.setState({ inputValue: rowColumns })
  }

  addInputOnChange(schemaKeys, reducerSchema, cellIndex, e) {
    const allInputsLen = schemaKeys.length
    let currentInputs = this.state.inputValue.slice()
    if(currentInputs.length === 0) {
      for(var i = 0; i < allInputsLen; i++) {
          let newObj = {}
          newObj.name = schemaKeys[i]
          newObj.type = reducerSchema[schemaKeys[i]]
          newObj.value = ''
          currentInputs.push(newObj);
      }
    }
    currentInputs[cellIndex].value = e.target.value
    this.setState({ inputValue: currentInputs })
  }

  itemOnEdit(itemIndex) {
    const editedItem = this.props.dashboard.reducerRows[itemIndex]
    this.setState({ inputValue: editedItem.label, editedItemIndex: itemIndex })
  }

  onSubmit(e) {
    e.preventDefault()
    const val = this.state.inputValue
    const editedItemIndex = this.state.editedItemIndex
    if(val && editedItemIndex !== null) {
      this.props.dashboardEditItem({ val, editedItemIndex })
      this.setState({ inputValue: [], editedItemIndex: null })
    } else if(val) {
      this.props.dashboardAddItem(val)
      this.setState({ inputValue: [] })
    } else {
      alert(`Value can't be empty`)
    }
  }

  render () {
    return (
        <DashboardList {...this.props} 
          handleOnDragOver={this.handleOnDragOver}
          handleOnDrop={this.handleOnDrop}
          handleOnDragStart={this.handleOnDragStart}
          editedItemIndex={this.state.editedItemIndex}
          itemOnEdit={this.itemOnEdit}
          inputValue={this.state.inputValue}
          inputOnChange={this.inputOnChange}
          addInputOnChange={this.addInputOnChange}
          onSubmit={this.onSubmit} />
    );
  }
}

export default connect(mapStateToProps, mapActionCreators)(DashboardContainer)
