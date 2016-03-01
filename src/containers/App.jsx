import { Component } from 'react';
import { browserHistory } from 'react-router'

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {

    //TEST: REDIRECT ON CERTAIN CONDITIONS
    //----------------
    let currentRoute = this.props.routes;
    if (currentRoute.length >= 2 && currentRoute[1].component && currentRoute[1].component.name === 'Students') {
      browserHistory.push('/teachers')
    }
    //----------------
    
    return this.props.children;
  }
}
