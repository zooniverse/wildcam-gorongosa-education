import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const EditAssignmentLink = ({ classroom, assignment }) => {
  const linkUrl = `/teachers/classrooms/${classroom.id}/assignments/${assignment.id}/edit`;
  return (
    <Link className="btn btn-warning" to={linkUrl}>
      View/Edit
    </Link>
  );
}

EditAssignmentLink.PropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
});

export default EditAssignmentLink;
