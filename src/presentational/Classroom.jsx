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
    let id = nextProps.data.id;
    let token = nextProps.data.attributes.join_token;
    this.state = {
      url: routes.root + routes.students + 'join?id=' + id + '&token=' + token
    };
  }

  renderStudentList(data) {
    const list = (data.length > 0) ? data : [];
    return (
      <div className="list-group">
        { list.map((student, i) =>
          <Link
            key={i}
            className="list-group-item"
            to="#"
            >
              {student.attributes.zooniverse_display_name}
          </Link>
        )}
      </div>
    );
  }

  render() {
    const {attributes} = this.props.data;
    const list = this.props.included;
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
            <h3>Join Link</h3>
            <p>Send the following URL to all the students you want to join this classroom. Note: students need to login to Zooniverse.org to be able to join.</p>
            <input className="form-control" type="text" value={this.state.url} readOnly/>
            <CopyToClipboard text={this.state.url} onCopy={this.onCopy}>
              <button className="btn btn-default">Copy Link</button>
            </CopyToClipboard>
            {this.state.copied ? <span style={{color: 'red'}}>Copied!</span> : null}
          </TabPanel>
          <TabPanel>
            students
            { this.renderStudentList(list) }
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
      name: ''
    }
  }
};
