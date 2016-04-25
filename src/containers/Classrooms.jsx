import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { createClassroom, fetchClassrooms } from '../actions/teacher';
import { fetchUserDetails } from '../actions/users';
import ClassroomsSidebar from '../presentational/ClassroomsSidebar.jsx';

class Classrooms extends Component {

  componentDidMount() {
    const currentUserId = this.props.user.id;
    const { classrooms, userdetails } = this.props;

    if (!this.props.userdetails.loading) {
      this.props.dispatch(fetchUserDetails(currentUserId));
    }

    if (!classrooms.members.length && !classrooms.data.length && !classrooms.loading) {
      this.props.dispatch(fetchClassrooms());
    }
  }

  getChildContext() {
    return {
      classrooms: this.props.classrooms
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
  dispatch: PropTypes.func.isRequired,
  userdetails: PropTypes.object.isRequired
};

Classrooms.defaultProps = {
  classrooms: {
    data: [],
    error: false,
    loading: false,
    members: [],
  },
  userdetails: {
    data: {
      attributes: {
        metadata: {}
      }
    },
    loading: false
  }
};

Classrooms.childContextTypes = {
  classrooms: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  classrooms: state.teacher.classrooms,
  user: state.login.user,
  userdetails: state.users
});

export default connect(mapStateToProps)(Classrooms);
