import React from 'react';
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import MapExplorerVer3 from '../maps/containers/MapExplorer.jsx';
import StudentsContainer from './containers/StudentsContainer.jsx';
import StudentAssignmentsContainer from './containers/StudentAssignmentsContainer.jsx';
import JoinClassroomContainer from './containers/JoinClassroomContainer.jsx';

import TutorialForStudents from './components/Tutorial-Students.jsx';
import Ecology from '../common/components/Ecology.jsx';

const studentRoutes = store => (
  <Provider store={store}>
    <Router>
      <Route path="students" component={StudentsContainer}>
        <IndexRedirect to="data" />
        <Route path="assignments" component={StudentAssignmentsContainer} />
        <Route path="join" component={JoinClassroomContainer} />
        <Route path="data" component={MapExplorerVer3} />
        <Route path="tutorial" component={TutorialForStudents} />
        <Route path="ecology" component={ Ecology } />
      </Route>
    </Router>
  </Provider>
);

export default studentRoutes;
