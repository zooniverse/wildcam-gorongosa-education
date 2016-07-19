import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';

import { createAssignment } from '../actions/assignment';
import AssignmentForm from '../components/AssignmentForm';


class NewAssignmentContainer extends Component {

  render() {
    const { classrooms, createAssignment, params } = this.props;
    return (
      <div className="col-md-4">
        <div className='page-header'>
          <h1>New Assignment</h1>
        </div>
        <AssignmentForm
          classrooms={classrooms}
          params={params}
          submitForm={createAssignment}
        />
      </div>
    );
  }
}

NewAssignmentContainer.propTypes = {
  createAssignment: PropTypes.func.isRequired,
  classrooms: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createAssignment }, dispatch);

const mapStateToProps = state => ({
  classrooms: state.teacher.classrooms
});

export default connect(mapStateToProps, mapDispatchToProps)(NewAssignmentContainer);
