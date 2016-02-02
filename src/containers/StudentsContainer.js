import React from 'react';
import { connect } from 'react-redux'
import Panoptes from 'panoptes-client';
import StudentsTable from '../components/StudentsTable.jsx'


//curl 'http://localhost:3000/teachers/classrooms.json' -X 'GET' -H "Authorization: Bearer bcfb1211852702e3cfd745c6b557351e60f406d472bffe2803c93d79e6a05124" -H "Content-Type: application/json"


class StudentsContainer extends React.Component{

  createClassroom(name) {
    $.ajax.post({
      url: 'http://localhost:3000/teachers/classrooms',
      body: JSON.stringify({data: {attributes: {name: name}}}),
      headers: {'Authorization': 'Bearer ' + 'bcfb1211852702e3cfd745c6b557351e60f406d472bffe2803c93d79e6a05124'}
    })
  }

  render(){
    console.log('CLassrooms: ', this.createClassroom('foo'))
    console.log('Wildcam-Staging: ', Panoptes.apiClient.type('projects').get('937'))
    return(
      <StudentsTable/>
    )
  }
}
function mapStateToProps(state) {
  return { project: state.project }
}
export default connect(mapStateToProps)(StudentsContainer)




