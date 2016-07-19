import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import a11y from 'react-a11y';

import App from './containers/App.jsx';
import MapExplorer from './containers/MapExplorer.jsx';
import Teachers from './containers/Teachers.jsx';
import Classrooms from './containers/Classrooms.jsx';
import Classroom from './containers/Classroom.jsx';
import EditClassroom from './containers/EditClassroom.jsx';

import Home from './presentational/Home.jsx';
import ClassroomsOverview from './presentational/ClassroomsOverview.jsx';
import NewClassroom from './containers/NewClassroom.jsx';

import TeacherForm from './presentational/TeacherForm.jsx';
import NewAssignment from './containers/NewAssignment.jsx';
import Resources from './presentational/Resources.jsx';
import TutorialForTeachers from './presentational/Tutorial-Teachers.jsx';

import LoginPromptPage from './presentational/LoginPromptPage.jsx';
import ErrorPage from './presentational/ErrorPage.jsx';

import studentRoutes from './modules/students';

import Styles from './styles/main.styl';

import configureStore from './store';
const store = configureStore();

import oauth from 'panoptes-client/lib/oauth';
import config from './constants/config';

import favicon from './images/favicon.ico';

window.React = React;
if (process.env.NODE_ENV === 'staging') {a11y(React)};

oauth.init(config.panoptesAppId)
  .then(function () {
    ReactDOM.render(
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="teachers" component={Teachers}>
              <IndexRedirect to="classrooms" />
              <Route path="classrooms" component={Classrooms}>
                <IndexRoute component={ClassroomsOverview} />
                <Route path="register" component={TeacherForm} />
                <Route path="new" component={NewClassroom} />
                <Route path=":classroomId/edit" component={EditClassroom} />
                <Route path=":classroomId/assignment" component={NewAssignment} />
                <Route path=":classroomId" component={Classroom} />
              </Route>
              <Route path="data" component={MapExplorer} />
              <Route path="tutorial" component={TutorialForTeachers} />
              <Route path="resources" component={Resources} />
            </Route>
            { studentRoutes(store) }
            <Route path="login" component={LoginPromptPage} />
          </Route>
          <Route path="*" component={ErrorPage} />
        </Router>
      </Provider>,
      document.getElementById('app-container')
    );
  });
