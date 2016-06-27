import { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import InputElement from './InputElement';

const initialState = {
  name: '',
  description: '',
  date: '',
  students: [] ,
}

class AssignmentForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderStudentList = this.renderStudentList.bind(this);
    this.toggleStudent = this.toggleStudent.bind(this);
    this.state = Object.assign({}, initialState, props.fields );
  }


  addStudentsToAssignment() {

  }


// Move this Assignment reducer
//
//  toggleStudent(id) {
//    let newState = Object.assign({}, this.state);
//    console.log(this.state.students[id])
//    if (this.state.students[id]) {
//      newState.students.filter(student => student.id !== id)
//      console.log('remove: ', newState)
//      return newState;
//
//    } else {
//      newState.students.push(id);
//      console.log('add: ', newState)
//      return newState;
//    }
//  }

  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    console.log('nextState: ', nextState);
    this.setState(nextState);
  }

  handleSubmit(e) {
    e.preventDefault();
    const newAssignment = {};
    for (const key in this.state) {
      if (this.state.hasOwnProperty(key)) {
        newAssignment[key] = this.state[key].trim();
      }
    }
    this.props.submitForm(newAssignment);
  }

  renderStudentList(students) {
    return (
      <div>
        {(students.length > 0) ?
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) =>
            <tr key={student.id}>
              <td onClick={this.toggleStudent.bind(this, student.id)}>
                {student.attributes.zooniverse_display_name}
              </td>
            </tr>
            )}
          </tbody>
        </table>
        : 'No students here' }
      </div>
    )
  }

  render() {
    const { classrooms, params } = this.props;
    const data = classrooms.data ? classrooms.data : [];
    const currentClassroom = data ? data.find(classroom => classroom.id === params.classroomId) : [];
    const currentStudentsIds = currentClassroom && currentClassroom.relationships.students.data.length > 0
      ? currentClassroom.relationships.students.data.map(student => student.id)
      : [];
    const currentStudents = classrooms.uniqueMembers.filter(
      student => currentStudentsIds.includes(student.id)
    )
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Classroom {currentClassroom ? currentClassroom.attributes.name : 'Loading'}</h3>
        <InputElement
          autofocus="true"
          label="Name"
          onChange={this.handleChange}
          placeholder="Insert Name"
          required="required"
          value={this.state.name}
        />
        <InputElement
          label="Description"
          onChange={this.handleChange}
          placeholder="Insert Description"
          required="required"
          value={this.state.description}
        />
        <InputElement
          label="Date"
          onChange={this.handleChange}
          placeholder="E.g. MM-DD-YYYY"
          required="required"
          value={this.state.date}
        />
        <div className="form-group">
          <label>Students</label>
          { this.renderStudentList(currentStudents) }
        </div>
        <div className="form-group">
         <button type="submit" className="btn btn-primary pull-right">Submit</button>
        </div>
      </form>
    );
  }
}


export default AssignmentForm;
