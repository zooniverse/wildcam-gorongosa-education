import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Dropdown from 'Dropdown.jsx';

import { createAssignment } from '../actions/teacher';

class NewClassroomForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name || '',
    }
    this.addStudentsToAssignment = this.addStudentsToAssignment.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderStudentList = this.renderStudentList.bind(this);
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
    let name = e.target[0].value.trim();
    if (name.length > 0) {
      this.props.dispatch(createAssignment()
    )}
    this.setState({
      name: '',
    })
  }

  renderStudentList(students) {
    return (
      <div>
        {(students.length > 0) ?
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, i) =>
            <tr key={i}>
              <td>{student.attributes.zooniverse_display_name}</td>
              <td><label><input onChange={this.handleChange} type="checkbox" />Add</label></td>
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
    const currentClassroom = data.find(classroom => classroom.id === params.classroomId)
    const currentStudentsIds = currentClassroom.relationships && currentClassroom.relationships.students.data.length > 0
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
          <div className="form-group">
           <label>Name</label>
           <input className="form-control"
            type="text"
            name="name"
            placeholder="Insert Name"
            autofocus="true"
            value={this.state.name}
            onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <Dropdown
              question='Classroom'
              name='classroom'
              options={data}
              value={currentClassroom.attributes.name}
              onChange={this.handleChange}/>
          </div>
          <div className="form-group">
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

export default connect(mapStateToProps, mapDispatchToProps)(NewClassroomForm);
