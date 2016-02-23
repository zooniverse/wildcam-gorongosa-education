import React, { Component, PropTypes } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class Classroom extends Component {

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
            Overview
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
