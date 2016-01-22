import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import StudentTable from 'StudentTable.jsx';

export default class Admin extends React.Component{

  render(){
    return(

       <Tabs>
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Students</Tab>
            <Tab>Groups</Tab>
            <Tab>Assignments</Tab>
          </TabList>

          <TabPanel>
            Overview
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
    );

  }


}
