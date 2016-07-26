import React from 'react';
import { Router, Route, IndexRoute, IndexRedirect } from 'react-router';
import { Provider } from 'react-redux';

import MapExplorerContainer from '../common/containers/MapExplorer.jsx';

import ClassroomContainer from './containers/ClassroomContainer.jsx';
import ClassroomsContainer from './containers/ClassroomsContainer.jsx';
import EditClassroomContainer from './containers/EditClassroomContainer.jsx';
import NewAssignmentContainer from './containers/NewAssignmentContainer.jsx';
import NewClassroomContainer from './containers/NewClassroomContainer.jsx';
import TeachersContainer from './containers/TeachersContainer.jsx';

import ClassroomsOverview from './components/ClassroomsOverview.jsx';
import Resources from './components/Resources.jsx';
import TeacherForm from './components/TeacherForm.jsx';
import TutorialForTeachers from './components/Tutorial-Teachers.jsx';


const teacherRoutes = store => (
  <Provider store={store}>
    <Router>
      <Route path="teachers" component={ TeachersContainer }>
        <IndexRedirect to="classrooms" />
        <Route path="classrooms" component={ ClassroomsContainer }>
          <IndexRoute component={ ClassroomsOverview } />
          <Route path="register" component={ TeacherForm } />
          <Route path="new" component={ NewClassroomContainer } />
          <Route path=":classroomId/edit" component={ EditClassroomContainer } />
          <Route path=":classroomId/assignment" component={ NewAssignmentContainer } />
          <Route path=":classroomId" component={ ClassroomContainer } />
        </Route>
        <Route path="data" component={ MapExplorerContainer } />
        <Route path="tutorial" component={ TutorialForTeachers } />
        <Route path="resources" component={ Resources } />
      </Route>
    </Router>
  </Provider>
);

export default teacherRoutes;