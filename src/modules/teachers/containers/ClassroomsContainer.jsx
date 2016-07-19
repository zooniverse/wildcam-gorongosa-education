import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchClassrooms } from '../actions/teacher';
import { fetchUserDetails } from '../actions/users';
import ClassroomsSidebar from '../components/ClassroomsSidebar';


class ClassroomsContainer extends Component {

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

ClassroomsContainer.propTypes = {
  classrooms: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  userdetails: PropTypes.object.isRequired
};

ClassroomsContainer.defaultProps = {
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

ClassroomsContainer.childContextTypes = {
  classrooms: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  classrooms: state.teacher.classrooms,
  user: state.login.user,
  userdetails: state.users
});

export default connect(mapStateToProps)(ClassroomsContainer);
