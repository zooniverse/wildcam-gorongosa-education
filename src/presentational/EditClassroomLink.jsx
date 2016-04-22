import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const EditClassroomLink = ({ classroom }) => {
  const linkUrl = `/teachers/classrooms/${classroom.id}/edit`;
  return (
    <Link to={linkUrl}>
      Edit classroom
    </Link>
  );
}

export default EditClassroomLink;
