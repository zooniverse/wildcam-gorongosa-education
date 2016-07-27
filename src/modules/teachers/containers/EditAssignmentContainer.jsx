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
//          These are waiting on education-api fixes
//          description: assignment.attributes.metadata.description,
//          classifications_target: assignment.attributes.metadata.classifications_target,
//          duedate: assignment.attributes.metadata.duedate,
          students: assignment.relationships.student_users.data,
        }
      : {};
  }

  submitForm(data) {
    return this.props.editAssignment(data, this.props.assignment.id);
  }

  render() {
    const { assignment, classrooms, params } = this.props;
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
          params={params}
        />
      </div>
    );
  }
}

EditAssignmentContainer.propTypes = {
  editAssignment: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const {data} = state.assignment.assignments;
  if (data.length > 0) {
    const editId = window.location.pathname.split('/')[5];
    return {
      assignment: data.find(assignment => assignment.id === editId),
      classrooms: state.teacher.classrooms,
    }
  } else {
    return {};
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ editAssignment }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditAssignmentContainer);
