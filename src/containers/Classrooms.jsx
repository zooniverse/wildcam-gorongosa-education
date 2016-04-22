import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchClassrooms } from '../actions/teacher';
import { fetchUserDetails } from '../actions/users';
import ClassroomsSidebar from '../presentational/ClassroomsSidebar.jsx';

class Classrooms extends Component {

  componentDidMount() {
    const currentUserId = this.props.user.id;
    if (!this.props.userdetails.loading) {
      this.props.dispatch(fetchUserDetails(currentUserId));
    }
    if (!this.props.classrooms.members.length && !this.props.classrooms.data.length && !this.props.classrooms.loading) {
      this.props.dispatch(fetchClassrooms());
    }

  }

  getChildContext() {
    return {
      classrooms: this.props.classrooms
    }
  }

  render() {
    return (
      <div className="admin-component">
        <div className="row">
          <ClassroomsSidebar classroomsData={this.props.classrooms} userdetails={this.props.userdetails} />
          {this.props.children}
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

function mapStateToProps(state) {
  return {
    classrooms: state.teacher.classrooms,
    user: state.login.user,
    userdetails: state.users
  };
}
export default connect(mapStateToProps)(Classrooms);
