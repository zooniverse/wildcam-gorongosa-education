import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';

import { createClassroom } from '../actions/teacher';
import NewClassroomForm from '../presentational/NewClassroomForm';


class NewClassroom extends Component {

  render() {
    return (
      <div className="col-md-4">
        <div className='page-header'>
          <h1>New Classroom</h1>
        </div>
        <NewClassroomForm submitForm={this.props.createClassroom} />
      </div>
    );
  }
}

NewClassroom.propTypes = {
  createClassroom: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createClassroom }, dispatch);

export default connect(null, mapDispatchToProps)(NewClassroom);
