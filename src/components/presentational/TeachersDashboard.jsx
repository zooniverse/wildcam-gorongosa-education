import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Overview from './Overview.jsx';
import Sidebar from './Sidebar.jsx';
import StudentsContainer from '../container/StudentsContainer.jsx';


export default class TeachersDashboard extends React.Component {

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
