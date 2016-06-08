import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import InputElement from './InputElement';

import { createAssignment } from '../actions/teacher';

const initialState = {
  name: '',
  description: '',
  students: [],
}

class AssignmentForm extends Component {
  constructor(props) {
    super(props);
//    this.state = {
//      name: this.props.name || '',
//      description: this.props.description || '',
//      students: this.props.students || [],
//    }
    this.addStudentsToAssignment = this.addStudentsToAssignment.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderStudentList = this.renderStudentList.bind(this);
    this.state = Object.assign({}, initialState, props.fields );
  }


  addStudentsToAssignment() {

  }

  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
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
    this.props.dispatch(createAssignment())
  }

  renderStudentList(students) {
    return (
      <div>
        {(students.length > 0) ?
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Add</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, i) =>
            <tr key={i}>
              <td>{student.attributes.zooniverse_display_name}</td>
              <td>
                <label htmlFor={'input-add-' + i} className="sr-only" >Add</label>
                <input id={'input-add-' + i} onChange={this.handleChange} type="checkbox" />
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
      <div className="col-md-4">
        <div className='page-header'>
          <h1>New Assignment</h1>
        </div>
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
          <div className="form-group">
            <label>Students</label>
            { this.renderStudentList(currentStudents) }
          </div>
          <div className="form-group">
           <button type="submit" className="btn btn-primary pull-right">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  classrooms: state.teacher.classrooms
});

const mapDispatchToProps = dispatch => ({
  actions: {
    createAssignment: bindActionCreators(createAssignment, dispatch),
  }
});

AssignmentForm.defaultProps = {
  name: '',
  description: '',
  students: [],
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentForm);
