import { Component, PropTypes } from 'react';


export default class ClassroomListMessage extends Component {

  render() {
    return (
      <div className="panel-body">
        <p>{this.props.message}</p>
      </div>
    )
  }

}

ClassroomListMessage.propTypes = {
  message: PropTypes.string.isRequired
};
