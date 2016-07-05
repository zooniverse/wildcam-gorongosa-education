import { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import InputElement from './InputElement';

const initialState = {
  classifications_target: '',
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
    const { students } = this.state;
    if (students.includes(id)) {
      this.setState({
        students: students.filter(student => student !== id),
      })
    } else {
      this.setState({
        students: students.concat(id),
      })
    }
  }

  handleChange(e) {
    const nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleSubmit(e) {
    e.preventDefault();
    const newAssignment = {};
    for (const key in this.state) {
      if (this.state.hasOwnProperty(key)) {
        newAssignment[key] = this.state[key];
      }
    }
    if (newAssignment.students.length > 0 && newAssignment.subjects.length) {
      this.props.submitForm(newAssignment, this.props.params.classroomId)
    } else {
      alert('You can\'t create an assignment without students or subjects.')
    };
  }

  renderStudentList(students) {
    return (
      <div>
        {(students.length > 0) ?
        <table className="table table-hover">
          <tbody>
            {students.map((student) =>
            <tr
              className={this.state.students.find(id => id === student.id) ? 'success' : ''}
              key={student.id}
            >

              <td>
                <label><input type="checkbox" value={student.id} onClick={this.toggleStudent.bind(this, student.id)} />
                {student.attributes.zooniverse_display_name}
                </label>
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
          name="duedate"
          onChange={this.handleChange}
          placeholder="E.g. MM-DD-YYYY"
          required="required"
          value={this.state.duedate}
        />
        <InputElement
          label="Number of classifications"
          name="classifications_target"
          onChange={this.handleChange}
          placeholder="Note: per student"
          required="required"
          value={this.state.classifications_target}
        />
        <div className="form-group">
          <div><strong>Students by username</strong></div>
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
