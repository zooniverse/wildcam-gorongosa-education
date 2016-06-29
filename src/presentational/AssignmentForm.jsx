import { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import InputElement from './InputElement';

const initialState = {
  active: false,
  classifications: '',
  description: '',
  duedate: '',
  name: '',
  students: [],
  subjects: [],
}


class AssignmentForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderStudentList = this.renderStudentList.bind(this);
    this.toggleStudent = this.toggleStudent.bind(this);
    this.state = Object.assign({}, initialState);
  }


  toggleStudent(id) {
    if (this.state.students.includes(id)) {
      this.state.students = this.state.students.filter(student => student !== id)
      this.setState({
        students: this.state.students,
      })
    } else {
      this.state.students.push(id);
      this.setState({
        students: this.state.students,
      })
    }
  }

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
            <tr
              className={this.state.students.find(id => id === student.id) ? 'success' : ''}
              key={student.id}
              onClick={this.toggleStudent.bind(this, student.id)}
            >
              <td>
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
        <InputElement
          label="Classifications"
          onChange={this.handleChange}
          placeholder="Number per student"
          required="required"
          value={this.state.classifications}
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
