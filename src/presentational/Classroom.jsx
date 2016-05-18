import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import config from '../constants/config';
import CopyToClipboard from 'react-copy-to-clipboard';

export default class Classroom extends Component {
  constructor(props) {
    super(props);
    let classrooms = props.data;
    this.state = {
      url: config.routes.root + config.routes.students + 'join?id=' + classrooms.id + '&token=' + classrooms.attributes.join_token,
      copied: false
    }
    this.onCopy = this.onCopy.bind(this);
    this.renderStudentList = this.renderStudentList.bind(this);
  }

  onCopy() {
    this.setState({
      copied: true
    });
  }

  selectStudents(allMembers, classroomMembers) {
    const list = (allMembers.length > 0) ? allMembers : [];
    const studentIds = classroomMembers.map((student) => { return student.id; } )
    const students =
      list
        .filter((itm) => {
          return studentIds.indexOf( itm.id ) > -1;
        })
        .map((itm) => {
          return itm.attributes
        });
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
          </tr>
        </thead>
        <tbody>
          {students.map((attributes, i) =>
          <tr key={i}>
            <td>{attributes.zooniverse_display_name}</td>
            <td>{attributes.classifications_count}</td>
          </tr>
          )}
        </tbody>
      </table>
      : 'No students here yet' }
    </div>
    )
  }

  render() {
    const {data, members} = this.props;
    const {attributes} = data;
    const allMembers = members;
    const classroomMembers = data.relationships.students.data;
    const students = this.selectStudents(allMembers, classroomMembers);
    const classroomClassificationsCount = students.reduce(
      (prev, cur) => {
        return prev + cur.classifications_count;
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
            <h3>Classifications: {classroomClassificationsCount}</h3>
            <h3>Subject: {attributes.subject}</h3>
            <h3>School: {attributes.school}</h3>
            <h3>Description: {attributes.description}</h3>
            <h3>Join Link</h3>
            <p>Send the following URL to all the students you want to join this classroom. Note: students need to login to Zooniverse.org to be able to join.</p>
            <input className="form-control" type="text" value={this.state.url} readOnly/>
            <CopyToClipboard text={this.state.url} onCopy={this.onCopy}>
              <button className="btn btn-default">Copy Link</button>
            </CopyToClipboard>
            {this.state.copied ? <div className="alert alert-success" role="alert">&nbsp;Copied!</div> : null}
          </TabPanel>
          <TabPanel>
            { this.renderStudentList(students) }
          </TabPanel>
          <TabPanel>
            <Link className="btn btn-default" to="/teachers/classrooms/new-assignment">New assignment</Link>
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
