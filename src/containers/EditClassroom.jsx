import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class EditClassroom extends Component {
  render() {
    return (
      <h1>Edit classroom</h1>
    );
  }

}

export default connect()(EditClassroom);
