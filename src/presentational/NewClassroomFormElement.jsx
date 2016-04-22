import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const NewClassroomFormElement = props => {
  const { label, ...other } = props;
  other.name = other.name || label.toLowerCase();

  return (
    <div className="form-group">
      <label>{ label }</label>
      <input className="form-control"
        type="text"
        { ...other }
      />
    </div>
  );
}

NewClassroomFormElement.PropTypes = PropTypes.shape({
});

export default NewClassroomFormElement;
