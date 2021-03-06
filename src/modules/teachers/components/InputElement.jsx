import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const InputElement = props => {
  const { label, ...other } = props;
  other.name = other.name || label.toLowerCase();
  const id = `editform-${ other.name }`;

  return (
    <label className="form-group">
      <span>{ label }</span>
      <input className="form-control"
        { ...other }
      />
    </label>
  );
}

InputElement.PropTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
};

export default InputElement;
