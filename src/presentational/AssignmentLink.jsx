import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const AssignmentLink = ({ classroom }) => {
  const linkUrl = `/teachers/classrooms/${classroom.id}/assignment`;
  return (
    <Link className="btn btn-default" to={linkUrl}>
      New assignment
    </Link>
  );
}

AssignmentLink.PropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
});

export default AssignmentLink;
