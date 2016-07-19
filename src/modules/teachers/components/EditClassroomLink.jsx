import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const EditClassroomLink = ({ classroom }) => {
  const linkUrl = `/teachers/classrooms/${classroom.id}/edit`;
  return (
    <Link className="btn btn-warning" to={linkUrl}>
      Edit classroom
    </Link>
  );
}

EditClassroomLink.PropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
});

export default EditClassroomLink;
