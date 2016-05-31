import React from 'react';
import DialogScreen from './DialogScreen.jsx';

export default class DialogScreen_ViewCamera extends DialogScreen {
  constructor(props) {
    super(props);
    this.closeMe = this.closeMe.bind(this);  //Babel doesn't transpile super() properly in IE10, so we need to explicitly declare this.
  }

  render() {
    return (
      <section role="dialog" className={(this.props.status === DialogScreen.DIALOG_IDLE) ? 'dialog-screen' : 'dialog-screen view-camera enabled' } onClick={this.closeMe}>
        <div className="dialog-box" onClick={this.noAction}>
          {(this.props.message && this.props.message.length > 0)
          ? <div className="info">{this.props.message}</div>
          : null}
          
          {(this.props.data)
          ? <ul>
              {this.props.data.map((item, index) => {
                return <li key={'viewCamera_'+index}><img src={item.location} /></li>
              })}
            </ul>
          : null}
          
        </div>
      </section>
    );
  }
}
