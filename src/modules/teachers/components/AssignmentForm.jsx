import { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';

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
    this.selectNewSubjects = this.selectNewSubjects.bind(this);
    this.toggleStudent = this.toggleStudent.bind(this);

    const savedNewAssignments = (sessionStorage.getItem('savedNewAssignment'))
      ? JSON.parse(sessionStorage.getItem('savedNewAssignment'))
      : null;
    this.state = savedNewAssignments
      ? Object.assign( {}, initialState, savedNewAssignments)
      : Object.assign({}, initialState, props.fields);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.fields);
  }

  toggleStudent(e) {
    const student_id = e.target.value;
    const selected = e.target.checked;
    const { students } = this.state;

    if (!selected) {
      this.setState({
        students: students.filter(student => student !== student_id),
      })
    } else {
      this.setState({
        students: students.concat(student_id),
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

    let savedSubjectsIDs = sessionStorage.getItem('savedSubjectsIDs');
    savedSubjectsIDs = (savedSubjectsIDs === null || savedSubjectsIDs === '') ?
      [] : savedSubjectsIDs.split(',');
    newAssignment.subjects = savedSubjectsIDs;

    //TESTING: localhost uses 'Bacon' Zooniverse project for Subject IDs.
    //WildCam Gorongosa has no Staging data that we can use to create Subjects.
    //Therefore, we need to hardcode some Subject IDs.
    //--------
    if (window.location.hostname === 'localhost') {
      newAssignment.subjects = [
          '4077',
          '4079',
          '4078',
          '4076',
          '4080',
          '4075',
        ];
    }
    //--------

    //NOTE: According to Marten, it's perfectly OK to create an assignment with no students or subjects.
    //--------
    if (newAssignment.students.length > 0 && newAssignment.subjects.length) {
      sessionStorage.removeItem('savedNewAssignment');
      sessionStorage.removeItem('savedClassroomId');
      sessionStorage.removeItem('savedSubjectsLocations');
      sessionStorage.removeItem('savedSubjectsIDs');
      this.props.submitForm(newAssignment, this.props.params.classroomId)
    } else {
      alert('You can\'t create an assignment without students or subjects.')
    };
    //--------
  }

  renderStudentList(students) {
    return (
      <div>
        {(students.length > 0) ?
        <table className="table table-hover">
          <tbody>
            {students.map((student) => {
              const selected = this.state.students.find(id => id === student.id) ? true : false;
              return (
                <tr className={selected ? 'success' : ''} key={student.id}>
                  <td>
                    <label>
                      {(selected)
                        ? <input type="checkbox" value={student.id} onChange={this.toggleStudent} checked />
                        : <input type="checkbox" value={student.id} onChange={this.toggleStudent} />
                      }
                      {student.attributes.zooniverse_display_name}
                    </label>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        : 'No students here' }
      </div>
    )
  }

  renderSelectedSubjects() {
    const MAXIMUM_SUBJECTS = 10;
    let subjectsHtml = [];

    let savedSubjectsLocations = sessionStorage.getItem('savedSubjectsLocations');
    savedSubjectsLocations = (savedSubjectsLocations === null || savedSubjectsLocations === '') ?
      [] : savedSubjectsLocations.split(',');

    let savedSubjectsIDs = sessionStorage.getItem('savedSubjectsIDs');
    savedSubjectsIDs = (savedSubjectsIDs === null || savedSubjectsIDs === '') ?
      [] : savedSubjectsIDs.split(',');

    for (let i = 0; i < MAXIMUM_SUBJECTS && i < savedSubjectsIDs.length; i++) {
      subjectsHtml.push(
        <li key={'subjects_' + i}><img src={savedSubjectsLocations[i]} /></li>
      );
    }
    return (
      <div>
        <div>
          {savedSubjectsIDs.length} Subject(s) selected.
          {(subjectsHtml.length > 0) ? <span>Previewing {subjectsHtml.length} image(s)</span> : null}
        </div>
        <ul className="subjects-preview">
          {subjectsHtml}
        </ul>
      </div>
    );
  }

  selectNewSubjects() {
    sessionStorage.setItem('savedNewAssignment', JSON.stringify(this.state));
    sessionStorage.setItem('savedClassroomId', this.props.params.classroomId);
    browserHistory.push('/teachers/data');
  }

  render() {
    const { classrooms, params } = this.props;
    const data = classrooms && classrooms.data ? classrooms.data : [];
    const currentClassroom = data ? data.find(classroom => classroom.id === params.classroomId) : [];
    const currentStudentsIds = currentClassroom && currentClassroom.relationships.students.data.length > 0
      ? currentClassroom.relationships.students.data.map(student => student.id)
      : [];
    const currentStudents = classrooms
      ? classrooms.uniqueMembers.filter(
          student => currentStudentsIds.includes(student.id)
        )
      : {};
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
          {this.renderSelectedSubjects()}
        </div>
        <div className="form-group">
          <a className="btn" onClick={this.selectNewSubjects}>Select new images</a>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary pull-right">Submit</button>
        </div>
      </form>
    );
  }
}

export default AssignmentForm;
