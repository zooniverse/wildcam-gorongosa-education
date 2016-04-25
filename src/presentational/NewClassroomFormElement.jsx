import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const NewClassroomFormElement = props => {
  const { label, ...other } = props;
  other.name = other.name || label.toLowerCase();
  const id = `editform-${ other.name }`;

  return (
    <div className="form-group">
      <label htmlFor={ id }>{ label }</label>
      <input
        id={ id }
        className="form-control"
        type="text"
        { ...other }
      />
    </div>
  );
}

NewClassroomFormElement.PropTypes = PropTypes.shape({
});

export default NewClassroomFormElement;
