import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ClassroomAssignments from '../components/ClassroomAssignments';
import { fetchStudentClassifications, fetchStudentClassrooms, fetchStudentAssignments } from '../actions';


class StudentAssignmentsContainer extends Component {

  constructor() {
    super();
    this.createClassroomAssignmentData = this.createClassroomAssignmentData.bind(this);
  }

  componentWillMount() {
    this.props.actions.fetchStudentClassrooms();
    this.props.actions.fetchStudentAssignments();
  }

  createClassroomAssignmentData() {
    const assignments = this.props.assignments.data;
    const classrooms = this.props.classrooms.data;
    const studentData = this.props.assignments.student_data ? this.props.assignments.student_data : [];

    const getClassificationCount = (assignment) => {
      const studentAssignments = assignment.relationships.student_assignments.data;
      const studentUsers = assignment.relationships.student_users.data;
      let classifications = 0;
      studentAssignments.forEach(studentAssignmentsItem => {
        const studentDataByAssignment = studentData.find(item => item.id === studentAssignmentsItem.id);
        studentUsers.forEach(studentUsersItem => {
          if (studentUsersItem.id === studentDataByAssignment.attributes.student_user_id.toString()) {
            classifications = studentDataByAssignment.attributes.classifications_count;
          }
        })
      })
      return classifications;
    }

    return classrooms.reduce((result, classroom) => {
      const assignmentsForClassroom = assignments.filter(assignment =>
        classroom.id === assignment.attributes.classroom_id.toString());
      if (assignmentsForClassroom.length) {
        result.push({
          classroom_id: classroom.id,
          classroom_name: classroom.attributes.name,
          assignments: assignmentsForClassroom.map(assignment => ({
            id: assignment.id,
            description: assignment.attributes.metadata.description,
            duedate: assignment.attributes.metadata.duedate,
            name: assignment.attributes.name,
            target: assignment.attributes.metadata.classifications_target,
            classification_count: getClassificationCount(assignment),
            workflow_id: assignment.attributes.workflow_id
          }))
        });
      }
      return result;
    }, []);
  }

  render() {
    const classroomData = this.createClassroomAssignmentData();
    const { actions, assignments, classrooms, user } = this.props;
    const boundFetchStudentClassifications = actions.fetchStudentClassifications.bind(this);
    return classrooms.loading || assignments.loading
      ? <div>Loading assignments...</div>
      : <ClassroomAssignments
          data={ classroomData }
          fetchClassifications={ boundFetchStudentClassifications }
          student_data={ assignments.student_data }
          user={ user }/>;
  }

}

const mapDispatchToProps = dispatch => ({
  actions: {
    fetchStudentClassifications: bindActionCreators(fetchStudentClassifications, dispatch),
    fetchStudentClassrooms: bindActionCreators(fetchStudentClassrooms, dispatch),
    fetchStudentAssignments: bindActionCreators(fetchStudentAssignments, dispatch),
  }
});

const mapStateToProps = state => ({
  classrooms: state.student.classrooms,
  assignments: state.assignment.assignments,
  user: state.login.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentAssignmentsContainer);
