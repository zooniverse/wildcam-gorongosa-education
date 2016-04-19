import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


export default class StudentClassroom extends Component {
  constructor(props) {
    super(props);
    this.renderStudentList = this.renderStudentList.bind(this);
  }

  renderStudentList(allMembers, classroomMembers) {
    const list = (allMembers.length > 0) ? allMembers : [];
    const studentIds = classroomMembers.map((student) => { return student.id; } )
    const currentUsername = this.props.user.display_name;
    const filteredList =
      list
        .filter((itm) => {
          return studentIds.indexOf( itm.id ) > -1;
        })
        .map((itm) => {
          return itm.attributes
        })
        .filter((attributes) => {
          return currentUsername === attributes.zooniverse_display_name;
        });
    return (
      <div>
        {filteredList.map((item) => {
          return <h3 key={item.zooniverse_id}>My classifications: {item.classifications_count}</h3>;
        })}
      </div>
    )
  }

  render() {
    const { attributes} = this.props.data;
    const allMembers = this.props.members;
    const classroomMembers = this.props.data.relationships.students.data;
    return (
      <section className="content-view">
        <div className='page-header'>
        <h1>Classroom {attributes.name} </h1>
        </div>
        <Tabs className="admin-tabs">
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Assignments</Tab>
          </TabList>
          <TabPanel>
            { this.renderStudentList(allMembers, classroomMembers) }
            <h3>Subject: {attributes.subject}</h3>
            <h3>School: {attributes.school}</h3>
            <h3>Description: {attributes.description}</h3>
          </TabPanel>
          <TabPanel>
            Assignments
          </TabPanel>
        </Tabs>
      </section>
    );
  }
}

StudentClassroom.defaultProps = {
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
