import React from 'react';
import DialogScreen from './DialogScreen.jsx';

export default class DialogScreen_DownloadCSV extends DialogScreen {
  constructor(props) {
    super(props);
    console.log('-'.repeat(40));
    console.log(this.DIALOG_IDLE)
    this.downloadCsv = this.downloadCsv.bind(this);
  }

  render() {
    return (
      <section className={(this.props.status === DialogScreen.DIALOG_IDLE) ? 'dialog-screen' : 'dialog-screen enabled' } onClick={this.closeMe}>
        
        {(this.props.status === DialogScreen.DIALOG_MESSAGE)
        ? <div className="dialog-box" onClick={this.noAction}>{this.props.message}</div>
        : null}
        
        {(this.props.status === DialogScreen.DIALOG_DOWNLOAD_CSV)
        ? <div className="dialog-box" onClick={this.noAction}>
            <div>{this.props.message}</div>
            <div><a download="WildcamGorongosa.csv" className="btn" onClick={this.downloadCsv}>Download</a></div>
          </div>
        : null}
        
      </section>
    );
  }

  downloadCsv(e) {
    if (this.props.data) {
      let dataBlob = new Blob([this.props.data], {type: 'text/csv'});
      let dataAsAFile = window.URL.createObjectURL(dataBlob);
      window.open(dataAsAFile);
      window.URL.revokeObjectURL(dataAsAFile);
      this.props.closeMeHandler && this.props.closeMeHandler();
    } else {
      console.error('Download CSV Error: no CSV');
    }
  }
}
