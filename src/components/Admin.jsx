import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Sidebar from 'Sidebar.jsx';
import StudentTable from 'StudentTable.jsx';
import Overview from 'Overview.jsx';

export default class Admin extends React.Component{
  // Component doens't have a state, so we don't need to set it in the constructor
  // like we normally would do while following ES6 classes syntax
  render(){
    return(
      <div className="container">
        <div className="row">
        <Sidebar/>
        <Tabs className="col-md-10">
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
            <StudentTable/>
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
