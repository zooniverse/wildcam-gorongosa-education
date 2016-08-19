/*
SuperDownloadButton
--------------------

Creates a download button that opens the 'Save As' dialog box for downloading
data. Across all browsers. Yes, including Safari 9, which has such poor HTML5
support that it doesn't support 'download' in <a href="file.csv" download>.

This component creates a hidden <form> that submits the data you want Safari to
download to EduAPI's download service, which echoes the content back as a HTTP
response with 'content-disposition' headers to force a download dialog.
 */
import { Component, PropTypes } from 'react';
import { DownloadHelper } from '../../../helpers/download.js';
import { saveAs } from 'browser-filesaver';

import config from '../../../constants/config';
const mapconfig = require('../../../constants/mapExplorer.config.json');

class SuperDownloadButton extends Component {
  constructor(props) {
    super(props);
    this.downloadCSV = this.downloadCSV.bind(this);
    this.prepareCSV = this.prepareCSV.bind(this);
    this.prepareCSV_EASYMODE = this.prepareCSV_EASYMODE.bind(this);
    
    this.state = {
      loading: false
    }
  }

  render() {    
    return (
      <span>
        <button className={this.props.className} onClick={this.props.onClick}>
          {(this.props.icon) ? <i className={(this.props.icon)} /> : null}
          {(!this.state.loading) ? this.props.text : this.props.loadingText}
        </button>
        <form className="hidden" action={config.eduAPI.root + 'downloads/'} method="POST" ref={ele => this.altForm = ele}>
          <textarea name="data" ref={ele => this.altFormData = ele} />
          <input name="content_type" value="text/csv" />
          <input name="filename" value={DownloadHelper.generateFilename()} />
        </form>
      </span>
    );
  }
  
  downloadCSV(sql, easymode = false) {
    if (this.state.loading) { return; }
    this.setState({ loading: true });
    
    const url = mapconfig.cartodb.sqlApi.replace('{SQLQUERY}', encodeURIComponent(sql));    
    fetch(url)
    .then((response) => {
      if (response.status !== 200) {
        throw 'Can\'t reach CartoDB API, HTTP response code ' + response.status;
      }
      return response.json();
    })
    .then((json) => {
      //Easymode provides students a more easy-to-read version of the CSV
      //instead of the full raw data.
      
      let data = '';
      if (easymode) {
        data = this.prepareCSV_EASYMODE(json);
      } else {
        data = this.prepareCSV(json);
      }
      
      const enableSafariWorkaround =
        !(/Chrome/i.test(navigator.userAgent)) &&
        /Safari/i.test(navigator.userAgent);
      
      if (enableSafariWorkaround) {
        console.log('Downloading: Safari Workaround');
        this.altFormData.value = data;
        this.altForm.submit();
      } else {
        saveAs(DownloadHelper.blobbifyCsvData(data), DownloadHelper.generateFilename());
      }
      
      this.setState({ loading: false });
    });
  }
  
  prepareCSV(json) {
    let data = [];
    let row = [];
    
    //Prepare the column headers
    //NOTE: we can package these translations into the SQL query but it'll get super long & messy
    for (let key in json.fields) {
      row.push('"'+key.replace(/"/g, '\\"')+'"');
    }
    row = row.join(',');
    data.push(row);

    //Prepare each row of data
    json.rows.map((rowItem) => {
      let row = [];
      for (let key in json.fields) {
        (json.fields[key].type === 'string' && rowItem[key])
          ? row.push('"'+rowItem[key].replace(/"/g, '\\"')+'"')
          : row.push(rowItem[key]);
      }
      row = row.join(',');
      data.push(row);
    });
    
    return data.join('\n');
  }
  
  prepareCSV_EASYMODE(json) {
    let data = [];
    let row = [];
    
    //Prepare the column headers
    //NOTE: we can package these translations into the SQL query but it'll get super long & messy
    for (let key in mapconfig.cartodb.csvEasyModeTranslator) {
      row.push('"'+mapconfig.cartodb.csvEasyModeTranslator[key].replace(/"/g, '\\"')+'"');
    }
    row = row.join(',');
    data.push(row);

    //Prepare each row of data
    json.rows.map((rowItem) => {
      let row = [];
      for (let key in mapconfig.cartodb.csvEasyModeTranslator) {
        (json.fields[key].type === 'string' && rowItem[key])
          ? row.push('"'+rowItem[key].replace(/"/g, '\\"')+'"')
          : row.push(rowItem[key]);
      }
      row = row.join(',');
      data.push(row);
    });
    return data.join('\n');
  }
}

SuperDownloadButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  text: PropTypes.string,
  loadingText: PropTypes.string,
  icon: PropTypes.string,
};
SuperDownloadButton.defaultProps = { 
  onClick: null,
  className: 'btn btn-default',
  text: 'Download',
  loadingText: 'Loading...',
  icon: null,
};
export default SuperDownloadButton;
