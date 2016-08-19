import { PropTypes } from 'react';

const JoinButton = (props) => {
  const classNames = 'btn btn-primary';
  const join = props.join;
  return (
    <div className="info-page">
      <section className="info-panel">
        <div className="action-subpanel">
          <button className={classNames} onClick={join}>Join Classroom!</button>
        </div>
      </section>
    </div>
  )
};

JoinButton.propTypes = {
  join: PropTypes.func.isRequired
};

export default JoinButton;
