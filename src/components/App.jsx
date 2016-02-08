import React from 'react';

import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    return this.props.children;
  }
}

function mapStateToProps(state) {
  return { project: state.project }
}
export default connect(mapStateToProps)(App);
