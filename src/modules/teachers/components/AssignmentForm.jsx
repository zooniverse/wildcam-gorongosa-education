import { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';

import InputElement from './InputElement';
import Spinner from '../../common/components/Spinner';

const initialState = {
  classifications_target: '',
  description: '',
  duedate: '',
  filters: {},
  loading: false,
  name: '',
  students: [],
  subjects: [],
}


class AssignmentForm extends Component {
  constructor(props) {
    super(props);
    this.editMode = this.editMode.bind(this);
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
//  There surely is a better logic for handling this
    if (this.props.loading !== nextProps.loading) {
      this.setState({
        loading: nextProps.loading
      });
    }
    if (nextProps.fields) {
      this.setState(nextProps.fields);
    }
  }

  editMode() {
    if (!this.props.params.assignmentId || this.props.params.assignmentId === '') {
      return false
    } else {
      return true
    }
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
    if (e.target.type && e.target.type === 'number') {
      nextState[e.target.name] = e.target.value.replace(/-/g, '');
    } else {
      nextState[e.target.name] = e.target.value;
    }
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

    let savedSubjectsDescription = JSON.parse(sessionStorage.getItem('savedSubjectsDescription'));

    newAssignment.subjects = savedSubjectsIDs;
    newAssignment.filters = savedSubjectsDescription;
    //TESTING: localhost uses 'Bacon' Zooniverse project for Subject IDs.
    //WildCam Gorongosa has no Staging data that we can use to create Subjects.
    //Therefore, we need to hardcode some Subject IDs.
    //--------
    if (!this.editMode() && window.location.hostname === 'localhost') {
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

    const target = parseInt(newAssignment.classifications_target);
    if (!this.editMode() && target > newAssignment.subjects.length) {
      alert('The number of subjects selected can\'t be smaller than the number of images.');
      return document.querySelector('input[name=classifications_target]').focus();
    }

    //NOTE: According to Marten, it's perfectly OK to create an assignment with no students or subjects.
    //--------
    if (this.editMode() || (newAssignment.students.length > 0 && newAssignment.subjects.length > 0)) {
      sessionStorage.removeItem('savedNewAssignment');
      sessionStorage.removeItem('savedClassroomId');
      sessionStorage.removeItem('savedSubjectsLocations');
      sessionStorage.removeItem('savedSubjectsIDs');
      sessionStorage.removeItem('savedSubjectsDescription');
      this.props.submitForm(newAssignment, this.props.params.classroomId)
    } else {
      alert('You can\'t create an assignment without students or subjects.')
    };
    //--------
  }

  renderStudentList(students) {
    const getStudentClassifications = (student) => {
      if (this.props.student_data && this.props.student_data.length > 0) {
        const currentStudentData = this.props.student_data.find(item => item.attributes.student_user_id.toString() === student.id);
        return currentStudentData.attributes.classifications_count;
      } else {
        return 0
      }
    }
    return (
      <div>
        {(students.length > 0) ?
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Students</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              const selected = this.state.students.find(id => id === student.id) ? true : false;
              return (
                <tr className={selected ? 'success' : ''} key={student.id}>
                  <td>
                    <label>
                      {(selected)
                        ? <input type="checkbox" disabled={this.editMode()} value={student.id} onChange={this.toggleStudent} checked />
                        : <input type="checkbox" disabled={this.editMode()} value={student.id} onChange={this.toggleStudent} />
                      }
                      {student.attributes.zooniverse_display_name}
                    </label>
                  </td>
                  <td>
                    {getStudentClassifications(student)}/{this.state.classifications_target}
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

    let savedSubjectsLocations = [];
    savedSubjectsLocations = sessionStorage.getItem('savedSubjectsLocations');
    savedSubjectsLocations = (savedSubjectsLocations === null || savedSubjectsLocations === '') ?
    [] : savedSubjectsLocations.split(',');

    let savedSubjectsIDs = sessionStorage.getItem('savedSubjectsIDs');
    savedSubjectsIDs = (savedSubjectsIDs === null || savedSubjectsIDs === '') ?
      [] : savedSubjectsIDs.split(',');

    let savedSubjectsDescription = (sessionStorage.getItem('savedSubjectsDescription'))
      ? JSON.parse(sessionStorage.getItem('savedSubjectsDescription'))
      : {};

    for (let i = 0; i < MAXIMUM_SUBJECTS && i < savedSubjectsIDs.length; i++) {
      subjectsHtml.push(
        <li key={'subjects_' + i}><img src={savedSubjectsLocations[i]} /></li>
      );
    }
    return (
      <div>
        <div>
          Map filters:
          {this.props.fields && this.props.fields.filters
            ? <ul>
                {Object.keys(this.props.fields.filters)
                .map((key, index) => {
                  const filter = {
                    category: key,
                    value: this.props.fields.filters[key],
                  }
                  return <li key={'filter_' + index}> {filter.category + ': ' + filter.value + ' '}</li>
                })}
              </ul>
            : Object.keys(savedSubjectsDescription)
                .map((key, index) => {
                  const filter = {
                    category: key,
                    value: savedSubjectsDescription[key],
                  }
                  return <li key={'filter_' + index}> {filter.category + ': ' + filter.value + ' '}</li>
                })
          }
        </div>
        <div>
          {this.props.fields && this.props.fields.subjects
            ? this.props.fields.subjects.length
            : savedSubjectsIDs.length} Subject(s) selected.
          {(subjectsHtml.length > 0)
            ? <span> Previewing {subjectsHtml.length} image(s)</span>
            : null
          }
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
      ? classrooms.uniqueMembers
          .filter(student => currentStudentsIds.includes(student.id))
      : {};
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Classroom {currentClassroom ? currentClassroom.attributes.name : 'Loading'}</h3>
        <InputElement
          autofocus="true"
          label="Name"
          name="name"
          onChange={this.handleChange}
          placeholder="Insert Name"
          required="required"
          type="text"
          value={this.state.name}
        />
        <label className="form-group">
          Description
          <textarea
            className="form-control"
            label="Description"
            name="description"
            onChange={this.handleChange}
            placeholder="Insert Description"
            required="required"
            rows="3"
            value={this.state.description}>
          </textarea>
        </label>
        <InputElement
          label="Due date"
          name="duedate"
          onChange={this.handleChange}
          placeholder="E.g. MM-DD-YYYY"
          type="date"
          value={this.state.duedate}
        />
        <InputElement
          label="Number of images"
          name="classifications_target"
          onChange={this.handleChange}
          placeholder="Note: per student"
          required="required"
          type="number"
          value={this.state.classifications_target}
          disabled={this.editMode()}
        />
        <div className="form-group">
          { this.renderStudentList(currentStudents) }
        </div>
        <div className="form-group">
          {this.renderSelectedSubjects()}
        </div>
        <div className="form-group">
          <p>Use the map to choose a set of images for your students to identify and "Select for assignment". </p>
          <button className="btn btn-default" disabled={this.editMode()} onClick={this.selectNewSubjects}>Select images</button>
        </div>
        <div className="form-group" style={{overflow: 'hidden'}}>
          {(!this.state.loading)
            ? <button type="submit" className="btn btn-primary pull-right">Submit</button>
            : <div className="pull-right"><Spinner /></div>
          }
        </div>
      </form>
    );
  }
}

export default AssignmentForm;
