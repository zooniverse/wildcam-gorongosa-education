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
    
    //Default filter selectors
    this.species = [];  //For a pre-set selection, use ['baboon', 'lion'] or etc.
    this.habitats = [];  //For a pre-set selection, use ['limestone', 'miombo'] or etc.
    
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
    //The biggest variable in the SQL query is the 'WHERE' clause.
    
    //Where constructor: species
    let sqlWhere_species = [];
    this.species.map((item) => {
      sqlWhere_species.push('species ILIKE \'%' + item + '%\'');
    });    
    sqlWhere_species = (sqlWhere_species.length === 0)
      ? ''
      : '(' + sqlWhere_species.join(' OR ') + ')';
    
    //Where constructor: habitats
    let sqlWhere_habitats = [];
    config.habitats.map((item) => {
      console.log('DEBUG: ' + item.name);
      if (this.habitats.indexOf(item.id) >= 0) {
        sqlWhere_habitats.push('veg_type ILIKE \'%' + item.name.replace(/'/, '\'\'') + '%\'');
      }
    });
    console.log('!!![', sqlWhere_habitats.length, ']!!!');
    sqlWhere_habitats = (sqlWhere_habitats.length === 0)
      ? ''
      : '(' + sqlWhere_habitats.join(' OR ') + ')';
    
    console.log('!!![', sqlWhere_habitats, ']!!!');
    
    //Join the Where constructor
    let sqlWhere = '';
    [sqlWhere_species, sqlWhere_habitats].map((wherePart) => {
      if (wherePart !== '') {
        sqlWhere += (sqlWhere !== '') ? ' AND' : '';
        sqlWhere += wherePart;
      }
    });
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
    let children = '[count=0],[count=null] {marker-fill:#000;} ';
    
    //For presentation, TODO: give options to change styles
    //----------------
    for (let i = 0; i < 10; i++) {
      children += '[count>'+(i*50)+'] {marker-width:'+(parseFloat(this.markerSize)+2*i)+';} ';
    }
    //----------------
    
    return config.cartodb.cssStandard
      .replace(/{LAYER}/ig, config.cartodb.sqlTableCameras)  //Actually, any ID will do
      .replace(/{MARKER-COLOR}/ig, this.markerColor)
      .replace(/{MARKER-OPACITY}/ig, this.markerOpacity)
      .replace(/{MARKER-SIZE}/ig, this.markerSize)
      .replace(/{CHILDREN}/ig, children);
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
