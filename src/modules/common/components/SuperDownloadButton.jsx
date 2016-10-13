/*
SuperDownloadButton
-------------------

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
        <form className="hidden" action={config.eduAPI.root + 'downloads/'} method="POST" ref={ele => this.altForm = ele} aria-hidden={true} >
          <textarea name="data" ref={ele => this.altFormData = ele} readOnly aria-label="alt-data" />
          <input name="content_type" value={this.props.contentType} readOnly aria-label="alt-contenttype" />
          <input name="filename" value={this.props.filename} readOnly aria-label="alt-filename" />
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
        saveAs(DownloadHelper.blobbifyCsvData(data), this.props.filename);
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
      let thisVal = '"'+mapconfig.cartodb.csvEasyModeTranslator[key].replace(/"/g, '\\"')+'"'
      row.push(thisVal);
    }
    row = row.join(',');
    data.push(row);

    //Prepare each row of data
    json.rows.map((rowItem) => {
      let row = [];
      for (let key in mapconfig.cartodb.csvEasyModeTranslator) {
        let thisVal = rowItem[key];
        
        if (mapconfig.cartodb.csvEasyModeSpecialValues[thisVal]) {
          //Teacher & Students using Excel are confused when seeing the range "11-50" and "51+"; these speical values will be translated to "25" and "75"
          thisVal = mapconfig.cartodb.csvEasyModeSpecialValues[thisVal];
        }
        (json.fields[key].type === 'string' && thisVal)
          ? row.push('"'+thisVal.replace(/"/g, '\\"')+'"')
          : row.push(thisVal);
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
  filename: PropTypes.string,
  content_type: PropTypes.string,
};
SuperDownloadButton.defaultProps = { 
  onClick: null,
  className: 'btn btn-default',
  text: 'Download',
  loadingText: 'Loading...',
  icon: 'fa fa-download spacing-right',
  filename: DownloadHelper.generateFilename(),
  contentType: 'text/csv',
};
export default SuperDownloadButton;
