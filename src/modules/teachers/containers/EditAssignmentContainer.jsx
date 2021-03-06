import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';

import { editAssignment } from '../actions/assignment';
import AssignmentForm from '../components/AssignmentForm';


class EditAssignmentContainer extends Component {

  constructor() {
    super();
    this.getFormFields = this.getFormFields.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  getFormFields() {
    const { assignment } = this.props;
    return (assignment && assignment.attributes)
      ? {
          name: assignment.attributes.name,
          description: assignment.attributes.metadata.description,
          classifications_target: assignment.attributes.metadata.classifications_target,
          duedate: assignment.attributes.metadata.duedate,
          filters: assignment.attributes.metadata.filters,
          students: assignment.relationships.student_users.data.map(student => student.id),
          subjects: assignment.attributes.metadata.subjects,
        }
      : {};
  }

  submitForm(data) {
    return this.props.editAssignment(data, this.props.assignment);
  }

  render() {
    const { assignment, classrooms, loading, params, student_data } = this.props;
    const fields = this.getFormFields();
    return (
      <div className="col-md-4">
        <div className='page-header'>
          <h1>Edit Assignment</h1>
        </div>
        <AssignmentForm
          submitForm={this.submitForm}
          fields={fields}
          classrooms={classrooms}
          loading={loading}
          params={params}
          student_data={student_data}
        />
      </div>
    );
  }
}

EditAssignmentContainer.propTypes = {
  assignment: PropTypes.object.isRequired,
  classrooms: PropTypes.object.isRequired,
  editAssignment: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  student_data: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
  const {data, student_data} = state.assignment.assignments;
  if (data.length > 0) {
    const editId = window.location.pathname.split('/')[5];
    return {
      assignment: data.find(assignment => assignment.id === editId),
      classrooms: state.teacher.classrooms,
      loading: state.assignment.assignments.loading,
      student_data: student_data,
    }
  } else {
    return {};
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ editAssignment }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditAssignmentContainer);
