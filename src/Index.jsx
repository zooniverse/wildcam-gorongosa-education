import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';

import App from './components/App.jsx';
import PoweredBy from './components/Powered-by.jsx';
import About from './components/About.jsx';

import Styles from './styles/main.styl'

window.React = React;

ReactDOM.render(
  <Router>
    <Route path="/" component={App}>
      <Route path="/about" component={About}/>
      <Route path="/poweredby" component={PoweredBy}/>
    </Route>
  </Router>
  , document.getElementById('root')
);
