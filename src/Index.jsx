import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import App from './containers/App.jsx';
import MapExplorer from './containers/MapExplorer.jsx';
import Teachers from './containers/Teachers.jsx';
import Students from './containers/Students.jsx';
import Classrooms from './containers/Classrooms.jsx';
import Classroom from './containers/Classroom.jsx';
import JoinClassroom from './containers/JoinClassroom.jsx'

import Home from './presentational/Home.jsx';
import ClassroomsOverview from './presentational/ClassroomsOverview.jsx';
import NewClassroomForm from './presentational/NewClassroomForm.jsx';
import StudentOverview from './presentational/StudentOverview.jsx';
import TeacherRegistrationForm from './presentational/TeacherRegistrationForm.jsx';

import LoginPromptPage from './presentational/LoginPromptPage.jsx';
import ErrorPage from './presentational/ErrorPage.jsx';

import Styles from './styles/main.styl';

import configureStore from './store';
const store = configureStore();

import { oauth } from 'panoptes-client';
import { panoptesAppId } from './constants/config.json';

window.React = React;

oauth.init(panoptesAppId)
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
                <Route path="new" component={NewClassroomForm} />
                <Route path="register" component={TeacherRegistrationForm} />
                <Route path=":classroomId" component={Classroom} />
              </Route>
              <Route path="data" component={MapExplorer} />
            </Route>
            <Route path="students" component={Students}>
              <IndexRedirect to="classrooms" />
              <Route path="classrooms">
                <IndexRoute component={StudentOverview} />
                <Route path="join" component={JoinClassroom} />
              </Route>
              <Route path="data" component={MapExplorer} />
            </Route>
            <Route path="login" component={LoginPromptPage} />
          </Route>
          <Route path="*" component={ErrorPage} />
        </Router>
      </Provider>,
      document.getElementById('app-container')
    );
  });
