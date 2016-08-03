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

  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          id: 1,
          columnName: 'ToDo',
          itemsArray: [
            { 
              id: 'a',
              itemName: 'First react app'
            }
          ]
        },
        {
          id: 2,
          columnName: 'In Progress',
          itemsArray: []
        },
        {
          id: 3,
          columnName: 'Done',
          itemsArray: [
            { 
              id: 'b',
              itemName: 'Chat'
            },
            { 
              id: 'c',
              itemName: 'Toolbar'
            }
          ]
        }
      ]
    }

  }

  componentDidMount() {
    this.props.dashboardVisitIncrement();

    const mockedAfterUpdate = [
        {
          id: 2,
          columnName: 'In Progress',
          itemsArray: []
        },
        {
          id: 1,
          columnName: 'ToDo',
          itemsArray: [
            { 
              id: 'a',
              itemName: 'First react app'
            }
          ]
        },
        {
          id: 3,
          columnName: 'Done',
          itemsArray: [
            { 
              id: 'b',
              itemName: 'Chat'
            },
            { 
              id: 'c',
              itemName: 'Toolbar'
            }
          ]
        }
      ]

    setTimeout(() => {
      this.setState({ columns: mockedAfterUpdate })
    }, 1000)
  }

  render () {
    console.info(this.state.columns)
    return (
      <div>
        <div className="toDoList">
          <div className="innertoDoList">
            <div className="header">
              <div className="head"></div>
              <h2 className="title">ToDoList</h2>
            </div>
            <div className="content">
              <div className="list-content">Termopara</div>
            </div>
            <div className="content">
              <div className="list-content">read the book</div>
            </div>
            <div className="content">
              <div className="list-content">react</div>
            </div>
            <a href="#" className="addCart">Dodaj karte...</a>
          </div>
        </div>

        <div className="toDoList">
          <div className="innertoDoList">
            <div className="header">
              <div className="head"></div>
              <h2 className="title">Mom says</h2>
            </div>
            <div className="content">
              <div className="list-content">wash dishes</div>
            </div>
            <div className="content">
              <div className="list-content">wash bathroom</div>
            </div>

            <a href="#" className="addCart">Dodaj karte...</a>
          </div>
        </div>


        <div className="toDoList">
          <div className="innertoDoList">
            <div className="header">
              <div className="head"></div>
              <h2 className="title">Dad</h2>
            </div>

            <div className="content">
              <div className="list-content">repair car</div>
            </div>
            <div className="content">
              <div className="list-content">cut the grass</div>
            </div>
            <a href="#" className="addCart">Dodaj karte...</a>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapActionCreators)(DashboardContainer)
