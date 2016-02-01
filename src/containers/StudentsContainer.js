import React from 'react';
import { connect } from 'react-redux'
import Panoptes from 'panoptes-client';
import StudentsTable from '../components/StudentsTable.jsx'

//import { addStudent } from '../actions'
//import { getTotal, getCartProducts } from '../reducers'

class StudentsContainer extends React.Component{

  render(){
    console.log('----376: ', Panoptes.apiClient.type('projects').get('376'))
    return(
      <StudentsTable/>
    )
  }
}
function mapStateToProps(state) {
  return { project: state.project }
}
export default connect(mapStateToProps)(StudentsContainer)




