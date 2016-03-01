import { Component, PropTypes } from 'react';


export default class JoinButton extends Component {
  render() {
    const classNames = 'btn btn-primary';
    const join = this.props.join;
    return (
      <button className={classNames} onClick={join}>Join Classroom!</button>
    );
  }
}

JoinButton.propTypes = {
  join: PropTypes.func.isRequired
};
