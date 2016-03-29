import React from 'react';

const DIALOG_IDLE = 'idle';
const DIALOG_ACTIVE = 'active';
  
export default class DialogScreen extends React.Component {
  constructor(props) {
    super(props);
    this.closeMe = this.closeMe.bind(this);
  }

  render() {
    return (
      <section role="dialog" className={(this.props.status === DialogScreen.DIALOG_IDLE) ? 'dialog-screen' : 'dialog-screen enabled' } onClick={this.closeMe}>
        <div className="dialog-box" onClick={this.noAction}>          
          {(this.props.message && this.props.message.length > 0)
          ? <div className="info">{this.props.message}</div>
          : null}
        </div>
      </section>
    );
  }
  
  closeMe(e) {
    this.props.closeMeHandler && this.props.closeMeHandler();
  }
  
  //'Eats up' events to prevent them from bubbling to a parent element.
  noAction(e) {
    if (e) {
      e.preventDefault && e.preventDefault();
      e.stopPropagation && e.stopPropagation();
      e.returnValue = false;
      e.cancelBubble = true;
    }
    return false;
  }
  
  static get DIALOG_IDLE() { return DIALOG_IDLE; }
  static get DIALOG_ACTIVE() { return DIALOG_ACTIVE; }
}
