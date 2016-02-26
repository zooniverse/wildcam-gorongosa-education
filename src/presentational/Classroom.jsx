import React, { Component, PropTypes } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { eduAPI } from '../constants/config.json';
import CopyToClipboard from 'react-copy-to-clipboard';

export default class Classroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: eduAPI.root + eduAPI.students + this.props.data.id + '/join',
      copied: false
    }
    this.onCopy = this.onCopy.bind(this);
  }

  onCopy() {
    this.state = {
      copied: true
    };
  }

  componentWillReceiveProps(nextProps){
    this.state = {
      url: eduAPI.root + eduAPI.students + nextProps.data.id + '/join'
    };
  }

  render() {
    const {attributes} = this.props.data;
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
            <p>Send the following URL to all the students you want to join this classroom.</p>
            <p>Note: students need to login to Zooniverse.org to be able to join.</p>
            <input className="form-control" type="text" value={this.state.url} readOnly/>
            <CopyToClipboard text={this.state.url} onCopy={this.onCopy}>
              <button className="btn btn-default">Copy to clipboard</button>
            </CopyToClipboard>
            {this.state.copied ? <span style={{color: 'red'}}>Copied :)</span> : null}
          </TabPanel>
          <TabPanel>
            Sutdents
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
