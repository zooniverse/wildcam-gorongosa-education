import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchStudentClassrooms } from '../actions/student';
import StudentClassroomsSidebar from '../presentational/StudentClassroomsSidebar.jsx';


class StudentClassrooms extends Component {

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

StudentClassrooms.propTypes = {
  classrooms: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

StudentClassrooms.defaultProps = {
  classrooms: {
    data: [],
    error: false,
    loading: false,
    members: [],
  },
  user: null
};
StudentClassrooms.childContextTypes = {
  classrooms: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    classrooms: state.student.classrooms,
    user: state.login.user
  };
}
export default connect(mapStateToProps)(StudentClassrooms);
