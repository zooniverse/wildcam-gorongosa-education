import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CopyToClipboard from 'react-copy-to-clipboard';

import config from '../constants/config';
import EditClassroomLink from './EditClassroomLink';

export default class Classroom extends Component {
  constructor(props) {
    super(props);
    let classrooms = props.data;
    this.state = {
      url: config.routes.root + config.routes.students + 'join?id=' + classrooms.id + '&token=' + classrooms.attributes.join_token,
      copied: false
    }
    this.onCopy = this.onCopy.bind(this);
    this.deleteClassroom = this.deleteClassroom.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.renderStudentList = this.renderStudentList.bind(this);
  }

  onCopy() {
    this.setState({
      copied: true
    });
  }

  selectStudents(allMembers, classroomMembers) {
    const list = (allMembers.length > 0) ? allMembers : [];
    const studentIds = classroomMembers.map(student => student.id)
    const students =
      list.filter(itm => studentIds.indexOf( itm.id ) > -1)
        .map(itm => itm);
    return students;
  }

  componentWillReceiveProps(nextProps){
    let classrooms = nextProps.data;
    this.state = {
      url: config.routes.root + config.routes.students + 'join?id=' + classrooms.id + '&token=' + classrooms.attributes.join_token
    };
  }

  renderStudentList(students) {
    return (
      <div>
        {(students.length > 0) ?
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Classifications</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, i) =>
            <tr key={i}>
              <td>{student.attributes.zooniverse_display_name}</td>
              <td>{student.attributes.classifications_count}</td>
              <td><button className="btn btn-danger" onClick={() => {this.deleteStudent(student.id)}} type="button">Remove</button></td>
            </tr>
            )}
          </tbody>
        </table>
        : 'No students here' }
      </div>
    )
  }

  deleteClassroom() {
    var result = confirm('Sure you want to delete this classroom?');
    if (result) {
      this.props.deleteClassroom();
    }
  }

  deleteStudent(id) {
    const studentToDelete = this.props.studentsIds.find(studentId => studentId === id);
    var result = confirm('Sure you want to remove this student?');
    if (result) {
      this.props.deleteStudent(this.props.classroomId, studentToDelete);
    }
  }

  render() {
    const {data, members} = this.props;
    const {attributes} = data;
    const allMembers = members;
    const classroomMembers = data.relationships.students.data;
    const students = this.selectStudents(allMembers, classroomMembers);
    const classroomClassificationsCount = students.reduce(
      (prev, cur) => {
        return prev + cur.attributes.classifications_count;
      }, 0);
    return (
      <section className="content-view">
        <div className='page-header'>
        <h1>Classroom {attributes.name} </h1>
        </div>
        <Tabs className="admin-tabs">
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Students</Tab>
            <Tab>Assignments</Tab>
          </TabList>
          <TabPanel>
            <div>
              <EditClassroomLink classroom={data} />
            </div>
            <h3>Classifications: {classroomClassificationsCount}</h3>
            <h3>Subject: {attributes.subject}</h3>
            <h3>School: {attributes.school}</h3>
            <h3>Description: {attributes.description}</h3>
            <h3>Join Link</h3>
            <p>Send the following URL to all the students you want to join this classroom. Note: students need to login to Zooniverse.org to be able to join.</p>
            <div className="input-group">
              <input className="form-control" type="text" value={this.state.url} readOnly/>
              <CopyToClipboard text={this.state.url} onCopy={this.onCopy}>
                <span className="input-group-btn">
                  <button className="btn btn-default" type="button">Copy Link</button>
                </span>
              </CopyToClipboard>
            </div>
            {this.state.copied
            ? <div className="alert alert-success fadeout" role="alert">Copied!</div>
            : null}
            <div>
              <button className="btn btn-danger" onClick={this.deleteClassroom}>Delete classroom</button>
            </div>
          </TabPanel>
          <TabPanel>
            { this.renderStudentList(students) }
          </TabPanel>
          <TabPanel>
            Assignments
          </TabPanel>
        </Tabs>
      </section>
    );
  }
}

Classroom.defaultProps = {
  data: {
    attributes: {
      name: '',
      subject: '',
      school: '',
      description: '',
    }
  },
  members: []
};

Classroom.propTypes = {
  actions: PropTypes.shape({
    deleteClassroom: PropTypes.func.isRequired,
    deleteStudent: PropTypes.func.isRequired,
  })
};

