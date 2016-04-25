import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const NewClassroomFormElement = props => {
  const { label, ...other } = props;
  other.name = other.name || label.toLowerCase();
  const id = `editform-${ other.name }`;

  return (
    <label className="form-group">
      <span>{ label }</span>
      <input className="form-control"
        type="text"
        { ...other }
      />
    </label>
  );
}

NewClassroomFormElement.PropTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
};

export default NewClassroomFormElement;
