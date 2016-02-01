import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Overview from 'Overview.jsx';
import Sidebar from 'Sidebar.jsx';
import StudentsContainer from '../containers/StudentsContainer';


export default class Admin extends React.Component {

  // Component doesn't have a state, so we don't need to set it in the constructor
  // like we normally would do while following ES6 classes syntax

  render() {
    return (
      <div className="admin-component">
        <div className="row">
          <Sidebar/>
          <Tabs className="admin-tabs">
            <TabList>
              <Tab>Overview</Tab>
              <Tab>Students</Tab>
              <Tab>Groups</Tab>
              <Tab>Assignments</Tab>
            </TabList>
            <TabPanel>
              <Overview/>
            </TabPanel>
            <TabPanel>
              <StudentsContainer/>
            </TabPanel>
            <TabPanel>
              Groups
            </TabPanel>
            <TabPanel>
              Assignments
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
  }

}
