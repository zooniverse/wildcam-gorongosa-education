import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import Panoptes from 'panoptes-client';

import App from './containers/App.jsx';
import MapExplorer from './containers/MapExplorer.jsx';
import Teachers from './containers/Teachers.jsx';
import Classrooms from './containers/Classrooms.jsx';
import Classroom from './containers/Classroom.jsx';

import Home from './presentational/Home.jsx';
import ClassroomsOverview from './presentational/ClassroomsOverview.jsx';
import TeacherNotLoggedIn from './presentational/TeacherNotLoggedIn.jsx';
import NewClassroomForm from './presentational/NewClassroomForm.jsx';

import Styles from './styles/main.styl';

import configureStore from './store';
const store = configureStore();

import { oauth } from 'panoptes-client';
import { panoptesAppId } from './constants/config.json';

window.React = React;

oauth.init(panoptesAppId)
  .then(function () {
    Panoptes.auth.checkCurrent()
      .then(user => {
        
        let router = (user)
          //Authenticated
          ?
            <Router history={browserHistory}>
              <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="teachers" component={Teachers}>
                  <IndexRedirect to="classrooms" />
                  <Route path="classrooms" component={Classrooms}>
                    <IndexRoute component={ClassroomsOverview} />
                    <Route path="new" component={NewClassroomForm} />
                    <Route path=":classroomId" component={Classroom} />
                  </Route>
                  <Route path="data" component={MapExplorer} />
                </Route>
              </Route>
            </Router>
          
          //NOT Authenticated
          :
            <Router history={browserHistory}>
              <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="teachers" component={TeacherNotLoggedIn}>
                  <Route path="data" component={MapExplorer} />
                </Route>
              </Route>
            </Router>
      
        ReactDOM.render(
          <Provider store={store}>
            {router}
          </Provider>,
          document.getElementById('app-container')
        );
      });
  });

/*

oauth.init(panoptesAppId)
  .then(function () {

  
    Panoptes.auth.checkCurrent()
      .then(user => {
        let router = (user)
          //Authenticated
          ?
            <Router>
              <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="teachers" component={Teachers}>
                  <IndexRedirect to="classrooms" />
                  <Route path="classrooms" component={Classrooms}>
                    <IndexRoute component={ClassroomsOverview} />
                    <Route path=":classroomId" component={Classroom} />
                  </Route>
                  <Route path="data" component={MapExplorer} />
                </Route>
              </Route>
            </Router>
          
          //NOT Authenticated
          :
            <Router>
              <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="teachers" component={TeacherNotLoggedIn}>
                  <Route path="data" component={MapExplorer} />
                </Route>
=======
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
                <Route path=":classroomId" component={Classroom} />
              </Route>
            </Route>
          </Route>
        </Router>
      </Provider>,
    );
            
      
        ReactDOM.render(
          <Provider store={store}>
            {router}
          </Provider>,
          document.getElementById('app-container')
        );
      });
  });
*/