import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { routes } from '../constants/config.json';
import CopyToClipboard from 'react-copy-to-clipboard';

export default class Classroom extends Component {
  constructor(props) {
    super(props);
    let classrooms = props.data;
    this.state = {
      url: routes.root + routes.students + 'join?id=' + classrooms.id + '&token=' + classrooms.attributes.join_token,
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

  componentWillReceiveProps(nextProps){
    let classrooms = nextProps.data;
    this.state = {
      url: routes.root + routes.students + 'join?id=' + classrooms.id + '&token=' + classrooms.attributes.join_token
    };
  }

  renderStudentList(allMembers, classroomMembers) {
    const list = (allMembers.length > 0) ? allMembers : [];
    const studentIds = classroomMembers.map((student) => { return student.id; } )

    const filteredList =
      list
        .filter((itm) => {
          return studentIds.indexOf( itm.id ) > -1;
        })
        .map((itm) => {
          return itm.attributes.zooniverse_display_name
        });
    return (
      <div className="list-group">
        { (filteredList.length > 0) ? filteredList.map((name, i) =>
          <Link
            key={i}
            className="list-group-item"
            to="#"
            >
             {name}
          </Link>
        ) : 'No students in here yet' }
      </div>
    )
  }

  render() {
    const { attributes} = this.props.data;
    const allMembers = this.props.members;
    const classroomMembers = this.props.data.relationships.students.data;
    return (
      <section>
        <h1>Classroom {attributes.name} </h1>
        <Tabs className="admin-tabs">
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Students</Tab>
            <Tab>Groups</Tab>
          </TabList>
          <TabPanel>
            <h3>Subject: {attributes.subject}</h3>
            <h3>School: {attributes.school}</h3>
            <h3>Description: {attributes.description}</h3>
            <h3>Join Link</h3>
            <p>Send the following URL to all the students you want to join this classroom. Note: students need to login to Zooniverse.org to be able to join.</p>
            <input className="form-control" type="text" value={this.state.url} readOnly/>
            <CopyToClipboard text={this.state.url} onCopy={this.onCopy}>
              <button className="btn btn-default">Copy Link</button>
            </CopyToClipboard>
            {this.state.copied ? <span style={{color: 'red'}}>&nbsp;Copied!</span> : null}
          </TabPanel>
          <TabPanel>
            { this.renderStudentList(allMembers, classroomMembers) }
          </TabPanel>
          <TabPanel>
            Groups
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
