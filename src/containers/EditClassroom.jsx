import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';

import { editClassroom } from '../actions/teacher';
import NewClassroomForm from '../presentational/NewClassroomForm';


class EditClassroom extends Component {

  constructor() {
    super();
    this.getFormFields = this.getFormFields.bind(this);
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

  render() {
    const fields = this.getFormFields();
    return (
      <div className="col-md-4">
        <div className='page-header'>
          <h1>Edit Classroom</h1>
        </div>
        <NewClassroomForm submitForm={this.props.editClassroom} fields={fields} />
      </div>
    );
  }
}

EditClassroom.propTypes = {
  editClassroom: PropTypes.func.isRequired,
  classroom: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  if (state.teacher.classrooms.data.length > 0) {
    const editId = window.location.pathname.split('/')[3];
    return {
      classroom: state.teacher.classrooms.data.find(classroom => classroom.id === editId)
    }
  } else {
    return {};
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ editClassroom }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditClassroom);
