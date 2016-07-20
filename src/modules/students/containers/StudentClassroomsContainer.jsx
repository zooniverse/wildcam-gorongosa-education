import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchStudentClassrooms } from '../actions';
import StudentClassroomsSidebar from '../components/StudentClassroomsSidebar.jsx';


class StudentClassroomsContainer extends Component {

  componentDidMount() {
    const {classrooms, dispatch} = this.props;
    if (!classrooms.members.length && !classrooms.data.length && !classrooms.loading) {
      dispatch(fetchStudentClassrooms());
    }
  }

  getChildContext() {
    const {classrooms, user} = this.props;
    return {
      classrooms: classrooms,
      user: user
    }
  }

  render() {
    const {children, classrooms} = this.props;
    return (
      <div className="admin-component">
        <div className="row">
          <StudentClassroomsSidebar classroomsData={classrooms} />
          {children}
        </div>
      </div>
    );
  }

}

StudentClassroomsContainer.propTypes = {
  classrooms: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

StudentClassroomsContainer.defaultProps = {
  classrooms: {
    data: [],
    error: false,
    loading: false,
    members: [],
  },
  user: null
};
StudentClassroomsContainer.childContextTypes = {
  classrooms: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    classrooms: state.student.classrooms,
    user: state.login.user
  };
}
export default connect(mapStateToProps)(StudentClassroomsContainer);
