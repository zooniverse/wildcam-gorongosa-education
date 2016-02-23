const config = require('../constants/mapExplorer.config.json');

export default class SelectorData {
  constructor() {
    this.id = //Random ID.
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)];
    this.mode = SelectorData.GUIDED_MODE;
    //this.colour = '#000000';
    
    //Default species selectors
    this.species = ['baboon', 'lion'];
    
    //Default marker styles.
    this.markerColor = '#ff9900';  //For... consistency, this is coLOR instead of coLOUR.
    this.markerSize = '15';
    this.markerOpacity = '0.6';
    
    //These two are the most important values; they're derived from the selector
    //settings above.
    this.sql = this.calculateSql();
    this.css = this.calculateCss();
  }
  
  calculateSql() {
    let sqlWhere_species = [];
    this.species.map((s) => {
      sqlWhere_species.push('species ILIKE \'%' + s + '%\'');
    });    
    sqlWhere_species = (sqlWhere_species.length === 0)
      ? ''
      : '(' + sqlWhere_species.join(' OR ') + ')';
    
    let sqlWhere = sqlWhere_species;
    if (sqlWhere !== '') {
      sqlWhere = ' WHERE ' + sqlWhere;
    }
    
    return config.cartodb.sqlQueryCountCameras
      .replace(/{CAMERAS}/ig, config.cartodb.sqlTableCameras)
      .replace(/{SUBJECTS}/ig, config.cartodb.sqlTableSubjects)
      .replace(/{CLASSIFICATIONS}/ig, config.cartodb.sqlTableClassifications)
      .replace(/{WHERE}/ig, sqlWhere);
  }
  
  calculateCss() {
    return config.cartodb.cssStandard
      .replace(/{LAYER}/ig, config.cartodb.sqlTableCameras)  //Actually, any ID will do
      .replace(/{MARKER-COLOR}/ig, this.markerColor)
      .replace(/{MARKER-OPACITY}/ig, this.markerOpacity)
      .replace(/{MARKER-SIZE}/ig, this.markerSize)
      .replace(/{CHILDREN}/ig, '');
  }
  
  copy() {
    var newCopy = new SelectorData();
    for (var i in this) {
      if (this.hasOwnProperty(i) & i !== 'copy') {
        newCopy[i] = this[i];
      }
    }
    return newCopy;
  }
}
SelectorData.GUIDED_MODE = 1;
SelectorData.ADVANCED_MODE = 2;
