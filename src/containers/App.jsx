import { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('Environment: ' + process.env.NODE_ENV)
    return this.props.children;
  }
}
