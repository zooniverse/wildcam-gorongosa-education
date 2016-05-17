import { PropTypes } from 'react';

const JoinButton = (props) => {
  const classNames = 'btn btn-primary';
  const join = props.join;
  return (
    <button className={classNames} onClick={join}>Join Classroom!</button>
  )
};

JoinButton.propTypes = {
  join: PropTypes.func.isRequired
};

export {JoinButton as default}
