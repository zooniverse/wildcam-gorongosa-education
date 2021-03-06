import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';

import { editClassroom } from '../actions/teacher';
import ClassroomForm from '../components/ClassroomForm';


class EditClassroomContainer extends Component {

  constructor() {
    super();
    this.getFormFields = this.getFormFields.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  getFormFields() {
    const { classroom } = this.props;
    return (classroom && classroom.attributes)
      ? {
          name: classroom.attributes.name,
          subject: classroom.attributes.subject,
          school: classroom.attributes.school,
          description: classroom.attributes.description,
        }
      : {};
  }

  submitForm(data) {
    return this.props.editClassroom(data, this.props.classroom.id);
  }

  render() {
    const { classroom } = this.props;
    const fields = this.getFormFields();
    return (
      <div className="col-md-4">
        <div className='page-header'>
          <h1>Edit Classroom</h1>
        </div>
        <ClassroomForm submitForm={this.submitForm} fields={fields} />
      </div>
    );
  }
}

EditClassroomContainer.propTypes = {
  editClassroom: PropTypes.func.isRequired,
  classroom: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const {data} = state.teacher.classrooms;
  if (data.length > 0) {
    const editId = window.location.pathname.split('/')[3];
    return {
      classroom: data.find(classroom => classroom.id === editId)
    }
  } else {
    return {};
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ editClassroom }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditClassroomContainer);
