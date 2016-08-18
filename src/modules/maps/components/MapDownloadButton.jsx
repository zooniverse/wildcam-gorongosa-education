import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { initialState } from '../../../reducers/mapexplorer';
import { MapHelper } from '../../../helpers/mapexplorer.js';
import { saveAs } from 'browser-filesaver';

import AlternateDownloader from '../../common/components/AlternateDownloader';

import config from '../../../constants/config';
const mapconfig = require('../../../constants/mapExplorer.config.json');

class MapDownloadButton extends Component {
  constructor(props) {
    super(props);
    this.downloadCSV = this.downloadCSV.bind(this);
    this.prepareCSV = this.prepareCSV.bind(this);
    this.prepareCSV_EASYMODE = this.prepareCSV_EASYMODE.bind(this);
    this.blobbifyCsvData = this.blobbifyCsvData.bind(this);
    this.generateFilename = this.generateFilename.bind(this);
    
    this.altDownloader = null;
    
    this.state = {
      loading: false
    }
  }

  render() {    
    return (
      <span>
        <button className="btn btn-default" onClick={this.downloadCSV}><i className="fa fa-download" /> {(!this.state.loading) ? 'Download' : 'Loading...'}</button>
        <AlternateDownloader filename={this.generateFilename()} ref={ele => this.altDownloader = ele} />
      </span>
    );
  }
  
  downloadCSV() {
    if (this.state.loading) { return; }
    
    this.setState({ loading: true });
    
    const sql = MapHelper.calculateSql(this.props.mapexplorer, mapconfig.cartodb.sqlQueryDownload);
    fetch(mapconfig.cartodb.sqlApi.replace('{SQLQUERY}', encodeURI(sql)))
    .then((response) => {
      if (response.status !== 200) {
        throw 'Can\'t reach CartoDB API, HTTP response code ' + response.status;
      }
      return response.json();
    })
    .then((json) => {
      const EASYMODE = true;  //Instead of giving the full raw data, we can
                              //give students a smaller, more easy-to-read
                              //version. //TODO: Enable users to toggle.
      let data = '';
      if (EASYMODE) {
        data = this.prepareCSV_EASYMODE(json);
      } else {
        data = this.prepareCSV(json);
      }
      
      const enableSafariWorkaround =
        !(/Chrome/i.test(navigator.userAgent)) &&
        /Safari/i.test(navigator.userAgent);
      
      if (enableSafariWorkaround) {
        this.altDownloader.download(data);
      } else {
        saveAs(this.blobbifyCsvData(data), this.generateFilename());
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
  
  generateFilename(basename = 'wildcam-', extension = '.csv') {
    let timeString = new Date();
    timeString =
      timeString.getDate() +
      ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'][timeString.getMonth()] +
      timeString.getFullYear();
    return basename + timeString + extension;
  }
  
  blobbifyCsvData(data) {
    if (data) {
      let dataBlob = new Blob([data], {type: 'text/csv'});
      return dataBlob;
    }
    return null;
  }
}

MapDownloadButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
MapDownloadButton.defaultProps = { 
  mapexplorer: initialState,
};
function mapStateToProps(state, ownProps) {  //Listens for changes in the Redux Store
  return {
    mapexplorer: state.mapexplorer,
  };
}
export default connect(mapStateToProps)(MapDownloadButton);  //Connects the Component to the Redux Store
