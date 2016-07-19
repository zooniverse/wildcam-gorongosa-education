import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('Environment: ' + process.env.NODE_ENV)
    return this.props.children;
  }
}

export default App;
