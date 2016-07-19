import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchClassrooms } from '../actions/teacher';
import { fetchAssignments } from '../actions/assignment';
import { fetchUserDetails } from '../actions/users';
import ClassroomsSidebar from '../presentational/ClassroomsSidebar.jsx';

class Classrooms extends Component {

  componentDidMount() {
    const currentUserId = this.props.user.id;
    const { classrooms, assignments, userdetails } = this.props;

    if (!this.props.userdetails.loading) {
      this.props.dispatch(fetchUserDetails(currentUserId));
    }

    if (!classrooms.members.length && !classrooms.data.length && !classrooms.loading) {
      this.props.dispatch(fetchClassrooms());
    }
    
    if (!assignments.data.length && !assignments.loading) {
      this.props.dispatch(fetchAssignments());
    }
  }

  getChildContext() {
    return {
      classrooms: this.props.classrooms,
      assignments: this.props.assignments,
    }
  }

  render() {
    const { classrooms, userdetails, children } = this.props;
    return (
      <div className="admin-component">
        <div className="row">
          <ClassroomsSidebar
            classroomsData={classrooms}
            userdetails={userdetails}
          />
          {children}
        </div>
      </div>
    );
  }
}

Classrooms.propTypes = {
  classrooms: PropTypes.object.isRequired,
  assignments: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  userdetails: PropTypes.object.isRequired,
};

Classrooms.defaultProps = {
  classrooms: {
    data: [],
    error: false,
    loading: false,
    members: [],
  },
  assignments: {
    data: [],
    error: false,
    loading: false,
  },
  userdetails: {
    data: {
      attributes: {
        metadata: {}
      }
    },
    loading: false
  },
};

Classrooms.childContextTypes = {
  classrooms: PropTypes.object.isRequired,
  assignments: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  classrooms: state.teacher.classrooms,
  assignments: state.assignment.assignments,
  user: state.login.user,
  userdetails: state.users,
});

export default connect(mapStateToProps)(Classrooms);
